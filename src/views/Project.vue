<!-- @format -->
<template>
	<h1>Project {{ projectName }}</h1>

	<div v-if="issues.length > 0" class="issues">
		<IssueComponent v-for="issue in issues" v-bind:key="issue.id" v-bind:issue="issue" />
	</div>

	<div v-else>
		<Loader />
	</div>
</template>

<script lang="ts">
import { httpsCallable } from "firebase/functions";
import { defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useFirebaseStore } from "../stores/firebase";
import { Issue, JiraProjectDetails } from "../JiraResponses/JiraProjectDetail";

import Loader from "../components/Loader.vue";
import IssueComponent from "../components/Issue.vue";

export default defineComponent({
	setup() {
		const route = useRoute();
		const projectName = route.params.name;
		const issues = ref<Issue[]>([]);

		onMounted(() => {
			const firebaseStore = useFirebaseStore();
			firebaseStore.loadFirebase();

			const functions = firebaseStore.functions;

			const projectInfo = httpsCallable(functions, "getProject");
			projectInfo({ name: projectName }).then((result: any) => {
				const { data } = result as {
					data: JiraProjectDetails;
				};
				issues.value = data.issues;
			});
		});

		return { projectName, issues };
	},
	components: { Loader, IssueComponent },
});
</script>
