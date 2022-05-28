<!-- @format -->

<template>
	<h1>Projects</h1>

	<div v-if="projects.length > 0" class="projects">
		<div class="project" v-for="project in projects" v-bind:key="project.id">
			<router-link :to="`/projects/${project.name}`">
				<img :src="project.avatarUrls['48x48']" :alt="project.name" width="200" height="200" />
				<h2>{{ project.name }}</h2>
			</router-link>
		</div>
	</div>

	<div v-else>
		<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
			<g fill="none" fill-rule="evenodd" stroke-width="2">
				<circle cx="22" cy="22" r="1">
					<animate
						attributeName="r"
						begin="0s"
						dur="1.8s"
						values="1; 20"
						calcMode="spline"
						keyTimes="0; 1"
						keySplines="0.165, 0.84, 0.44, 1"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="stroke-opacity"
						begin="0s"
						dur="1.8s"
						values="1; 0"
						calcMode="spline"
						keyTimes="0; 1"
						keySplines="0.3, 0.61, 0.355, 1"
						repeatCount="indefinite"
					/>
				</circle>
				<circle cx="22" cy="22" r="1">
					<animate
						attributeName="r"
						begin="-0.9s"
						dur="1.8s"
						values="1; 20"
						calcMode="spline"
						keyTimes="0; 1"
						keySplines="0.165, 0.84, 0.44, 1"
						repeatCount="indefinite"
					/>
					<animate
						attributeName="stroke-opacity"
						begin="-0.9s"
						dur="1.8s"
						values="1; 0"
						calcMode="spline"
						keyTimes="0; 1"
						keySplines="0.3, 0.61, 0.355, 1"
						repeatCount="indefinite"
					/>
				</circle>
			</g>
		</svg>
	</div>
</template>

<script lang="ts">
import { httpsCallable } from "firebase/functions";
import { defineComponent, onMounted, ref } from "vue";
import { useFirebaseStore } from "../stores/firebase";
import { JiraProject } from "../JiraResponses/JiraProject";

export default defineComponent({
	setup() {
		const projects = ref<JiraProject[]>([]);

		onMounted(() => {
			console.log("Protected.vue mounted");

			const firebaseStore = useFirebaseStore();

			firebaseStore.loadFirebase();

			const functions = firebaseStore.functions;

			const projectGetter = httpsCallable(functions, "getProjects");
			projectGetter().then((result) => {
				const { data } = result as { data: JiraProject[] };

				projects.value = data;
			});

			console.log("Get projects");
		});

		return {
			projects,
		};
	},
});
</script>
