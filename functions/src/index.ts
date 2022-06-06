/** @format */

import * as functions from "firebase-functions";

import app from "./firebase";
import { getFirestore, collection, addDoc, getDocs, connectFirestoreEmulator } from "firebase/firestore";

const db = getFirestore(app);
if (process.env.EMULATOR == "true") {
	connectFirestoreEmulator(db, "localhost", 8080);
}

import axios from "axios";

import * as cors from "cors";
const corsHandler = cors({ origin: true });

import { Hour, HourResponse } from "./models";

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

export const test = functions.https.onRequest((request, response) => {
	corsHandler(request, response, () => {
		const colTest = collection(db, "test");
		getDocs(colTest)
			.then((docs) => {
				response.json({ data: docs });
			})
			.catch((err) => {
				response.json({ data: err });
			});
	});
});

export const allHours = functions.https.onRequest((request, response) => {
	corsHandler(request, response, async () => {
		function GetHoursFromJira() {
			functions.logger.info("Getting hours from Jira");

			return axios
				.get<Hour>("https://blishr.simplicate.nl/api/v2/hours/hours", {
					headers: {
						"Content-Type": "application/json",
						"Authentication-Key": "wEp4wAwqFXyAcPmasCsP4WBH21o0gXSZ",
						"Authentication-Secret": "dBQHfEHMLDlUUESGlvAhq63BOR9hPIrl",
					},
				})
				.then(async (res) => {
					const hoursArray: HourResponse[] = res.data.data;
					const hourObjects = hoursArray.map((hour) => ({
						totalPrice: hour.tariff * hour.hours,
						pricePerHour: hour.tariff,
						id: hour.id,
						note: hour.note,
						hours: hour.hours,
					}));

					const hoursCollection = collection(db, "hours");

					// Write hourObjects to Firestore
					await addDoc(hoursCollection, {
						hourObjects,
						time: new Date(),
					});
					functions.logger.info("Successfully wrote hours to Firestore");

					return hourObjects;
				})
				.catch(async (err) => {
					return err;
				});
		}

		functions.logger.info("Getting hours from Jira or Cache");

		//Get the hours from Firestore if it exists
		const hours = await getDocs(collection(db, "hours"));

		if (hours.size > 0) {
			functions.logger.info("Hours already in Firestore");

			// Check if the hours are older than 1 hour
			const now = new Date();
			const lastHour = hours.docs[hours.docs.length - 1].data() as { hourObjects: Hour[]; date: Date };
			const lastHourDate = new Date(lastHour.date);
			const diff = now.getTime() - lastHourDate.getTime();
			const diffHours = diff / (1000 * 3600);

			if (diffHours > 1) {
				functions.logger.info("Getting hours from Jira, too old");

				// If the hours are older than 1 hour, get the hours from Jira
				const newHours = await GetHoursFromJira();
				return response.json({ data: newHours });
			} else {
				functions.logger.info("Hours are less than 1 hour old");
				return response.json({ data: hours.docs[0].data().hourObjects });
			}
		} else {
			functions.logger.info("Getting hours from Jira, not in cache");

			// If the hours don't exist, get them from Jira
			const newHours = await GetHoursFromJira();
			return response.json({ data: newHours });
		}
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
