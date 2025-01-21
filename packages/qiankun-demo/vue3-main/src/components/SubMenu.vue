<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="String(subItem.key)">
      <template #title>
        <el-icon><i-ep-grid /></el-icon>
        <span v-show="!collapse">{{ subItem.name }}</span>
      </template>
      <SubMenu
        :menu-list="subItem.children"
        :hiddenNavIcon="true"
        :collapse="collapse"
      />
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="String(subItem.key)"
      @click="handleClickMenu(subItem)"
    >
      <template #title>
        <el-icon><i-ep-star-filled /></el-icon>
        <span v-show="!collapse">{{ subItem.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>
<script setup lang="ts">
import type { Menu } from "@/data/menuData";
defineProps<{
  menuList: Menu[];
  collapse?: boolean;
}>();
const router = useRouter();
const handleClickMenu = (item: Menu) => {
  if (item.path) {
    router.push(item.path);
  }
};
</script>
<style lang=""></style>
