<script setup>
import { ref, watch, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useTextChatStore } from '../../stores/textSend_chat'
import { send_ws } from "../../utils/ws";
// ref
const textChatStore = useTextChatStore()
let { text, otherMessage } = storeToRefs(textChatStore)

const chatMessages = ref([]);

onMounted(() => {
    send_ws(1) // 首先连接
})
// 指令
const vScrollBottom = {
    updated: (el) => el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
    })
}
//  添加聊天块
const addChatMessage = (mes) => {
    chatMessages.value.push({
        nickName: mes.nickName,
        chatText: mes.chatText
    })
}
// 1、发送给node后台进行客户端分发 2、添加聊天块
watch(text, () => {
    // 这里有一个bug，输入相同文字消息，发不出去
    send_ws(text.value + '_chat')
})
// 2、添加聊天块  把自己消息经过一遍 node 再添加
watch(otherMessage, () => {
    console.log('添加聊天块 共享状态otherMessage/text改变');
    addChatMessage(otherMessage.value)
}, { deep: true })
</script>

<template>
    <div class="chat-container" v-scroll-bottom>

        <div class="chat-message-item" v-for="(message, index) in chatMessages" :key="index">
            <img src="../../img/messagePageUI/ghost1.png" alt="" class="head">
            <div class="chat-message-content-box">
                <p class="nick-name">{{ message.nickName }}</p>
                <span class="message">{{ message.chatText }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.chat-container {
    background-color: #AFD7DB;
    height: 65%;
    overflow-y: auto;
}

.chat-container::-webkit-scrollbar {
    width: 5px;
    /* 设置滚动条的宽度 */

}

.chat-container::-webkit-scrollbar-thumb {
    background-color: #D1EBE3;
    /* 设置滚动条的颜色 */
}

.chat-message-item {
    /* background-color: aquamarine; */
    position: relative;
    margin-top: 10px;
    margin-left: 20px;
    margin-bottom: 10px;
}

.head {
    width: 40px;
    position: absolute;
    top: 0;
    left: 0;
}

.chat-message-content-box {
    margin-left: 50px;
    margin-right: 100px;
    /* display: flex;
    flex-direction: column; */
}

.nick-name {
    user-select: none;
}

.message {
    /* background-color: beige; */
    background-color: #FFFFFF;
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
    font-family: "Arial";
    /* font-weight: 600; */
    display: inline-block !important;
    border: 1px solid #ccc;
}
</style>