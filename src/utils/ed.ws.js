import { useSelfStore } from '../stores/self'
import { useEDTextStore } from '../stores/textSend_ED'
import { storeToRefs } from 'pinia'
import { pinia } from "../stores/createPinia";
import { client } from "./chat.ws";

const selfStore = useSelfStore(pinia)
const { name } = storeToRefs(selfStore)
const edTextStore = useEDTextStore(pinia)

export function ed_ws(edText) {

    if (!client || client.readyState == 2 || client.readyState == 3) {
        client = new WebSocket('ws://localhost:3000/');
    }
    else {
        client.send(edText + `_${name.value}` + `_ed`);
    }
    // 连接 node
    client.onopen = (connection) => {
        console.log('已经连接ed_ws ws://localhost:3000/');
        // 发送消息
        client.send(edText + `_${name.value}` + '_ed');
    };

    // 接受回信
    client.onmessage = (message) => {
        console.log(`客户端接受到node的反馈 ed: ${message.data}`);
        // 接受到自己/其他人消息之后，渲染在自己的聊天框中
        edTextStore.changeAll(message.data) // 格式：text_name
    };

    client.onclose = () => {
        console.log('连接已关闭', client.readyState);
    };
}



