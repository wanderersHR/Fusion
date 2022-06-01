<!-- @format -->

<template>
	<div class="main-nav">
		<div>
			<img src="/logo.svg" alt="Fusion" class="main-nav__logo" />
		</div>
		<div>
			<h2 class="main-nav__name">Welcome User</h2>
		</div>
		<div>
			<button @click="logout" class="logout-btn">
				<i class="fa-solid fa-arrow-right-from-bracket"></i><span>Logout</span>
			</button>
		</div>
	</div>
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
