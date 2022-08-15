<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools>
        <span slot="left-tag">共166条记录</span>
        <template slot="right">
          <el-button
            size="small"
            type="warning"
            @click="$router.push('/import')"
            >导入</el-button
          >
          <el-button size="small" type="danger" @click="excelPort"
            >导出</el-button
          >
          <el-button size="small" type="primary" @click="addShow"
            >新增员工</el-button
          >
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table :data="Employees">
          <el-table-column label="序号" sortable="" type="index" />
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="姓名" sortable="" prop="username">
            <template slot-scope="{ row }">
              <img
                :src="row.staffPhoto"
                v-imgError="require('@/assets/common/head.jpg')"
                style="width: 100px; height: 100px"
                border="50%"
                padding="10px"
              />
            </template>
          </el-table-column>
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column
            label="聘用形式"
            sortable=""
            :formatter="formatterFormOfEmployment"
            prop="formOfEmployment"
          ></el-table-column>
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
            <template slot-scope="{ row }">
              {{ row.timeOfEntry | formatTime }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="" prop="enableState">
            <template slot-scope="{ row }">
              <el-switch
                :value="row.enableState === 1"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template slot-scope="{ row }">
              <el-button type="text" size="small" @click="$router.push('/employees/detail/' + row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small">角色</el-button>
              <el-button type="text" size="small" @click="onRemove(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        >
          <el-pagination
            layout="prev, pager, next"
            @current-change="currentChange"
            :page-size="pages.size"
            :total="total"
          />
        </el-row>
      </el-card>
    </div>
    <addEmployees :visible.sync="showAdd" @add-success="getEmployeesList" />
  </div>
</template>

<script>
import { getEmployeesInfoApi, delEmployee } from '@/api/employees'
import employees from '@/constant/constant/employees'
import addEmployees from './commpoments/addEmployees.vue'
const  {exportExcelMapPath, hireType}  = employees
export default {
  name: 'Employees',
  data() {
    return {
      Employees: [],
      pages: {
        page: 1,
        size: 10,
      },
      total: 0,
      showAdd: false,
    }
  },
  components: {
    addEmployees,
  },

  created() {
    this.getEmployees()
  },

  methods: {
    async getEmployees() {
      const { rows, total } = await getEmployeesInfoApi(this.pages)
      this.Employees = rows
      this.total = total
    },

    currentChange(val) {
      // console.log(val);
      this.pages.page = val
      this.getEmployees()
    },
    formatterFormOfEmployment(row, column, cellValue, index) {
      // if(cellValue === 1) return '正式'
      // if(cellValue === 2) return '非正式'
      // return '未知'
      // 等价于上面，但是这种方法易于维护,推荐写法
      // find找到与之匹配得值,
      const findItem = employees.hireType.find((item) => item.id === cellValue)
      return findItem ? findItem.value : '未知'
    },
    async onRemove(id) {
      await this.$confirm('是否删除该员工？')
      await delEmployee(id)
      this.$message.success('删除成功')
    },
    addShow() {
      this.showAdd = true
    },
    getEmployeesList() {
      this.getEmployees()
    },
    //  excel 导出
    async excelPort() {
      // console.log(11);
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      const { rows } = await getEmployeesInfoApi({
        page:1,
        size:this.total
      })
      const header  =Object.keys(exportExcelMapPath)
      const data = rows.map(item=>{
        return header.map(h=> {
          if( h=== '聘用形式') {
            const findItem = hireType.find(hire =>{
              return hire.id === item[exportExcelMapPath[h]]
            })
            return findItem ? findItem.value :'未知'
          } else {
           return item[exportExcelMapPath[h]]
          }
        })
      })
      export_json_to_excel({
        header, //表头 必填
        data, //具体数据 必填
        filename: 'excel-list', //非必填
        autoWidth: true, //非必填
        bookType: 'xlsx', //非必填
      })
      console.log(export_json_to_excel)
    },
  },
}
</script>

<style scoped lang="less"></style>
