<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账号设置">
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
              :model="userInfo"
              ref="userRef"
              :rules="userRules"
            >
              <el-form-item label="姓名" prop="username">
                <el-input style="width: 300px" v-model="userInfo.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password2">
                <el-input style="width: 300px" type="password" v-model="userInfo.password2"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">打印</router-link>
              </el-tooltip>
            </el-row>
            <user-info></user-info>
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <job-info></job-info>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import userInfo from './components/user-info'
import {getUserDetailById} from '@/api/user'
import {saveUserDetailById} from '@/api/employees'
import jobInfo from './components/job-info'

export default {
  components:{
    userInfo,
    jobInfo
  },
  data() {
    return {
      userId: this.$route.params.id,
      userInfo:{
        username:'',
        password2:''
      },
      userRules:{
        username:[
          {required:true,message:'姓名不能为空',trigger:"blur"}
        ],
        password2:[
          {required:true,message:'密码不能为空',trigger:'blur'},
          {min:6,max:9,message:'密码长度在6-9之间',trigger:'blur'}
        ]
      }
    }
  },
  created(){
    this.getUserDetailById()
  },
  methods: {
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUser(){
      try{
        await this.$refs.userRef.validate()
        await saveUserDetailById({
          ...this.userInfo,password:this.userInfo.password2
        })
        this.$message.success('保存成功')
      }catch(err){
        console.log(err);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>