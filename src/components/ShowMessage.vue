<template>
    <h1>{{ message }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        message: {
            type: String,
            required: true
        }
    }
})
</script>
