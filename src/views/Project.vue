<!-- @format -->
<template>
	<Navigation />
	<h1 style="text-align: center">Tickets for Project {{ projectName }}</h1>
	<h2 style="text-align: center">Select a month:</h2>
	<Datepicker v-model="picked" style="width: 100%; padding-left: 40%; padding-right: 40%" monthPicker />
	<div v-if="filteredIssues.length > 0 && loaded">
		<div class="main-box">
			<div class="ticket-columns">
				<IssueComponent v-for="issue in filteredIssues" v-bind:key="issue.id" v-bind:issue="issue" />
			</div>
			<div class="side-columns">
				<TicketOverview :issues="filteredIssues" />
			</div>
		</div>
	</div>

	<div v-else-if="filteredIssues.length == 0 && loaded">
		<h1 style="text-align: center; padding-top: 5%"><font-awesome-icon icon="face-sad-cry" />No tickets found</h1>
	</div>

	<div v-if="!loaded" class="loader">
		<Loader />
	</div>
</template>

<script lang="ts">
import { httpsCallable } from "firebase/functions";
import { computed, defineComponent, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import Navigation from "../components/Navigation.vue";
import { useFirebaseStore } from "../stores/firebase";
import { Issue, UserList, JiraProjectDetails } from "../JiraResponses/JiraProjectDetail";
import Loader from "../components/Loader.vue";
import IssueComponent from "../components/Issue.vue";
import { useAuthenticationStore } from "../stores/authentication";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import moment from "moment";
import { useSelectedUserStore } from "../stores/selecteduser";
import TicketOverview from "../components/TicketOverview.vue";

export default defineComponent({
	setup() {
		const authStore = useAuthenticationStore();
		const selectedUser = useSelectedUserStore();
		const authorId = selectedUser.getAccountId ? selectedUser.getAccountId : authStore.getUser?.account_id;
		const route = useRoute();
		const projectName = route.params.name;
		const issues = ref<Issue[]>([]);
		const picked = ref({
			month: new Date().getMonth(),
			year: new Date().getFullYear(),
		});
		const loaded = ref(false);

		const filteredIssues = computed(() => {
			let ownTickets = issues.value.filter((issue) => issue.fields.reporter.accountId === authorId);
			let monthTickets = ownTickets.filter(
				(issue) =>
					moment(issue.fields.created).month() === picked.value.month &&
					moment(issue.fields.created).year() === picked.value.year
			);
			return monthTickets;
		});

		onMounted(() => {
			const firebaseStore = useFirebaseStore();
			firebaseStore.loadFirebase();

			const functions = firebaseStore.functions;
			console.log(authorId);

			const projectInfo = httpsCallable(functions, "getProject");
			projectInfo({ name: projectName }).then((result: any) => {
				const { data } = result as {
					data: JiraProjectDetails;
				};
				console.log(data.issues);
				issues.value = data.issues;
				loaded.value = true;
			});

			const userList = httpsCallable(functions, "getUsersList");
			userList().then((result) => {
				const { data } = result as {
					data: UserList[];
				};
			});
		});

		return { projectName, filteredIssues, picked, loaded };
	},
	components: { Loader, IssueComponent, Navigation, Datepicker, TicketOverview },
});
</script>
