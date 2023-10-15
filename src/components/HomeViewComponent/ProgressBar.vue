<script setup>
import { gsap } from "gsap"
import { ref, onMounted, watch } from "vue";
import { useTreeGrowStore } from "../../stores/treeGrow";
import { addPrgressBar } from "../../utils/gsap";
import { storeToRefs } from "pinia";
const treeGrowStore = useTreeGrowStore()
const { growthProgress } = storeToRefs(treeGrowStore)
let allBubbles
onMounted(() => {
    allBubbles = document.getElementsByClassName('bubble')
    handleBubble(allBubbles)
    addPrgressBar(growthProgress.value)
})
// 【冒泡动画】
function handleBubble(allBubbles) {
    gsap.fromTo(allBubbles, {
        scale: 1.5,
        opacity: 1,
    },
        {
            duration: 2,
            repeatRefresh: true,
            stagger: {
                each: 0.5,
                repeat: -1
            },
            scale: 0.1,
            y: -100,
            opacity: 0,
        })
}

watch(growthProgress, (newVal, oldVal) => {
    console.log('【成长树成长】', growthProgress.value, newVal);
    addPrgressBar(newVal)
})
</script>

<template>
    <div class="progress-bar-box">
        <span>成长进度条</span>

        <div class="progress-bar-fill" :style="{
            // height: `${growthProgress}%`
        }">
            <div class="bubble-box">
                <img src="../../img/homeUI/bubble1.png" alt="" class="bubble" ref="ref_bubble">
                <img src="../../img/homeUI/bubble2.png" alt="" class="bubble" ref="ref_bubble">
                <img src="../../img/homeUI/bubble3.png" alt="" class="bubble" ref="ref_bubble">
            </div>
        </div>
    </div>
</template>

<style scoped>
.progress-bar-box {
    width: 3%;
    height: 75%;
    background-color: #BFDCE7;
    border-radius: 30px 30px 0 0;
    position: absolute;
    bottom: 0;
    right: 15%;
    overflow: hidden;
    display: flex;
    align-items: center;
    z-index: 100;
}

.progress-bar-fill {
    width: 100%;
    height: 0;
    background-color: #71E3C3;
    position: absolute;
    bottom: 0%;
    border-radius: 30px 30px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.progress-bar-box span {
    width: 100%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 10px;
    font-size: 20px;
    margin-top: 10px;
    letter-spacing: 20px;
    z-index: 100;
    user-select: none;
}

.bubble-box {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.bubble {
    position: absolute;
    top: 0;
}
</style>