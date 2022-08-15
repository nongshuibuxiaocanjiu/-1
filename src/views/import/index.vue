<template>
  <div class="dashboard-container">
    <div class="app-container">
     <UploadExcel :beforeUpload="excelSuccess" :onSuccess="onSuccess"/>
    </div>
  </div>
</template>

<script>
import employees from '@/constant/constant/employees'
import  { importEmployee } from '@/api/employees'
import { formatTime } from '@/filters'
const { mapKeyPath } = employees
export default {
  data() {
    return {}
  },

  created() {},

  methods: {
    excelSuccess({name}) {
      if(!name.endsWith('.xlsx')) {
        this.$message.error('请选择上传文件')
        return false
      }
      console.log('继续上传');
      return true
    },
   async onSuccess({header,results}) {
      
      const newArr = results.map(item => {
            const obj = {}
            for(let key in mapKeyPath) {
               if(key === '入职日期' || key === "转正日期") {
                const timestamp = item[key]
                const date = new Date((timestamp -1) * 24 *3600000)
                date.setFullYear(date.getFullYear() - 70)
                 obj[mapKeyPath[key]] = formatTime(date)
               }else {
                obj[mapKeyPath[key]] = item[key]
               }
            }
            return obj
        })
        // console.log(newArr);
        await importEmployee(newArr)
        this.$message.success('导入成功')
        this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less"></style>
