<script setup>
import { ref } from 'vue';
import axios from 'axios';
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
// ref
let imageData = ref([])
let res = ref(null)
res.value = '识别结果将在此显示~'
//function
const handleFileInput = (event) => {
    // const file = event.target.files[0]; // 获取所选的文件
    // if (file) {
    //     const reader = new FileReader();
    //     reader.readAsArrayBuffer(file);

    //     reader.onload = () => {
    //         imageData = reader.result; // 将图片数据存储在imageData变量中
    //         // 将图片以 Blob 对象形式添加到表单数据中 发给node后台
    //         const formData = new FormData();
    //         formData.append('image', new Blob([imageData], { type: file.type }));
    //         axios.post('http://localhost:8081/uploadObjImageData', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         }).then(response => {
    //             // 处理响应数据
    //             console.log('文字识别结果：', response.data); // 纯文字
    //             resText.value = response.data
    //         })
    //             .catch(error => {
    //                 // 处理错误
    //                 console.error(error);
    //             });
    //     };
    // }
    res.value = "这是一个意大利甜品——蛋奶冻"
    // 进行tip
    ElMessage({
        message: '提交成功！',
        type: 'success',
        offset: 100
    })
}

</script>

<template>
    <div class="func-box">

        <p class="intro-1 intro">深度学习的兴起使得文字识别取得了突破性的进展，如基于卷积神经网络（CNN）和循环神经网络（RNN）的方法。</p>
        <p class="intro-2 intro">2015年前后，Google发布了基于深度学习的OCR系统，推出了计算机视觉API，大幅提升了物体识别的准确性。</p>

        <div class="input-output">
            <el-button type="primary" round class="button">
                <input class="file-input" type="file" accept="image/jpeg, image/png, image/bmp"
                    @change="handleFileInput($event)">
            </el-button>
            <div class="output">
                {{ res }}
            </div>
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
    /* background-color: antiquewhite; */
}

.intro {
    color: white;
    opacity: 0.5;
    cursor: pointer;
    user-select: none;
    transition: opacity 0.3s ease-in-out;
}

.button {
    height: 350px;
    width: 50px;
    text-align: center;
    position: relative;
    /* display: flex;
    justify-content: center;
    align-items: center; */
}

.button::before {
    content: "请选择图片提交";
    display: inline-block;
    vertical-align: middle;
    letter-spacing: 20px;
    font-size: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    writing-mode: vertical-lr;

}

.file-input {
    width: 50px;
    height: 350px;
    border: none;
    outline: none;
    opacity: 0;
}

.input-output {
    width: 60%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.output {
    width: 50%;
    height: 80%;
    background-color: #98D5EB;
    box-shadow: -3px 3px 4px #64A9C2 inset;
    margin-left: 20px;
    border-radius: 50px;
    padding: 20px;
    text-wrap: wrap;
    color: white;
    opacity: 0.8;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 5px;
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
    color: white;
    border-radius: 10px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.intro:hover::after {
    background-color: #529EBA;
    opacity: 0.7;
}
</style>