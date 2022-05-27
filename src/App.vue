<!-- @format -->

<template>
	<!-- <p>Start: {{ startTime }}</p>
	<p>End: {{ endTime }}</p>
	<p>Duration: {{ duration }}</p>
	<p>Response: {{ firebaseMsg }}</p> -->

	<router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useFirebaseStore } from "./stores/firebase";
import { httpsCallable } from "firebase/functions";
import { ref } from "vue";
import { useAuthenticationStore } from "./stores/authentication";

// export default defineComponent({
// 	setup() {
// 		// const startTime = ref(Date.now());
// 		// let duration = ref(-1);
// 		// let endTime = ref(-1);
// 		// let firebaseMsg = ref("");
// 		// const firebaseStore = useFirebaseStore();
// 		// firebaseStore.loadFirebase();
// 		// const functions = firebaseStore.functions;
// 		// // connectFunctionsEmulator(functions, "localhost", 5001);
// 		// const addMessage = httpsCallable(functions, "helloWorld");
// 		// addMessage().then((result) => {
// 		// 	// Read result of the Cloud Function.
// 		// 	/** @type {any} */
// 		// 	const data = result.data;
// 		// 	console.log(data);
// 		// 	firebaseMsg.value = data as string;
// 		// 	endTime.value = Date.now();
// 		// 	duration.value = endTime.value - startTime.value;
// 		// });
// 		// return { startTime, duration, endTime, firebaseMsg };
// 	}

// 		onBeforeMount(() => {
// 			const authenticationStore = useAuthenticationStore();
// 			authenticationStore.fetchAccessToken();
// 			if (authenticationStore.isAuthenticated) {
// 				setInterval(() => {
// 					authenticationStore.refresh();
// 					console.log("hoi");
// 				}, 10 * 1000);
// 			}

// });

import "./index.scss";

export default defineComponent({
	setup() {
		const firebaseStore = useFirebaseStore();
		const authStore = useAuthenticationStore();

		authStore.fetchAccessToken();

		firebaseStore.loadFirebase();

		const functions = firebaseStore.functions;

		const hoursOfSingleTicket = httpsCallable(functions, "getHoursByTicket");
		hoursOfSingleTicket({ ticket: "bs-2" }).then((result) => {
			const { data } = result;
			console.log(data);
		});
	},
});
</script>
