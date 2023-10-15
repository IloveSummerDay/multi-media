import { useSelfStore } from '../stores/self'
import { useTextChatStore } from '../stores/textSend_chat'
import { useEDTextStore } from '../stores/textSend_ED'
import { useAskTextStore } from '../stores/textSend_ask'
import { pinia } from "../stores/createPinia";
import { storeToRefs } from 'pinia'

let client = null
let list = null
let _id = ''
const selfStore = useSelfStore(pinia)
const textChatStore = useTextChatStore(pinia)
const askTextStore = useAskTextStore(pinia)
const { name, nickName, teacher } = storeToRefs(selfStore)
const edTextStore = useEDTextStore(pinia)
/**
 * 
 * @param sendContent  == 1 时，只需要连接node
 *  *********** sendContent *************
 *  * 1、class-chat   text + _chat      *
 *  * 2、ed           text + _id (e/d)  *
 *  * 3、ask-teacher  text + _ask       *
 *  *************************************
 */
export function send_ws(sendContent) {
    if (!client && sendContent == 1) client = new WebSocket('ws://localhost:3000/');
    if (typeof (sendContent) == 'string') {
        list = sendContent.split('_')
        _id = list[list.length - 1]
        if (_id == 'chat') send_chat(sendContent)
        else if (_id == 'e' || _id == 'd') send_ed(sendContent)
        else if (_id == 'ask') send_ask(sendContent)
    }

    // 【连接回调】 node
    client.onopen = (connection) => {
        console.log('【成功连接】已经连接chat_ws ws://localhost:3000/');
        // 发送消息
        if (sendContent == 1) return // 由于首先进入班级聊天界面 只需要先连接上node

        if (_id == 'chat') {
            client.send(list[0] + `_${nickName.value}` + `_chat`);
        }
        else if (_id == 'e') {
            client.send(list[0] + `_${name.value}` + '_e');
        }
        else if (_id == 'd') {
            client.send(list[0] + `_${name.value}` + '_d');
        }
        else if (_id == 'ask') {
            client.send(list[0] + `_${name.value}` + ` ${teacher.value}` + `_ask`);
        }

    };

    // 【接受回调】 回信格式：text_name_id
    client.onmessage = (message) => {
        console.log(`【客户端接受】： ${message.data}`);
        list = message.data.split('_')
        _id = list[list.length - 1]

        // 根据 _id 执行不同接受功能
        if (_id == 'chat') {
            // message.data 为 text+nickName+_id
            // 接受到自己/其他人消息之后，渲染在自己的聊天框中
            let receiveMes = message.data.split('_')
            textChatStore.changeOtherMessage({
                chatText: receiveMes[0],
                nickName: receiveMes[1]
            })
        }
        else if (_id == 'e') {
            // 分发给其他客户端 自己的话题
            let edList = message.data.split('_')
            edTextStore.changeE(edList.slice(0, 2).join('_')) // text+name字符串
        }
        else if (_id == 'd') {
            // 接受到自己/其他人消息之后，渲染在自己界面中
            // let edList = message.data.split('_')
            // edTextStore.changeAll(edList.slice(0, 2).join('')) // text+name字符串
        }
        else if (_id == 'ask') {
            // 将自己的问题添加到问题栏 
            // message.data 目前只返回'问题文本'+'_ask'
            askTextStore.changeQuestionList(message.data.split("_")[0])
        }
        _id = ''
    };

    // 【关闭回调】
    client.onclose = () => {
        console.log('【连接已关闭】', client.readyState);
    };
}


function send_chat(sendContent) {
    if (!client || client.readyState == 2 || client.readyState == 3) {
        client = new WebSocket('ws://localhost:3000/');
    }
    else {
        let chatText = sendContent.split('_')[0]
        client.send(chatText + `_${nickName.value}` + `_chat`);
    }
}

function send_ed(sendContent) {
    console.log(sendContent);
    let edText = sendContent.split('_')[0]
    let _id = sendContent.split('_')[1]
    if (!client || client.readyState == 2 || client.readyState == 3) {
        client = new WebSocket('ws://localhost:3000/');
    }
    else {
        client.send(edText + `_${name.value}` + `_${_id}`);
    }
}

function send_ask(sendContent) {
    let askText = sendContent.split('_')[0]
    let _id = sendContent.split('_')[1]
    if (!client || client.readyState == 2 || client.readyState == 3) {
        client = new WebSocket('ws://localhost:3000/');
    }
    else {
        client.send(askText + `_${name.value}` + ` ${teacher.value}` + `_${_id}`);
    }
}

