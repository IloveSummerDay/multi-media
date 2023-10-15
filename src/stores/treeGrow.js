import { defineStore } from 'pinia'
export const useTreeGrowStore = defineStore('treeGrow', {
  state: () => {
    return {
      growthProgress: 10, // 其他组件 修改 这个state
      growthTimeList: []
    }
  },
  getters: {
    // 用于动画切换 判断依据
    treeProgress(state) {
      return state.growthProgress / 10
    }
  },
  actions: {
    addGrowthProgress() {
      this.growthProgress += 10
    },
    addGrowthTimeList(time) {
      this.growthTimeList.push(time)
    }
  }
})