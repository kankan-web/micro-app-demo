import { useMenuStore } from "@/stores/menu";
import { useUserStore } from "@/stores/user";
import { createRouter, createWebHistory } from "vue-router";
import { user as userData } from "@/data/userData";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/main/communication-test",
    },
  ],
});
// 是否已经加载初始化的数据
let loadedInitData = false;

//前置路由守卫
router.beforeEach(async (to, from, next) => {
  const { addRoutes } = useMenuStore();
  const { setUser } = useUserStore();
  if (!loadedInitData) {
    //首次加载
    setUser(userData);
    addRoutes();
    loadedInitData = true;
    next(to);
  } else {
    next();
  }
});

export default router;
