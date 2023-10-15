<script setup>
/**
 * （版本过旧）弃用：itemStyle.memphasis.label已弃用，请改用emphasis.loabel。 
 */
import * as echarts from 'echarts';
import { ref, onMounted } from "vue"
import { gsap } from "gsap";
import { storeToRefs } from "pinia";
import { useSelfStore } from "../../stores/self";
import { txt_title } from "../../text/HistoryIntroText";
// ref
const ref_bar_echart = ref(null)
const ref_ring_echart = ref(null)
const ref_smoothLine_echart = ref(null)
const ref_rank = ref(null)
const ref_rank_text = ref(null)
const selfStore = useSelfStore()
const { rank, name, grade } = storeToRefs(selfStore)
let barChart, ringChart, smoothLineChart
// function
const rankAnimation = () => {
    // 创建 分数上数 动画
    gsap.to(".rank", {
        duration: 1, // 动画持续时间，单位为秒
        ease: "power1.in",
        innerText: rank.value,
        snap: { innerHTML: 1 },
        onUpdate: function () {
            if (ref_rank_text.value)
                ref_rank_text.value.innerHTML = Math.floor(ref_rank_text.value.innerHTML); // 更新显示的整数
        }
    })
}
const handleCreateBarChart = () => {
    barChart = echarts.init(ref_bar_echart.value);
    barChart.setOption({
        dataset: {
            source: [
                ['accuracy', 'score', 'student'],
                [89.3, 51, `${txt_title[`$1943`]}`],
                [57.1, 75, `${txt_title[`$1950`]}`],
                [74.4, 42, `${txt_title[`$1956`]}`],
                [50.1, 15, `${txt_title[`$1957`]}`],
                [89.7, 25, `${txt_title[`$1966`]}`],
                [68.1, 76, `${txt_title[`$1980`]}`],
                [19.6, 92, `${txt_title[`$1997`]}`],
                [10.6, 66, `${txt_title[`$2011`]}`],
                [32.7, 22, `${txt_title[`$2023`]}`]
            ]
        },
        xAxis: {
            type: 'category',
            axisLabel: {
                interval: 0,
                rotate: 20,             // 根据需要调整旋转角度
                textStyle: {
                    color: 'white',     // 修改为自己想要的颜色
                },
            },

        },
        yAxis: {
            name: '答题分数/正确率',
            axisLabel: {
                fontSize: 15
            },
            nameTextStyle: {
                fontSize: 15,
                align: 'left'
            },
            splitLine: {
                lineStyle: {
                    color: '#707070' // 根据需要设置刻度线的颜色
                }
            },
        },
        series: [
            {
                type: 'bar',
                encode: {
                    // 将 "amount" 列映射到 X 轴。
                    x: 'student',
                    // 将 "product" 列映射到 Y 轴。
                    y: 'score'
                },
                itemStyle: {
                    normal: {
                        opacity: 0.8
                    },
                    emphasis: {
                        color: '#FF7F50',
                        opacity: 1,
                        label: {
                            show: true
                        }
                    }
                },
                label: {
                    show: false,
                    position: 'top', // 标签显示在条形的顶部
                    color: '#000',   // 标签的颜色
                    fontFamily: 'sans-serif',
                    fontWeight: 'bold',
                    fontSize: 12,    // 标签的字体大小
                    formatter: function (params) {
                        return params.value[1];
                    }
                }
            },

        ],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            },
            formatter: function (params) {
                let xAxisData = params[0].name;
                let yAxisData = params[0].data[params[0].encode.y[0]];
                return xAxisData + ": " + yAxisData;
            }
        },
    });
}
const handleCreateRingChart = () => {
    ringChart = echarts.init(ref_ring_echart.value);
    ringChart.setOption({
        title: {
            text: '学习进度',
            left: 'center',
            top: 'center'
        },
        series: [
            {
                type: 'pie',
                data: [
                    {
                        value: 5,
                        name: '未学'
                    },
                    {
                        value: 19,
                        name: '已学',
                    }
                ],
                radius: ['40%', '70%']
            }
        ]
    });
}
const handleCreateSmoothLineChart = () => {
    smoothLineChart = echarts.init(ref_smoothLine_echart.value);
    smoothLineChart.setOption({
        xAxis: {
            data: ['A', 'B', 'C', 'D', 'E']
        },
        yAxis: {
            name: '学习时长/知识等级',
        },
        series: [
            {
                data: [10, 22, 28, 23, 19],
                type: 'line',
                smooth: true
            }
        ]
    });
}
onMounted(() => {
    handleCreateBarChart()
    handleCreateRingChart()
    handleCreateSmoothLineChart()

    rankAnimation()
}) // onMounted

</script>
<template>
    <div class="echart-box">
        <div class="bar-echart" ref="ref_bar_echart"></div>

        <div class="ring-echart" ref="ref_ring_echart"></div>

        <div class="smoothLine-echart" ref="ref_smoothLine_echart"></div>

        <div class="rank-box" ref="ref_rank">
            <div class="rank-circle-box">
                <span class="rank-text">班级排名</span>
                <span class="rank" ref="ref_rank_text">1</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.echart-box {
    width: 80%;
    height: 70%;
    display: flex;
    flex-wrap: wrap;
    position: relative;
    left: 50%;
    transform: translateX(-45%);
    /* background-color: antiquewhite; */
}

.bar-echart,
.smoothLine-echart,
.ring-echart,
.rank-box {
    width: 50%;
    height: 50%;
}

.rank-box {
    /* background-color: #7EB9CF; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.rank-circle-box {
    background-color: #7EB9CF;
    height: 220px;
    width: 220px;
    border-radius: 50%;
    border: 2px solid rgb(255, 255, 255);
    position: relative;
}

.rank-text {
    color: white;
    position: absolute;
    top: 70%;
    transform: translateX(-50%);
    left: 50%;
}

.rank {
    position: absolute;
    top: 30%;
    transform: translateX(-50%);
    left: 50%;
    color: white;
    font-size: 50px;
    font-weight: bold;
}
</style>