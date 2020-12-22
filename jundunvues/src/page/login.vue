<template>
    <div class="login-container">
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
        <h2 class="login-title">管理系统</h2>
        <br>
        <el-form-item label="用户名" prop="username" style="margin-right: 30px;">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="margin-right: 30px;">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm()" style="margin-left: 70px;">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>

    <script>
  export default {
    data() {
      return {
        form: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: 'blur'},
            {min: 3, max: 12, message: "用户名3-5位", trigger: 'blur'}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: 'blur'},
            {min: 1, max: 20, message: "密码1-20位", trigger: 'blur'}
          ]
      }
      };
    },

    methods: {
      denglu() {
        //链接地址
        let url = "login/denglu";
        //2、参数
        let param = {
          phone: this.form.username,
          pass: this.form.password
        }
        //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
        this.$myhttp.getObj(url, param, (pager) => {
          console.log("值",pager);
          if(pager!=null){
                  this.$router.push({
          name: '/home',
        }, );
    this.$message({
               message: '登录成功！',
               type: 'success'
             });
          }else{
               this.$message({
               message: '账号或密码错误',
               type: 'warning'
             });
             return false;
          }
        });

      },
      submitForm() {
        if(this.form.username==null || this.form.username==''){
               this.$message({
                    message: '用户名不能为空',
                    type: 'warning'
                  });
                  return false;

        }else if(this.form.password==null || this.form.password==''){
          this.$message({
               message: '密码不能为空',
               type: 'warning'
             });
             return false;
        }else{
          this.denglu();
        }

      }
    }
  };
  </script>

  <style scoped>
  .login-form {
    width: 350px;
    margin: 160px auto; /* 上下间距160px，左右自动居中*/
    background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
    padding: 30px;
    border-radius: 20px; /* 圆角 */
  }

  /* 背景 */
  .login-container {
    position: absolute;
    width: 100%;
    height: 104%;
    background: url("/static/img/login.jpg");
  }

  /* 标题 */
  .login-title {
    color: #303133;
    text-align: center;
  }
  </style>
