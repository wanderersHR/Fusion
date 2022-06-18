/** @format */

import * as functions from "firebase-functions";
import * as cors from "cors";
import axios from "axios";
import { Hour, HourResponse, HoursObject } from "./models";
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

async function simplicateGetHoursByTicket(ticketId: string) {
	if (!CachedHours || CachedHours.lastUpdated > Date.now() - 1000 * 60 * 60) {
		await simplicateGetAllHours();
	}

	const hours = CachedHours?.hours.filter((hour) => hour.note.includes(ticketId));
	return hours;
}

export const allHours = functions.https.onRequest((request, response) => {
	corsHandler(request, response, () => {
		simplicateGetAllHours().then((res) => {
			response.json(res);
		});
	});
});

export const getHoursByTicket = functions.https.onCall((request, response) => {
	return simplicateGetHoursByTicket(request.ticket).then((res) => {
		return res;
	});
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

	const id = request.id || request.key;
	const jqlUrl = `${JiraDomain}/project/${id}?expand=permissions`;

	return axios
		.get(jqlUrl, {
			headers: {
				"Content-Type": "application/json",
				Authorization: JiraApiTokenHeader,
				Accept: "application/json",
			},
		})
		.then((res) => {
			return res.data;
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
