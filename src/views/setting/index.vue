<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" @click="addDialogVisible = true"
            >新增角色</el-button
          >
          <!-- 表单 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="序号" type="index">
            </el-table-column>

            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template>
                <el-button type="success" size="small">分配权限</el-button>
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- /表单 -->
          <!-- 分页 -->
          <el-pagination
            layout="sizes,prev, pager, next"
            :total="total"
            :page-size="pageSize"
            :page-sizes="[3, 5, 10, 20]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="公司信息" name="second">
          <el-alert title="消息提示的文案" type="info" show-icon :closable="false"> </el-alert>
          <el-form ref="form" label-width="80px">
            <el-form-item label="公司名称">
              <el-input disabled v-model="formDate.name"></el-input>
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled v-model="formDate.companyAddress"></el-input>
            </el-form-item>
            <el-form-item label="公司邮箱">
              <el-input disabled v-model="formDate.mailbox"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input disabled v-model="formDate.remarks"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 对话框 -->
    <el-dialog
      title="提示"
      :visible.sync="addDialogVisible"
      width="30%"
      @close="dialogClose"
    >
      <el-form
        ref="form"
        label-width="80px"
        :model="addRoleForm"
        :rules="addRoleFormRules"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRoleForm.region"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi } from '@/api/role'
import {getCompanyInfoApi } from '@/api/setting'
export default {
  data() {
    return {
      activeName: 'second',
      tableData: [],
      total: 0,
      pageSize: 2,
      page: 1,
      addDialogVisible: false,
      addRoleForm: {
        name: '',
        region: '',
      },
      addRoleFormRules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
      formDate:{}
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
  },

  methods: {
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      console.log(rows)
      this.tableData = rows
      this.total = total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },
    handleCurrentChange(val) {
      console.log(val)
      this.page = val
      this.getRoles()
    },
    onClose() {
      this.addDialogVisible = false
    },
    async onAddRole() {
      await this.$refs.form.validate()
      await addRolesApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.getRoles()
      this.addDialogVisible = false
      console.log('表单校验通过')
    },
    //监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.region = ''
    },
   async getCompanyInfo() {
      const res  = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId
      )
      this.formDate = res
      console.log(res);
    }
  },
}
</script>

<style scoped lang="less"></style>
