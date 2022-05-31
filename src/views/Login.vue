<!-- @format -->

<template>
	<div class="size">
		<div class="main-nav">
			<div>
				<img src="../style sass/logo.svg" alt="Fusion" />
			</div>	
			<div>
			</div>
			<div>
			</div>
			<div>
			</div>
		</div>
		<div>
			<div class="login-container">
				<h1>Log-in</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem quae labore hic omnis minima,
					blanditiis nostrum reprehenderit soluta tempora ex?
				</p>
				<LoginButton />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoginButton from "../components/LoginButton.vue";

export default defineComponent({
	components: {
    LoginButton
},
});
</script>
