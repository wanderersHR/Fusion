<!-- @format -->

<template>
	<a :href="loginUrl">Login</a>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import loginData from "../data.json";

export default defineComponent({
	setup() {
		const loginUrl = ref(
			`https://auth.atlassian.com/authorize?audience=api.atlassian.com
			&client_id=${loginData.client_id}&scope=read:me&redirect_uri=${window.location.origin}/callback&state=123
			&response_type=code&prompt=consent`
		);

		return { loginUrl };
	},
});
</script>
