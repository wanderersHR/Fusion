<!-- @format -->

np
<!-- @format -->

<template></template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthenticationStore } from "../stores/authentication";

export default defineComponent({
	setup() {
		const route = useRoute();
		const router = useRouter();
		const authenticationStore = useAuthenticationStore();

		if (!route.query.code) {
			router.push({ name: "login" });
			return;
		}

		onMounted(() => {
			authenticationStore.login(route.query.code as string);
			setTimeout(() => router.push({ name: "projects" }), 1000);
			// router.push({ name: "home" });
		});
	},
});
</script>
