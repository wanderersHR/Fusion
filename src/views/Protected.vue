<!-- @format -->

<template>
	<h1>Protected area</h1>
</template>

<script lang="ts">
import { httpsCallable } from "firebase/functions";
import { defineComponent, onBeforeMount, onMounted } from "vue";
import { useAuthenticationStore } from "../stores/authentication";
import { useFirebaseStore } from "../stores/firebase";

export default defineComponent({
	setup() {
		onMounted(() => {
			console.log("Protected.vue mounted");

			const firebaseStore = useFirebaseStore();

			firebaseStore.loadFirebase();

			const authenticationStore = useAuthenticationStore();

			const functions = firebaseStore.functions;

			const projects = httpsCallable(functions, "getProjects");
			projects().then((result) => {
				const { data } = result;

				const projectInfo = httpsCallable(functions, "getProject");

				(data as any).forEach((project: any) => {
					console.log(project);

					projectInfo({ id: project.id }).then((result2: any) => {
						console.log("Get project " + project.id);
						console.log(result2);
					});
				});
			});

			console.log("Get projects");
		});
	},
});
</script>
