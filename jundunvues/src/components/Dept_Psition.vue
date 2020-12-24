<template>
  <div id="dept_div">
    <div style="
    background-color: dodgerblue;
    line-height: 70px;
    float: left;
    width: 50%;"
    @click="loadData">
    <h2 style="margin-left: 25px;float: left;color: white;">部门：</h2>
    <!-- 部门新增按钮-->
    <p style="list-style: none;float:right;font-weight: bold;font-size: 26px;">
      <i class="el-icon-plus"
         style="color: lawngreen;"
         @click="dialogVisible=true"></i>
      </p>
    </div>

    <div style="
    background-color: lawngreen;
    line-height: 70px;
    float: left;
    width: 50%;"
    @click="loadData2">
    <h3 style="margin-left: 25px;float: left;color: white;">岗位：</h3>
    <!-- 岗位新增按钮-->
    <p style="list-style: none;float:right;color: dodgerblue;font-weight: bold;font-size: 26px;">
      <i class="el-icon-plus"
         style="color: royalblue;"
         @click="dialogVisibles=true"></i>
       </p>
    </div>

    <el-container style="width:100%;margin: 0px auto;">
      <el-aside width="50%" style="color: dodgerblue;border-right: 1px solid dodgerblue;">
        <div class="dept_left_div">
          <!-- 查询所有部门-->
          <ul v-for="(v,k) in dept">
            <li @click="findPosition(v)">{{v.dname}}</li>
          </ul>
        </div>
        <!-- 部门新增的弹框-->
        <el-dialog
        title="部门新增"
          :visible.sync="dialogVisible"
          width="32%">
          <el-form :model="depts" :rules="deptRule" ref="deptForm">
            <el-form-item label="部门名称:" style="margin-top: 30px;" prop="dname">
              <el-input style="width: 240px;" v-model="depts.dname"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" style="float: left;">取 消</el-button>
            <el-button type="primary" @click="addDept">确 定</el-button>
          </span>
        </el-dialog>
      </el-aside>

      <el-main width="50%"  style="color: lawngreen;border-left: 1px solid lawngreen;">
        <!-- 查询所有岗位或根据部门编号查询对应的岗位-->
        <div class="dept_left_div">
          <ul v-for="(v,k) in position">
            <li>{{v.poname}}</li>
          </ul>
        </div>
        <!-- 岗位新增弹框-->
        <el-dialog
        title="岗位新增"
          :visible.sync="dialogVisibles"
          width="32%">
          <el-form :model="posis" :rules="posiRule" ref="posiForm">
            <el-form-item label="岗位名称:" style="margin-top: 30px;" prop="poname">
              <el-input style="width: 240px;" v-model="posis.poname"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibles = false" style="float: left;">取 消</el-button>
            <el-button type="primary" @click="addPosi">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        dept:[],
        position:[],
        dialogVisible:false,
        dialogVisibles:false,
        depts:{},
        posis:{},
        deptd:{},
        value:1,
        radio:"启用",
        deptRule:{
          dname:[
            { required: true, message: '请输入部门名称', trigger: 'blur' },
            { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
          ]
        },
        posiRule:{
          poname:[
            { required: true, message: '请输入岗位名称', trigger: 'blur' },
            { min: 2, max: 7, message: '长度在 2 到 7 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      /* 查询所有部门*/
      loadData(){
        this.$axios.post("/dept/finall").then(r=>{
          this.dept=r.objs;
        })
      },
      /* 查询所有岗位*/
      loadData2(){
        this.$axios.post("/posi/finall").then(r=>{
          this.position=r.objs;
        })
      },
      /* 根据部门编号查询对应的岗位*/
      findPosition(v){
        this.deptd=v;
        this.$axios.post("/posi/finbydid/"+v.did).then(r=>{
          this.position=r.objs;
        })
      },
      /* 部门新增*/
      addDept(){
        this.$refs["deptForm"].validate((valid) => {
          if (valid) {
            this.depts={
              dname:this.depts.dname
            }
            this.$axios.post("/dept/insert",this.depts).then(r=>{
              if(r.code==1){
                this.loadData();
                this.loadData2();
                this.dialogVisible=false;
              }
            })
          }
        })
      },
      /* 岗位新增*/
      addPosi(){
        this.$refs["posiForm"].validate((valid) => {
          if (valid) {
            console.log("Did：",this.deptd.did);
            if(this.deptd.did==null|this.deptd.did==undefined){
              this.$message({
                message:"请选择部门",
                type:"warning"
              })
            }else{
              let a={
                poname:this.posis.poname,
                did:this.deptd.did
              }
              let posi=this.$Qs.stringify(a);
              this.$axios.post("/posi/insert",posi).then(r=>{
                if(r.code==1){
                  this.loadData();
                  this.loadData2();
                  this.dialogVisibles=false;
                }
              })
            }
          }
        })
      }
    },
    mounted(){
      this.loadData();
      this.loadData2();
    }
  }
</script>

<style>
  .dept_left_div{
    margin-left: 25px;
    list-style: none;
  }
  .dept_left_div li{
    /* margin-left: 20px; */
    list-style: none;
  }
</style>
