
<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Category } from '../types/Category'

const props = defineProps({
  categorySelectTitle: {
    type: String,
    required: false,
    default: ''
  },
  categories: {
    type: Object as PropType<Category[]>,
    required: false
  },
  modelValue: {
    type: Number
  }
})

const emits = defineEmits<{
  (e: 'update:modelValue', num: number): void
  (e: 'onChangeCategoryParent', index: number): void
}>();

const onChangeCategoryChild = (e: Event):void => {
  const target = e.target as HTMLInputElement
  const index: number = Number(target.value)
  emits('update:modelValue', index)
  emits('onChangeCategoryParent', index)
}
</script>

<template>
  <div class="mv-category-warpper">
    <span>{{ categorySelectTitle }}</span>
    <select class="mv-category-select" :value="modelValue" @change="onChangeCategoryChild">
      <option value="" disabled>選んでください</option>
      <option v-for="(category, i) in categories" :value="i">{{ category.name }}</option>
    </select>
  </div>
</template>

<style scoped>
.mv-category-warpper{
  display: flex;
  flex-direction: column;
}

.mv-category-select {

  /* styling */
  background-color: white;
  border: thin solid rgb(150, 150, 150);
  border-radius: 4px;
  color: black;
  
  
  line-height: 1.5em;
  padding: 0.5em 3.5em 0.5em 1em;

  /* reset */
  margin: 0;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
}


/* arrows */
.mv-category-select {
  background-image:
    linear-gradient(45deg, transparent 50%, rgb(150, 150, 150) 50%),
    linear-gradient(135deg, rgb(150, 150, 150) 50%, transparent 50%),
    linear-gradient(to right, rgb(230, 230, 230), rgb(230, 230, 230));
  background-position:
    calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px),
    100% 0;
  background-size:
    5px 5px,
    5px 5px,
    2.5em 2.5em;
  background-repeat: no-repeat;
}


</style>
