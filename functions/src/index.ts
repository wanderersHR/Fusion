/** @format */

import * as functions from "firebase-functions";
import * as cors from "cors";
import axios from "axios";
import { Hour, HourResponse } from "./models";
const corsHandler = cors({ origin: true });

const JiraDomain = "https://hr-blis.atlassian.net/rest/api/3";
const JiraApiToken = process.env.JIRA_TOKEN;
const JiraApiTokenHeader = "Basic " + Buffer.from(JiraApiToken || "").toString("base64");

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
	corsHandler(request, response, () => {
		functions.logger.info("Hello logs!", { structuredData: true });
		response.json({ data: "Hello from Firebase!" });
	});
});

export const allHours = functions.https.onRequest((request, response) => {
	corsHandler(request, response, () => {
		axios
			.get<Hour>("https://blishr.simplicate.nl/api/v2/hours/hours", {
				headers: {
					"Content-Type": "application/json",
					"Authentication-Key": "wEp4wAwqFXyAcPmasCsP4WBH21o0gXSZ",
					"Authentication-Secret": "dBQHfEHMLDlUUESGlvAhq63BOR9hPIrl",
				},
			})
			.then((res) => {
				const hoursArray: HourResponse[] = res.data.data;
				const hourObjects = hoursArray.map((hour) => ({
					totalPrice: hour.tariff * hour.hours,
					pricePerHour: hour.tariff,
					id: hour.id,
					note: hour.note,
					hours: hour.hours,
				}));

				return response.json({ data: hourObjects });
			})
			.catch((err) => {
				return response.json({ data: err });
			});
	});
});

export const getHoursByTicket = functions.https.onCall((request, response) => {
	return axios
		.get<Hour>("https://blishr.simplicate.nl/api/v2/hours/hours", {
			headers: {
				"Content-Type": "application/json",
				"Authentication-Key": "wEp4wAwqFXyAcPmasCsP4WBH21o0gXSZ",
				"Authentication-Secret": "dBQHfEHMLDlUUESGlvAhq63BOR9hPIrl",
			},
		})
		.then((res) => {
			const hoursArray: HourResponse[] = res.data.data;
			const filteredHoursArray: HourResponse[] = hoursArray.filter((hour) =>
				hour.note.toLowerCase().includes(request.ticket)
			);
			const hourObjects = filteredHoursArray.map((hour) => ({
				totalPrice: hour.tariff * hour.hours,
				pricePerHour: hour.tariff,
				id: hour.id,
				note: hour.note,
				hours: hour.hours,
			}));

			if (hourObjects.length !== 0) {
				return { data: hourObjects };
			}

			return { data: "Hours with that ticket not found" };
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
