<!-- @format -->

<template>
	<div class="dropdown">
		<button @click="show = !show" class="dropbtn">
			<font-awesome-icon icon="circle-user" size="xl" /> User List
		</button>
		<div v-if="show">
			<div class="dropdown-content">
				<router-link to="/projects">User 1</router-link>
				<a href="#about">Een lange naam 3</a>
				<a href="#contact">Patrick Sekimonyo</a>
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
