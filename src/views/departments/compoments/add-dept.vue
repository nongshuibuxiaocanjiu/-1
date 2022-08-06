<template>
  <!-- 灰色弹层是el-dialog组件内部的 -->
  <!-- 组件内部点击灰色遮罩 在修改visible -->
  <!-- this.$emit('update:visible', false) -->
  <!-- .sync 修饰符的作用 -->
  <!-- :visible="visible"父向子传值 -->
  <!-- @update:visible="visible = $event" -->
  <el-dialog
    @close="onClose"
    :title="dialogTitle"
    :visible="visible"
    width="50%"
  >
    <el-form
      ref="form"
      label-width="100px"
      :rules="formRules"
      :model="formData"
    >
      <el-form-item label="部门名称" prop="name">
        <el-input
          placeholder="请输入部门名称"
          v-model="formData.name"
        ></el-input>
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input
          placeholder="请输入部门编码"
          v-model="formData.code"
        ></el-input>
      </el-form-item>

      <el-form-item label="部门负责人" prop="manager">
        <el-select
          placeholder="请选择部门负责人"
          style="width: 100%"
          v-model="formData.manager"
        >
          <el-option
            :label="item.username"
            :value="item.username"
            v-for="item in employees"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          type="textarea"
          placeholder="请输入部门介绍"
          v-model="formData.introduce"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDesptsApi } from '@/api/departments'
import { getEmployeesApi, addDeptApi, getDeptApi,editDeptApi } from '@/api/employees'
export default {
  data() {
    const checkDeptName = async(rule, value, callback) => {
      if(this.formData.id) {
        const { depts } = await getDesptsApi()
        const filterDepts = depts.filter(
          item=> item.pid === this.formData.pid && item.id !== this.formData.id
        )
        const isRepet = filterDepts.some(item=> item.name === value)
        isRepet ? callback(new Error('部门重复')) : callback()
      } else {
        if (!this.currentNode.children) return callback()
      const isRepeace = this.currentNode.children.some(
        (item) => item.name === value,
      )
      isRepeace ? callback(new Error('部门重复')) : callback()
      }
      // console.log(this.currentNode);
      
    }
    const checkDeptCode = async (rule, value, callback) => {
      const { depts } = await getDesptsApi()
      let isRepet
      if (this.formData.id) {
        isRepet = depts
          .filter((item) => item.id !== this.formData.id)
          .some((item) => item.code === value)
      } else {
        isRepet = depts.some((item) => item.code === value)
      }

      isRepet ? callback(new Error('部门编码重复')) : callback()
    }
    return {
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      },
      employees: [],
      formRules: {
        name: [
          { required: true, message: '部门不能为空', trigger: 'blur' },
          {
            validator: checkDeptName,
            trigger: 'blur',
          },
        ],
        code: [
          { required: true, message: '部门编码不能为空', trigger: 'blur' },
          {
            validator: checkDeptCode,
            trigger: 'blur',
          },
        ],
        manager: [
          { required: true, message: '部门管理者不能为空', trigger: 'change' },
        ],
        introduce: [
          { required: true, message: '部门介绍不能为空', trigger: 'blur' },
        ],
      },
    }
  },
  computed: {
    dialogTitle() {
      return this.formData.id ? '编辑部门' : '新增部门'
    },
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    currentNode: {
      type: Object,
      required: true,
    },
  },

  created() {
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      const res = await getEmployeesApi()
      console.log(res)
      this.employees = res
    },
    onClose() {
      this.$emit('update:visible', false)
      this.$refs.form.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '', // 部门介绍
      }
    },
    async onSave() {
      await this.$refs.form.validate()
      try {
      if (this.formData.id) {
        // console.log('编辑')
        await editDeptApi(this.formData)
        this.$message.success('编辑成功')
          this.onClose()
          this.$emit('add-success')
      } else {
        this.formData.pid = this.currentNode.id
          await addDeptApi(this.formData)
          this.$message.success('新增部门成功')
          this.onClose()
          this.$emit('add-success')
        } 
      } catch (error) {
          this.$message.error('操作部门失败')
        }
    },
    async getDeptById(id) {
      console.log(id)
      this.formData = await getDeptApi(id)
    },
  },
}
</script>

<style scoped lang="less"></style>
