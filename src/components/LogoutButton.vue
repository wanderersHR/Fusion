<!-- @format -->

<template>
	<button @click="logout">Logout</button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthenticationStore } from "../stores/authentication";

export default defineComponent({
	setup() {
		const authenticationStore = useAuthenticationStore();

		function logout() {
			authenticationStore.logout();
		}

		return { logout };
	},
});
</script>
