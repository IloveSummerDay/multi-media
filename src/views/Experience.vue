<script setup>
import TopNavBar from "../components/TopNavigationBar.vue";
import ExperienceFuncNav from "../components/ExperienceViewComponent/ExperienceFuncNav.vue"
import { ref } from 'vue'
//ref

</script>

<template>
    <div class="bg">
        <!-- 顶级nav -->
        <TopNavBar :nav-index="2" />

        <ExperienceFuncNav />

        <!-- 功能模块组件出口 -->
        <router-view></router-view>


    </div> <!-- bg -->
</template>

<style scoped>
.bg {
    background-color: rgba(126, 185, 207, 1);
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.input-box {
    height: 40px;
    width: 800px;
    background-color: #98D5EB;
    box-shadow: 0px 2px 13px 5px rgba(82, 158, 186, 1);
    border: 3px solid rgba(126, 185, 207, 1);
    border-radius: 20px;
    display: flex;
    /* position: absolute; */
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    position: absolute;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
}

.writer-icon,
.sender-icon {
    height: 80%;
    width: auto;
    margin-left: 10px;
}

.sender-icon {
    transform: rotate(-45deg);
    transform-origin: 50% 50%;
}

.input {
    height: 100%;
    width: 99%;
    background-color: #98D5EB;
    border: none;
    text-indent: 20px;
}

.input:focus {
    outline: none;
}

.sender-box {
    height: 100%;
    width: 100px;
    background-color: white;
    border-radius: 20px;
    display: flex;
    justify-content: center;
}</style>