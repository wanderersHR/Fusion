<!-- @format -->

<template>
	<div class="main-nav">
		<div>
			<img src="/logo.svg" alt="Fusion" class="main-nav__logo" />
		</div>
	</div>
	<div>
		<div class="login-container">
			<h1>Login</h1>
			<p>Log in here with your Jira account. You'll be send back to our webpage instantly!</p>
			<LoginButton />
		</div>
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
