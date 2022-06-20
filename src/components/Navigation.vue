<!-- @format -->

<template>
	<div class="main-nav">
		<div>
			<router-link to="/projects">
				<img src="/logo.svg" alt="Fusion" class="main-nav__logo" />
			</router-link>
		</div>
		<div>
			<Dropdown />
			<router-link to="/">
				<font-awesome-icon icon="arrow-right-from-bracket" size="xl" />
			</router-link>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { useAuthenticationStore } from "../stores/authentication";
import { useRouter } from "vue-router";
import Dropdown from "../components/Dropdown.vue";

export default defineComponent({
	components: {
		Dropdown,
	},
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
