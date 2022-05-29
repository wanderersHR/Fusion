<!-- @format -->

<template>
	<div class="issue" v-bind:key="issue.id">
		<h2>{{ issue.key }} - {{ issue.fields.summary }}</h2>

		<h3>
			{{
				// TODO: Find a better way to do this
				issue.fields.description?.content[0].content[0].text
			}}
		</h3>

		<h5>
			{{ issue.fields.status.name }} - {{ issue.fields.priority.name }} -
			{{ issue.fields.assignee?.displayName }} - {{ formatTime(issue.fields.created) }} -
			{{ formatTimeFromNow(issue.fields.updated) }}
		</h5>
	</div>
</template>

<script lang="ts">
import moment from "moment";
import { defineComponent } from "vue";
import { Issue } from "../JiraResponses/JiraProjectDetail";

export default defineComponent({
	props: {
		issue: {
			type: Object as () => Issue,
			required: true,
		},
	},
	setup(props) {
		function formatTime(time: Date | string) {
			return moment(time).format("LLL");
		}

		function formatTimeFromNow(time: Date | string) {
			return moment(time).fromNow();
		}

		return {
			issue: props.issue,
			formatTime,
			formatTimeFromNow,
		};
	},
});
</script>
