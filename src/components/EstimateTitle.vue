<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: false
  },
  description: {
    type: String,
    required: false
  },
})
</script>

<template>
  <h3>{{ title }}</h3>
  <p v-html="description"></p>
</template>

<style scoped>
h1{
  padding-top: 1rem;
}
</style>