<!-- @format -->

<template>
	<h1>Protected area</h1>
</template>

<script lang="ts">
import { httpsCallable } from "firebase/functions";
import { defineComponent, onBeforeMount } from "vue";
import { useAuthenticationStore } from "../stores/authentication";
import { useFirebaseStore } from "../stores/firebase";

export default defineComponent({
	setup() {},

	onMounted() {
		console.log("Protected.vue mounted");

		const firebaseStore = useFirebaseStore();

		firebaseStore.loadFirebase();

		const authenticationStore = useAuthenticationStore();

		const functions = firebaseStore.functions;

		const projects = httpsCallable(functions, "getProjects");
		projects({ bearerToken: authenticationStore.getBearerToken }).then((result) => {
			const { data } = result;
			console.log(data);
		});
	},
});
</script>
