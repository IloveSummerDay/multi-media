<script setup>
import TopNavBar from "../components/TopNavigationBar.vue";
import ThreeKnowCard from "../components/KnowledgeCardViewComponent/ThreeKnowCard.vue";
</script>

<template>
    <div class="bg">
        <!-- 顶级nav -->
        <TopNavBar :nav-index="3" />

        <ThreeKnowCard/>
    </div>
</template>

<style scoped>
.bg {
    background-color: rgba(126, 185, 207, 1);
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    
}
</style>