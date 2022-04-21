<!-- @format -->

<template>
	<div>
		<h1 class="text-3xl font-bold underline">Je moet inloggen op uw atlassian account</h1>
		<LoginButton />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginButton from "../components/LoginButton.vue";

export default defineComponent({
	components: {
		LoginButton,
	},
});
</script>
