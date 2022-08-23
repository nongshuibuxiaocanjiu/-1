<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs v-model="activeName" @click="onclick">
          <el-tab-pane label="登录账户设置" name="account">
            <!-- 放置表单 -->
            <el-form
              label-width="120px"
              style="margin-left: 120px; margin-top: 30px"
            >
              <el-form-item label="姓名:">
                <el-input style="width: 300px" v-model="formData.username" />
              </el-form-item>
              <el-form-item label="密码:">
                <el-input
                  style="width: 300px"
                  type="password"
                  v-model="formData.password"
                />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSave">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="user">
            <userInfo/>
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="gangwei" >
            <jobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import userInfo from './user-info.vue'
import { getuserDetail,saveUserDetailById } from '@/api/user'
import Cookies from 'js-cookie'
import jobInfo from './job-info.vue'
export default {
  name: 'employeesDetail',
  data() {
    return {
      formData: {},
      activeName:Cookies.get('employeesDetailTab') || 'account'
    }
  },
  components: {
    userInfo,
    jobInfo
  },

  created() {
    this.getuserDetail()
  },

  methods: {
    async getuserDetail() {
      const res = await getuserDetail(this.$route.params.id)
      console.log(res)
      this.formData = res
    },
   async onSave() {
        await saveUserDetailById(this.formData)
        this.$message.success('跟新成功')

    },
    onclick() {
      this.activeName = Cookies.set('employeesDetailTab',this.activeName)
    }

  },
}
</script>

<style scoped lang="less"></style>
