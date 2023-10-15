<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from "gsap"
import { storeToRefs } from "pinia";
import { MotionPathPlugin } from "gsap/MotionPathPlugin.js";
import { useTimeStore } from "../../stores/timeAxes";
import { txt_HistoryIntro, txt_title } from "../../text/HistoryIntroText";
gsap.registerPlugin(MotionPathPlugin);
// ref 
const timeStore = useTimeStore()
const router = useRouter()
const { currentChooseTime, timeList, progress, timeTagIndex } = storeToRefs(timeStore)
let tag = undefined
defineProps({
    time: {
        type: String,
        require: true
    }
})

// function
const handleKnowMore = () => {
    console.log("了解更多历史触发，页面跳转");
    // 了解更多 页面跳转
    router.push({
        path: `/history/${currentChooseTime.value}/learnMore`,
    })
}

// life Time 
onMounted(() => {
    console.log('【机器人位置初始化】', progress.value);
    gsap.to(".robort", {
        ease: "power1.inOut",
        duration: 1,
        motionPath: {
            path: "#road",
            align: "#road",
            alignOrigin: [0.5, 0.9], // [0.5, 0.9],
            autoRotate: false,
            start: progress.value,
            end: progress.value,
        }
    });
    tag = document.getElementsByClassName('road-tag' + timeTagIndex.value)[0]
    tag.style.opacity = 1
})

watch(currentChooseTime, () => { handleRobortMoveWithTime() })

// function
const handleRobortMoveWithTime = () => {
    if (timeList.value.includes(currentChooseTime.value)) return
    tag.style.opacity = 0.6
    console.log('【机器人前进！！！】机器人运动前进度记录： ', progress.value);
    gsap.to(".robort", {
        duration: 1,
        ease: "power1.inOut",
        motionPath: {
            path: "#road",
            align: "#road",
            alignOrigin: [0.5, 0.9],
            autoRotate: false,
            start: progress.value,
            end: () => progress.value + 0.05
        },
        onComplete: () => {
            timeStore.changeTimeList(currentChooseTime.value)
            timeStore.addProgress()
            timeStore.changeTimeTagIndex()
            tag = document.getElementsByClassName('road-tag' + timeTagIndex.value)[0]
            tag.style.opacity = 1
            console.log('【机器人前进！！！】机器人运动后进度记录：', progress.value, timeList.value);
        }
    });
}
</script>

<template>
    <div class="historyStaticUI-box">
        <div class="UI-container">
            <img src="../../img/historyUI/人工智能.png" alt="" class="rgzn-text">
            <img src="../../img/historyUI/new_road.png" alt="" class="road-img">
            <div class="title"> {{ txt_title[`$${time}`] }} </div>
            <div class="time">{{ currentChooseTime }}</div>
            <div class="content-box">
                <span>{{ txt_HistoryIntro[`$${time}`] }}</span>
                <p @click="handleKnowMore" style="cursor: pointer;">
                    <span>了解更多历史</span>
                    <svg t="1689146610386" class="icon" width="30" height="30" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1469">
                        <path
                            d="M518.144 971.434667a456.704 456.704 0 1 1 456.704-456.704 457.045333 457.045333 0 0 1-456.704 456.704z m0-845.141334a388.437333 388.437333 0 1 0 388.437333 388.437334A388.778667 388.778667 0 0 0 518.144 126.293333z"
                            fill="#ffffff" p-id="1470"></path>
                        <path
                            d="M443.733333 716.8a34.133333 34.133333 0 0 1-24.234666-9.898667 34.133333 34.133333 0 0 1 0-48.128l143.018666-143.018666-143.018666-143.018667a34.133333 34.133333 0 0 1 0-48.128 34.133333 34.133333 0 0 1 48.469333 0l166.912 166.912a34.133333 34.133333 0 0 1 9.898667 24.234667 34.133333 34.133333 0 0 1-9.898667 24.234666l-166.912 166.912A34.133333 34.133333 0 0 1 443.733333 716.8z"
                            fill="#ffffff" p-id="1471"></path>
                    </svg>
                </p>
            </div>
        </div>

        <!-- 路标 -->
        <img src="../../img/historyUI/开始 .svg" alt="" class="road-tag road-tag1" style="width: 50px;">
        <img src="../../img/historyUI/星星路标.svg" alt="" class="road-tag" :class="'road-tag' + (i + 1)" v-for="i in 8"
            :key="i">
        <img src="../../img/historyUI/结束.svg" alt="" class="road-tag road-tag10" style="width: 50px;">

        <!-- 作 SVG MotionPath 动画 -->
        <svg id="svg-road" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1571.53 612.68">
            <path id="road" class="cls-1"
                d="M1571.53,584.12l-464.5,21q-35.91,2-53.59,3-26.71,1.44-46.67,2.31-23,1-42.9,1.55-21.47.57-42.32.68-21.7.12-44.9-.25Q853.13,612,826,611.11q-26.91-.9-59.58-2.39-31.65-1.46-71.7-3.6-19.46-1-44.31-2.32-14.35-.74-44.55-2.26-47.28-2.4-70.33-3.61-38.8-2-69.07-3.8-36.3-2.11-66.68-4.2-34.1-2.35-63.15-4.81-37.86-3.23-74-7.27-34.68-3.89-66.89-8.44Q164.66,564,137,559.17q-26.9-4.71-49.5-9.67-22.2-4.87-39.27-9.75a256.61,256.61,0,0,1-28.1-9.51Q8.66,525.44,3.85,521a11.65,11.65,0,0,1-3.6-5.41,6.94,6.94,0,0,1-.11-3.23,7.62,7.62,0,0,1,1.32-3q7.73-10.68,28.76-25.6,19.29-13.68,50.07-31.16,28.15-16,66.25-35.37,34.19-17.39,77.06-37.82,19.05-9.09,42.62-18.35,20.64-8.1,45.52-16.66,20.38-7,45.81-15.05,10-3.15,22.2-6.93L401,315.88q13.77-4.22,20.29-6.24,10.74-3.33,18.67-5.85,19.33-6.18,31.09-10.56,13.64-5.1,20.28-9a24,24,0,0,0,4.95-3.55,5.91,5.91,0,0,0,.93-1.19,1,1,0,0,0,.14-.41,18.11,18.11,0,0,0-1.34-6.54,36.54,36.54,0,0,0-4.61-8.16q-7-9.65-21.77-21-16.43-12.65-42.06-27.1-27.94-15.75-66.47-33.46A325,325,0,0,0,319,167.31q-21-6.33-47.36-12-21.61-4.65-49.07-9.29-10.82-1.83-24.08-3.93-7.91-1.25-23.19-3.61-15.83-2.43-23.27-3.62-12.31-2-21.25-3.54-10.63-1.87-18.72-3.6-9-1.94-15.7-3.83a97,97,0,0,1-12.25-4.25,32.09,32.09,0,0,1-8.48-5.11,10.87,10.87,0,0,1-4-7.2q-.33-4,2.87-8.08,8.63-11,27-25.06,15.45-11.85,37.89-26,17.74-11.16,40.47-24.08,8.58-4.89,18.55-10.4,5.81-3.22,16-8.8l9.06-5,2.9,5.25q-2.68,1.49-9.08,5-10.15,5.57-16,8.78-9.93,5.52-18.48,10.37-22.6,12.87-40.24,24Q120.36,67.3,105.13,79,87.42,92.57,79.25,103a5.9,5.9,0,0,0-1.61,3.88,5.28,5.28,0,0,0,2,3.24q4.59,4.13,18.36,8.05,6.49,1.84,15.31,3.73,8,1.7,18.51,3.56Q140.71,127,153,129q7.44,1.18,23.24,3.62,15.3,2.35,23.22,3.61,13.29,2.1,24.14,3.94,27.58,4.68,49.33,9.34,26.54,5.7,47.83,12.09a333.51,333.51,0,0,1,42.91,15.84q38.75,17.81,66.9,33.68,26,14.67,42.78,27.58,15.48,11.91,23,22.25,7.09,9.78,7.09,18.22a8.35,8.35,0,0,1-2.8,5.81,29.73,29.73,0,0,1-6.21,4.54q-7.08,4.09-21.19,9.37-11.88,4.44-31.37,10.65-7.94,2.53-18.72,5.87-6.53,2-20.3,6.25l-21.27,6.54q-12.19,3.78-22.17,6.92-25.35,8-45.67,15-24.76,8.52-45.28,16.58-23.36,9.18-42.23,18.17-42.8,20.42-76.92,37.76-38,19.31-66,35.23-30.51,17.34-49.56,30.85Q13.47,503,6.32,512.88a1.78,1.78,0,0,0-.3.63,1.13,1.13,0,0,0,0,.51,3.49,3.49,0,0,0,.51,1,9.15,9.15,0,0,0,1.37,1.52,29.33,29.33,0,0,0,5.52,3.83,85.66,85.66,0,0,0,9,4.31A253.9,253.9,0,0,0,49.88,534q16.89,4.83,38.91,9.66,22.49,4.93,49.24,9.62,27.57,4.85,58.52,9.21,32.12,4.54,66.72,8.42,36.09,4,73.88,7.25,29,2.46,63.05,4.8,30.33,2.09,66.62,4.2,30.26,1.75,69,3.8,23,1.2,70.32,3.6l44.56,2.27q24.9,1.28,44.32,2.32,40,2.14,71.65,3.59,32.64,1.5,59.5,2.4,27.07.9,50.55,1.28,23.13.36,44.77.25,20.79-.1,42.19-.68,19.86-.54,42.8-1.54,19.92-.87,46.61-2.31,17.66-.95,53.64-3l464.5-21Z"
                transform="translate(0 0)" />
            <g id="rect">
                <path class="cls-2 robort"
                    d="M1283.68,531.05h-1.55c10.94,8.53,23.17,20.24,26,24.43,3.43,5.18-16.68.52-16.68,7.69,0,8.35,4.53,24.78,0,30.26s-18.24-8.21-25.15-8.21-20.35,14.07-24.89,8.47,0-22.29,0-30.52c0-7.45-18.07-5-14.36-10.25,2.71-3.87,13-14.16,22.5-21.95a22,22,0,0,1-17.79-11.88,10,10,0,0,1-2.46.3,10.39,10.39,0,1,1,0-20.78,10,10,0,0,1,2.46.3,22,22,0,0,1,19.6-12h32.36a22,22,0,0,1,19.6,12,10,10,0,0,1,2.46-.3,10.39,10.39,0,1,1,0,20.78,10,10,0,0,1-2.46-.3A22,22,0,0,1,1283.68,531.05Z"
                    transform="translate(0 0)" />
            </g>
        </svg>
        <!-- robort -->
        <img class="robort" src="../../img/historyUI/历史机器小人.png" alt="" srcset="">
    </div>
</template>

<style scoped>
@import '../../assets/position_road_tag.css';

.historyStaticUI-box {
    width: 100%;
    position: relative;
    height: 82%;
    overflow: hidden;
}

.UI-container {
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
    overflow: hidden;
    position: relative;
}

.rgzn-text {
    position: absolute;
    height: 40%;
    right: 8%;
    top: 15%;
    /* #CCF1FF */
}

.road-img {
    width: 100%;
    height: auto;
    position: absolute;
    left: 3%;
    top: 0%;
}

.title {
    display: inline-block;
    text-align: center;
    color: white;
    font-weight: bold;
    font-size: 36px;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
    position: absolute;
    top: 10%;
    left: 27%;
    z-index: 10;
}

.time {
    display: inline-block;
    /* width: 42px; */
    color: white;
    font-weight: bold;
    font-size: 35px;
    text-shadow: 3px 3px 5px rgba(0, 0, 0, 0.25);
    position: absolute;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    top: 35%;
    right: 5%;
    writing-mode: vertical-rl;
    text-orientation: upright;
    user-select: none;
}

.content-box {
    position: absolute;
    top: 15%;
    left: 40%;
    border-radius: 161px;
    background: rgba(141, 187, 204, 0.5);
    box-shadow: 0px 2px 15px 15px rgba(151, 203, 222, 1);
    width: 680px;
    height: 203px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.content-box>span {
    width: 80%;
    text-indent: 32px;
    line-height: 30px;
    letter-spacing: 8px;
    vertical-align: middle;
    color: white;
    font-weight: bold;
    user-select: none;
}

.content-box p {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 145px;
    left: 430px;
    height: 50px;
    border-color: aquamarine;
    color: #E0E0E0;
    font-weight: bold;
    cursor: pointer;

}

.content-box p span {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin-right: 5px;
}

.robort {
    width: 5%;
    height: auto;
    z-index: 100;
    opacity: 0.8;
}

#svg-road {
    width: 80%;
    position: absolute;
    top: 80px;
    left: 120px;
    overflow: visible;
    z-index: -1;
}

.road-tag {
    position: absolute;
    width: 140px;
    height: 140px;
    opacity: 0.6;
}

.cls-1 {
    fill: #9ad0e3;
    /* fill: #879093; */
}

.cls-2 {
    fill: #4dc1ff;
    fill-rule: evenodd;
}
</style>