<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :isRoot="true"></tree-tools>
        <el-tree
          :data="departs"
          :props="defaultProps"
          :default-expand-all="true"
        >
          <tree-tools
            slot-scope="{ data }"
            :tree-node="data"
            @delDepts="getDepartments"
            @addDepts="addDepts"
            @editDepts="editDepts"
            
          ></tree-tools>
        </el-tree>
      </el-card>
    </div>

    <add-depts ref="addDept" :show-dialog.sync="showDialog" :tree-node="node"></add-depts>
  </div>
</template>
<script>
import treeTools from "./components/tree-tools.vue";
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils/index";
import AddDepts from "./components/add-depts.vue";
export default {
  components: { treeTools, AddDepts },
  data() {
    return {
      showDialog: false,
      company: {
        name: "丁鹿学堂组织架构",
        manager: "负责人",
        id:""
      },
      defaultProps: {
        label: "name",
      },
      departs: [],
      node:null
    };
  },
  created() {
    this.getDepartments();
  },
  methods: {  
    editDepts(node){
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
    },
    async getDepartments() {
      let res = await getDepartments();
      this.departs = tranListToTreeData(res.depts, "");
    },
    addDepts(node) {
      this.showDialog = true;
      this.node = node
    },
  },
};
</script>
<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>