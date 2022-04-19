<!-- @format -->

<template>
	<ShowMessage message="Dit is de frontend" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ShowMessage from "../components/ShowMessage.vue";

export default defineComponent({
	components: {
		ShowMessage,
	},
});
</script>
