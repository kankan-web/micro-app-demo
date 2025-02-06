<template lang="">
  <div class="message-box">
    <el-form :model="formData" :rules="rules" ref="formElRef">
      <el-form-item label="信息文本" prop="info">
        <el-input v-model="formData.info" :rows="3" type="textarea" />
      </el-form-item>
      <el-form-item label="消息类型" prop="type">
        <el-select v-model="formData.type">
          <el-option
            v-for="item in types"
            :label="item.label"
            :key="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendMessage"
          >向主应用（自己）发送信息</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import { dispatchReceiveMessageEvent } from "@/utils/messageListener";
import { Types } from "@/utils/messageListener";
import type { Message } from "@/utils/messageListener";
import { FormInstance } from "element-plus";

const formElRef = ref<FormInstance>();
const formData = reactive<Omit<Message, "from">>({
  type: Types.success,
  info: "",
});
const rules = reactive({
  info: [{ required: true, message: "信息不能为空!" }],
  type: [{ required: true, message: "消息类型不能为空!" }],
});
const types = reactive([
  {
    value: Types.success,
    label: "成功",
  },
  {
    value: Types.error,
    label: "失败",
  },
  {
    value: Types.warn,
    label: "提醒",
  },
  {
    value: Types.info,
    label: "信息",
  },
]);
/**--------------------------- */
const sendMessage = async () => {
  if (!formElRef.value) return;
  await formElRef.value?.validate((valid, field) => {
    if (valid) {
      dispatchReceiveMessageEvent(toRaw(formData));
    } else {
      console.log("error submit", field);
    }
  });
};
</script>
<style lang="scss" scoped>
.message-box {
  width: 50%;
  margin: 50px auto;
}
:deep(.el-form) {
  .el-form-item__content {
    justify-content: center;
  }
}
</style>
