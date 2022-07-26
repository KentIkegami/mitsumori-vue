
<script lang="ts" setup>

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

</script>

<template>
  <div v-show="isLoading" class="mv-looping-rhombuses-spinner-wrapper">
    <div class="mv-looping-rhombuses-spinner">
      <div class="mv-rhombus"></div>
      <div class="mv-rhombus"></div>
      <div class="mv-rhombus"></div>
    </div>
  </div>
</template>

<style scoped>
/* ローディングstart */
/*https://www.benricho.org/loading_images/withCSS_04/19.html*/

.mv-looping-rhombuses-spinner-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}
.mv-looping-rhombuses-spinner, .mv-looping-rhombuses-spinner * {
  box-sizing: border-box;
}

.mv-looping-rhombuses-spinner {
  width: calc(15px * 4);
  height: 15px;
  position: relative;
}

.mv-looping-rhombuses-spinner .mv-rhombus {
  height: 25px;
  width: 25px;
  background-color: rgb(255, 136, 123);
  left: calc(25px * 4);
  position: absolute;
  margin: 0 auto;
  border-radius: 2px;
  transform: translateY(0) rotate(45deg) scale(0);
  animation: mv-looping-rhombuses-spinner-animation 2500ms linear infinite;
}

.mv-looping-rhombuses-spinner .mv-rhombus:nth-child(1) {
  animation-delay: calc(2500ms * 1 / -1.5);
}

.mv-looping-rhombuses-spinner .mv-rhombus:nth-child(2) {
  animation-delay: calc(2500ms * 2 / -1.5);
}

.mv-looping-rhombuses-spinner .mv-rhombus:nth-child(3) {
  animation-delay: calc(2500ms * 3 / -1.5);
}

@keyframes mv-looping-rhombuses-spinner-animation {
  0% {
    transform: translateX(0) rotate(45deg) scale(0);
  }
  50% {
    transform: translateX(-233%) rotate(45deg) scale(1);
  }
  100% {
    transform: translateX(-466%) rotate(45deg) scale(0);
  }
}
/* ローディングend */
</style>
