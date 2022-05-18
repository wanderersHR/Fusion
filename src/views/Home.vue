<!-- @format -->
<template>
	<div>
		<h1>Homepage</h1>
		<LoginButton v-if="!isAuthenticated" />
		<LogoutButton v-else />
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

		const isAuthenticated = ref(authenticationStore.isAuthenticated);

		return { fetchData, isAuthenticated };
	},
	mounted() {
		fetch("https://blishr.simplicate.nl/api/v2/projects/project", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Authentication-Key": "cbSm4s71RmxHJWNdFznQnfmH2T3pHMi7",
				"Authentication-Secret": "BaRd-4JQq3jHPQdYZkhwEfAKEUkeUhJj9F4q6BLG-FYtd9m1id3qgocRaLmsRvD5"
			},
		})
			.then(res => res.json())
			.then((data) => console.log(data));
	}
});

</script>
