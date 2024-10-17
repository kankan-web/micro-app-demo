<template>
  <el-container>
    <el-aside width="250" class="sider">
      <div class="logo">
        <template v-if="!isCollapse">当前：qiankun-vue3主应用</template>
      </div>
      <el-menu
        :default-active="selectedKeys"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        unique-opened
        background-color="#001529"
        text-color="#ffffffA6"
        active-text-color="#fff"
      >
        <SubMenu :menu-list="menuList" />
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <!-- <div class="main">main</div> -->
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/stores/menu";
const { menuList, flattenMenuList } = useMenuStore();
const isCollapse = ref(false);
const selectedKeys = ref<string>();

const route = useRoute();

//根据路由获取当前激活菜单
function initKeys() {
  const { fullPath } = route;
  const res = flattenMenuList.find((item) => item.path === fullPath);
  if (res) {
    selectedKeys.value = String(res.key);
  }
}
watchEffect(initKeys);
</script>

<style scoped lang="scss">
.sider {
  overflow: auto;
  height: 100vh;
  background-color: #001529;
  color: #fff;
  .logo {
    height: 32px;
    line-height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}

.el-menu {
  border-right: none;
}
.el-main {
  background-color: #f0f2f5;
  .main {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
