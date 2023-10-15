import { useSelfStore } from '../stores/self'
import { useAskTextStore } from '../stores/textSend_ask'
// import { storeToRefs } from 'pinia'
import { pinia } from "../stores/createPinia";

const selfStore = useSelfStore(pinia)
const askTextStore = useAskTextStore(pinia)
let client = null                                       

export function ask_ws(askText) {
    
    if (!client || client.readyState == 2 || client.readyState == 3){
        client = new WebSocket('ws://localhost:8080/');
    }
    else {
        client.send(askText + `_${selfStore.name}`);
    }
// 连接 node
    client.onopen = (connection) => {
        console.log('已经连接ed_ws ws://localhost:8080/');
        // 发送消息
        client.send(askText + `_${selfStore.name}`);
    };

 // 接受回信
    client.onmessage = (message) => {
        console.log(`客户端接受到node的反馈 ask: ${message.data}`);
        // 接受到自己/其他人消息之后，渲染在自己的聊天框中 :// pinia useTextChatStore
        askTextStore.changeText(message.data.split("_")[0])
    };

    client.onclose = () => {
        console.log('连接已关闭',client.readyState);
    };
}



