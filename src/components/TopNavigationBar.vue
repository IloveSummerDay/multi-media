<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useTimeStore } from "../stores/timeAxes";
// props
const props = defineProps({
    navIndex: {
        required: true,
        type: Number
    }
})
// ref
const nav = ref(["首页", "历史", "体验", "知识卡片", "个人中心"])
const navName = ["Home", "History", "Experience", "KnowledgeCard", "Center"]
const ref_nav_item = ref([])
const router = useRouter()
const timeAxesStore = useTimeStore()
const { currentChooseTime } = storeToRefs(timeAxesStore)
// func
const handleToTalk = () => {
    router.push({
        path: '/message/classChat'
    })
}
function handleSwitchFunc(event) {
    if (event.target.className.split(" ").length == 1) {
        event.target.className += " click-nav-item"
    }
    for (let i = 0; i < ref_nav_item.value.length; i++) {
        const element = ref_nav_item.value[i];
        if (element.className.split(" ").length == 2 && element != event.target) {
            element.className = "nav-item"
        }
    }

    // 切换路由
    const index = nav.value.indexOf(event.target.innerText)
    let routerConfig
    if (index == 2) {
        routerConfig = {
            path: '/experience/experience1',
        }
    }
    else if (index == 1) {
        routerConfig = {
            path: `/history/${currentChooseTime.value}`,
        }
    }
    else if (index == 4) {
        routerConfig = {
            path: `/center/account`,
        }
    }
    else {
        routerConfig = {
            name: `${navName[index]}`,
        }
    }
    router.push(routerConfig)

}
</script>

<template>
    <div class="nav">
        <div v-for="(item, index) in nav" :key="index" class="nav-item"
            :class="index == props.navIndex ? 'click-nav-item' : ''" @click="handleSwitchFunc" ref="ref_nav_item"
            :id="index === 3 || index === 4 ? 'adjust' : ''">
            {{ item }}
        </div>

        <div class="talk-btn" @click="handleToTalk">
            <p>班级群聊</p>
            <p>发起话题</p>
            <p>问问老师</p>
        </div>
    </div>
</template>

<style scoped>
.nav {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    /* background-color: aliceblue; */
}

.nav-item {
    width: 100px;
    height: 48px;
    line-height: 48px;
    border-radius: 30px;
    text-align: center;
    color: whitesmoke;
    cursor: pointer;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

#adjust {
    width: 120px;
}

.click-nav-item {
    background-color: whitesmoke !important;
    color: #6DAFC7;
    font-weight: 700;
}

.talk-btn {
    /* margin-top: 20px;
    margin-right: 10px; */
    width: 300px;
    height: 48px;
    border-radius: 50px;
    position: absolute;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    background-color: #bfc;
    display: flex;
    justify-content: center;
    align-items: center;
}
.talk-btn p{
    height: 48px;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
.talk-btn p:nth-child(1){
    background-color: #D1EBE3;
    border-radius: 50px 0 0 50px;
}
.talk-btn p:nth-child(2){
    background-color: #A0C4DB;
}
.talk-btn p:nth-child(3){
    background-color: #AFD7DB;
    border-radius: 0 50px 50px 0;
}.talk-btn p:nth-child(1):hover{
    background-color: #AED6CA;
}
.talk-btn p:nth-child(2):hover{
    background-color: #75A8C9;
}
.talk-btn p:nth-child(3):hover{
    background-color: #AED6CA;
}
</style>