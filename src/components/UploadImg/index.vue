<template>
  
<div>
    <el-upload
  action="#"
   v-loading="loading"
    element-loading-text="加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  list-type="picture-card"
  :http-request="onRequest"
  :file-list="fileList"
  :on-change="onChange"
  :on-preview="onPreview"
  :on-remove="onRemove"
  :limit="1" 
  class="custom-upload"
  :class="fileList.length ? 'hide' : ''"
  :before-upload="beforeUpload"
  >
  <i class="el-icon-plus"></i>
</el-upload>
<el-dialog :visible.sync="PreviewImgDialog">
    <img :src="urlImg" alt="">
</el-dialog>
</div>
  
</template>

<script>
// id : AKIDd7MPTP8d4MPDl47uSkpgIfsvjIbfU8Yj
// key : zjETSChxykHZdT4QXP2RbWCdokQr30iB
var COS = require('cos-js-sdk-v5');
var cos = new COS({
    SecretId: 'AKIDd7MPTP8d4MPDl47uSkpgIfsvjIbfU8Yj',
    SecretKey: 'zjETSChxykHZdT4QXP2RbWCdokQr30iB',
});

// SECRETID 和 SECRETKEY请登录 https://console.cloud.tencent.com/cam/capi 进行查看和管理

// console.log(cos);

export default {
    name:'UploadImg',
  data () {
    return {
        fileList:[],
        urlImg:'',
        PreviewImgDialog:false,
        loading:false,
    }
  },

  created () {

  },

  methods: {
    onRequest({file}) {
        this. loading = true;
        console.log('上传图片');
        
cos.putObject({
    Bucket: 'hr-31-8-15-1313341656', /* 必须 */
    Region: 'ap-shanghai',     /* 存储桶所在地域，必须字段 */
    Key: file.name,              /* 必须 */
    StorageClass: 'STANDARD',
    Body: file, // 上传文件对象
    onProgress: function(progressData) {
        console.log(JSON.stringify(progressData));
    }
}, 
(err, data)=> {
    this. loading = false;
    if(err || data.statusCode !== 200){
        return this.$$message.error('亲，上传失败，请重试')
    }
    this.$emit('onSuccess',{
    url:'https://'+ data.Location
})
}

);
    },
    // 跟新list的长度
    onChange(file,fileList) {
        console.log('上传',fileList);
        this.fileList = fileList;
    },
    // 点击预览
    onPreview(file) {
        this.PreviewImgDialog = true
        console.log(file);
        this.urlImg = file.url
    },
    // 删除
    onRemove(file,fileList) {
        console.log('上传',fileList);
        this.fileList = fileList;
    },
    // 上传前的 检查
    beforeUpload(file) {
        // 可以选择上传图片的 类型
        const types = ['image/jpeg','image/gif']
            if(!types.includes(file.type)) {
                this.$message.error('请选择'+ types.join('、') + '图片')
                return false
            }
            console.log('上传前的检查',file);
            // 限制上传的图片
        const maxSize = 2 * 1024 * 1024
        if(file.size > maxSize) {
            this.$message.error('选择的图片不能超过2Mb')
            return false
        }
    }
  }
}
</script>

<style scoped lang='less'>
.hide .el-upload--picture-card {
    display: none;
}
.custom-upload {
    width: 148px;
    height: 148px;
    overflow: hidden;
}
</style>
