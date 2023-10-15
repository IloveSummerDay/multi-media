<script setup>
import TopNavBar from "../components/TopNavigationBar.vue";

</script>

<template>
    <div class="bg">
        <!-- 顶级nav -->
        <TopNavBar :nav-index="1" />

        <!-- 次级nav  TimeAxes 与 SecondNavBar 切换-->
        <router-view name="TimeAxes"></router-view>
        <router-view name="SecondNav"></router-view>

        <!-- HistoryStaticUI 与 KnowMoreHistory 切换-->
        <router-view name="KnowMoreHistory"></router-view>
        <router-view name="HistoryStaticUI"></router-view>
        <router-view name="PassLevel"></router-view>
    </div>
</template>

<style scoped>
.bg {
    background-color: rgba(126, 185, 207, 1);
    width: 100%;
    height: 100%;
    position: relative;
}
</style>