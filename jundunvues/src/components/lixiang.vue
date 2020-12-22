<template>

    <div>
     <el-row>
  <el-col :span="24">
      <div class="grid-content bg-purple-dark">
 <el-col :span="24">
    <el-card shadow="hover" class="li">
        <i class="el-icon-edit-outline" style="font-size: 24px;"></i>
     立项单
    </el-card>
  </el-col>
      </div>
      </el-col>
</el-row>
        <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      prop="xid"
      label="项目编号"
      width="180">
    </el-table-column>
       <el-table-column
      prop="mytype.tname"
      label="项目类型">
    </el-table-column>
    <el-table-column
      prop="xname"
      label="项目名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="myfzr.ename"
      label="负责人">
    </el-table-column>
     <el-table-column
      prop="start"
      label="计划开始时间">
    </el-table-column>
     <el-table-column
      prop="end"
      label="计划结束时间">
    </el-table-column>
     <el-table-column
      prop="evel"
      label="级别">
    </el-table-column>
     <el-table-column
      prop="cdate"
      label="申请时间">
    </el-table-column>
  </el-table>
   
    </div>
  </template>

    <script>
  export default {
    data() {
      return {
           tableData: [],
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

        xiangmu(){
            let url = "login/denglu";
        //2、参数
        let param = {
          phone: this.form.username,
          pass: this.form.password
        }
        //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
        this.$myhttp.getObj(url, param, (pager) => {
          console.log("值",pager);

         }, );
        },
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
            sessionStorage.setItem('user', JSON.stringify(pager));
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
      .li{
          text-align: center;
          font-size: 23px;
      }

  </style>
