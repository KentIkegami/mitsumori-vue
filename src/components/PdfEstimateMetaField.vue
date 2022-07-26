
<script lang="ts" setup>

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
  }
})

const emits = defineEmits<{
  (e: 'update:partnerName', text: string): void
  (e: 'update:ownerCompanyName', text: string): void
  (e: 'update:ownerCompanyAddress', text: string): void
}>();

const onInputTextPartnerName = (e: Event):void => {
  const target = e.target as HTMLInputElement;
  emits('update:partnerName', target.value);
}

const onInputTextOwnerCompanyName = (e: Event):void => {
  const target = e.target as HTMLInputElement;
  emits('update:ownerCompanyName', target.value);
}

const onInputTextOwnerCompanyAddress = (e: Event):void => {
  const target = e.target as HTMLInputElement;
  emits('update:ownerCompanyAddress', target.value);
}

</script>

<template>
  <div class="mv-meta-fields-wrapper">
    <label class="mv-label-partner">御中</label>
    <input class="mv-text-partner" type="text" :value="partnerName" @input="onInputTextPartnerName">
    <label class="mv-label-owner-name">見積もり発行元 社名</label>
    <input class="mv-text-owner-name" type="text" :value="ownerCompanyName" @input="onInputTextOwnerCompanyName">
    <label class="mv-label-owner-address">見積もり発行元 住所</label>
    <input class="mv-text-owner-address" type="text" :value="ownerCompanyAddress" @input="onInputTextOwnerCompanyAddress">
  </div>
</template>

<style scoped>
.mv-meta-fields-wrapper input[type="text"]{
  padding: 10px 10px; /*ボックスを大きくする*/
  font-size: 1rem;
  border-radius: 3px; /*ボックス角の丸み*/
  border: 2px solid #ddd; /*枠線*/
  box-sizing: border-box; 
}
.mv-meta-fields-wrapper label{
  display:flex;
  align-items: center;
}
.mv-meta-fields-wrapper{
  display: grid;
  grid-template:
    "... ......  ......  ..." 10px
    "... item1-l item1-r ..." auto
    "... ......  ......  ..." 10px
    "... item2-l item2-r ..." auto
    "... ......  ......  ..." 10px
    "... item3-l item3-r ..." auto
    "... ......  ......  ..." 10px
    /0px 1fr     3fr     0px;
}
.mv-label-partner{
  grid-area: item1-l;
}
.mv-text-partner{
  grid-area: item1-r;
}
.mv-label-owner-name{
  grid-area: item2-l;
}
.mv-text-owner-name{
  grid-area: item2-r;
}
.mv-label-owner-address{
  grid-area: item3-l;
}
.mv-text-owner-address{
  grid-area: item3-r;
}

@media (max-width: 750px) {
.mv-meta-fields-wrapper{
  display: grid;
  grid-template:
    "... ......  ..." 10px
    "... item1-l ..." auto
    "... item1-r ..." auto
    "... ......  ..." 10px
    "... item2-l ..." auto
    "... item2-r ..." auto
    "... ......  ..." 10px
    "... item3-l ..." auto
    "... item3-r ..." auto
    "... ......  ..." 10px
    /0px auto    0px;
  }
}

</style>
