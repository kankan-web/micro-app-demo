<template>
  <el-config-provider lang="zhCh">
    <el-container>
      <el-aside width="250" class="sider">
        <div class="logo">
          <template v-if="!isCollapse">当前：qiankun-vue3主应用</template>
        </div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
          background-color="#001529"
          text-color="#ffffffA6"
          active-text-color="#fff"
        >
          <template v-for="item in menuList" :key="item.meta?.key">
            <template v-if="item.children && item.children.length > 0">
              <SubMenu
                :menu-info="item"
                :key="item.meta?.key as string"
              ></SubMenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.meta?.key as string">
                {{ item.name }}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <div class="main">main</div>
        </el-main>
      </el-container>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { useMenuStore } from "@/stores/menu";
import zhCn from "element-plus/es/locale/lang/zh-cn";
const { menuList, flattenMenuList } = useMenuStore();
const isCollapse = ref(false);
const handleOpen = () => {};
const handleClose = () => {};
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
