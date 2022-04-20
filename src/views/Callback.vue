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

		onMounted(() => {
			authenticationStore.login(route.query.code as string);
			router.push({ name: "home" });
		});
	},
});
</script>
