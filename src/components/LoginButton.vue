<!-- @format -->

<template>
	<button class="login-btn">
		<font-awesome-icon icon="user" />
  		<a :href="loginUrl">Login with Jira</a>
	</button>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	setup() {
		const loginUrl = ref(
			"https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=o5OphqyH8bmxCcQqnaJvlZFslyyclMm7&scope=read:me&redirect_uri=" +
				window.location.origin +
				"/callback&state=123&response_type=code&prompt=consent"
		);

		return { loginUrl };
	},
});
</script>
