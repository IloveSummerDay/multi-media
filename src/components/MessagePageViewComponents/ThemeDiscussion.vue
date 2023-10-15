<template>
    <div class="theme-discussion-box">
        <div class="start-discussion-btn" @click="$emit('handleStartDiscussion')">
            <img src="../../img/MessagePageUI/发起讨论.svg" alt="" class="nav-icon" style="width: 25px;">
            <span style="margin-left: 5px;user-select: none;">发起话题</span>
        </div>
        <div class="line"></div>

        <router-view></router-view> <!-- EvaluateAndDiscussion -->

    </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'


</script>

<style scoped>
.theme-discussion-box {
    width: 100%;
    height: 95%;
    background-color: #AFD7DB;
    position: relative;
    /* overflow: hidden; */
    cursor: pointer;
    /* background-color: azure; */
}

.start-discussion-btn {
    width: 120px;
    height: 40px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #81AECC;
    color: white;
    font-size: 16px;
    margin-top: 20px;
    margin-left: 25px;
}

.start-discussion-btn:hover {
    background-color: #1977ba;
}

.line {
    width: 95%;
    border: 1px solid #75A8C9;
    margin-left: auto;
    margin-right: auto;
    margin-top: 10px;
}

.theme-discussion-box::-webkit-scrollbar {
    width: 5px;
    /* 设置滚动条的宽度 */

}

.theme-discussion-box::-webkit-scrollbar-thumb {
    background-color: #5088AD;
    /* 设置滚动条的颜色 */
}

.theme-discussion-box::-webkit-scrollbar-track {
    background-color: #93B7CF;
}
</style>