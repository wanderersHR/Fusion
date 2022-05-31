<!-- @format -->

<template>
	<div class="project" v-bind:key="project.id">
		<router-link :to="`/projects/${project.name}`">
			<img :src="project.avatarUrls['48x48']" :alt="project.name" width="200" height="200" />
			<h2>{{ project.name }}</h2>
		</router-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { JiraProject } from "../JiraResponses/JiraProject";

export default defineComponent({
	props: {
		project: {
			type: Object as () => JiraProject,
			required: true,
		},
	},
	setup(props) {
		return {
			project: props.project,
		};
	},
});
</script>
