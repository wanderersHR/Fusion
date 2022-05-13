<!-- @format -->
<template>
	<div>
		<h1>Homepage</h1>
		<LoginButton v-if="!isAuthenticated" />
		<LogoutButton v-else />
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

		const isAuthenticated = ref(authenticationStore.isAuthenticated);

		return { isAuthenticated };
	},
});
</script>
