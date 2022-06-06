<!-- @format -->

<template>
	<a :href="loginUrl" class="login-btn">
		<font-awesome-icon :icon="['fab', 'jira']" />
		<span>Login with Jira</span>
	</a>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginData from "../data.json";

export default defineComponent({
	setup() {
		const scopes = [
			"read:me",
			"read:account",
			// "read:jira-work",
			// "read:issue-type:jira",
			// "read:project:jira",
			// "read:project.property:jira",
			// "read:user:jira",
			// "read:application-role:jira",
			// "read:avatar:jira",
			// "read:group:jira",
			// "read:issue-type-hierarchy:jira",
			// "read:project-category:jira",
			// "read:project-version:jira",
			// "read:project-component:jira",
		].join(" ");

		const JiraDomain = "hr-blis.atlassian.net";
		const AtlassianDomain = "atlassian.com";

		const loginUrl = ref(
			`https://auth.${AtlassianDomain}/authorize?audience=api.atlassian.com&client_id=${loginData.client_id}&scope=${scopes}&redirect_uri=${window.location.origin}/callback&state=123&response_type=code&prompt=consent`
		);

		return { loginUrl };
	},
});
</script>
