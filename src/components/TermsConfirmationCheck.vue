
<script lang="ts" setup>

const props = defineProps({
  modelValue: {
    type: Boolean
  },
  partsColor: {
    type: String,
    default: '#2e80ff'
  }
})

const emits = defineEmits<{
  (e: 'update:modelValue', checked: boolean): void
}>();

const onChangeCheckChild = (e: Event): void => {
  const target = e.target as HTMLInputElement;
  const value: boolean = target.checked;
  // console.log('onChangeCheckChild():value:'+value);
  emits('update:modelValue', value)
}
</script>

<template>
  <div class="mv-terms-confirmation-wrapper">
    <!-- <input type="checkbox" id="checkbox-terms-confirmation" class="form-check-input" :checked="modelValue" @change="onChangeCheckChild($event)">
    <label class="form-check-label" for="checkbox-terms-confirmation">規約に同意します</label> -->
    <label class="mv-checkbox"><input type="checkbox" :checked="modelValue" @change="onChangeCheckChild($event)"><span class="mv-checkmark"></span></label>
    <p>規約に同意します</p>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/checkbox.scss';

.mv-checkbox {
  input:checked + .mv-checkmark {
    background: v-bind('partsColor');
    border-color: v-bind('partsColor');
  }
}

.mv-terms-confirmation-wrapper{
  display: flex;
  justify-content: flex-start;
  p{
    padding-left: 2.5rem;
    font-size: 1.2rem;
  }
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
