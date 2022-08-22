<template>
  <el-dialog title="角色分配" :visible="visible" @close="close" @open="open">
    <el-checkbox-group v-model="checkList">
    <el-checkbox :label="item.id" v-for="item in roles" :key="item.id">
        {{item.name}}
    </el-checkbox>
    
    </el-checkbox-group>
    <span slot="footer" class="dialog-footer">
    <el-button @click="close">取 消</el-button>
    <el-button type="primary" @click="assignRole">确 定</el-button>
  </span>
  </el-dialog>
</template>

<script>
import { getRolesApi } from '@/api/role'
import { getuserDetail } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
    name:'assignRole',
  data () {
    return {
        checkList: [],
        roles:[]
    }
  },
  props:{
    visible: {
      type: Boolean,
      required: true,
    },
    employessId:{
      type: String,
      required: true,

    }
    
  },

  created () {

  },

  methods: {
    close() {
        this.$emit('update:visible',false)
    },
    // 获取列表
   async getRolesList() {
    const {rows} =await getRolesApi()
    // console.log(rows);
    this.roles = rows
    },
    // 打开弹窗
    open() {
        this.getRolesList()
        this.getEmployeesRoles()
    },
    // 获取列表
   async getEmployeesRoles() {
   
      const {roleIds} = await getuserDetail(this.employessId)
      this.checkList = roleIds
      // console.log(roleIds);
    },
    // 分配角色
   async assignRole() {
      if(!this.checkList.length) return this.$message.error('请选择角色')
      await assignRoles({
        id:this.employessId,
        roleIds:this.checkList,
      })
      this.$message.success('分配成功')
      this.close()
    }
  }
}
</script>

<style scoped lang='less'>

</style>
