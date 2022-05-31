<!-- @format -->

<template>
	<button @click="logout"><font-awesome-icon icon="arrow-right-to-bracket" /></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useAuthenticationStore } from "../stores/authentication";
import { useRouter } from "vue-router";

export default defineComponent({
	setup() {
		const authenticationStore = useAuthenticationStore();
		const router = useRouter();

		function logout() {
			authenticationStore.logout();
			router.push({ name: "login" });
		}

		return { logout };
	},
});
</script>
