<script setup>
import TopNavBar from "../components/TopNavigationBar.vue";

</script>

<template>
    <div class="bg">
        <!-- 顶级nav -->
        <TopNavBar :nav-index="4"/>

        <!-- 次级Nav -->
        <router-view></router-view>
        
        <!-- center UI -->
        <router-view name="AccountInformation"></router-view>
        <router-view name="StuChart"></router-view>
    </div>
    
</template>

<style scoped>
.bg{
    background-color: rgba(126, 185, 207, 1);
    width: 100%;
    height: 100%;
    position: relative;
}
</style>