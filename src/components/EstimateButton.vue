
<script lang="ts" setup>
const props = defineProps({
  text: {
    type: String,
    required: true
  },
  abled: {
    type:Boolean,
    required: false,
    default: true
  },
  partsColor: {
    type: String,
    default: '#2e80ff'
  }
  
})

const emits = defineEmits<{
  (e: 'click'): void
}>();

const onClick = ():void => {
  emits('click')
}
</script>

<template>
  <button class="mv-btn" @click="onClick" :disabled="!abled">{{ text }}</button>
</template>

<style scoped>
.mv-btn{
  background-color: v-bind('partsColor');
  color: white;
  border-radius: 2px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.4rem;
  padding-bottom: 0.4rem;
  margin-right: 0.5rem ;
  transition: 0.3s;
  opacity: 90%;
}

.mv-btn:hover {
  opacity: 100%;
}

.mv-btn:disabled {
  opacity: 50%;
}
</style>
