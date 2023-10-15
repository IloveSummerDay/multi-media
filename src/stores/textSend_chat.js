import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useTextChatStore = defineStore('chat_text', {
  state:() =>{
    return {
      text: 'default value',
      otherMessage: {
        chatText: String,
        nickName: String
      }
    }
  },
  getters:{

  },
  actions: {
    changeText(text) {
      this.text = text
    },
    changeOtherMessage(otherMessage){
      this.otherMessage.chatText = otherMessage.chatText
      this.otherMessage.nickName = otherMessage.nickName
    }
  }
})