<template lang="">
  <el-row>
    <el-col :span="12"><h3>主应用的数据User Store Info</h3></el-col>
    <el-col :span="12" class="form-icon-box"
      ><el-icon size="30" class="form-icon" @click="toggleEdit(formElRef)"
        ><i-ep-edit-pen v-if="!isEdit" /><i-ep-document v-else /></el-icon
    ></el-col>
  </el-row>

  <el-form :model="formData" :disabled="!isEdit" ref="formElRef" :rules="rules">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="UserName" prop="name">
          <el-input v-model="formData.name" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Age" prop="age">
          <el-input-number v-model="formData.age"></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="Gender" prop="gender">
          <el-select v-model="formData.gender" placeholder="请选择">
            <el-option
              v-for="item in genders"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item label="phone" prop="phone">
          <el-input v-model="formData.phone" placeholder="请输入"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>
<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import type { User } from "@/data/userData";
import { ElMessage, FormInstance } from "element-plus";

const { user, setUser } = useUserStore();
const genders = [
  {
    value: "male",
    label: "男",
  },
  {
    value: "female",
    label: "女",
  },
  {
    value: "secret",
    label: "保密",
  },
];
const rules = reactive({
  name: [
    {
      required: true,
      message: "姓名不能为空",
    },
  ],
  age: [
    {
      required: true,
      message: "年龄不能为空",
    },
  ],
  gender: [
    {
      required: true,
      message: "性别不能为空",
    },
  ],
  phone: [
    {
      required: true,
      message: "电话不能为空",
    },
  ],
});
/**---------------------------- */
const formElRef = ref(null);
const isEdit = ref(false);
const formData = reactive<User>(
  user
    ? { ...user }
    : {
        name: "",
        age: 0,
        gender: "male",
        phone: "",
      },
);
const toggleEdit = async (formEl: FormInstance | undefined) => {
  if (isEdit.value) {
    if (!formEl) return;
    await formEl.validate((valid, field) => {
      if (valid) {
        setUser(toRaw(formData));
        isEdit.value = !isEdit.value;
        ElMessage.success("用户修改成功，您可以切换至子应用查看是否生效");
      } else {
        console.log("error submit", field);
      }
    });
  } else {
    isEdit.value = !isEdit.value;
  }
};
</script>
<style lang="scss">
.form-icon-box {
  text-align: right;
  height: 56px;
  line-height: 56px;
}

.form-icon {
  background-color: #1385ff;
  color: #fff;
  padding: 5px;
  vertical-align: middle;
}
</style>
