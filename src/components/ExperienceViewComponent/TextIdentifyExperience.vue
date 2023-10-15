<script setup>
import { ref } from 'vue';
import axios from 'axios';
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'
// ref
let imageData = ref([])
let resText = ref(null)
resText.value = '请提交图片以识别~'
//function
const handleFileInput = (event) => {
    const file = event.target.files[0]; // 获取所选的文件
    if (file) {
        const reader = new FileReader();
        // 使用readAsDataURL方法将文件转换为Base64编码的字符串
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
            imageData = reader.result; // 将图片数据存储在imageData变量中
            // 将图片以 Blob 对象形式添加到表单数据中 发给node后台
            const formData = new FormData();
            formData.append('image', new Blob([imageData], { type: file.type }));
            axios.post('http://localhost:8080/uploadTextImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(response => {
                // 处理响应数据
                console.log('文字识别结果：', response.data); // 纯文字
                resText.value = response.data
            })
                .catch(error => {
                    // 处理错误
                    console.error(error);
                });
        };
    }
    // .then() 进行tip
    ElMessage({
        message: '提交成功！',
        type: 'success',
        offset: 100
    })
}

</script>

<template>
    <div class="func-box">
        <p class="intro">机器学习技术开始流行，随着计算机性能的提升，出现了更加高效和准确的OCR系统，文字识别可以开始处理更大规模的文档，提高了文字识别系统的准确性和泛化能力</p>

        <el-button type="primary" round class="button">
            <input class="file-input" type="file" accept="image/jpeg, image/png, image/bmp"
                @change="handleFileInput($event)">
        </el-button>
        <div class="out-box">
            <div class="in-box">
                {{ resText }}
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
}

.button {
    width: 600px;
    height: 40px;
    text-align: center;
    position: relative;
}

.button::before {
    content: "请选择一张图片提交";
    display: inline-block;
    vertical-align: middle;
    letter-spacing: 20px;
    font-size: 20px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

}

.file-input {
    width: 600px;
    height: 40px;
    border: none;
    outline: none;
    opacity: 0;
}

.out-box {
    width: 50%;
    height: 60%;
    background-color: #FFE0E0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
}

.in-box {
    width: 93%;
    height: 80%;
    background-color: #529EBA;
    position: absolute;
    border-radius: 40px;
    padding: 20px;
    /* text-indent: 2em; */
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;
    opacity: 0.8;
    letter-spacing: 5px;
    box-shadow: -2px 2px 5px #295360 inset;
}

.intro {
    width: 50%;
    text-indent: 2em;
    line-height: 40px;
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
    padding-left: 5px;
    padding-right: 5px;
    color: border-rgb(255, 255, 255);
    border-radius: 10px;
    white-space: nowrap;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}

.intro:hover::after {
    background-color: #529EBA;
    opacity: 0.6;
}
</style>