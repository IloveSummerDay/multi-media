<script setup>
import { ref } from 'vue';
import axios from 'axios';

// ref
let inputText = ref(null)
let ref_res = ref(null)
const res = ref('深度学习是机器学习的一种特殊方法，它使用深层神经网络模型来学习数据的抽象表示和特征。深度学习在计算机视觉、自然语言处理和语音识别等领域取得了显著的成功，并成为推动人工智能发展的重要技术。')
//function
const handleSubmit = (event) => {
    console.log("【提交对话】");
    res.value = '深度学习是机器学习的一种特殊方法，它使用深层神经网络模型来学习数据的抽象表示和特征。深度学习在计算机视觉、自然语言处理和语音识别等领域取得了显著的成功，并成为推动人工智能发展的重要技术。'
    inputText.value = ''
    ref_res.value.style.opacity = '1'
}

</script>

<template>
    <div class="func-box">
        <div class="intro-box">
            <p class="intro-1 intro">1966年代：出现了基于知识库和专家系统的聊天工具，如PARRY和Mycin，这些系统可以进行更复杂的对话和问题回答。</p>
            <p class="intro-2 intro">1990年代：引入了统计和机器学习方法，使得聊天工具能够从大量的文本数据中学习，并生成更加智能和自然的回答。</p>
            <p class="intro-3 intro">
                2011年代：深度学习的兴起使得聊天工具取得了重大突破，如IBM的Watson和谷歌的ChatGPT，这些系统利用了深度神经网络和大规模预训练模型，具备了更高的智能和语义理解能力。</p>
            <p class="intro-4 intro">2020年：开放AI发布了名为GPT-3的预训练语言模型，它在聊天对话方面表现出色，可以实现自然且连贯的对话。</p>
        </div>

        <div class="dialog-box">
            <input type="text" v-model="inputText" @keydown.enter.exact.prevent="handleSubmit" placeholder="快来和AI交流吧~">
            <p class="res">
                <span ref="ref_res">{{ res }}</span>
            </p>
        </div>
    </div> <!-- bg -->
</template>

<style scoped>
.func-box {
    width: 100%;
    height: 70%;
    position: absolute;
    bottom: 5%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.intro-box {
    width: 75%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

}

.intro {
    text-align: center;
    text-wrap: wrap;
    margin-top: 20px;
    color: white;
    opacity: 0.5;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.3s ease-in-out;
}

.intro:hover {
    opacity: 1;
}

.intro::after {
    content: '前往历史页面学习';
    position: absolute;
    left: 45%;
    top: -40px;
    text-indent: 0;
    display: inline-block;
    padding: 5px;
    color: border-rgb(255, 255, 255);
    border-radius: 10px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.intro:hover::after {
    background-color: #529EBA;
    opacity: 0.8;
}
.dialog-box {
    width: 70%;
    height: 55%;
    position: relative;
    display: flex;
    justify-content: center;
}
input {
    width: 80%;
    height: 20%;
    background-color: #98D5EB;
    box-shadow: 0 0 10px #63A9C2;
    border-radius: 20px;
    position: absolute;
    bottom: 0;
    border: none;
    outline: none;
    padding-right: 20px;
    padding-left: 20px;
}
.res{
    width: 70%;
    height: 55%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-indent: 2em;
    color: white;
    opacity: 0.8;
    border-radius: 20px;
    background-color: #63A9C2;
    box-shadow: 3px 3px 5px #51889c;
}
.res span{
    opacity: 0;
    transition: opacity 2s ease-in-out;
}
</style>