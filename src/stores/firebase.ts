/** @format */

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp, FirebaseApp } from "firebase/app";
import { defineStore } from "pinia";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

export const useFirebaseStore = defineStore("firebase", {
	state: () => {
		return { firebase: undefined as FirebaseApp | undefined };
	},
	actions: {
		loadFirebase() {
			if (this.firebase == undefined) {
				// Your web app's Firebase configuration
				const firebaseConfig = {
					apiKey: "AIzaSyDcVMI_fHeXfiC-fyRAHSR_xeRSqj7Hjvs",
					authDomain: "fusion-da358.firebaseapp.com",
					projectId: "fusion-da358",
					storageBucket: "fusion-da358.appspot.com",
					messagingSenderId: "961221085493",
					appId: "1:961221085493:web:f963ac2df44add0175247c",
				};

				// Initialize Firebase
				this.firebase = initializeApp(firebaseConfig);
			}
		},
	},
	getters: {
		firebaseInstance: (state) => state.firebase,
		functions: (state) => {
			const functions = getFunctions(state.firebase);

			if (window.location.hostname === "localhost") {
				connectFunctionsEmulator(functions, "localhost", 5001);
			}

			return functions;
		},
	},
});
