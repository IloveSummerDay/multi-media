<script setup>
import { ref } from "vue";
import TopNavBar from "../components/TopNavigationBar.vue";
import  TransitionTree  from "../components/TransitionTree.vue";
import  EncourageTalk  from "../components/HomeViewComponent/EncourageTalk.vue";
import MessagePage from "./Message.vue";
import  ProgressBar  from "../components/HomeViewComponent/ProgressBar.vue";
// ref
</script>

<template>
    <div class="bg">
        <!-- 顶级nav -->
        <TopNavBar :nav-index="0"/>

        <!-- 激励话框 -->
        <EncourageTalk/>

        <!-- 进度条 -->
        <ProgressBar/>

        <!-- 树 -->
        <TransitionTree/>

        <!-- <MessagePage/> -->
    </div>
</template>

<style scoped>
.bg{
    background-color: rgba(126, 185, 207, 1);
    width: 100%;
    height: 100%;
    position: relative;
}

</style>