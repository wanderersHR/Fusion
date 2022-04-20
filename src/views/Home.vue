<!-- @format -->
<template>
	<div>
		<h1>Test</h1>
		<LoginButton />
		<LogoutButton />
		<button @click="fetchData">Fetch</button>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import LoginButton from "../components/LoginButton.vue";
import LogoutButton from "../components/LogoutButton.vue";
import { useAuthenticationStore } from "../stores/authentication";

export default defineComponent({
	components: {
		LoginButton,
		LogoutButton,
	},
	setup() {
		const authenticationStore = useAuthenticationStore();

		function fetchData() {
			if (authenticationStore.isAuthenticated) {
				fetch("https://api.atlassian.com/me", {
					headers: {
						Authorization: "Bearer " + authenticationStore.getBearerToken,
						Accept: "application/json",
					},
				})
					.then((res) => res.json())
					.then((data) => console.log(data));
			}
		}

		return { fetchData };
	},
});
</script>
