<!-- @format -->

<template>
	<div class="side-columns__box">
		<h2>Tickets:</h2>
		<h1>{{ countIssues }}</h1>
		<br />
		<h2 h2>Uren:</h2>
		<h1>{{ countHours }} uur</h1>
		<br />
		<h2>Kosten:</h2>
		<h1>€{{ countPrice }}</h1>
	</div>
</template>
<script lang="ts">
import { computed, defineComponent, toRefs } from "vue";
import { Issue } from "../JiraResponses/JiraProjectDetail";

export default defineComponent({
	props: {
		issues: {
			type: Object as () => Issue[],
			required: true,
		},
	},
	setup(props) {
		const { issues } = toRefs(props);

		const countIssues = computed(() => {
			return issues.value.length;
		});

		const countHours = computed(() => {
			let hours = 0;
			issues.value.forEach((issue) => {
				issue.hours?.forEach((hour) => {
					hours += hour.hours;
				});
			});
			return hours;
		});

		const countPrice = computed(() => {
			let price = 0;
			issues.value.forEach((issue) => {
				issue.hours?.forEach((hour) => {
					price += hour.totalPrice;
				});
			});
			return price;
		});

		return {
			countIssues,
			countHours,
			countPrice,
		};
	},
});
</script>
