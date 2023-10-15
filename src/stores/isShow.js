import { defineStore } from 'pinia'

export const useIsShowStore = defineStore('isShow', {
    state: () => {
        return {
            isShowModelChoice: true
        }
    },
    getters: {

    },
    actions: {
       changeShowModelChoice(){
        this.isShowModelChoice = !this.isShowModelChoice
       },
       
    }
})