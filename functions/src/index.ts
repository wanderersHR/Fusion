/** @format */

import * as functions from "firebase-functions";
import * as cors from "cors";
import axios from "axios";
import { Hour, HourResponse } from "./models";
const corsHandler = cors({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

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
					pricePerHour: hour.hours,
					id: hour.id,
					note: hour.note,
					hours: hour.hours,
				}));

				return response.json({ data: hourObjects });
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
				pricePerHour: hour.hours,
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
