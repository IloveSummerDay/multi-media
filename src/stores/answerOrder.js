import { defineStore } from 'pinia'

export const useAnswerOrderStore = defineStore('answerOrder', {
    state: () => {
        return {
            answerOrder: 0,
            correctSum: 0
        }
    },
    getters: {

    },
    actions: {
        changeOrder(val) {
            this.answerOrder = val
        },
        changeCorrectSum() {
            this.correctSum++
        },
        clearCorrectSum() {
            this.correctSum = 0
        },
        clearOrder() {
            this.answerOrder = 0
        }
    }
})