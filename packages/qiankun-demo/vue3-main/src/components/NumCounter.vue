<template lang="">
  <div class="count-box">
    <el-row :gutter="20" justify="center">
      <label>step:</label>
      <el-col :span="12">
        <el-input v-model.number="step" size="large"></el-input>
      </el-col>
    </el-row>
    <el-row :gutter="40" justify="center">
      <el-button type="primary" size="large" @click="() => increment(step)"
        >+</el-button
      >
      <h1 class="number">{{ value }}</h1>
      <el-button type="danger" size="large" @click="() => decrement(step)"
        >-</el-button
      >
    </el-row>
  </div>
</template>
<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const step = ref(1);
const user = useCounterStore();
const { increment, decrement } = user;
const { value } = storeToRefs(user);
</script>
<style lang="scss" scoped>
.count-box {
  margin: 50px auto;
  width: 50%;
  text-align: center;
}

.el-row {
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
}

.el-button {
  margin: 0 20px;
}
</style>
