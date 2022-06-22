<template>
  <el-dialog title="分配角色" :visible="showRoleDialog">
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>
<script>
import { getRoleList } from "@/api/setting";
import {getUserDetailById} from '@/api/user'
import {assignRoles} from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      list: [],
      roleIds: [],
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async btnOk(){
      await assignRoles({id:this.userId,roleIds:this.roleIds})
      this.$emit('update:showRoleDialog',false)
    },  
    btnCancel(){
      this.roleIds = []
      this.$emit('update:showRoleDialog',false)
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id);
      this.roleIds = roleIds;
    },
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 });
      this.list = rows;
      console.log(rows);
    },
  },
};
</script>