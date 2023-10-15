import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useSelfStore = defineStore('self', {
    state: () => {
        return {
            name: 'student',
            nickName: "Hader",
            age: 18,
            grade: 0,
            rank: 5,
            account: 'admin',
            selfClass: '一班',
            teacher: '李老师',
            intro: '请来一句话介绍自己吧~'
        }
    },
    getters: {

    },
    actions: {
        changeName(newName) {
            this.name = newName
        },
        changeNickName(newName) {
            this.nickName = newName
        },
        changeAge(newAge) {
            this.name = newAge
        },
        changeAccountInfor(newAccount, newClass, newTeacher, newIntro) {
            this.account = newAccount
            this.selfClass = newClass
            this.teacher = newTeacher
            this.intro = newIntro
        },

    }
})