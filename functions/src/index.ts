/** @format */

import * as functions from "firebase-functions";
import * as cors from "cors";
import axios from "axios";
import { Hour, HourResponse, HoursObject, JiraProjectDetails, UserList } from "./models";
const corsHandler = cors({ origin: true });

const JiraDomain = "https://hr-blis.atlassian.net/rest/api/3";
const JiraApiToken = process.env.JIRA_TOKEN;
const JiraApiTokenHeader = "Basic " + Buffer.from(JiraApiToken || "").toString("base64");

let CachedHours:
	| {
			hours: HoursObject[];
			lastUpdated: number;
	  }
	| undefined;

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
	corsHandler(request, response, () => {
		functions.logger.info("Hello logs!", { structuredData: true });
		response.json({ data: "Hello from Firebase!" });
	});
});

async function simplicateGetAllHours() {
	return await axios
		.get<Hour>("https://blishr.simplicate.nl/api/v2/hours/hours", {
			headers: {
				"Content-Type": "application/json",
				"Authentication-Key": "wEp4wAwqFXyAcPmasCsP4WBH21o0gXSZ",
				"Authentication-Secret": "dBQHfEHMLDlUUESGlvAhq63BOR9hPIrl",
			},
		})
		.then((res) => {
			const hoursArray: HourResponse[] = res.data.data;
			const hourObjects: HoursObject[] = hoursArray.map((hour) => ({
				totalPrice: hour.tariff * hour.hours,
				pricePerHour: hour.tariff,
				id: hour.id,
				note: hour.note,
				hours: hour.hours,
			}));

			CachedHours = {
				hours: hourObjects,
				lastUpdated: Date.now(),
			};

			return hourObjects;
		})
		.catch((err) => {
			return err;
		});
}
simplicateGetAllHours();

// Ugly way to keep the cache up to date, but it works for now
setInterval(async () => {
	await simplicateGetAllHours();
}, 1000 * 60 * 60);

function simplicateGetHoursByTicket(ticketId: string) {
	const hours = CachedHours?.hours.filter((hour) => hour.note.toLowerCase().includes(ticketId.toLowerCase()));
	return hours;
}

export const clearCache = functions.https.onCall((request, response) => {
	CachedHours = undefined;

	simplicateGetAllHours().finally(() => {
		return { data: true };
	});
});

export const allHours = functions.https.onRequest((request, response) => {
	corsHandler(request, response, () => {
		simplicateGetAllHours().then((res) => {
			response.json(res);
		});
	});
});

export const getUsersList = functions.https.onCall((request, response) => {
	return axios
		.get<UserList[]>(`${JiraDomain}/users/search`, {
			headers: {
				"Content-type": "application/json",
				Authorization: JiraApiTokenHeader,
				Accept: "application/json",
			},
		})
		.then((res) => {
			const users = res.data.filter((user) => user.accountType === "customer");
			return users;
		})
		.catch((err) => {
			console.log(err);

			return {
				error: "Something went wrong",
				headers: err.headers,
				status: err.status,
			};
		});
});

export const getHoursByTicket = functions.https.onCall((request, response) => {
	return simplicateGetHoursByTicket(request.ticket);
});

export const getProjects = functions.https.onCall((request, response) => {
	return axios
		.get(`${JiraDomain}/project/search?expand=description,url,permissions`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: JiraApiTokenHeader,
				Accept: "application/json",
			},
		})
		.then((res) => {
			return res.data.values;
		})
		.catch((err) => {
			console.log(err);

			return {
				error: "Something went wrong",
				headers: err.headers,
				status: err.status,
			};
		});
});

export const getProject = functions.https.onCall((request, response) => {
	if (!request.projectName && !request.name) {
		return { error: "Project name is required" };
	}

	const name = request.projectName || request.name;
	const jqlUrl = `${JiraDomain}/search?jql=project="${name}"&maxResults=2147483647`;

	return axios
		.get(jqlUrl, {
			headers: {
				"Content-Type": "application/json",
				Authorization: JiraApiTokenHeader,
				Accept: "application/json",
			},
		})
		.then(async (res) => {
			const { data } = res as {
				data: JiraProjectDetails;
			};

			// Loop over all issues and add the hours to them.
			// The simplicateGetHoursByTicket is async, so we need to wait for it to finish before returning the data.
			data.issues.map((issue) => {
				// I'm not sure which one is correct, but one works and that's all I need for now.
				const way1 = simplicateGetHoursByTicket(issue.key);
				const way2 = simplicateGetHoursByTicket(issue.id);
				const way3 = simplicateGetHoursByTicket(issue.fields.summary);

				// Let Javascript figure out which one is correct.
				const hours = way1 || way2 || way3;
				issue.hours = hours;

				return issue;
			});

			return data;
		})
		.catch((err) => {
			console.log(err);

			return {
				error: "Something went wrong",
				headers: err.headers,
				status: err.status,
			};
		});
});
