<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginFormRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">
          <!-- 放置标题图片 @是设置的别名-->
          <div class="title-container">
            <h3 class="title">
              <img src="@/assets/common/login-logo.png" alt="" />
            </h3>
          </div>
        </h3>
      </div>

      <el-form-item prop="mobile">
        <i class="el-icon-user-solid svg-container"></i>
        <el-input v-model="loginForm.mobile"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <i class="svg-container">
          <svg-icon iconClass="password"></svg-icon>
        </i>
        <el-input type="password" v-model="loginForm.password"></el-input>
      </el-form-item>

      <el-button
        type="primary"
        class="loginBtn"
        style="width: 100%; margin-bottom: 30px"
        :loading="isLogin"
        @click="loginFormFn"
        >登录</el-button
      >

      <div class="tips">
        <span style="margin-right: 20px">账号: 13800000002</span>
        <span> 密码: 123456</span>
      </div>
    </el-form>
  </div>
  <!-- 人资后台管理 -->
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        mobile: '13800000004',
        password: '123456',
      },
      loginFormRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            pattern:
              /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[189]))\d{8}$/,
            message: '手机号码格式不正确',
          },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          // {
          //   pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z\W_!@#$%^&*`~()-+=]+$)(?![0-9\W_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9\W_!@#$%^&*`~()-+=]/,
          //   message: '密码格式不正确，请输入数组，字母，字符， 并且不少于6位',
          // },
        ],
      },
      isLogin:false
    }
  },
  methods: {
    // loginFormFn() {
    //   // console.log(11);
    //   this.$refs.loginForm.validate((valid,err)=>{
    //     console.log(valid);
    //     console.log(err);
    //   })
    // }
    async loginFormFn() {
      // console.log(11);
      this.isLogin = true
      try {
        await this.$refs.loginForm.validate()
       await this.$store.dispatch('user/getToken',this.loginForm)
        this.$router.push('/')
        this.$message.success('登录成功')
      } catch (error) {
        console.log(error);
      } finally{
        this.isLogin = false
      }
    },
  },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #68b0fe;
$cursor: #68b0fe;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  
  background-image: url('~@/assets/common/login.jpg'); // 设置背景图片
  background-position: center; // 将图片位置设置为充满整个屏幕
  .el-form-item__error {
    color: #fff;
  }
  .loginBtn {
    background: #407ffe;
    height: 64px;
    line-height: 32px;
    font-size: 24px;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.7); // 输入登录表单的背景色
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
