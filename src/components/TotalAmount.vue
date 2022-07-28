
<script lang="ts" setup>
import CalcHelper from '../helpers/calcHelper';
const { money, tax } = CalcHelper();

const props = defineProps({
  allCostComputed: {
    type: Number,
    required: true
  }
})

</script>

<template>
  <div>
    <h5 class="mv-cost-display mv-text-end">小計 ¥ {{ money(allCostComputed) }}</h5>
    <h5 class="mv-cost-display mv-text-end">消費税(10%) ¥ {{ money(tax(allCostComputed)) }}</h5>
    <h3 class="mv-cost-display mv-text-end">合計金額 ¥ {{ money(allCostComputed+tax(allCostComputed)) }}</h3>
  </div>
</template>

<style scoped>

</style>
