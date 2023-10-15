<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useSelfStore } from "../../stores/self";
// ref
const selfStore = useSelfStore()
const { name, account, selfClass, teacher, intro } = storeToRefs(selfStore)

const ref_account = ref(null)
const ref_class = ref(null)
const ref_teacher = ref(null)
const ref_intro = ref(null)

// 保存
const storei = () => {
    console.log(ref_account.value, ref_class.value, ref_intro.value, ref_teacher.value);
    selfStore.changeAccountInfor(ref_account.value, ref_class.value, ref_teacher.value, ref_intro.value)
    ref_account.value = ref_class.value = ref_teacher.value = ref_intro.value = ''
}
</script>

<template>
    <div class="ai_bg">
        <div class="head">
            <img src="../../img/messagePageUI/ghost1.png" alt="">
            <span>{{ name }}</span>
        </div>
        <div class="account">
            <span>账号</span>
            <input type="text"  class="account_input" :placeholder="account" v-model="ref_account"/>
        </div>
        <div class="class">
            <span>班级</span>
            <input type="text"  class="account_input" :placeholder="selfClass" v-model="ref_class"/>
        </div>
        <div class="teacher">
            <span>教师</span>
            <input type="text"  class="account_input" :placeholder="teacher" v-model="ref_teacher"/>
        </div>
        <div class="intro">
            <textarea class="intro_input account_input" :placeholder="intro"
            v-model="ref_intro"></textarea>
        </div>

        <div class="btn">
            <div class="btn_target" @click="storei">
                保存
            </div>
        </div>
    </div>
</template>

<style scoped>
::-webkit-input-placeholder { /* Chrome, Safari, Opera */
    color: #000;
    font-weight: bold;
}
.ai_bg{
    width: 80%;
    background-color: #A2CDDD;
    height: 80%;
    margin: 0 auto;
    position: relative;
}
.head{
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;

}
.head img{
    margin-right: 50px;

}
.head span{
    color: black;
    font-size: 30px;
}
.account, .class, .teacher, .intro{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.intro{
    height: 20%;
    margin-top: 30px;
}

.account span, .class span, .teacher span{
    margin-right: 20px;
}
.account_input {
    width: 20%;
    height: 50%;
    outline: navajowhite;
    border: none;
    text-indent: 1rem;
    border-radius: 15px;
    font-size: 16px;
    background-color: #7EB9CF;
}
.intro_input{
    text-indent: 0;
    resize: none;
    width: 40%;
    height: 100%;
    padding-left: 20px;
    padding-top: 10px;  
    font-weight: bold;
}
.btn{
    width: 100%;
    height: 10%;
    position: absolute;
    bottom: 5%;
    display: flex;
    justify-content: center;
    align-items: center;

}
.btn_target{
    height: 100%;
    width: 10%;
    background-color: #7EB9CF;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    cursor: pointer;
}
.btn_target:hover{
    background-color: white;
}
</style>