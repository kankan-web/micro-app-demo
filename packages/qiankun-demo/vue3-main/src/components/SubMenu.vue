<template>
  <el-sub-menu :index="menuInfo.meta.key as string">
    <template #title>{{ menuInfo.name }}</template>
    <template v-for="item in menuInfo.children" :key="item.meta.key">
      <template v-if="item.children">
        <sub-menu :menu-info="item" :key="item.meta.key"></sub-menu>
      </template>
      <template v-else>
        <el-menu-item :index="item.meta.key">{{ item.name }}</el-menu-item>
      </template>
    </template>
  </el-sub-menu>
</template>
<script setup lang="ts">
defineProps({
  menuInfo: {
    type: Object,
    default: () => ({}),
  },
});
</script>
<style lang=""></style>
