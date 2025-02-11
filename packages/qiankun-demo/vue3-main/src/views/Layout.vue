<template>
  <el-container>
    <el-aside :width="isCollapse ? '64px' : '250px'" class="sider">
      <div class="logo">
        <template v-if="!isCollapse">当前：qiankun-vue3主应用</template>
      </div>
      <el-menu
        :default-active="selectedKeys"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        :collapse-transition="false"
        unique-opened
        background-color="#001529"
        text-color="#ffffffA6"
        active-text-color="#fff"
      >
        <template v-for="item in menuList" :key="item.path">
          <el-menu-item
            v-if="!item.children?.length"
            :index="String(item.key)"
            @click="handleClickMenu(item)"
          >
            <el-icon><i-ep-menu /></el-icon>
            <template #title>
              <span>{{ item.name }}</span>
            </template>
          </el-menu-item>

          <el-sub-menu v-else :index="String(item.key)">
            <template #title>
              <el-icon><i-ep-grid /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <SubMenu :menu-list="item.children" :collapse="isCollapse" />
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
    <el-container class="right">
      <el-header class="header">
        <el-row justify="space-between" align="middle" style="width: 100%">
          <el-col :span="1">
            <el-icon size="20" v-if="isCollapse" @click="changeCollapse"
              ><i-ep-expand
            /></el-icon>
            <el-icon size="20" v-else @click="changeCollapse"
              ><i-ep-fold
            /></el-icon>
          </el-col>
          <el-col :span="1" style="cursor: pointer" @click="goGithub">
            <img style="width: 30px" src="@/assets/github.svg" />
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div id="child-app"></div>
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/stores/menu";
import { useRouter } from "vue-router";
import type { Menu } from "@/data/menuData";

const { menuList, flattenMenuList } = useMenuStore();

const isCollapse = ref(false);
const selectedKeys = ref<string>();

const route = useRoute();
const router = useRouter();

//根据路由获取当前激活菜单
function initKeys() {
  const { fullPath } = route;
  const res = flattenMenuList.find((item) => item.path === fullPath);
  if (res) {
    selectedKeys.value = String(res.key);
  }
}
watchEffect(initKeys);

// 切换折叠状态
function changeCollapse() {
  isCollapse.value = !isCollapse.value;
}

// 跳转github
function goGithub() {
  window.open("https://github.com/kankan-web/micro-app-demo", "_blank");
}

// 添加点击菜单的处理函数
const handleClickMenu = (item: Menu) => {
  if (item.path) {
    router.push(item.path);
  }
};
</script>

<style scoped lang="scss">
.sider {
  overflow: auto;
  height: 100vh;
  background-color: #001529;
  color: #fff;
  transition: width 0.3s; // 添加过渡效果

  .logo {
    height: 32px;
    line-height: 32px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px;
    color: #ffffff;
    font-size: 16px;
    text-align: center;
    overflow: hidden; // 防止文字溢出
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
.el-header {
  display: flex;
  align-items: center;
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

:deep(.el-menu--collapse) {
  .el-sub-menu__title span {
    display: none;
  }
}
.right {
  height: 100vh;

  .header {
    background: #fff;
    padding: 0 20px;

    .trigger {
      font-size: 20px;
    }

    .github {
      font-size: 30px;
      vertical-align: middle;
    }
  }
  #child-app {
    background-color: #fff;
    padding: 20px;
  }
}
</style>
