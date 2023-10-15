<template>
    <div class="input-plus" :style="{ position: isAbsolute ? 'absolute' : 'relative' }">

        <textarea ref="ref_textarea" :placeholder="placeholder" class="input-area" v-model="textInput"
            @keydown.enter.exact.prevent="submit" @keydown.shift.enter.exact="nextHang"></textarea>
        <img src="../../img/SVG/交互式按钮_发送.svg" alt="" class="plane-icon" @click="submit">
        <img src="../../img/messagePageUI/气泡向下箭头.svg" class="cancel-icon" @click="handleCancelSend">
    </div>
</template>

<script setup>
import { ref, onMounted, onUpdated, watch } from "vue"
import { useRoute } from "vue-router"
import { send_ws } from "../../utils/ws";
import { inputAway, inputAway_immdely } from "../../utils/gsap"; // import 聊天框消失动画
const props = defineProps({
    isAbsolute: Boolean,
    ask: Boolean,
    placeholder: String
})
const textInput = ref(null) // 输入框文字 双向绑定
const ref_textarea = ref(null)
const route = useRoute()


onMounted(() => {
    console.log('【input plus 初始化】');
    inputAway_immdely()
})
onUpdated(() => {
    // console.log('【input plus 更新】');
    watch(
        () => route.path,
        (to, from) => {
            if (to !== from) {
                inputAway_immdely();
            }
        })
})
// 取消文本输入 input隐藏
const handleCancelSend = () => {
    inputAway()
    textInput.value = ''
}
// enter 提交
const submit = () => {
    // 无文字
    if (!textInput.value) {
        confirm('请输入文字！')
        return
    }
    // 有文字
    if (!props.ask) send_ws(textInput.value + '_e')
    else if (props.ask) send_ws(textInput.value + '_ask')
    textInput.value = ''  // 清空聊天框  
    inputAway()           // 聊天框消失动画
}
// shift + enter 换行
const nextHang = () => { }
</script>
<style scoped>
.input-plus {
    width: 100%;
    height: 200px;
    position: relative;
    bottom: 0;
    background-color: #D1EBE3;
    display: flex;
    justify-content: center;
    /* align-items: center; */
}

.input-area {
    width: 95%;
    height: auto;
    outline: none;
    background-color: #AED6CA;
    appearance: none;
    border: none;
    resize: none;
    margin-top: 15px;
    margin-bottom: 15px;
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
    bottom: 40%;
    right: 5%;
    transform: rotateZ(-45deg);
    cursor: pointer;
}

.cancel-icon {
    position: absolute;
    height: 50px;
    width: auto;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
}
</style>