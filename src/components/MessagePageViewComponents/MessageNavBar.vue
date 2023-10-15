<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
// props
const props = defineProps({
    navIndex: Number
})
// ref
const nav = ref(["班级群聊", "话题讨论", "问问老师"])
const _nav = ['classChat', 'ed', 'askTeacher']
const ref_nav_item = ref([])
const router = useRouter()


function handleSwitchFunc(event, index) {
    // 点击提示
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
    router.push({ path: `/message/${_nav[index]}` })
}
</script>

<template>
    <div class="nav">
        <div v-for="(item, index) in nav" :key="index" class="nav-item" :class="index == navIndex ? 'click-nav-item' : ''"
            @click="handleSwitchFunc($event, index)" ref="ref_nav_item">
            {{ item }}
        </div>
    </div>
</template>

<style scoped>
.nav {
    width: 100%;
    display: flex;
    /* justify-content: center; */
    background-color: #D1EBE3;
    margin-left: 50%;
    transform: translateX(-50%);
    border-radius: 10px 10px 0 0;
}

.nav-item {
    margin-right: 10px;
    width: 100px;
    height: 100%;
    line-height: 48px;
    text-align: center;
    color: #808080;
    cursor: pointer;
    border-radius: 10px 10px 0 0;
    user-select: none;
    /* 双击不会选中文字 */
}

.click-nav-item {
    background-color: whitesmoke !important;
    color: #383838;
    /* font-weight: 600; */
}
</style>