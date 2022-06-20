<!-- @format -->

<template>
	<div class="ticket-columns__box" v-bind:key="issue.id">
		<span class="ticket-columns__box__id">Ticket #{{ issue.id }}</span>

		<span class="ticket-columns__box__label">{{ issue.fields.summary }}</span>

		<div class="ticket-row">
			<div class="ticket-columns-info">
				<span class="ticket-columns__box__description">
					{{ issueName }}
				</span>

				<span class="ticket-columns__box__details">
					{{ issue.fields.status.name }} - {{ issue.fields.priority.name }} -
					{{ issue.fields.assignee?.displayName }} - {{ creationDate }} -
					{{ dateFromNow }}
				</span>
			</div>
			<div class="ticket-columns-hours" v-if="totalHours > 0 || totalPrice > 0">
				<span class="ticket-columns__box__hours">{{ totalHours }} uur</span>
				<span class="ticket-columns__box__price">€{{ totalPrice }}</span>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import moment from "moment";
import { computed, defineComponent } from "vue";
import { Issue } from "../JiraResponses/JiraProjectDetail";

export default defineComponent({
	props: {
		issue: {
			type: Object as () => Issue,
			required: true,
		},
	},
	setup(props) {
		const issue = props.issue;

		const issueName = computed(() => {
			return props.issue.fields.description?.content[0].content[0].text;
		});

		const totalHours = computed(() => {
			let hours = 0;
			if (props.issue.hours) {
				props.issue.hours.forEach((hour) => {
					hours += hour.hours ? hour.hours : 0;
				});
			}
			return hours;
		});

		const totalPrice = computed(() => {
			let price = 0;
			if (issue.hours) {
				issue.hours.forEach((hour) => {
					price += hour.totalPrice ? hour.totalPrice : 0;
				});
			}
			return price;
		});

		const creationDate = computed(() => {
			return moment(issue.fields.created).format("LLL");
		});

		const dateFromNow = computed(() => {
			return moment(issue.fields.updated).fromNow();
		});

		return {
			issueName,
			issue: props.issue,
			creationDate,
			dateFromNow,
			totalHours,
			totalPrice,
		};
	},
});
</script>
