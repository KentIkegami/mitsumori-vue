
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
    <p class="mv-cost-display mv-text-end mv-total-one-line">お見積金額 ¥{{ money(allCostComputed) }}<span class="mv-intax-text"> (税込 ¥{{ money(allCostComputed+tax(allCostComputed)) }})</span></p>
  </div>
</template>

<style scoped>
.mv-total-one-line{
  font-size: 1.3rem;
}
.mv-intax-text{
  font-size: 0.8rem;
}
@media (max-width: 500px) {
  .mv-total-one-line{
    letter-spacing: 0.07rem;
    font-size: 1.0rem;
  }
  .mv-intax-text{
    font-size: 0.7rem;
  }
}
</style>
