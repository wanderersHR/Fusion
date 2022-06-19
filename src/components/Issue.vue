<!-- @format -->

<template>
	<div class="ticket-columns__box" v-bind:key="issue.id">
		<span class="ticket-columns__box__id">Ticket #{{ issue.id }}</span>

		<span class="ticket-columns__box__label">{{ issue.fields.summary }}</span>

		<span class="ticket-columns__box__description">
			{{
				// TODO: Find a better way to do this
				issue.fields.description?.content[0].content[0].text
			}}
		</span>

		<span class="ticket-columns__box__details">
			{{ issue.fields.status.name }} - {{ issue.fields.priority.name }} -
			{{ issue.fields.assignee?.displayName }} - {{ formatTime(issue.fields.created) }} -
			{{ formatTimeFromNow(issue.fields.updated) }}
		</span>
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
