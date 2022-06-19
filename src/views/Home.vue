<!-- @format -->
<template>
	<div class="main-nav">
		<div>
			<router-link to="/projects">
				<img src="/logo.svg" alt="Fusion" class="main-nav__logo" />
			</router-link>
		</div>
	</div>
	<div class="login-container">
		<h1>Logout</h1>
		<p>You can log out here or go back to the open <router-link to="/Projects"> Projects. </router-link></p>
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
