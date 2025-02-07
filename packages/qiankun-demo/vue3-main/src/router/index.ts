import { useMenuStore } from "@/stores/menu";
import { useUserStore } from "@/stores/user";
import { createRouter, createWebHashHistory } from "vue-router";
import { user as userData } from "@/data/userData";

import type { MicroApp } from "qiankun";
import { useAppStore } from "@/stores/app";
import { loadMicroApp } from "qiankun";
import { dispatchUserEvent } from "@/utils/dispatchUserEvent";
import { setMicroAppLoading } from "@/utils/microAppLoading";

// 创建路由实例
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL), // 使用hash模式
  routes: [
    {
      path: "/",
      redirect: "/main/communication-test", // 重定向到指定路径
    },
  ],
});

const microAppMap = new Map<string, MicroApp>(); // 存储微应用实例的映射

// 是否已经加载初始化的数据
let loadedInitData = false;
// 上次的location.hash
let lastHash = "";

// 前置路由守卫
router.beforeEach(async (to, from, next) => {
  debugger;
  const { addRoutes } = useMenuStore();
  const { setUser } = useUserStore();
  if (!loadedInitData) {
    // 首次加载时设置用户数据和添加路由
    setUser(userData);
    addRoutes();
    loadedInitData = true;
    next(to); // 继续导航到目标路由
  } else {
    const { apps } = useAppStore();
    // 如果上次的hash值不为空，则判断是否需要挂载微应用
    if (lastHash) {
      const app = apps.find((item) => lastHash.startsWith(item.activeRule));
      if (app) {
        const name = app.name;
        if (microAppMap.has(name)) {
          const microApp = microAppMap.get(name);
          if (microApp?.getStatus() === "MOUNTED") {
            await microApp.mount(); // 如果微应用已挂载，则重新挂载
          }
        }
      }
    }
    next(); // 继续导航
  }
});

let mounting = false; // 标记是否正在挂载微应用
// 后置路由守卫，作用是根据：当前的hash值，判断是否需要挂载微应用
//触发时机：在路由导航完成后，即在afterEach钩子中
router.afterEach(async () => {
  debugger;
  const { apps } = useAppStore();
  const { user } = useUserStore();
  lastHash = location.hash; // 更新上次的hash
  const app = apps.find((item) => lastHash.startsWith(item.activeRule));
  let microApp;
  //手动加载子应用
  if (app) {
    const name = app.name;
    if (microAppMap.has(name)) {
      microApp = microAppMap.get(name);
      if (!mounting) {
        mounting = true;
        await microApp?.mount(); // 挂载微应用
        mounting = false;
      }
    } else {
      if (!mounting) {
        mounting = true;
        microApp = await loadMicroApp(app); // 加载并挂载新的微应用
        microAppMap.set(name, microApp);
        await microApp.mountPromise; // 等待微应用挂载完成
      }
      mounting = false;
    }
    dispatchUserEvent(toRaw(user)); // 触发用户事件
  }
  setMicroAppLoading(false); // 设置微应用加载状态为false
});

export default router; // 导出路由实例
