/** @format */

import * as functions from "firebase-functions";
import * as cors from "cors";
const corsHandler = cors({ origin: true });

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
	corsHandler(request, response, () => {
		functions.logger.info("Hello logs!", { structuredData: true });
		response.json({ data: "Hello from Firebase!" });
	});
});
