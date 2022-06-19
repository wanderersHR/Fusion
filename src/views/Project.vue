<!-- @format -->
<template>
	<Navigation />
	<h1 style="text-align: center">Tickets for Project {{ projectName }}</h1>
	<div v-if="filteredIssues.length > 0">
		<div class="main-box">
			<div class="ticket-columns">
				<IssueComponent v-for="issue in filteredIssues" v-bind:key="issue.id" v-bind:issue="issue" />
			</div>
			<div class="side-columns">
				<div class="side-columns__box">
					<h2>Tickets:</h2>
					<h1>5</h1>
					<br />
					<h2>Uren:</h2>
					<h1>76 uur</h1>
					<br />
					<h2>Kosten:</h2>
					<h1>€7600</h1>
				</div>
				<div class="side-columns__box--empty"></div>
			</div>
		</div>
	</div>

	<div v-else class="loader">
		<Loader />
	</div>
</template>

<script lang="ts">
import { httpsCallable } from "firebase/functions";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Navigation from "../components/Navigation.vue";
import { useFirebaseStore } from "../stores/firebase";
import { Issue, JiraProjectDetails } from "../JiraResponses/JiraProjectDetail";

import Loader from "../components/Loader.vue";
import IssueComponent from "../components/Issue.vue";
import { useAuthenticationStore } from "../stores/authentication";

export default defineComponent({
	setup() {
		const authStore = useAuthenticationStore();
		const authorId = authStore.getUser?.account_id;
		const route = useRoute();
		const projectName = route.params.name;
		const issues = ref<Issue[]>([]);

		const filteredIssues = computed(() => {
			// return issues.value.filter((issue) => issue.fields.creator.accountId === authorId);
			return issues.value;
		});

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

		return { projectName, filteredIssues };
	},
	components: { Loader, IssueComponent, Navigation },
});
</script>
