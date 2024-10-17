<template>
  <template v-for="subItem in menuList" :key="subItem.path">
    <el-sub-menu v-if="subItem.children?.length" :index="String(subItem.key)">
      <template #title>{{ subItem.name }}</template>
      <SubMenu :menu-list="subItem.children" />
    </el-sub-menu>
    <el-menu-item
      v-else
      :index="String(subItem.key)"
      @click="handleClickMenu(subItem)"
    >
      {{ subItem.name }}</el-menu-item
    >
  </template>
</template>
<script setup lang="ts">
import type { Menu } from "@/data/menuData";
defineProps<{
  menuList: Menu[];
}>();
const router = useRouter();
const handleClickMenu = (item: Menu) => {
  if (item.path) {
    router.push(item.path);
  }
};
</script>
<style lang=""></style>
