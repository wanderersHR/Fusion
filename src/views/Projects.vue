<!-- @format -->

<template>
	<Navigation />
	<h1 style="text-align: center">Select a Project to examine:</h1>

	<div v-if="projects.length > 0" class="projects">
		<Project v-for="project in projects" v-bind:key="project.id" v-bind:project="project" />
	</div>

	<div v-else class="loader">
		<Loader />
	</div>
</template>

<script lang="ts">
import { httpsCallable } from "firebase/functions";
import { defineComponent, onMounted, ref } from "vue";
import { useFirebaseStore } from "../stores/firebase";
import { JiraProject } from "../JiraResponses/JiraProject";
import Loader from "../components/Loader.vue";
import Navigation from "../components/Navigation.vue";
import Project from "../components/Project.vue";
import { useAuthenticationStore } from "../stores/authentication";

export default defineComponent({
	setup() {
		const projects = ref<JiraProject[]>([]);
		const authentication = useAuthenticationStore();

		onMounted(() => {
			const firebaseStore = useFirebaseStore();
			firebaseStore.loadFirebase();
			const functions = firebaseStore.functions;

			const projectGetter = httpsCallable(functions, "getProjects");
			projectGetter().then((result) => {
				const { data } = result as {
					data: JiraProject[];
				};
				projects.value = data;
			});
		});

		return {
			projects,
		};
	},
	components: { Loader, Project, Navigation },
});
/*var longest = arr.sort(
			function (a, b) {
				return b.length - a.length;
			}
		)[0];*/
</script>
