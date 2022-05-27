<!-- @format -->
<template>
	<h1>Project {{ projectName }}</h1>
</template>

<script lang="ts">
import { httpsCallable } from "firebase/functions";
import { defineComponent, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useFirebaseStore } from "../stores/firebase";

export default defineComponent({
	setup() {
		const route = useRoute();

		const projectName = route.params.name;

		onMounted(() => {
			const firebaseStore = useFirebaseStore();

			firebaseStore.loadFirebase();

			const functions = firebaseStore.functions;

			const projectInfo = httpsCallable(functions, "getProject");

			console.log("Get project " + projectName);
			projectInfo({ name: projectName }).then((result: any) => {
				console.log("Get project tickets " + projectName);
				console.log(result);
			});
		});

		return { projectName };
	},
});
</script>
