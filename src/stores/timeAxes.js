
import { defineStore } from 'pinia'

export const useTimeStore = defineStore('timeAxes', {
  state: () => {
    return {
      currentChooseTime: 1943,
      timeList: [1943], // 已经学习过哪些时间点
      progress: 0.05,
      timeTagIndex: 1
    }
  },
  getters: {

  },
  actions: {
    changeTime(value) {
      this.currentChooseTime = value
      console.log('【当前历史时间为】 ', this.currentChooseTime);
    },
    changeTimeList(val){
      this.timeList.push(val)
    },
    addProgress(){
      this.progress += 0.05
    },
    changeTimeTagIndex(bool = true){
      if(bool) this.timeTagIndex++
      else this.timeTagIndex = 0
    }
  }
})