<template>
    <div class="input">

        <textarea placeholder="快来参与班级讨论吧！" class="input-area" v-model="textInput"
         @keydown.enter.prevent="submit">
            
        </textarea>

        <img src="../../img/SVG/交互式按钮_发送.svg" alt="" class="plane-icon" @click="submit">
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useTextChatStore } from '../../stores/textSend_chat'
const textInput = ref(null) // 输入框文字 双向绑定
const textChatStore = useTextChatStore()

const submit = (event) => {
    if (!textInput.value) {
        confirm('请输入文字！')
        return
    }
    textChatStore.changeText(textInput.value)
    textInput.value = '' // 清空聊天框

}
</script>
<style scoped>
.input {
    width: 100%;
    height: 30%;
    position: relative;
    background-color: #D1EBE3;
}

.input-area {
    width: 95%;
    height: 75%;
    outline: none;
    background-color: #AED6CA;
    appearance: none;
    border: none;
    resize: none;
    margin-left: 50%;
    transform: translateX(-50%);
    margin-top: 15px;
    border-radius: 10px;
    padding-top: 10px;
    padding-left: 1em;
    font-family: "黑体";
    font-size: 1rem;
}

.plane-icon {
    height: 50px;
    width: auto;
    position: absolute;
    bottom: 45%;
    right: 5%;
    transform: rotateZ(-45deg);
    cursor: pointer;
}
</style>