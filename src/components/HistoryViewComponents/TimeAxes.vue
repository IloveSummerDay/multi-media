<script setup>
import { ref, onMounted, onBeforeMount } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";
import { useTimeStore } from '../../stores/timeAxes'


// ref
const timeLine = ["1943", "1950", "1956", "1957", "1966", "1980", "1997", "2011", "2016", '至今']
const ref_time_line_item = ref([])
const timeStore = useTimeStore()
const { currentChooseTime, timeList } = storeToRefs(timeStore)
let timeHighLightIndex = ref(null)
const router = useRouter()
const route = useRoute()
onBeforeMount(() => {
    if (Number(route.params.time) == 2023)
        timeHighLightIndex.value = 9
    else
        timeHighLightIndex.value = timeLine.indexOf(route.params.time)
})
onMounted(() => {
    console.log("【TimeAxes】 ", route.params, timeHighLightIndex.value);
})
// function
function handleSwitchTime(event) {
    const time = Number(event.target.innerText) || 2023
    // 改变 历史时间库中的 currentChooseTime
    timeStore.changeTime(time)
    // event.target.className.split(" ") 类名数组
    if (event.target.className.split(" ").length == 1) {
        event.target.className += " click-time-line-item"
    }
    for (let i = 0; i < ref_time_line_item.value.length; i++) {
        const element = ref_time_line_item.value[i];
        if (element.className.split(" ").length == 2 && element != event.target) {
            element.className = "time-line-item"
        }
    }
    // 切换界面
    router.push({
        path: `/history/${currentChooseTime.value}`,
    })

}
</script>

<template>
    <div class="time-line-box">
        <div v-for="(item, index) in timeLine" :key="index" class="time-line-item"
            :class="index == timeHighLightIndex ? 'click-time-line-item' : ''" @click="handleSwitchTime"
            ref="ref_time_line_item">
            {{ item }}
        </div>
    </div>
</template>

<style scoped>
.time-line-box {
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #6DAFC7;
}

.time-line-item {
    width: 100px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    border-radius: 30px;
    text-align: center;
    color: whitesmoke;
    cursor: pointer;
    user-select: none;
}

.click-time-line-item {
    background-color: whitesmoke !important;
    color: #6DAFC7;
    font-weight: 700;
}

.time-line-item:hover {
    background-color: white;
    color: #6DAFC7;
    font-weight: 700;
}
</style>