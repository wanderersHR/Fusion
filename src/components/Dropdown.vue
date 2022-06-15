<!-- @format -->

<template>
	<div class="dropdown">
		<button @click="show = !show" class="dropbtn"><font-awesome-icon icon="circle-user" size="xl" /> Menu</button>
		<div v-if="show">
			<div class="dropdown-content">
				<router-link to="/projects">Home</router-link>
				<a href="#about">Calendar</a>
				<a href="#contact">Price</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
	setup() {
		const show = ref(false);

		return { show };
	},
});
</script>
