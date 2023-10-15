<script setup>
import { useEDTextStore } from "../../stores/textSend_ED";
import { useSelfStore } from "../../stores/self";
import { storeToRefs } from "pinia";
import { ref, watch } from "vue";
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
import { send_ws } from "../../utils/ws";
// ref
const edTextStore = useEDTextStore()
const selfStore = useSelfStore()
const { Etext, Dtext, rawEText } = storeToRefs(edTextStore)
const { name } = storeToRefs(selfStore)
let shouldScrollBottom = ref({ enable: false }) // 大滚动条滚到
let dScrollBottomIndex = ref(null)  // 小滚动条 评论块

// function
// 评论发送函数
const handleDTextSend = (index, event) => {
    dScrollBottomIndex.value = index
    shouldScrollBottom.value.enable = false
    console.log('发送评论：', event.target.value);
    Dtext.value[index].push(event.target.value + '_' + name.value)
    event.target.value = ''
    send_ws(event.target.value + '_d')
    // 提示发布评论成功
    ElMessage({
        message: '发布评论成功！',
        type: 'success',
        offset: 100
    })
}
const handleShouldScrollBottom = (value) => {
    return value == dScrollBottomIndex.value
}
// 指令 v-scroll-bottom = { enable: Boolean }
const vScrollBottom = {
    updated: (el, binding) => {
        // console.log(el.scrollHeight, binding.value && binding.value.enable);
        if (binding.value.enable) { // 是否需要滚到底部
            el.scrollTo({
                top: el.scrollHeight,
                behavior: "smooth"
            })
        }
    }
}
// watch
// 话题发布后，滚动条滑倒最底部 + ElMessage提示框
watch(Etext.value, () => {
    // 将最外层盒子 滚动条置于最底部 用 v-scroll-bottom 实现
    // 提示发布话题成功
    shouldScrollBottom.value.enable = true
    ElMessage({
        message: '发布话题成功！',
        type: 'success',
        offset: 100
    })
})
</script>

<template>
    <div class="ED-scrollable-content" v-scroll-bottom="shouldScrollBottom">
        <!-- ED-box  高度写死，如果EText溢出，则另设置 话题详情卡片 -->
        <div class="ED-box" v-for="(item, index) in Etext" :key="index">
            <div class="E-item">
                <img src="../../img/messagePageUI/ghost1.png" class="head">
                <div class="E-content-box">
                    <p class="nick-name">{{ item.split('_')[1] }}</p>
                    <span class="E">{{ item.split('_')[0] }}</span>
                </div>

                <input type="text" @keydown.enter="handleDTextSend(index, $event)" class="input-box"
                    placeholder="发表你的看法吧.....">
            </div>

            <div class="D-item" v-scroll-bottom="{ enable: handleShouldScrollBottom(index) }">
                <div class="one-D-item" v-for="(d, dIndex) in Dtext[index]" :key="dIndex">
                    <img src="../../img/messagePageUI/ghost2.png" class="head head-D">
                    <div class="D-content-box">
                        <p class="nick-name nick-name-D">{{ d.split('_')[1] }}</p>
                        <span class="D">{{ d.split('_')[0] }}</span>
                    </div>
                </div>
            </div>
        </div> <!---->
    </div>
</template>

<style scoped>
.ED-scrollable-content {
    width: 95%;
    height: 85%;
    margin: 0 auto;
    margin-top: 10px;
    overflow: hidden !important;
    overflow-y: scroll !important;

}

.ED-scrollable-content::-webkit-scrollbar {
    width: 0;
    /* 设置滚动条的宽度 */
}

.ED-box {
    width: 100%;
    height: 225px;
    border-radius: 5px;
    background-color: #75A8C9;
    display: flex;
    padding-bottom: 20px;
    margin-bottom: 40px;
}

.E-item,
.D-item {
    /* background-color: aquamarine; */
    width: 45%;
    min-height: 150px;
    position: relative;
    margin-top: 20px;
    margin-left: 20px;
    padding-right: 20px;
    border-right: 1px solid white;
    /* background-color: #FFFFFF; */
}

.D-item {
    max-height: 300px;
    background-color: #A0C4DB;
    overflow-y: auto;
    border: none;
    padding-right: 0px;
    width: 47%;
    border-radius: 5px;
}

/*  一个人评论的盒子 */
.one-D-item {
    background-color: #A0C4DB;
    width: 96%;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    padding-bottom: 30px;
    border-bottom: 1px solid white;
}

.head {
    width: 40px;
    position: absolute;
    top: 15px;
    left: 0;

}

.head-D {
    width: 30px;
    left: 10px;
    top: 10px;
}

.E-content-box {

    margin-left: 50px;
    /* display: flex;
    flex-direction: column; */
}

.D-content-box {
    margin-left: 60px;
    padding-top: 10px;
}

.nick-name,
.E {
    user-select: none;
    color: whitesmoke;
    text-wrap: wrap;
}

.nick-name-D {
    margin-bottom: 10px;
    color: #808080;
    font-size: 16px;
}

.E,
.D {
    margin-top: 5px;
    /* background-color: beige; */
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
    font-family: "Arial";
    /* font-weight: 600; */
    display: inline-block;
    /* border: 1px solid #ccc; */
    letter-spacing: 2px;
    line-height: 22px;
    color: black;
}

.D {
    background-color: transparent;
    line-height: 22px;
    padding: 0px;
    font-size: 14px;
}

.input-box {
    width: 90%;
    height: 40px;
    outline: navajowhite;
    border: none;
    text-indent: 1rem;
    border-radius: 15px;
    font-size: 16px;
    background-color: #A0C4DB;
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
}

.D-item::-webkit-scrollbar {
    width: 5px;
    /* 设置滚动条的宽度 */

}

.D-item::-webkit-scrollbar-thumb {
    background-color: #5088AD;
    /* 设置滚动条的颜色 */
}

.D-item::-webkit-scrollbar-track {
    background-color: #93B7CF;
}
</style>