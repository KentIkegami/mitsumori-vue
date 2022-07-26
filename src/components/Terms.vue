
<script lang="ts" setup>

const props = defineProps({
  termsHtml: {
    type: String,
    required: true
  }
})


</script>

<template>
  <div class="mv-terms" style="height:150px;">
    <span v-html=termsHtml></span>
  </div>
</template>

<style scoped>
.mv-terms{
  background-color: white;
  overflow: auto;
  border-radius: 5px;

  -ms-overflow-style: none;
  scrollbar-width: none;
  border: 1px solid rgba(0, 0, 0, .1);
  padding: 1rem;
}
.mv-terms::-webkit-scrollbar{
  display: none;
}
</style>
