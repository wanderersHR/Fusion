<!-- @format -->

<template>
	<button @click="logout" class="logout-btn">
		<i class="fa-solid fa-arrow-right-from-bracket"></i><span>Logout</span>
	</button>
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
