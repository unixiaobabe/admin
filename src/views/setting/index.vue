<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="角色管理" name="角色管理">
            <el-row style="height: 60px">
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="small"
                @click="showDialog = true"
                >新增角色</el-button
              >
            </el-row>

            <el-table border :data="list">
              <el-table-column type="index" label="序号" width="120">
              </el-table-column>
              <el-table-column label="名称" width="240" prop="name">
              </el-table-column>
              <el-table-column
                label="描述"
                prop="description"
              ></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="{ row }">
                  <el-button type="success" @click="assignPerm(row.id)"
                    >分配权限</el-button
                  >
                  <el-button type="primary" @click="editRole(row.id)"
                    >编辑</el-button
                  >
                  <el-button type="danger" @click="deleteRole(row.id)"
                    >删除</el-button
                  >
                </template>
              </el-table-column>
            </el-table>

            <el-row
              type="flex"
              justify="center"
              align="middle"
              style="height: 60px"
            >
              <el-pagination
                layout="prev, pager, next"
                :current-page="page.page"
                :page-size="page.pagesize"
                :total="page.total"
                @current-change="changePage"
              ></el-pagination>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息" name="公司信息">公司信息</el-tab-pane>
        </el-tabs>
      </el-card>

      <el-dialog title="编辑弹层" :visible.sync="showDialog">
        <el-form ref="roleForm" :model="roleForm" :rules="rules">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" prop="description">
            <el-input v-model="roleForm.description"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary" @click="btnOk">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="分配权限"
        :visible="showPermDialog"
        @close="btnPermCancel"
      >
        <el-tree
          ref="permTree"
          :data="permData"
          :props="defaultProps"
          :show-checkbox="true"
          :check-strictly="true"
          :default-expend-all="true"
          :default-checked-keys="selectCheck"
          node-key="id"
        ></el-tree>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button type="primary" size="small" @click="btnPermOk"
              >确定</el-button
            >
            <el-button size="small" @click="btnPermCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import {
  addRole,
  deleteRole,
  getRoleDetail,
  getRoleList,
  updateRole,
  assignPerm
} from "@/api/setting";
import { tranListToTreeData } from "@/utils";
import { getPermissionList } from "@/api/permission";
export default {
  data() {
    return {
      showDialog: false,
      roleForm: {
        name: "",
        description: "",
      },
      rules: {
        name: [
          { required: true, message: "角色名称不能为空", trigger: "blur" },
        ],
      },
      activeName: "角色管理",
      page: {
        page: 1,
        pagesize: 10,
        total: 0,
      },
      list: [],
      permData: [],
      defaultProps:{
        label:'name'
      },
      roleId: '',
      selectCheck: [],
      showPermDialog: false,
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async assignPerm(id) {
      this.permData = tranListToTreeData(await getPermissionList(), "0");
      this.roleId = id;
      const { permIds } = await getRoleDetail(id);
      this.selectCheck = permIds;
      this.showPermDialog = true;
    },
    async btnPermOk(){
      await assignPerm({permIds:this.$refs.permTree.getCheckedKeys(),id:this.roleId})
      this.$message.success('分配权限成功')
      this.showPermDialog = false
    },
    btnPermCancel(){
      this.selectCheck = []
      this.showPermDialog = false
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id);
      this.showDialog = true;
    },
    async btnOk() {
      try {
        let res = await this.$refs.roleForm.validate();
        console.log("res", this.roleForm);
        if (this.roleForm.id) {
          await updateRole(this.roleForm);
        } else {
          await addRole(this.roleForm);
        }
        this.getRoleList();
        this.$message.success("操作成功");
        this.showDialog = false;
        this.roleForm = {};
      } catch (err) {
        console.log(err);
      }
    },
    async deleteRole(id) {
      try {
        await this.$confirm("确定要删除吗？");
        await deleteRole(id);
        this.getRoleList();
        this.$message.success("删除角色成功");
      } catch (error) {
        console.log(error);
      }
    },
    changePage(newpage) {
      this.page.page = newpage;
      this.getRoleList();
    },
    async getRoleList() {
      const { total, rows } = await getRoleList(this.page);
      this.page.total = total;
      this.list = rows;
      console.log("total", total, "row", rows);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>
<style scoped>
</style>