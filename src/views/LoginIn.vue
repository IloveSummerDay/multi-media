<script setup>
import RoundButton from "../components/RoundButton.vue";
import { ElRadioGroup } from 'element-plus'
import { ref } from 'vue'
import { useRouter } from "vue-router";
import axios from "axios";
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
const radio = ref("student") // student || teacher
const account = ref(undefined)
const password = ref(undefined)
const router = useRouter()

const handleLoginIn = () => {
    console.log("【登陆功能】", radio.value, account.value, password.value); // string

    // 验证是否允许登陆
    // axios.post('xxx', {
    //     radio: radio.value,
    //     account: account.value,
    //     password: password.value
    // }).then(res => {
    //     // 放行 且 进行存储

    // }, rej => {
    //     // 
    //     confirm("账号不存在, 请注册!")
    // })
    ElMessage({
        message: '登陆成功',
        type: 'success',
        offset: 100,
        duration: 2000
    })
    setTimeout(() => {
        router.push({
            path: '/home'
        })
    }, 3000)
}
const handleSignUp = () => {
    console.log("【注册功能】");
}
</script>

<template>
    <div class="bg">

        <div class="sign-up-board">
            <img src="../img//homeUI/小机器人头.png" alt="" class="robort-img">
            <p class="input-box">
                <input type="text" placeholder="账号" autocomplete="off" class="account-input" v-model="account">
                <img src="../img/homeUI/account.png" alt="" class="account-icon">
            </p>
            <p class="input-box">
                <input type="password" placeholder="密码" autocomplete="off" class="password-input" v-model="password">
                <img src="../img/homeUI/password.png" alt="" class="password-icon">
            </p>
            <!-- <div class="radio-box"> -->
            <el-radio-group v-model="radio" class="radio-box" id="identity_radio" name="identity">
                <el-radio label="student" size="large" name="identity">学生端</el-radio>
                <el-radio label="teacher" size="large" name="identity">教师端</el-radio>
            </el-radio-group>
            <!-- </div> -->

            <div class="button-box">
                <RoundButton text="登录" :width="200" backgroundColor="rgba(126, 185, 207, 1)" @click="handleLoginIn"
                    color="white" class="login-in-btn" />
                <RoundButton text="注册" :width="100" backgroundColor="white" @click="handleSignUp" color="black" />
            </div>

        </div>

        <img src="../img/LoginInUI/首页树.svg" class="tree">
        <img src="../img/LoginInUI/imagination.svg" class="imagination">
    </div>
</template>

<style scoped>

.bg {
    background-color: rgba(126, 185, 207, 1);
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

.sign-up-board {
    width: 30%;
    height: 380px;
    background-color: rgb(255, 255, 255);
    /* height: 300px; */
    border-radius: 30px;
    margin: 0 auto;
    position: absolute;
    top: 38%;
    left: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.robort-img {
    margin: 25px auto;
    margin-left: 50%;
    transform: translateX(-50%);
}
.account-icon,
.password-icon {
    width: 28px;
    height: 28px;
    position: absolute;
    right: 15px;
    top: 10px;
}
.account-input,
.password-input {
    width: 100%;
    height: 48px;
    border-radius: 10px;
    border: 1px solid rgba(126, 185, 207, 1);
    font-size: 15px;
    font-weight: 500;
    outline: none;
    text-indent: 10px;
    /* 设置文本缩进的距离 */
}
.account-input::placeholder,
.password-input::placeholder {
    text-indent: 10px;
    /* 调整占位符的缩进 */
}

.account-input {
    margin-bottom: 20px;
}
.password-input {
    margin-bottom: 20px;
}
.input-box {
    /* display: flex; */
    position: relative;
    width: 350px;
    margin: 0 auto;

}
input:focus {
    outline: 1px solid rgb(149, 149, 149);
}
.radio-box {
    width: 200px;
    margin: 0 auto;
    margin-bottom: 20px;
}
.button-box {
    width: 350px;
    margin: 0 auto;
    display: flex;
    margin-bottom: 30px;
}
.login-in-btn {
    margin-right: 20px;
}
.tree{
    width: 54%;
    height: auto;
    position: absolute;
    bottom: -9%;
    left: 0%;
}
.imagination{
    position: absolute;
    top: 8%;
    right: 4%;
    opacity: 0.5;
}
</style>
