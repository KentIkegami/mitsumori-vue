import { createApp } from 'vue'
import App from './App.vue'

const SETTINGS = {
  url: './example.json',
  initCategoryIndex: 1,
  initProcessIndex: 0,
  debug: true,
  useLoading: true,
  useTerms: true,
  useTermsConfirmationCheck: true,
  useEmailEstimate: true,
  usePdfEstimate: true,
  usePdfEstimateMetaField: true,
  categorySelectTitle: '見積もりの種類',
  ownerCompanyName: '株式会社池上コーディング',
  ownerCompanyAddress: '東京都八王子市1-1-1',
  ownerEmail: 'it-mitsumori@example.com',
  prosessColors: [
    '#fe7d7d',
    '#fd9f68',
    '#fdb64f',
    '#ffc037',
    '#ffd137',
    '#ffe237',
    '#fff11e',
    '#fbff38',
    '#eaff38',
    '#d9ff38'
  ],
  partsColor: '#FFC338',
  itemBackColor: '#FFFFC2'
}

createApp(App, SETTINGS).mount('#mitsumori-vue-app')
