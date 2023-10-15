<script setup>
import { ref, onBeforeMount } from "vue";
// ref
let isShowMes = ref(false)

onBeforeMount(() => {
  console.log("App.vue 发送请求 初始化仓库状态");
})
</script>

<template>
  <router-view></router-view>

  <!-- <svg @click="intoMessage" v-if="isShowMes" width="40" height="40" class="message-icon" viewBox="0 0 1024 1024"
    version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2330">
    <path
      d="M428.8 896.064a44.8 44.8 0 0 1-44.8-44.8 44.8 44.8 0 0 1 44.8-44.8h166.4a44.8 44.8 0 0 1 44.8 44.8 44.8 44.8 0 0 1-44.8 44.8z m371.2-128H172.8a44.8 44.8 0 0 1-44.8-44.8 44.8 44.8 0 0 1 44.8-44.8h51.2V451.84a256 256 0 0 1 155.2-235.456A144 144 0 0 1 512 128.064a144 144 0 0 1 132.864 88.384 256 256 0 0 1 155.2 235.456v226.624h51.2a44.8 44.8 0 0 1 44.8 44.8 44.8 44.8 0 0 1-44.8 44.8z m-89.6-89.6V451.84a166.4 166.4 0 0 0-100.928-153.024l-33.28-14.336-14.016-33.408a54.4 54.4 0 0 0-50.24-33.472 54.272 54.272 0 0 0-50.176 33.408l-14.144 33.472-33.28 14.336A166.4 166.4 0 0 0 313.472 451.84v226.624z"
      fill="#a7e8ee" fill-opacity="0.9" p-id="2331"></path>
  </svg> -->
</template>

<style scoped>
.message-icon {
  position: fixed;
  top: 4%;
  right: 10%;
}
</style>
