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
import { useAuthenticationStore } from "./stores/authentication";

import "./index.scss";

export default defineComponent({
	setup() {
		const firebaseStore = useFirebaseStore();
		const authStore = useAuthenticationStore();

		authStore.fetchAccessToken();
		authStore.fetchUser();

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
