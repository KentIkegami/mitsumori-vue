
<script lang="ts" setup>
import TotalAmount from '../components/TotalAmount.vue';
import EstimateButton from '../components/EstimateButton.vue';
import type { PropType } from 'vue';
import type { Item } from '../types/Item';
import CalcHelper from '../helpers/calcHelper';
import TextHelper from '../helpers/textHelper';
const { money, tax, unitCost } = CalcHelper();
const { todayStr } = TextHelper();

const props = defineProps({
  partnerName: {
    type: String,
    required: false
  },
  ownerCompanyName: {
    type: String,
    required: false
  },
  ownerCompanyAddress: {
    type: String,
    required: false
  },
  allCostComputed: {
    type: Number,
    required: true
  },
  selectedItemsComputed: {
    type: Array as PropType<Item[]>,
    required: true
  },
  baseCostComputed: {
    type: Number,
    required: true
  },
  partsColor: {
    type: String,
    default: '#2e80ff'
  }
})

const emits = defineEmits<{
  (e: 'onClickClosePdfEstimate'): void
}>();

const onClickClose = ():void => {
  emits('onClickClosePdfEstimate')
}
const onClickPrint = ():void => {
  window.print();
}
</script>

<template>
  <div class="mv-print-overlay">
    <div class="mv-print-contents-wrapper page">
      <div class="mv-print-content-header">
        <p class="mv-print-title mv-print-text">御見積書(概算)</p>
        <p class="mv-print-partner mv-print-text"><u v-show="partnerName !== ''">{{ partnerName }}&nbsp;御中</u></p>
        <p class="mv-print-today mv-print-text">見積日: {{ todayStr() }}</p>
        <p class="mv-print-owner-name mv-print-text">{{ ownerCompanyName }}</p>
        <p class="mv-print-total-cost mv-print-text">合計&nbsp;¥&nbsp;{{ money(allCostComputed+tax(allCostComputed)) }}&nbsp;-(税込)</p>
        <p class="mv-print-owner-address mv-print-text">{{ ownerCompanyAddress }}</p>
      </div>
      <div class="mv-print-content-main">
        <table class="mv-print-table">
          <thead>
            <tr>
              <th class="mv-pl"></th>
              <th class="mv-pl">項目名</th>
              <th class="mv-text-end mv-pr">単価</th>
              <th class="mv-text-end mv-pr">数量</th>
              <th class="mv-text-end mv-pr">金額</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(selectedItem, i) in selectedItemsComputed">
              <td class="mv-pl">{{ i + 1 }}</td>
              <td class="mv-pl">{{ selectedItem.name }}</td>
              <td class="mv-text-end mv-pr">{{ unitCost(selectedItem, baseCostComputed) }}</td>
              <td class="mv-text-end mv-pr">{{ selectedItem.quantity }}</td>
              <td class="mv-text-end mv-pr">{{ money(selectedItem.cost) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mv-print-content-bottom">
        <TotalAmount :allCostComputed="allCostComputed" />
      </div>
    </div>
    <div>
      <span class="mv-print-none">
        <EstimateButton @click="onClickPrint" text="印刷(PDF出力)" :partsColor = "partsColor"/>
        <EstimateButton @click="onClickClose" text="閉じる" :partsColor = "partsColor"/>
      </span>
    </div>
  </div>
</template>

<style scoped>
/*オーバーレイstart*/
.mv-print-text {
  font-family:'Times New Roman', Times, serif;
  letter-spacing: 0.1rem;
}

.mv-print-overlay{
  /*　要素を重ねた時の順番　*/
  z-index:1;

  /*　画面全体を覆う設定　*/
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.5);

  /*　画面の中央に要素を表示させる設定　*/
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.mv-print-contents-wrapper{
  z-index: 2;
  width: 210mm;
  height: 297mm;
  background:rgb(255, 255, 255);
  display: grid;
  grid-template:
  "... ...... ..." 15mm
  "... header ..." 50mm
  "... main   ..." auto
  "... bottom ..." 20mm
  "... ...... ..." 15mm
  / 15mm auto 15mm
  ;
}

.mv-print-content-header{
  grid-area: header;
  display: grid;
  grid-template:
  "... ...... today  ..." 2mm
  "... title  title   ..." 1fr
  "... ...... ......  ..." 4mm
  "... partner partner  ..." 1fr
  "... owner-n owner-n ..." 1fr
  "... total  owner-a ..." 1fr
  "... ...... ......  ..." 2mm
  / 2mm auto auto 2mm
  ;
}
.mv-print-title{
  text-align: center;
  grid-area: title;
  font-size: 1.6rem;
}
.mv-print-partner{
  grid-area: partner;
  font-size: 1.3rem;
}
.mv-print-today{
  text-align: right;
  grid-area: today;
  font-size: 0.7rem;
}
.mv-print-owner-name{
  text-align: right;
  grid-area: owner-n;
  font-size: 1.2rem;
}
.mv-print-owner-address{
  text-align: right;
  grid-area: owner-a;
  font-size: 0.9rem;
}
.mv-print-total-cost{
  grid-area: total;
  font-size: 1.3rem;
}


.mv-print-content-main{
  grid-area: main;
  border: solid;
}

 
.mv-print-table {
  width: 100%;
  border-collapse:separate;
}

.mv-print-table th {
  border: solid 1px;
}

.mv-print-table td {
  border: solid 0.5px;
}


.mv-print-content-bottom{
  grid-area: bottom;
}

@media print {
  @page {
    size: A4 portrait;
    margin: 0;
  }
  .mv-print-contents-wrapper{
    width: 210mm;
    height: 297mm;
  }
}
/*オーバレイend*/
</style>
