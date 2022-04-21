<!-- @format -->

<template>
	<div>
		<Logo />
		<div class="grid gap-x-12 grid-cols-3 justify-center items-center">
			<div></div>
			<div class="box-border rounded-lg shadow-2xl p-10">
				<h1 class="text-4xl font-bold pt-5 flex justify-center text-darkblu">Log-in</h1>
				<h3 class="pt-5 flex justify-center text-blu">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</h3>
				<LoginButton />
			</div>
			<div></div>
		</div>
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
