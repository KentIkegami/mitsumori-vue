
<script lang="ts" setup>
import type { PropType } from 'vue';
import type { Item } from '../types/Item';
import CalcHelper from '../helpers/calcHelper';
const { money, unitCost } = CalcHelper();

const props = defineProps({
  items: {
    type: Array as PropType<Item[]>,
    required: true
  },
  baseCostComputed: {
    type: Number,
    required: true
  },
  baseProcessNameComputed: {
    type: String
  },
  partsColor: {
    type: String,
    default: '#2e80ff'
  },
  itemBackColor: {
    type: String,
    default: '#d9e9ff'
  }
})

const emits = defineEmits<{
  (e: 'onChangeItemParent', value: number, item_id: string): void
}>();

const onChangeRangeChild = (e: Event, item_id: string): void => {
  const target = e.target as HTMLInputElement
  const value: number = Number(target.value)
  // console.log('onChangeRangeChild():value:'+value+':item_id:'+item_id);
  emits('onChangeItemParent', value, item_id)
}

const onChangeCheckChild = (e: Event, item_id: string): void => {
  const target = e.target as HTMLInputElement
  const value: number = Number(target.checked)
  // console.log('onChangeCheckChild():value:'+value+':item_id:'+item_id);
  emits('onChangeItemParent', value, item_id)
}
</script>

<template>
  <div class="mv-item-outer" v-for="(item) in items" :class="{ mvitemdisabled: item.is_disabled }">
    <div class="mv-item-title-wrapper">
      <p class="mv-item-title">{{ item.name }}<sup class="mv-required" v-if="item.is_required">*必須</sup></p>
    </div>
    <div class="mv-unit-cost-wrapper">
      <p v-if="item.type === 'static'" class="mv-item-unitcost"> {{ '¥' + money(unitCost(item, baseCostComputed)) }}</p>
      <p v-if="item.type === 'dynamic'" class="mv-item-unitcost"> {{ '¥' + money(unitCost(item, baseCostComputed)) + ' / ' + item.detail_dynamic!.unit_mass + item.detail_dynamic!.unit_name }}</p>
      <p v-if="item.type === 'dependence'" class="mv-item-unitcost">{{ baseProcessNameComputed + 'の' + item.detail_dependence!.coefficient * 100 + '%' + '('+ '¥' + money(unitCost(item, baseCostComputed)) +')' }}</p>
    </div>
    <div class="mv-item-description-wrapper">
      <div class="mv-item-description" v-html="item.description "></div>
    </div>
    <div class="mv-item-input-cost-wrapper">
      <div class="mv-item-input-wrapper">
        <input v-if="item.type === 'dynamic'" class="mv-item-input-range" type="range" :value="item.quantity" :min="item.detail_dynamic!.min_quantity" :max="item.detail_dynamic!.max_quantity" step="1" @input="onChangeRangeChild($event, item.item_id)" :disabled="item.is_disabled">
        <label v-else class="mv-checkbox"><input type="checkbox" :checked="item.quantity === 1 ? true : false" @change="onChangeCheckChild($event, item.item_id)" :disabled="item.is_required || item.is_disabled"><span class="mv-checkmark"></span></label>
      </div>
      <div class="mv-item-quantity-wrapper" >
        <input v-if="item.type === 'dynamic'" class="mv-item-quantity mv-cost-display" type="text" :value="(item.quantity * item.detail_dynamic!.unit_mass) + item.detail_dynamic!.unit_name" readonly/>
        <input v-else class="mv-item-quantity mv-cost-display" type="text" :value="item.quantity" readonly/>
      </div>
      <div class="mv-item-cost-wrapper" >
        <input class="mv-item-cost mv-cost-display" type="text" :value="'¥ '+money(item.cost)" readonly>
      </div>
      <div class="mv-item-unit-description" v-if="item.type === 'dynamic'">
        <p>{{ item.detail_dynamic!.unit_description }}</p>
      </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>

@import '../assets/range.scss';
@import '../assets/checkbox.scss';

.mv-checkbox {
  input:checked + .mv-checkmark {
    background: v-bind('partsColor');
    border-color: v-bind('partsColor');
  }
}
.mv-item-input-range::-webkit-slider-thumb {
  --box-shadow-color: v-bind('partsColor');
}
.mv-item-input-range::-moz-range-thumb {
  --box-shadow-color: v-bind('partsColor');
}
.mv-item-input-range::-ms-fill-lower { 
  background: v-bind('partsColor');
}

/*アイテムstart*/
.mvitemdisabled{
  opacity: 0.6;
}
.mv-item-outer{
  background-color: v-bind('itemBackColor');
  
  display: grid;
  grid-template:
    "... ...... ...... ..." 10px
    "... top-l  top-r  ..." auto
    "... ...... ...... ..." 5px
    "... center center ..." auto
    "... ...... ...... ..." 20px
    "... bottom bottom ..." auto
    "... ...... ...... ..." 10px
    /10px 3.5fr   2fr    10px;
  margin-bottom: 10px;
}
.mv-item-title-wrapper{
  grid-area: top-l;
}
.mv-unit-cost-wrapper{
  grid-area: top-r;
}
.mv-item-description-wrapper{
  grid-area: center;
}
.mv-item-input-cost-wrapper{
  width: 100%;
  grid-area: bottom;
  display: grid;
  grid-template:
    "item1 ... item2 ... item3" auto
    "ud ud  ud  ud    ud" auto
    / 4fr 10px 1fr 10px 2fr;
}
.mv-item-unit-description{
  grid-area: ud;
  font-size: 0.7rem;
  color: rgb(39, 39, 39);
  font-weight: 100;
  text-align: end;
}


@media (max-width: 500px) {
  .mv-item-input-cost-wrapper{
    grid-template:
    "item1 ... item2 ... item3" auto
    "ud ud  ud  ud    ud" auto
    / 4fr 5px 2.5fr 5px 3fr;
  }
  .mv-item-quantity{
    font-size: 0.5rem;
  }
  .mv-item-cost{
    font-size: 0.5rem;
  }
}
.mv-item-input-wrapper{
  width: 100%;
  grid-area: item1;
}
.mv-item-quantity-wrapper{
  width: 100%;
  grid-area: item2;
}
.mv-item-cost-wrapper{
  width: 100%;
  grid-area: item3;
}

.mv-item-title{
  font-size: 1.5rem;
}
@media (max-width: 500px) {
  .mv-item-title{
    font-size: 1.0rem;
    font-weight: bold;
  }
}
.mv-required{
  color: rgb(255, 103, 95);
  font-size: 1rem;
}

.mv-item-unitcost{
  font-size: 1.3rem;
  text-align: right;
}

@media (max-width: 500px) {
  .mv-item-unitcost{
    font-size: 0.9rem;
    font-weight: bold;
  }
}

.mv-unit-description{
  font-size: 0.7rem;
  color: rgb(69, 69, 69);
}
.mv-item-input-checkbox {
  width: 2rem; 
  height: 2rem;
}


.mv-item-quantity{
  width: 100%;
  font-size: 1.5rem;
  height: 2rem;
  text-align: end;
  padding-right: 0.5rem;
  background-color: white;
  border: solid;
  border-width: 0.5px;
  border-radius: 4px;
  border-color: rgb(150, 150, 150);
}
.mv-item-cost{
  width: 100%;
  font-size: 1.5rem;
  height: 2rem;
  text-align: end;
  padding-right: 0.5rem;
  background-color: white;
  border: solid;
  border-width: 0.5px;
  border-radius: 4px;
  border-color: rgb(150, 150, 150);
}
@media (max-width: 750px) {

  .mv-item-quantity{
    font-size: 1rem;
  }
  .mv-item-cost{
    font-size: 1rem;
  }
}

/*アイテムend*/

</style>
