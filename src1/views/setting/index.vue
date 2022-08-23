<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button
            type="primary"
            @click="addDialogVisible = true"
            v-if="isHas(point.roles.add)"
            >新增角色</el-button
          >
          <!-- 表单 -->
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="date" label="序号" type="index">
            </el-table-column>

            <el-table-column prop="name" label="角色"> </el-table-column>
            <el-table-column prop="description" label="描述"> </el-table-column>
            <el-table-column prop="address" label="操作">
              <template slot-scope="{ row }">
                <el-button
                  type="success"
                  size="small"
                  @click="showDialog(row.id)"
                  >分配权限</el-button
                >
                <el-button
                  type="primary"
                  size="small"
                  
                  >编辑</el-button
                >
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
          <el-alert
            title="消息提示的文案"
            type="info"
            show-icon
            :closable="false"
          >
          </el-alert>
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
    <!-- 分配权限对话框 -->
    <el-dialog
      title="给角色分配权限"
      :visible.sync="setRightDialog"
      width="50%"
      @close="setRightClose"
      defaultCheckKeys
      destroy-on-close
    >
      <el-tree
        default-expand-all
        show-checkbox
        node-key="id"
        :default-checked-keys="defaultCheckKeys"
        :data="permissions"
        :props="{ label: 'name' }"
        ref="perTree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setRightDialog = false">取 消</el-button>
        <el-button type="primary" @click="aveRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRolesApi, addRolesApi, getRolesInfo, assignPrem } from '@/api/role'
import { getCompanyInfoApi } from '@/api/setting'
import { getPermissionList } from '@/api/permission'
import { transListTree } from '@/utils'
import Mixinpermission from '@/mixins/permission'
export default {
  data() {
    return {
      activeName: 'first',
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
      formDate: {},
      setRightDialog: false,
      roleId: '', //
      permissions: [], //树形数据
      defaultCheckKeys: [], //分配权限默认选中
    }
  },

  created() {
    this.getRoles()
    this.getCompanyInfo()
    this.getPermissions()
  },
  mixins: [Mixinpermission],
  methods: {
    // 获取详情
    async getRoles() {
      const { rows, total } = await getRolesApi({
        page: this.page,
        pagesize: this.pageSize,
      })
      // console.log(rows)
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
      // console.log('表单校验通过')
    },
    //监听对话框关闭
    dialogClose() {
      this.$refs.form.resetFields()
      this.addRoleForm.region = ''
    },
    async getCompanyInfo() {
      const res = await getCompanyInfoApi(
        this.$store.state.user.userInfo.companyId,
      )
      this.formDate = res
      // console.log(res);
    },
    // 点击分配权限
    async showDialog(id) {
      this.roleId = id
      this.setRightDialog = true
      const res = await getRolesInfo(id)
      this.defaultCheckKeys = res.permIds
    },
    // 树形结构
    async getPermissions() {
      const res = await getPermissionList()
      const treePermission = transListTree(res, '0')
      // console.log(treePermission);
      this.permissions = treePermission
      // console.log(this.permissions)
    },
    //关闭弹窗销毁树形
    setRightClose() {
      this.defaultCheckKeys = []
    },
    // 点击确定，保存权限分配
    async aveRights() {
      const res = await assignPrem({
        id: this.roleId,
        permIds: this.$refs.perTree.getCheckedKeys(),
      })
      this.$message.success('分配成功')
      this.setRightDialog = false
    },

  },
}
</script>

<style scoped lang="less"></style>
