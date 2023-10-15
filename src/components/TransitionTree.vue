<script setup>
import { ref } from 'vue'
import { useTreeGrowStore } from '../stores/treeGrow'
// ref
const treeGrowStore = useTreeGrowStore()

const treeGrow = () => {
    treeGrowStore.addGrowthProgress()
}
</script>

<template>
    <div class="tree-box">
        <div @click="treeGrow" class="treeGrowwBtn"></div>

        <p class="start-tip animate__animated animate__fadeInDown" v-if="treeGrowStore.treeProgress == 1">欢迎来到AI
            Imagination交互游戏式课件，<br>希望在这里，你可以收获满满！<br>学习知识越多，小树就会越茂盛哦<br>快来开启学习之旅吧！</p>

        <div class="soil">
            <Transition name="custom-classes" enter-active-class="animate__animated  animate__fadeIn"
                leave-active-class="animate__animated  animate__fadeOut" mode="out-in">
                <img src="../img/TreeUI/树1.svg" alt="" v-if="treeGrowStore.treeProgress == 1" class="tree-img"
                    style="height: 50%;">
                <img src="../img/TreeUI/树2@2x.png" alt="" v-else-if="treeGrowStore.treeProgress == 2" class="img2 tree-img">
                <img src="../img/TreeUI/树3.png" alt="" v-else-if="treeGrowStore.treeProgress == 3" class="tree-img">
                <img src="../img/TreeUI/树4.png" alt="" v-else-if="treeGrowStore.treeProgress == 4" class="tree-img">
                <img src="../img/TreeUI/树5.png" alt="" v-else-if="treeGrowStore.treeProgress == 5" class="tree-img">
                <img src="../img/TreeUI/树6.png" alt="" v-else-if="treeGrowStore.treeProgress == 6" class="tree-img">
                <img src="../img/TreeUI/树7.png" alt="" v-else-if="treeGrowStore.treeProgress == 7" class="tree-img">
                <img src="../img/TreeUI/树8.png" alt="" v-else-if="treeGrowStore.treeProgress == 8" class="tree-img">
                <img src="../img/TreeUI/树9.png" alt="" v-else-if="treeGrowStore.treeProgress == 9" class="tree-img">
                <img src="../img/TreeUI/树10.svg" alt="" v-else-if="treeGrowStore.treeProgress == 10" class="tree-img">
            </Transition>
        </div>
    </div>
</template>

<style>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.tree-box {
    width: 100%;
    height: 90%;
    position: relative;
    overflow: hidden;
    z-index: 10;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.start-tip {
    color: white;
    opacity: 0.8;
    font-size: 20px;
    position: absolute;
    top: 10%;
    text-align: center;
    line-height: 50px;
    user-select: none;
}

.soil {
    height: 100%;
    width: auto;
    position: absolute;
    bottom: -6%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.treeGrowwBtn {
    position: absolute;
    width: 300px;
    height: 300px;
    top: 40%;
    left: 10%;
}

button {
    position: absolute;
    top: 0;
    left: 0;
}

.tree-img {
    height: 100%;
    width: auto;
    object-fit: cover;
    position: absolute;
    bottom: -20px;

}</style>