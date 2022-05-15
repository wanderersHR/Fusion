<!-- @format -->

<template>
	<router-view />
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from "vue";
import { useFirebaseStore } from "./stores/firebase";
import { httpsCallable } from "firebase/functions";

export default defineComponent({
	setup() {
		const firebaseStore = useFirebaseStore();

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
