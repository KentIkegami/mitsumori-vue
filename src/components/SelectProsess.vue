
<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Process } from '../types/Process'

const props = defineProps({
  processes: {
    type: Array as PropType<Process[]>,
    required: true
  },
  processIndex: {
    type: Number,
    required: true
  },
  prosessColors: {
    type: Array as PropType<String[]>,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'onClickProcessParent', index: number): void
}>();

const onClickProcessChild = (e: Event) => {
  const target = e.target as HTMLInputElement
  const index: number = Number(target.value)
  emits('onClickProcessParent', index)
}

const selectedColor = ():string => {
  return props.prosessColors[props.processIndex] as string;
}
</script>

<template>
  <div class="mv-processes-wrapper">
    <div v-for="(process, i) in processes" class="mv-process-btn-wrapper">
      <p class="mv-process-name">{{ process.name }}</p>
      <button 
        type="button" 
        class="mv-process-btn"
        @click="onClickProcessChild"
        :value="i"
        :style="{ 
          borderColor: prosessColors[i] as string, 
          backgroundColor: prosessColors[i] as string
        }"
        :class="{ active: processIndex === i }"
      >
        {{ i + 1 }}
      </button>
    </div>
  </div>
  <div class="mv-processes-wrapper-sp">
    <div v-for="(process, i) in processes">
      <button 
        type="button" 
        class="mv-process-btn-sp"
        @click="onClickProcessChild"
        :value="i"
        :style="{ borderColor: prosessColors[i] as string }"
        :class="{ active: processIndex === i }"
      >
        {{ process.name }}
      </button>
    </div>
  </div>
</template>

<style scoped>
/* プロセスボタン start */
.mv-processes-wrapper-sp{
  display: none;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;

}
.mv-processes-wrapper{
  display: flex;
  justify-content: space-around;
}

.mv-process-btn-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 4rem;
}

.mv-process-btn{
  width: 4rem;
  height: 4rem;
  color: white;
  border-radius: 50%;
  font-weight: 900;
  font-size: 2rem;
  border-style: solid;
  border-width: 5px;
  box-shadow: 1px 5px 0 rgba(136,136,136,1);
}

.mv-process-btn-sp{
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin-right: 0.5rem;
  border-radius: 4px;
  color: black;
  border-style: solid;
  border-width: 2px;
}
.mv-process-btn-sp.active {
  background-color: v-bind('selectedColor()');
}

.mv-process-name{
  white-space: nowrap;
}

.mv-process-btn.active {
  box-shadow: none;
}
@keyframes addShadow {
  from {
    filter: drop-shadow(0 0 0px rgba(255, 255, 255, 0));
  }
  to {
    /* transform: scale(1.05); */
    filter: drop-shadow(0px 5px 3px rgba(0, 0, 0, 0.5));
  }
}

@media (max-width: 500px) {
  .mv-processes-wrapper-sp{
    display: flex;
    justify-content: flex-start;
  }
  .mv-processes-wrapper{
    display: none;
  }
}
/* プロセスボタン end */
</style>
