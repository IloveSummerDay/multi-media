<template>
  <div class="turnpage-box">
    <div id="turnpage" class="turnpage">

      <div v-for="(item, index) in imagesList" :key="index" class="turnpage-item" :style="{
        backgroundColor: 'white',
        height: '400px',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain',
      }">
        <img :src='item' alt="" srcset="" style="
          width: 90%;
          height: 90%;
          position: absolute;
        ">
        <!-- 翻页tip -->
        <div v-if="index % 2 == 0" class="slide-tip"></div>
      </div>

    </div>

    <!-- 首页 左边提示 -->
    <div class="left-tip">

    </div>
    <!-- 尾页 右边提示 -->
    <div class="right-tip">

    </div>

    <!-- 历史时间提醒 -->
    <p class="time" @click="handleBack">
      <img src="../../img/historyUI/向左箭头.svg" class="left-arrow" >
      {{ timeStore.currentChooseTime }}
    </p>
  </div>
</template>

<script setup>
import $ from 'jquery'
import '../../utils/turn.js'
import { useTimeStore } from "../../stores/timeAxes";
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

const router = useRouter()
const route = useRoute()
const timeStore = useTimeStore()
const time = Number(route.params.time)
const pages = {
  1943: 4, 1950: 4,
  1956: 4, 1957: 4,
  1966: 4, 1980: 4,
  1997: 4, 2011: 4,
  2016: 4, 2023: 4,
}
const imUrlTemplate = `/src/img/historical-IntroductionUI/${time}/${time}-1.svg`
const imagesURL = [`/src/img/historical-IntroductionUI/${time}/${time}-1.svg`,
`/src/img/historical-IntroductionUI/${time}/${time}-2.svg`,
`/src/img/historical-IntroductionUI/${time}/${time}-3.svg`,
`/src/img/historical-IntroductionUI/${time}/${time}-4.svg`
]
const imagesList = ref([])

onMounted(async () => {
  await loadImages()
  nextTick(() => {
    onTurn()
  })

})
// 加载图片
const loadImages = async () => {
  await Promise.all(
    imagesURL.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          imagesList.value.push(url);
          // console.log('【图片url】', url);
          resolve();
        };
        img.onerror = () => {
          console.log('【图片找不到】');
          reject(false);
        };
      });
    })
  );
};
const handleBack = () => {
  // console.log('【路由回退到 历史 首页】',);
  router.back()
}
// 添加 翻页 效果
const onTurn = () => {
  $('#turnpage').turn({
    acceleration: true, //启用硬件加速,移动端有效
    display: 'double', //显示：single=单页，double=双页，默认双页
    duration: 800, // 翻页撒开鼠标，页面的延迟
    page: 1, // 默认显示第几页					
    gradients: true, // 折叠处的光泽渐变，主要体现翻页的立体感、真实感
    autoCenter: true, //
    turnCorners: 'bl,br', // 设置可翻页的页角(都试过了，乱写 4个角都能出发卷起)， bl,br   tl,tr   bl,tr 
    height: 400, //页面高度
    width: 1000 //翻书范围宽度，总宽度
  })
}

</script>

<style scoped>
.turnpage-box {
  width: 1000px;
  height: 400px;
  margin: 0 auto;
  margin-top: 100px;
  overflow: hidden;
  /* position: relative; */
  position: relative;
}

.turnpage {
  position: relative;
}

.turnpage-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.left-tip,
.right-tip {
  height: 100%;
  width: 50%;
  position: absolute;
  top: 0;
  z-index: -1;
}

.left-tip {
  left: 0;
  /* z-index: 0; */
}

.right-tip {
  right: 0;
  /* z-index: -1; */
}

.slide-tip {
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #8ACDE6;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  font-weight: bold;
  border-radius: 40px 0 0 0;
}

.time {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: white;
  opacity: 0.8;
  letter-spacing: 10px;
  cursor: pointer;
  user-select: none;

}
.left-arrow{
  width: 53px;
  height: auto;
  position: absolute;
  left: -70%;
  top: 0;
}
.time:hover, .left-arrow:hover{
  opacity: 1;
}</style>