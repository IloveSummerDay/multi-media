<template>
    <div class="message-BOX">

        <router-view name="MessageNavBar"></router-view>

        <router-view name="ClassChat"></router-view>
        <router-view name="Input"></router-view>

        <router-view name="ThemeDiscussion" @handle-start-discussion="handleInputAppear"></router-view>

        <router-view name="AskTeacher"></router-view>


        <router-view name="InputPlus"></router-view>

       
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { inputAppear } from "../utils/gsap";

// func
const handleInputAppear = () => {
    inputAppear()
}
</script>

<style scoped>
.message-BOX {
    border-radius: 10px;
    height: 100%;
    width: 100%;
    background-color: rgba(126, 185, 207, 1);
    margin-left: 50%;
    transform: translateX(-50%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.input-plus {
    bottom: -200px;
}
</style>