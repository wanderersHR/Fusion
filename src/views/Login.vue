<!-- @format -->

<template>
	<div>
		<Logo />
		<h1 class="text-3xl font-bold underline pt-5">Je moet inloggen op uw atlassian account</h1>
		<LoginButton />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginButton from "../components/LoginButton.vue";
import Logo from "../components/Logo.vue";

export default defineComponent({
	components: {
    LoginButton,
    Logo
},
});
</script>
