<template>
  <el-dialog :title="showTitle" :visible.sync="showDialog">
    <el-form
      ref="deptForm"
      label-width="120px"
      :model="formData"
      :rules="rules"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          style="width: 80%"
          v-model="formData.name"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编号" prop="code">
        <el-input
          style="width: 80%"
          v-model="formData.code"
          placeholder="1-50个字符"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门负责人">
        <el-select
          style="width: 80%"
          v-model="formData.manager"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :value="item.username"
            :label="item.username"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          v-model="formData.introduce"
          placeholder="1-300个字符"
          type="textarea"
        ></el-input>
      </el-form-item>
    </el-form>

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" @click="submitForm('deptForm')" size="small"
          >确定</el-button
        >
        <el-button size="small" @click="resetForm('deptForm')">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  addDepartments,
  getDepartments,
  getEmployeeSimple,
  getDepartDetail,
  updateDepartments,
} from "@/api/departments";
export default {
  computed: {
    showTitle() {
      return this.formData.id ? "编辑部门" : "新增部门";
    },
  },
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    treeNode: {
      type: Object,
      require: true,
    },
  },
  data() {
    const checkNameRepeat = async (rules, value, callback) => {
      const { depts } = await getDepartments();
      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts
          .filter((item) => item.id!==this.formData.id&&item.pid === this.treeNode.id)
          .some((item) => item.name === value);
      }else{
        isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
      }

      isRepeat
        ? callback(new Error(`同级部门下已经存在这个${value}部门了`))
        : callback();
    };
    const checkCodeRepeat = async (rules, value, callback) => {
      const { depts } = await getDepartments();
      let isRepeat = false
      if(this.formData.id){
        isRepeat = depts
        .some((item) => item.id!==this.formData.id&&item.code === value && value);
      }else{
        isRepeat = depts
        .some((item) => item.code === value && value);
      }
      
      isRepeat
        ? callback(new Error(`组织架构中已经有部门使用${value}编码了`))
        : callback();
    };
    return {
      formData: {
        code: "",
        introduce: "",
        manager: "",
        name: "",
      },
      rules: {
        name: [
          { require: true, message: "部门名称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门名称要求1-50个字符",
            trigger: "blur",
          },
          { validator: checkNameRepeat, trigger: "blur" },
        ],
        code: [
          { require: true, message: "部门编号不能为空", trigger: "blur" },
          {
            min: 1,
            max: 50,
            message: "部门编号要求1-50个字符",
            trigger: "blur",
          },
          { validator: checkCodeRepeat, trigger: "blur" },
        ],
        introduce: [
          { require: true, message: "部门介绍不能为空", trigger: "blur" },
          {
            min: 1,
            max: 300,
            message: "部门介绍要求1-300个字符",
            trigger: "blur",
          },
        ],
      },
      peoples: [],
    };
  },
  methods: {
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id);
    },
    resetForm(formName) {
      this.formData = {
        code: "",
        introduce: "",
        manager: "",
        name: "",
      };
      this.$refs[formName].resetFields();
      this.$emit("update:showDialog", false);
    },
    async getEmployeeSimple() {
      let res = await getEmployeeSimple();
      console.log(res);
      this.peoples = res;
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (isOk) => {
        if (isOk) {
          if (this.formData.id) {
            await updateDepartments(this.formData);
          } else {
            await addDepartments({ ...this.formData, pid: this.treeNode.id });
          }

          this.$emit("addDepts");
          this.$emit("update:showDialog", false);
          this.formData = {
            code: "",
            introduce: "",
            manager: "",
            name: "",
          };
        } else {
          console.log("error submit!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>