<!-- @format -->

<template>
	<div class="mainnav">
		<div class="itemnav">
			<img src="../style sass/logo.svg" alt="Fusion" />
		</div>	
		<div class="itemnav">
		</div>
		<div class="itemnav">
			<h3 class="johnav">
				Welkom John Doe
			</h3>
		</div>
		<div class="itemnav">
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
