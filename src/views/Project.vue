<!-- @format -->
<template>
	<h1>Project {{ projectName }}</h1>

	<div v-if="issues.length > 0" class="issues">
		<div class="issue" v-for="issue in issues" v-bind:key="issue.id">
			<h2>{{ issue.key }} - {{ issue.fields.summary }}</h2>

			<h3>
				{{
					// TODO: Find a better way to do this
					issue.fields.description?.content[0].content[0].text
				}}
			</h3>

			<h5>
				{{ issue.fields.status.name }} - {{ issue.fields.priority.name }} -
				{{ issue.fields.assignee?.displayName }} - {{ formatTime(issue.fields.created) }} -
				{{ formateTimeFromNow(issue.fields.updated) }}
			</h5>
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
import { useRoute } from "vue-router";
import { useFirebaseStore } from "../stores/firebase";
import { Issue, JiraProjectDetails } from "../JiraResponses/JiraProjectDetail";
import moment from "moment";

export default defineComponent({
	setup() {
		const route = useRoute();

		const projectName = route.params.name;

		const issues = ref<Issue[]>([]);

		function formatTime(time: Date | string) {
			return moment(time).format("LLL");
		}

		function formateTimeFromNow(time: Date | string) {
			return moment(time).fromNow();
		}

		onMounted(() => {
			const firebaseStore = useFirebaseStore();

			firebaseStore.loadFirebase();

			const functions = firebaseStore.functions;

			const projectInfo = httpsCallable(functions, "getProject");

			console.log("Get project " + projectName);
			projectInfo({ name: projectName }).then((result: any) => {
				const { data } = result as { data: JiraProjectDetails };
				issues.value = data.issues;
			});
		});

		return { projectName, issues, formatTime, formateTimeFromNow };
	},
});
</script>
