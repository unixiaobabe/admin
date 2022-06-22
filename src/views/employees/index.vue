<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <template slot="before">
          <span>共42条记录</span>
        </template>
        <template slot="after">
          <el-button
            size="small"
            type="success"
            @click="$router.push('/import?type=user')"
            >excel导入</el-button
          >
          <el-button size="small" type="danger" @click="exportData"
            >excel导出</el-button
          >
          <el-button size="small" type="primary" @click="showDialog = true"
            >新增员工</el-button
          >
        </template>
      </page-tools>

      <el-table :data="list">
        <el-table-column label="序号" type="index"> </el-table-column>
        <el-table-column label="姓名" sortable prop="username">
        </el-table-column>
        <el-table-column label="头像">
          <template slot-scope="{ row }">
            <img
              :src="row.staffPhoto"
              v-imgerror="require('@/assets/common/bigUserHeader.png')"
              style="
                width: 100px;
                height: 100px;
                padding: 10px;
                border-radius: 50%;
              "
              alt=""
              @click="showQrCode(row.staffPhoto)"
            />
          </template>
        </el-table-column>
        <el-table-column label="工号" sortable prop="workNumber">
        </el-table-column>
        <el-table-column
          label="聘用形式"
          sortable
          prop="formOfEmployment"
          :formatter="formatEmployment"
        >
        </el-table-column>
        <el-table-column label="部门" sortable prop="departmentName">
        </el-table-column>
        <el-table-column label="入职时间" sortable prop="timeOfEntry">
          <template slot-scope="{ row }">
            {{ row.timeOfEntry | formDate }}
          </template>
        </el-table-column>
        <el-table-column label="账号状态" sortable prop="enableState">
          <template v-slot="{ row }">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="{ row }">
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/employees/detail/${row.id}`)"
              >查看</el-button
            >
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editRole(row.id)"
              >角色</el-button
            >
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row type="flex" justify="center" align="middle" style="height: 60px">
        <el-pagination
          layout="prev, pager, next"
          :page-size="page.size"
          :current-page="page.page"
          :total="page.total"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </div>

    <add-employee :show-dialog.sync="showDialog"></add-employee>
    <el-dialog title="二维码" :visible="showCodeDialog">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas"></canvas>
      </el-row>
    </el-dialog>
    <assign-role
      :userId="userId"
      :showRoleDialog.sync="showRoleDialog"
      ref="assignRole"
    ></assign-role>
  </div>
</template>
<script>
import addEmployee from "./components/add-employee";
import { getEmployeeList } from "@/api/employees";
import EmployeeValue from "@/api/constant/employees";
import { formDate } from "@/filters/index";
import QrCode from "qrcode";
import assignRole from "./components/assign-role";
export default {
  components: {
    addEmployee,
    assignRole,
  },
  data() {
    return {
      list: [],
      page: {
        page: 1,
        size: 10,
        total: 0,
      },
      showDialog: false,
      showCodeDialog: false,
      showRoleDialog: false,
      userId: "",
    };
  },
  created() {
    this.getEmployeeList();
  },
  methods: {
    editRole(id) {
      this.userId = id;
      this.$refs.assignRole.getUserDetailById(id);
      this.showRoleDialog = true;
    },
    showQrCode(url) {
      if (url) {
        this.showCodeDialog = true;
        this.$nextTick(() => {
          QrCode.toCanvas(this.$refs.myCanvas, url);
        });
      } else {
        this.$message.warning("用户还未上传头像");
      }
    },
    formatEmployment(row, column, cellValue, index) {
      const obj = EmployeeValue.hireType.find((item) => item.id === cellValue);
      return obj ? obj.value : "未知";
    },
    exportData() {
      const headers = {
        姓名: "username",
        手机号: "mobile",
        入职日期: "timeOfEntry",
        聘用形式: "formOfEmployment",
        转正日期: "correctionTime",
        工号: "workNumber",
        部门: "departmentName",
      };
      import("@/vendor/Export2Excel").then(async (excel) => {
        const { rows } = await getEmployeeList({
          page: 1,
          size: this.page.total,
        });
        const data = this.formatJson(headers, rows);
        excel.export_json_to_excel({
          header: Object.keys(headers),
          data,
          filename: "员工工资",
          autoWidth: true,
          bookType: "xlsx",
        });
      });
    },
    formatJson(headers, rows) {
      return rows.map((item) => {
        return Object.keys(headers).map((key) => {
          if (
            headers[key] === "timeOfEntry" ||
            headers[key] === "correctionTime"
          ) {
            return formDate(item[headers[key]]);
          } else if (headers[key] === "formOfEmployment") {
            var en = EmployeeValue.hireType.find(
              (obj) => obj.id === item[headers[key]]
            );
            return en ? en.value : "未知";
          }
          return item[headers[key]];
        });
      });
    },
    addEmployee() {
      this.showDialog = true;
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getEmployeeList();
    },
    async getEmployeeList() {
      let { total, rows } = await getEmployeeList(this.page);
      this.page.total = total;
      this.list = rows;
    },
  },
};
</script>
<style scoped>
</style>