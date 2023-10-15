<script setup>
import { ref, watch, nextTick } from 'vue'
import { storeToRefs } from "pinia";
import { inputAppear } from "../../utils/gsap";
import { useAskTextStore } from "../../stores/textSend_ask";
// ref
const ref_box = ref(null)
const askTextStore = useAskTextStore()
const { questionsText } = storeToRefs(askTextStore)
const handleQuestion = () => {
    inputAppear()
}
watch(questionsText.value, () => {
    nextTick(() => {
        ref_box.value.scrollTo({
            top: ref_box.value.scrollHeight,
            behavior: "smooth",
        })
    })
})

</script>
<template>
    <div class="box" ref="ref_box">
        <div class="item" v-for="(item, index) in questionsText" :key="index" :class="{ 'first-item': index == 0 }">
            <img src="../../img/messagePageUI/ghost1.png" alt="" class="head">
            <p class="text"><span>{{ item }}</span></p>
        </div>

        <img src="../../img/SVG/提问 .svg" alt="" srcset="" class="question-img" @click="handleQuestion">
    </div>
</template>
<style scoped>
.box {
    width: 100%;
    height: 90%;
    background-color: #AFD7DB;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    position: relative;
    overflow: auto;
}

.item {
    width: 80%;
    height: auto;
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 10px;
}

.first-item {
    margin-top: 50px;
}

.head {
    height: 100%;
    width: auto;

}

.text {
    height: 100%;
    flex: 1;
    border-radius: 15px;
    background-color: #D1EBE3;
    margin-left: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    padding-left: 1em;
    padding-right: 1em;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    cursor: pointer;
}

.text:hover {
    background-color: #b1e4d5;
}

span {
    display: block;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.question-img {
    width: 5%;
    height: auto;
    position: fixed;
    top: 10%;
    right: 0%;
    transform: translateX(-50%);
    z-index: 100;
    cursor: pointer;
    background-color: #D1EBE3;
    border-radius: 10px;
}
.question-img:hover{
    background-color: #bfc;
}
</style>