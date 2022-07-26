<script lang='ts' setup>
import { ref, computed, onMounted} from 'vue';
import type { PropType } from 'vue';
import Loading from './components/Loading.vue';
import EstimateTitle from './components/EstimateTitle.vue';
import SelectCategory from './components/SelectCategory.vue';
import SelectProsess from './components/SelectProsess.vue';
import SelectItem from './components/SelectItem.vue';
import TotalAmountOneLine from './components/TotalAmountOneLine.vue';
import Terms from './components/Terms.vue';
import TermsConfirmationCheck from './components/TermsConfirmationCheck.vue';
import EstimateButton from './components/EstimateButton.vue';
import PdfEstimateMetaField from './components/PdfEstimateMetaField.vue';
import PdfEstimate from './components/PdfEstimate.vue';

import type { InitData } from './types/InitData';
import type { Item } from './types/Item';
import type { Category } from './types/Category';
import type { Process } from './types/Process';
import type { UserSelection } from './types/UserSelection';
import type { ViewState } from './types/ViewState';
import type { ViewSetting } from './types/ViewSetting';
import type { OwnerSetting } from './types/OwnerSetting';
import type { UserInput } from './types/UserInput';
import type {PropagationGroup } from './types/PropagationGroup';
import type {Propagation } from './types/Propagation';

import CalcHelper from './helpers/calcHelper';
const { money } = CalcHelper();

const props = defineProps({
  url: {
    type: String,
    required: false,
    default: './example.json'
  },
  initCategoryIndex: {
    type: Number,
    required: false,
    default: null
  },
  initProcessIndex: {
    type: Number,
    required: false,
    default: null
  },
  debug: {
    type: Boolean,
    required: false,
    default: false
  },
  useLoading: {
    type: Boolean,
    required: false,
    default: true
  },
  useTerms: {
    type: Boolean,
    required: false,
    default: true
  },
  useTermsConfirmationCheck: {
    type: Boolean,
    required: false,
    default: true
  },
  useEmailEstimate: {
    type: Boolean,
    required: false,
    default: true
  },
  usePdfEstimate: {
    type: Boolean,
    required: false,
    default: true
  },
  usePdfEstimateMetaField: {
    type: Boolean,
    required: false,
    default: true
  },
  categorySelectTitle: {
    type: String,
    required: false,
    default: '見積もりの種類'
  },
  ownerCompanyName: {
    type: String,
    required: false,
    default: '〇〇コーポレーション'
  },
  ownerCompanyAddress: {
    type: String,
    required: false,
    default: '東京都 中央区 1-1-1'
  },
  ownerEmail: {
    type: String,
    required: false,
    default: 'info@example.com'
  },
  prosessColors: {
    type: Array as PropType<string[]>,
    required: false,
    default: [
    '#5f91a6',
    '#8CBFBF',
    '#84B5A7',
    '#B899F2',
    '#A79FFC',
    '#9DAAE6',
    '#9FC9FC',
    '#99D8F2', 
  ]
  },
  partsColor: {
    type: String,
    required: false,
    default: '#2e80ff'
  },
  itemBackColor: {
    type: String,
    required: false,
    default: '#d9e9ff'
  }
})



const initData = ref<InitData>({
  jsonData: null,
});

const viewState = ref<ViewState>({
  isDebugMode: false,
  isUseLoading: true,
  isUseTerms: true,
  isUseTermsConfirmationCheck: true,
  isUseEmailEstimate: true,
  isUsePdfEstimate: true,
  isUsePdfEstimateMetaField: true,
  isShowPrintContent: false,
  isLoading: false,
  isCheckedTerms: false,
});

const userSelection = ref<UserSelection>({
  category: null,
  categoryIndex: -1,
  processIndex: 0
});

const userInput = ref<UserInput>({
  partnerName: '',
});

const ownerSetting = ref<OwnerSetting>({
  jsonUrl: '',
  ownerCompanyName: '',
  ownerCompanyAddress: '',
  ownerEmail: '',
});

const viewSetting = ref<ViewSetting>({
  categorySelectTitle: '',
  prosessColors: [
    '#5f91a6',
    '#8CBFBF',
    '#84B5A7',
    '#B899F2',
    '#A79FFC',
    '#9DAAE6',
    '#9FC9FC',
    '#99D8F2', 
  ],
  partsColor: '#2e80ff',
  itemBackColor: '#d9e9ff'
});


// created処理
viewState.value.isLoading = true;

if(props.url){ ownerSetting.value.jsonUrl = props.url!; }
if(props.ownerCompanyName){ownerSetting.value.ownerCompanyName = props.ownerCompanyName!;}
if(props.ownerCompanyAddress){ownerSetting.value.ownerCompanyAddress = props.ownerCompanyAddress!;}
if(props.ownerEmail){ownerSetting.value.ownerEmail = props.ownerEmail!;}
if(props.useLoading){viewState.value.isUseLoading = props.useLoading!;}
if(props.debug){viewState.value.isDebugMode = props.debug!;}
if(props.useTerms){viewState.value.isUseTerms = props.useTerms!;}
if(props.useTermsConfirmationCheck){viewState.value.isUseTermsConfirmationCheck = props.useTermsConfirmationCheck!;}
if(props.usePdfEstimate){viewState.value.isUseEmailEstimate = props.useEmailEstimate!;}
if(props.usePdfEstimate){viewState.value.isUsePdfEstimate = props.usePdfEstimate!;}
if(props.usePdfEstimateMetaField){viewState.value.isUsePdfEstimateMetaField = props.usePdfEstimateMetaField!;}
if(props.categorySelectTitle){viewSetting.value.categorySelectTitle = props.categorySelectTitle!;}
if(props.prosessColors){viewSetting.value.prosessColors = props.prosessColors!;}
if(props.partsColor){viewSetting.value.partsColor = props.partsColor!;}
if(props.itemBackColor){viewSetting.value.itemBackColor = props.itemBackColor!; }

onMounted(() => {
  
});

const log = (texts: any[]): void => {
  if (viewState.value.isDebugMode){
    let t = ' ';
    texts.forEach((text) => {
      t += text + ':';
    });
    if (t.slice(-1) === ':'){
      t = t.slice(0, -1);
    }
    console.log('[debug]' + t);
  }
}

const getJson = (): void => {
  log(['getJson()'])
  fetch(ownerSetting.value.jsonUrl)
    .then(response => {
      return response.json();
    })
    .then(data => {
      log(['getJson()', 'success']);
      initData.value.jsonData = data
      if (initData.value.jsonData){
        log(['initCategoryIndex', props.initCategoryIndex])
        log(['initProcessIndex',props.initProcessIndex])
        if (props.initCategoryIndex !== null){
          userSelection.value.category = initData.value.jsonData.categories[props.initCategoryIndex]
          userSelection.value.categoryIndex = props.initCategoryIndex
        }
        if (props.initProcessIndex !== null) {
          userSelection.value.processIndex = props.initProcessIndex
        }
      }
      setTimeout(() => {
        viewState.value.isLoading = false
      }, 1000)
    })
    .catch(error => {
      log(['getJson()', 'error']);
      console.log(error);
      initData.value.jsonData = null
    }
  );
};

getJson()

/**
 * カテゴリーの選択時に発火する
 */
const onChangeCategory = (index: number): void => {
  log(['onChangeCategory()', index])
  if(initData.value.jsonData){
    userSelection.value.category = initData.value.jsonData.categories[index]
    userSelection.value.category.processes.forEach((process, i) => {
      process.items.forEach((item, j) => {
        if (item.is_required){
          item.quantity = 1
          calcItemCost(item)
        }
      });
    });
    userSelection.value.processIndex = 0
  }
};
/**
 * 選択しているカテゴリーのすべてのプロセスの
 * タイプが'dependence'のすべてのアイテムについてコスト計算をする
 */
const calcDependences = (): void => {
  if(userSelection.value.category){
    userSelection.value.category.processes.forEach((process, i) => {
      process.items.forEach((item, j) => {
      if (item.type === 'dependence'){
        calcItemCost(item)
      }
    });
  });
  }
};
const calcItemCost = (item: Item): void => {
  switch (item.type){
    case 'static':
      item.cost = item.quantity * item.detail_static!.unit_cost
      break;
    case 'dynamic':
      item.cost = item.quantity * item.detail_dynamic!.unit_cost
      break;
    case 'dependence':
      item.cost = item.quantity * baseCostComputed.value * item.detail_dependence!.coefficient
      break;
    default:
      console.log('calcItemValue: Reach default.');
  }
};

const onClickProcess = (index: number): void => {
  log(['onClickProcess()', index]);
  userSelection.value.processIndex = index;
  let element = document.getElementById('mv-process-head');
  if (element){
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

const onChangeItem = (value: number, item_id: string): void => {
  let item: Item | null = itemById(item_id)
  if (item){
    log(['onChangeItem()','item_id',item_id,'value',value]);
    // 量を更新する
    item.quantity = value
    // 更新した量に基づいてコストを計算する
    calcItemCost(item)
    // ベースに属するプロセスの場合、依存値を再計算する
    if (userSelection.value.category!.processes[userSelection.value.processIndex].base){
      calcDependences();
    }
    // 影響を与える
    propagateItemQuantityChange(item)
  }
}


const propagateItemQuantityChange = (fromItem: Item): void => {

  const propagationGroups = userSelection.value.category!.propagation_groups

  let filteredProps: Propagation[] = [];
  propagationGroups.forEach((propagationGroup: PropagationGroup) => {
    const tmp: Propagation[] = propagationGroup.propagations.filter(e => e.from_id == fromItem.item_id);
    filteredProps = filteredProps.concat(tmp);
  });
  filteredProps.forEach((filteredProp: Propagation) => {
    let needCalc = false;
    let to_item = itemById(filteredProp.to_id);
    if (to_item){
      switch (filteredProp.type){
      case 'ZERO_TO_ZERO':
        if (fromItem.quantity === 0 ){
          log(['propagateItemQuantityChange', 'ZERO_TO_ZERO', to_item.item_id])
          to_item.quantity = 0;
          needCalc = true;
        }
        break;
      case 'ONE_TO_ONE':
        if (fromItem.quantity === 1 ){
          log(['propagateItemQuantityChange', 'ONE_TO_ONE', to_item.item_id])
          to_item.quantity = 1;
          needCalc = true;
        }
        break;
      case 'N_TO_N':
        log(['propagateItemQuantityChange', 'N_TO_N', to_item.item_id])
        to_item.quantity = fromItem.quantity;
        needCalc = true;
        break;
      case 'ZERO_TO_DISABLE':
        if (fromItem.quantity === 0 ){
          log(['propagateItemQuantityChange', 'ZERO_TO_DISABLE', to_item.item_id])
          to_item.is_disabled = true;
        }
        break;
      case 'ZERO_TO_ABLE':
        if (fromItem.quantity === 0 ){
          log(['propagateItemQuantityChange', 'ZERO_TO_ABLE', to_item.item_id])
          to_item.is_disabled = false;
        }
        break;
      case 'ONE_TO_DISABLE':
        if (fromItem.quantity === 1 ){
          log(['propagateItemQuantityChange', 'ONE_TO_DISABLE', to_item.item_id])
          to_item.is_disabled = true;
        }
        break;
      case 'ONE_TO_ABLE':
        if (fromItem.quantity === 1 ){
          log(['propagateItemQuantityChange', 'ONE_TO_ABLE', to_item.item_id])
          to_item.is_disabled = false;
        }
        break;
      default:
        break;
      }
      if (needCalc){
        calcItemCost(to_item);
      }
    }
  });
}

/**
* Itemオブジェクトをitem_idで検索する
* @param item_id
* @return Item | null
*/
const itemById = (item_id: string): Item | null => {
  var target = null
  if(userSelection.value.category){
    userSelection.value.category.processes.forEach((process) => {
    process.items.forEach((item) => {
      if (item.item_id === item_id){
        target = item
      }
    })
  })
  }
  return target
};

const onClickOpenMail = (): void => {
  const url = mailToComputed.value;
  window.open(url, '_blank');
};
const onClickOpenPdfEstimate = (): void => {
  viewState.value.isShowPrintContent = true
};
const onClickClosePdfEstimate = (): void => {
  viewState.value.isShowPrintContent = false
};
const version = (): string => {
  return initData.value.jsonData ? initData.value.jsonData.version : ''
}

const baseCostComputed = computed((): number => {
  let sum = 0
  if (userSelection.value.category){
    userSelection.value.category.processes.filter(process => process.base).forEach((process, i) => {
      process.items.forEach((item, j) => {
        if (item.type !== 'dependence'){
          sum += item.cost
        }
      });
    });
  }
  return sum
});
const baseProcessNameComputed = computed((): string => {
  let s: string = '';
  if (userSelection.value.category){
    const filteredProcesses = userSelection.value.category.processes.filter(process => process.base === true);
    filteredProcesses.forEach((process) => {
      s += process.name + ',';
    });
    if (s.slice(-1) === ','){
      s = s.slice(0, -1);
    }
  }
  return s;
});
const categoriesComputed = computed((): Category[] => {
  return initData.value.jsonData ? initData.value.jsonData.categories : []
});
const processesComputed = computed((): Process[] => {
  return userSelection.value.category ? userSelection.value.category.processes : []
});
const allCostComputed = computed((): number => {
  let sum = 0
  if (userSelection.value.category){
    userSelection.value.category.processes.forEach((process, i) => {
      process.items.forEach((item, j) => {
        sum += item.cost
      });
    });
  }
  return sum
});
const selectedItemsComputed = computed((): Item[] => {
  if (!userSelection.value.category){ 
    return []
  }
  let arr: Item[] = []
  userSelection.value.category.processes.forEach((process, i) => {
    process.items.forEach((item, j) => {
      if (item.quantity !== 0){
        arr.push(item)
      }
    });
  });
  return arr
});
const mailItemComputed = computed((): string => {
  if (!userSelection.value.category){ 
    return ''
  }
  let text = ''
  userSelection.value.category.processes.forEach((process, i) => {
    process.items.forEach((item, j) => {
      if (item.quantity !== 0){
        text += item.name + ',' + item.quantity + ',' + item.cost + ',' + '%0D%0A'
      }
    });
  });
  return text
});

const mailToComputed = computed((): string => {
  const TO = ownerSetting.value.ownerEmail
  const SUBJECT = '見積もりシミュレーターより'
  let text = 'mailto:'
  text += TO
  text += '?subject='
  text += SUBJECT
  text += '&body='
  text += 'お問合せ内容の記載をお願いします。'
  text += '%0D%0A'
  text += '(※●ご相談内容 ●お見積もり対象 ●ご予算 ●担当者様所属・氏名 等)'
  text += '%0D%0A'
  text += '%0D%0A'
  if ((!initData.value.jsonData)||(!userSelection.value.category)||(!userSelection.value.categoryIndex)){
    return text
  }
  console.log(userSelection.value.categoryIndex)
  text += '%0D%0A'
  text += 'カテゴリー:' + initData.value.jsonData.categories[userSelection.value.categoryIndex].name
  text += '%0D%0A'
  text += '項目:'
  text += '%0D%0A'
  text += mailItemComputed.value
  text += '%0D%0A'
  text += '概算お見積り金額(税抜):' + money(allCostComputed.value)
  return text
});

</script>

<template>
  <Loading v-show="viewState.isUseLoading" :isLoading="viewState.isLoading" />
  <div v-show="!viewState.isLoading" class="mv-fadein">
    <EstimateTitle v-if="initData.jsonData" :title="initData.jsonData.title" :description="initData.jsonData.description"/>
    <div id="mv-process-head"></div>
    <SelectCategory 
      :categorySelectTitle="viewSetting.categorySelectTitle"
      :categories="categoriesComputed" 
      v-model:modelValue="userSelection.categoryIndex" 
      @onChangeCategoryParent="onChangeCategory"/>
    <div v-if="userSelection.category !== null" class="mv-fadein mv-print-none">
      <div class="mv-sticky-area">
        <SelectProsess
        :processes = "processesComputed"
        :processIndex = "userSelection.processIndex"
        :prosessColors = "viewSetting.prosessColors"
        @onClickProcessParent = "onClickProcess"
        />
        <div class="mv-sticky-items-wrapper">
          <div class="mv-space"></div>
          <TotalAmountOneLine :allCostComputed="allCostComputed" />
        </div>
      </div>
      <SelectItem 
        :itemBackColor = "viewSetting.itemBackColor"
        :partsColor = "viewSetting.partsColor"
        :items = "userSelection.category.processes[userSelection.processIndex].items"
        :baseProcessNameComputed = "baseProcessNameComputed"
        :baseCostComputed = "baseCostComputed"
        @onChangeItemParent = "onChangeItem"
      />
    </div>
    <Terms v-if="initData.jsonData && initData.jsonData.terms_html && viewState.isUseTerms" :termsHtml="initData.jsonData.terms_html" />
    <TermsConfirmationCheck v-if="viewState.isUseTermsConfirmationCheck" :partsColor = "viewSetting.partsColor" v-model="viewState.isCheckedTerms"/>
    <span v-if="viewState.isUseEmailEstimate">
      <span v-if="viewState.isUseTermsConfirmationCheck">
        <EstimateButton @click="onClickOpenMail" text="お問合せ(メール)" :abled="viewState.isCheckedTerms" :partsColor = "viewSetting.partsColor"/>
      </span>
      <span v-else>
        <EstimateButton @click="onClickOpenMail" text="お問合せ(メール)" :partsColor = "viewSetting.partsColor"/>
      </span>
    </span>

    <span v-if="viewState.isUsePdfEstimate" class="mv-sp-pdf-none">
      <span v-if="viewState.isUseTermsConfirmationCheck">
        <EstimateButton @click="onClickOpenPdfEstimate" text="見積もり書出力" :abled="viewState.isCheckedTerms" :partsColor = "viewSetting.partsColor"/>
      </span>
      <span v-else>
        <EstimateButton @click="onClickOpenPdfEstimate" text="見積もり書出力" :partsColor = "viewSetting.partsColor"/>
      </span>
    </span>

    <span v-if="(!viewState.isUseTermsConfirmationCheck || viewState.isCheckedTerms) && viewState.isUsePdfEstimate && viewState.isUsePdfEstimateMetaField">
      <PdfEstimateMetaField 
        v-model:partnerName="userInput.partnerName"
        v-model:ownerCompanyName="ownerSetting.ownerCompanyName"
        v-model:ownerCompanyAddress="ownerSetting.ownerCompanyAddress"
      />
    </span>
  </div>
  <PdfEstimate 
    v-show="viewState.isShowPrintContent"
    :partsColor = "viewSetting.partsColor"
    :partnerName="userInput.partnerName"
    :ownerCompanyName="ownerSetting.ownerCompanyName"
    :ownerCompanyAddress="ownerSetting.ownerCompanyAddress"
    :allCostComputed="allCostComputed"
    :selectedItemsComputed="selectedItemsComputed"
    :baseCostComputed = "baseCostComputed"
    @onClickClosePdfEstimate="onClickClosePdfEstimate"
  />
</template>



<style lang="scss">
@import './assets/ress.css';

#mitsumori-vue-app{
  background-color: rgb(255, 255, 255);
  font-family: "游ゴシック", YuGothic, sans-serif;
  font-weight: 500;
  font-style: normal;
  padding: 0.5rem;
}
.mv-sticky-area{
  position: -webkit-sticky;
  position: sticky;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 1;
  top: 0;
}
.mv-sticky-items-wrapper{
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
}
.mv-space{
  width: 1rem;
  height: 1rem;
}
.mv-fadein{
  animation-name: mv-fadein;
  animation-duration: 0.3s;
}
@keyframes mv-fadein{
  from{
  opacity: 0;
  transform: translatey(5px);
  }
  to{
  opacity: 1;
  transform: translatey(0);
  }
}

.mv-cost-display {
  font-family:'Times New Roman', Times, serif;
  letter-spacing: 0.1rem;
}

.mv-text-end{
  text-align: end;
}

.mv-pl{
  padding-left: 0.5rem;
}
.mv-pr{
  padding-right: 0.5rem;
}

@media print {
  .mv-print-none{
    display: none;
  }
}

@media (max-width: 210mm) {
  .mv-sp-pdf-none{
    display: none;
  }
}
</style>
