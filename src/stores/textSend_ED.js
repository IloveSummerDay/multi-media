
import { defineStore } from 'pinia'

export const useEDTextStore = defineStore('textSend_ED', {
  state: () => {
    return {
      name: 'name',
      // 相同索引为一组 ED
      Etext: ['人工智能的分类有哪些？_Jack', '机器学习是人工智能的一个重要分支，它是研究如何计算机系统使其能够自动学习和改进，而无需明确地进行编程的呢？_Zll'],
      Dtext: [
        ['它可以被分类为弱人工智能和强人工智能_Wuking', '弱人工智能旨在实现特定任务的智能，例如语音识别、图像识别和机器翻译等。_Lai', '强人工智能则追求像人类一样具有智能和理解能力。_Oos',],
        ['机器学习算法使用大量的数据作为输入。_John', '调整模型参数来发现规律和模式，并进行预测和决策。_Wuking']
      ],
      rawEText: undefined // 真实的评论
    }
  },
  getters: {
    
  },
  actions: {
    changeE(text_name){
      this.rawEText = text_name.split('_')[0]
      this.Etext.push(text_name)
      this.Dtext.push([])
    },
    changeD(text_name){
      this.rawEText = text_name.split('_')[0]
      this.Etext.push(text_name)
      this.Dtext.push([])
    }
  }
})