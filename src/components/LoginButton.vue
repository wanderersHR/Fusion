<!-- @format -->

<template>
	<a :href="loginUrl">Login</a>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginData from "../data.json";

export default defineComponent({
	setup() {
		const scopes = [
			"read:me",
			"read:account",
			"read:issue-type:jira",
			"read:project:jira",
			"read:project.property:jira",
			"read:user:jira",
			"read:application-role:jira",
			"read:avatar:jira",
			"read:group:jira",
			"read:issue-type-hierarchy:jira",
			"read:project-category:jira",
			"read:project-version:jira",
			"read:project.component:jira",
		].join(" ");

		const loginUrl = ref(
			`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=${loginData.client_id}&scope=${scopes}&redirect_uri=${window.location.origin}/callback&state=123&response_type=code&prompt=consent`
		);

		return { loginUrl };
	},
});
</script>
