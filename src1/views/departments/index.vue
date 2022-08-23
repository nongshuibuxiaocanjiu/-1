<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card" v-loading="loading">
        <treeTools
          :treeNode="{ name: '传值教育', manager: '负责人' }"
          :isRoot="true"
          @add="showAddDept"
        />

        <el-tree :data="departs" :props="defaultProps">
          <template v-slot="{ data }">
            <treeTools :treeNode="data" @remove="getDespts" @add="showAddDept" @edit="showEdit" />
          </template>
        </el-tree>
      </el-card>

      <AddDept ref="addDept" :visible.sync="dialogVisible" :currentNode="currentNode" @add-success="getDespts"/>
    </div>
  </div>
</template>

<script>
import treeTools from './compoments/tree-tools.vue'
import { getDesptsApi } from '@/api/departments'
import { transListTree } from '@/utils'
import AddDept from './compoments/add-dept.vue'
export default {
  data() {
    return {
      departs: [
        { name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' },
        { name: '人事部' },
      ],
      defaultProps: {
        label: 'name',
      },
      dialogVisible: false,
      currentNode:{},
      loading:false
    }
  },
  components: {
    treeTools,
    AddDept
  },

  created() {
    this.getDespts()
  },

  methods: {
    async getDespts() {
      this.loading = true
      const res = await getDesptsApi()
      console.log(res)
      this.departs = transListTree(res.depts, '')
      this.loading = false 
    },
    showAddDept(val) {
      this.dialogVisible = true
      this.currentNode = val
    },
    showEdit(val) {
      this.dialogVisible = true
      this.$refs.addDept.getDeptById(val.id)
    }

  },
}
</script>

<style scoped lang="less"></style>
