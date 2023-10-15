<script setup>
/**
 * props @useTo : 0 - history /  1 - center /
 */
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useTimeStore } from "../stores/timeAxes";

// ref
const props = defineProps({
    secondNavList: {
        type: Array,
        required: true
    },
    useTo: {
        type: Number,
        required: true
    },
    itemHighLightIndex: {
        type: Number,
        default: 0
    },
})
const ref_second_nav_item = ref([])
const timeStore = useTimeStore()
const { currentChooseTime } = storeToRefs(timeStore)
const router = useRouter()
// function
function handleSwitchSecondNav(event, index) {
    // 点击提示
    if (event.target.className.split(" ").length == 1) {
        event.target.className += " click-nav-item"
    }
    for (let i = 0; i < ref_second_nav_item.value.length; i++) {
        const element = ref_second_nav_item.value[i];
        if (element.className.split(" ").length == 2 && element != event.target) {
            element.className = "second-nav-item"
        }
    }
    // 切换界面
    // history
    if (props.useTo == 0 && index == 1) {
        router.push({
            path: `/history/${currentChooseTime.value}/passLevel`
        })
    }
    else if (props.useTo == 0 && index == 0) {
        router.push({
            path: `/history/${currentChooseTime.value}/learnMore`
        })
    }
    // center
    else if (props.useTo == 1 && index == 0) {
        router.push({
            path: `/center/account`
        })
    }
    else if (props.useTo == 1 && index == 1) {
        router.push({
            path: `/center/learningData`
        })
    }
}
</script>

<template>
    <div class="second-nav-box">
        <div v-for="(item, index) in secondNavList" :key="index" class="second-nav-item"
            :class="index == itemHighLightIndex ? 'click-nav-item' : ''" @click="handleSwitchSecondNav($event, index)"
            ref="ref_second_nav_item">
            {{ item }}
        </div>
    </div>
</template>

<style scoped>
.second-nav-box {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #6DAFC7;
}

.second-nav-item {
    width: 100px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    font-weight: 500;
    border-radius: 30px;
    text-align: center;
    color: whitesmoke;
    cursor: pointer;
    margin-right: 20px;
}

.click-nav-item {
    background-color: whitesmoke !important;
    color: #6DAFC7;
    font-weight: 700;
}

.second-nav-item:hover {
    background-color: white;
    color: #6DAFC7;
    font-weight: 700;
}
</style>