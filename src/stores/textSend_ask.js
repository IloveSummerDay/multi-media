import { defineStore } from 'pinia'

export const useAskTextStore = defineStore('textSend_ask', {
    state: () => {
        return {
            questionsText: ['人工智能和机器学习的区别是什么？', '人工智能是否能够替代人类工作？'],
            
        }
    },
    getters: {

    },
    actions: {
        changeQuestionList(value) {
            this.questionsText.push(value)
        }
    }
})