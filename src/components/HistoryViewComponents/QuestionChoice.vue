<script setup>
import { ref, defineProps, onMounted, onBeforeMount, watch, watchEffect, nextTick } from "vue";
import { onBeforeRouteLeave } from "vue-router";
import { storeToRefs } from "pinia";
import { questionStore } from "../../text/QuestionStore";
import { useAnswerOrderStore } from "../../stores/answerOrder.js";
import { useTimeStore } from "../../stores/timeAxes";
import { useIsShowStore } from "../../stores/isShow";
import { useTreeGrowStore } from "../../stores/treeGrow";
import { levelchoiceAppear } from "../../utils/gsap";
import { ElMessage } from 'element-plus'
import 'element-plus/es/components/message/style/css'


// ref
const optionText = ref([])
const questionText = ref([])
let correctOption = null
const ref_option = ref(null)
const ref_order = ref(null)
const successRes = ref(false)
const failRes = ref(false)
const option = ['A', 'B', 'C', 'D']
const numberMapping = ['一', '二', '三', '四', '五', '六', '七']
let modelColor = ''
let timer = null
let order = ref(0)
let orderMax = ref(0)
const time = ref(30)
const timeStore = useTimeStore()
const answerOrderStore = useAnswerOrderStore()
const showStore = useIsShowStore()
const treeGrowStore = useTreeGrowStore()
const { currentChooseTime } = storeToRefs(timeStore)
const { answerOrder, correctSum } = storeToRefs(answerOrderStore)
const { growthTimeList } = storeToRefs(treeGrowStore)
// 对应年的题库 questions[第几题]  [问题]/[options集]/[正确答案index]
let questions = questionStore[`$${currentChooseTime.value}`]
questionText.value = questions[`$${order.value + 1}`]['question']
optionText.value = questions[`$${order.value + 1}`]['options']
correctOption = questions[`$${order.value + 1}`]['answer']
orderMax.value = questions['length']
// props
const props = defineProps({
    model: {
        type: String,
        default: 'easy',
        required: true
    },
})
onBeforeMount(() => {
    order.value = answerOrder.value
})
onBeforeRouteLeave((to, from) => {
    let reg = /\/history\/\d{4}\/learnMore/
    if (reg.test(to.path) && props.model == 'easy') {
        // 翻书查找
        answerOrderStore.changeOrder(order.value)
        console.log('【离开答题路由 easy】当前答对数', correctSum.value);
    }
    else if (reg.test(to.path) && props.model == 'hard') {
        // 困难模式跳转到课本
        console.log('【困难模式跳转到课本】',);
        let resp = window.confirm('你确定要离开吗？如果离开，则会清空答题进度哦！')
        if (resp) { // 离开
            hanldeLeave(true)
            answerOrderStore.clearOrder()
            answerOrderStore.clearCorrectSum()
            showStore.changeShowModelChoice()
            clearInterval(timer)
            console.log('【离开答题路由 hard】当前答对数', correctSum.value);
            return true
        } else {
            hanldeLeave(false)
            console.log('【不不不离开答题路由 hard】当前答对数', correctSum.value);
            return false
        }
    }
    else {
        // 答题跳转到其他路由！
        let resp = window.confirm('你确定要离开吗？如果离开，则会清空答题进度哦！')
        if (resp) { // 离开
            hanldeLeave(true)
            answerOrderStore.clearOrder()
            answerOrderStore.clearCorrectSum()
            showStore.changeShowModelChoice()
            clearInterval(timer)
            console.log('【离开答题路由 hard】当前答对数', correctSum.value);
            return true
        }
        else {
            hanldeLeave(false)
            console.log('【不不不离开翻页/答题路由】当前答对数', correctSum.value);
            return false
        }
    }

})

onMounted(() => {
    // questionText.value,optionText.value,correctOption.value
    console.log('【答题页面加载完成】 当前order 当前答对数', order.value, correctSum.value);
    if (props.model == 'easy') {
        // 简单模式
        modelColor = '#97D1A3'
        ref_order.value.style.backgroundColor = modelColor
        ref_option.value.forEach(element => {
            element.style.backgroundColor = modelColor
        });
    }
    else {
        modelColor = '#E6AD87'
        ref_option.value.forEach(element => {
            element.style.backgroundColor = modelColor
        });
        ref_order.value.style.backgroundColor = modelColor
        handleCutDown()
    }
})

// 紧绑定在 ABCD 圆球上
const handleSubmit = (e, index) => {
    // 判断选择是否正确
    if (index == correctOption) { // 选择正确
        e.target.style.backgroundColor = "#51D692"
        answerOrderStore.changeCorrectSum()
    }
    else {                        // 选择错误
        e.target.style.backgroundColor = "red"
    }
    setTimeout(() => {
        e.target.style.backgroundColor = modelColor
        if (!(orderMax.value - 1 == order.value)) {
            order.value++
            nextTick(() => {
                console.log(questions[`$${order.value + 1}`]);
                questionText.value = questions[`$${order.value + 1}`]['question']
                optionText.value = questions[`$${order.value + 1}`]['options']
                correctOption = questions[`$${order.value + 1}`]['answer']
                console.log('【下一题】order 该题正确答案索引：', order.value, correctOption);
            })
        }
        else if (timer) {
            time.value = 0
            clearInterval(timer)
            handleEnd()
        }
        else {
            handleEnd()
        }
    }, 1000)
    console.log('【已提交问题答案】');
}
const handleEnd = () => {
    // 结算 + 回到关卡选择
    if (correctSum.value == order.value + 1) {
        // 完全正确
        successRes.value = true
        ElMessage({
            message: '知识掌握得不错哦！',
            type: 'success',
            offset: 100
        })
        console.log('【成功出现】',);
    }
    else {
        failRes.value = true
        ElMessage({
            message: '下次再接再厉！',
            type: 'error',
            offset: 100
        })
        console.log('【失败出现】',);
    }
    if(props.model == "hard" && correctSum.value == order.value + 1 
    && !growthTimeList.value.includes(currentChooseTime.value)) {
        treeGrowStore.addGrowthTimeList(currentChooseTime.value)
    }
    answerOrderStore.clearCorrectSum()
    answerOrderStore.clearOrder()
    setTimeout(() => {
        showStore.changeShowModelChoice()
        levelchoiceAppear()
    }, 1000)
}
const handleCutDown = () => {
    timer = setInterval(function () {
        // 更新倒计时的值
        time.value--;
        // 如果倒计时为0，则停止定时器
        if (time.value == 0) {
            clearInterval(timer);
            handleEnd()
        }
    }, 1000);
}
// ElMessage
const hanldeLeave = (bool) => {
    if (bool) {
        ElMessage({
            type: 'success',
            message: '答题结束',
        })
    }
    else {
        ElMessage({
            type: 'info',
            message: '答题继续',
        })
    }
}
</script>


<template>
    <div class="question-box">
        <div class="left-box">
            <div class="question">
                <div class="order" ref="ref_order">题目{{ numberMapping[order] }}</div>
                <p class="question-text">{{ questionText }}</p>
            </div>

            <div v-for="(text, index) in optionText" :class="option[index]">
                <div class="option" @click="handleSubmit($event, index)" ref="ref_option">{{ option[index] }}</div>
                <p class="option-text">
                    {{ text }}
                </p>
            </div>
        </div>

        <!-- v-if="model == 'hard'" -->
        <div class="right-box" v-if="model == 'hard'">
            <div class="time-box">{{ time }}</div>
        </div>

        <div class="success" v-if="successRes">

        </div>
        <div class="fail" v-if="failRes">

        </div>
    </div>
</template>

<style scoped>
.question-box {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 10;
    overflow: hidden;
    display: flex;
}

.left-box {
    height: 100%;
    width: 75%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
}

.question {
    width: 70%;
    height: 15%;
    display: flex;
    align-items: center;
}

.A,
.B,
.C,
.D {
    width: 50%;
    height: 10%;
    display: flex;
    cursor: pointer;
}

.order {
    height: 80%;
    width: 130px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    color: white;
    margin-left: 20px;
}

.question-text {
    height: 100%;
    max-width: 550px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    margin-left: 20px;
}

.option {
    height: 50px;
    width: 50px;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    margin-right: 20px;

}

.option-text {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
}

.right-box {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.time-box {
    height: 216px;
    width: 216px;
    background-image: url(../../img/historyUI/计时板.svg);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
    color: #E6AD87;
}

.option:hover {
    background-color: white;
}

.success,
.fail {
    width: 128px;
    height: 128px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    background-image: url(../../img/historyUI/成功.svg);
}

.fail {
    background-image: url(../../img/historyUI/失败.svg);
}
</style>