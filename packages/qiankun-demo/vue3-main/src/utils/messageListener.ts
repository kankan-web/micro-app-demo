import { ElMessage, ElNotification } from "element-plus";

export const RECEIVE_MESSAGE = "receiveMessage";
export enum Types {
  success = "success",
  warn = "warn",
  error = "error",
  info = "info",
}

export interface Message {
  info: string;
  type: Types;
  from: string;
}
//监听reactiveMessage
//子应用出发type=reactiveMessage的CustomEvent
//微前端中使用自定义事件来进行消息通信
export function listenReceiveMessage() {
  window.addEventListener("receiveMessage", function (e) {
    const { type, info, from } = (e as CustomEvent<Message>).detail;
    ElNotification({
      title: `来自【${from}】的消息`,
      type: type as "success" | "warning" | "info" | "error",
      message: info,
    });
    console.log("执行");
  });
}

function createReceiveMessageEvent(message: Omit<Message, "from">) {
  return new CustomEvent(RECEIVE_MESSAGE, {
    detail: {
      ...message,
      from: "主应用",
    },
  });
}

export function dispatchReceiveMessageEvent(message: Omit<Message, "from">) {
  const event = createReceiveMessageEvent(message);
  window.dispatchEvent(event);
}
