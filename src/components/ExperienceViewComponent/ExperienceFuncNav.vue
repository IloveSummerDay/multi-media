<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// ref
const funcNav = ref(["文字识别", "物体识别", "AI聊天"])
const ref_func_nav_item = ref([])
const router = useRouter()
// function
function handleSwitchTime(event, index) {

    // event.target.className.split(" ") 类名数组
    if (event.target.className.split(" ").length == 1) {
        event.target.className += " click-time-line-item"
    }
    for (let i = 0; i < ref_func_nav_item.value.length; i++) {
        const element = ref_func_nav_item.value[i];
        if (element.className.split(" ").length == 2 && element != event.target) {
            element.className = "time-line-item"
        }
    }
    // 切换界面
    router.push({ path: `/experience/experience${index + 1}` })
}
</script>

<template>
    <div class="time-line-box">
        <div v-for="(item, index) in funcNav" :key="index" class="time-line-item"
            :class="index == 0 ? 'click-time-line-item' : ''" @click="handleSwitchTime($event, index)"
            ref="ref_func_nav_item">
            <!-- <img src="" alt="" srcset=""> -->
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
    width: 120px;
    height: 48px;
    line-height: 48px;
    font-size: 16px;
    border-radius: 30px;
    margin-right: 50px;
    text-align: center;
    color: whitesmoke;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
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

.nav-icon {
    margin-right: 5px;
}</style>