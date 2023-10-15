<script setup>
import { ref, defineProps, onMounted } from "vue";
import { storeToRefs } from "pinia";
import QuestionChoice from "./QuestionChoice.vue";
import { levelchoiceAway } from "../../utils/gsap";
import { useIsShowStore } from "../../stores/isShow";
// ref
const model = ref('easy')
const showStor = useIsShowStore()
const { isShowModelChoice } = storeToRefs(showStor)
defineProps({
    time: {
        type: String,
        require: true
    }
})
onMounted(() => {
    console.log('【答题闯关页面加载完成】 isShowModelChoice', isShowModelChoice.value);
})
const handleAnswer = (e, index) => {
    levelchoiceAway()
    if (index == 1) model.value = 'easy'
    else model.value = 'hard'

    console.log('【选择模式完成】', model.value);
    setTimeout(() => {
        showStor.changeShowModelChoice()
    }, 1500)
}
</script>


<template>
    <div class="passLevel-box">
        <div class="easy-item" @click="handleAnswer($event, 1)" v-show="isShowModelChoice">
            <div class="sheep-bg">
                <img src="../../img/historyUI/easyModel.svg" class="model-img">
            </div>
        </div>
        <div class="hard-item" @click="handleAnswer($event, 2)" v-show="isShowModelChoice">
            <div class="sheep-bg">
                <img src="../../img/historyUI/hardModel.svg.svg" class="model-img">
            </div>
        </div>

        <QuestionChoice :model="model" v-if="!isShowModelChoice" />

    </div>
</template>

<style scoped>
.passLevel-box {
    width: 90%;
    height: 70%;
    background-color: #ACD4E3;
    margin: 0 auto;
    margin-top: 45px;
    overflow: hidden;
    border: none;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.easy-item,
.hard-item {
    height: 100%;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
}

.easy-item {
    background-color: #D8F2DD;
}

.hard-item {
    background-color: #F2DED0;
}

.sheep-bg {
    width: 90%;
    height: 90%;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.easy-item .sheep-bg {
    background-color: #97D1A3;
}

.hard-item .sheep-bg {
    background-color: #E6AD87;
}

.model-img {
    width: 50%;
    height: auto;
}
</style>