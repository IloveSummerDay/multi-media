import { useSelfStore } from '../stores/self'
import { useTextChatStore } from '../stores/textSend_chat'
// import { storeToRefs } from 'pinia'
import { pinia } from "../stores/createPinia";


const selfStore = useSelfStore(pinia)
const textChatStore = useTextChatStore(pinia)
export let client = null

export function chat_ws(chatText) {
    if (chatText == 1) {
        client = new WebSocket('ws://localhost:3000/');
    }
    else if (!client || client.readyState == 2 || client.readyState == 3) {
        client = new WebSocket('ws://localhost:3000/');
    }
    else {
        client.send(chatText + `_${selfStore.nickName}` + `_chat`);
    }
    // 连接 node
    client.onopen = (connection) => {
        console.log('已经连接chat_ws ws://localhost:3000/');
        // 发送消息
        if (chatText == 1) return
        client.send(chatText + `_${selfStore.nickName}` + `_chat`);
    };

    // 接受回信
    client.onmessage = (message) => {
        console.log(`客户端接受到node的反馈 class chat: ${message.data}`);
        let receiveMes = message.data.split('_') // 'text_name'
        // 接受到自己/其他人消息之后，渲染在自己的聊天框中 :// pinia useTextChatStore
        textChatStore.changeOtherMessage({
            chatText: receiveMes[0],
            nickName: receiveMes[1]
        })
    };

    client.onclose = () => {
        console.log('连接已关闭', client.readyState);
    };
}



