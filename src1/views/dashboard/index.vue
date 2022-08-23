<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <UploadImg />
  </div>
</template>

<script>
// id : AKIDd7MPTP8d4MPDl47uSkpgIfsvjIbfU8Yj
// key : zjETSChxykHZdT4QXP2RbWCdokQr30iB
import { mapGetters } from 'vuex'
// var COS = require('cos-js-sdk-v5');

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理
// var cos = new COS({
//     SecretId: 'AKIDd7MPTP8d4MPDl47uSkpgIfsvjIbfU8Yj',
//     SecretKey: 'zjETSChxykHZdT4QXP2RbWCdokQr30iB',
// });
// console.log(cos);

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
