import type { User } from "@/data/userData";

export const CHANGE_USER = "changeUser";

//NOTE：定义自定义事件，用于通信
function createUserEvent(user: User | null) {
  return new CustomEvent(CHANGE_USER, {
    detail: user,
  });
}
//NOTE：window.dispatchEvent：全局范围内触发（派发）自定义事件。
export function dispatchUserEvent(user: User | null) {
  const event = createUserEvent(user);
  window.dispatchEvent(event);
}
