<template>
  <div>
    <!-- 修改-->
    <el-drawer
      :visible.sync="drawer"
      :direction="direction"
      size="40%"
      >
      <el-form :model="updateRecruForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="部门">
          <el-input disabled v-model="updateRecruForm.posi.dept.dname"></el-input>
        </el-form-item>
        <el-form-item label="岗位">
            <el-input disabled v-model="updateRecruForm.posi.poname"></el-input>
        </el-form-item>
        <el-form-item label="需求人数">
          <el-input-number v-model="updateRecruForm.peopcout" :min="1" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="期望日期">
          <el-date-picker
            v-model="updateRecruForm.hopetime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="招聘需求">
          <el-input
            type="textarea"
            disabled
            :autosize="{ minRows: 2, maxRows: 8}"
            placeholder="请输入内容"
            v-model="updateRecruForm.recrudemand">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="updateRecru">确定</el-button>
          <el-button @click="drawer=false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <!-- 招聘查询-->
    <div id="cent_div">
      <div style="overflow: hidden;display: block;clear:both;">
        <div class="retyp_div">
          <p class="tran" v-if="recruit.retype==0">进行中</p>
          <p class="tran" v-if="recruit.retype==1">已完成</p>
          <p class="tran" v-if="recruit.retype==2">已取消</p>
        </div>
        <div style="float: right;">
          <el-button type="warning" :disabled="a" size="mini" @click="drawer=true">招聘变更</el-button>
          <el-button type="danger"  :disabled="a" size="mini" @click="recruCancel">招聘取消</el-button>
        </div>
        <div class="marlef_div">
          <a style="font-size: 20px;font-weight: bold;">{{recruit.posi.dept.dname}}</a>-
          {{recruit.posi.poname}}
        </div>
        <div class="marlef_div">
          期望日期：{{recruit.hopetime}}
        </div>
        <div class="marlef_div">
          需求人数：{{recruit.peopcout}}
        </div>
        <div class="marlef_div">
          创建日期：{{recruit.rcreate}}
        </div>
      </div>
    </div>
    <!-- 简历新增-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%">
        <el-form :model="resumForm" label-width="100px" :rules="rul" class="demo-ruleForm">
          <el-form-item label="姓名" prop="rname">
            <el-input placeholder="请输入姓名" v-model="resumForm.rname"></el-input>
          </el-form-item>
          <el-form-item label="性别">
              <el-radio v-model="rsex" :label="0">女</el-radio>
              <el-radio v-model="rsex" :label="1">男</el-radio>
          </el-form-item>
          <el-form-item label="生日">
            <el-date-picker
              style="width: 213px;"
              v-model="resumForm.rbirthday"
              type="date"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="工作年限">
            <el-select class="wids" v-model="resumForm.workyear" filterable placeholder="请选择">
              <el-option
                v-for="item in workyearOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学历">
            <el-select class="wids" v-model="resumForm.education" filterable placeholder="请选择">
              <el-option
                v-for="item in educationOption"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div>
            <el-button type="primary" @click="addResume">确定</el-button>
            <el-button @click="closeResume">关闭</el-button>
          </div>
        </el-form>
    </el-dialog>
    <!-- 面试新增-->
    <el-drawer
      :visible.sync="drawers"
      :direction="direction"
      size="40%"
      >
      <el-form :model="interViewForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="应聘人">
          <el-input disabled v-model="rname"></el-input>
        </el-form-item>
        <el-form-item label="面试类型">
          <el-select class="wids" v-model="interViewForm.intype" filterable placeholder="请选择">
            <el-option
              v-for="item in intypeOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="面试时间">
          <el-date-picker
            v-model="interViewForm.intime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="面试地点">
          <el-input-number v-model="interViewForm.inaddress" :min="1" :max="300"></el-input-number>
        </el-form-item>
        <el-form-item label="面试职位">
          <el-input disabled v-model="poname">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addInterView">确定</el-button>
          <el-button @click="drawers=false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-tabs v-model="activeName" id="martop_tabs">
      <el-tab-pane label="简历管理" name="first">
        <el-button style="float: right;" :disabled="a" type="primary" @click="dialogVisible=true">新增简历</el-button>
        <el-table
            :data="resumeData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="rname"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="rsex"
              label="性别">
            </el-table-column>
            <el-table-column
              prop="rbirthday"
              label="生日">
            </el-table-column>
            <el-table-column
              prop="workyear"
              label="工作年限">
            </el-table-column>
            <el-table-column
              prop="education"
              label="学历">
            </el-table-column>
            <el-table-column
              prop="createdate"
              label="创建日期">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="r">
                <el-button type="text" size="mini" @click="openTheDrawers(r.row)">预约面试</el-button>
              </template>
            </el-table-column>
          </el-table>
      </el-tab-pane>
      <el-tab-pane label="面试管理" name="second">

      </el-tab-pane>
      <el-tab-pane label="入职管理" name="third">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        activeName: 'first',
        recruit:{},
        resumeData:[],
        dialogVisible:false,
        rid:undefined,
        rsex:0,
        resumForm:{},
        drawer:false,
        direction:'rtl',
        updateRecruForm:{},
        a:false,
        resumes:{},
        rname:null,
        poname:null,
        drawers:false,
        workyearOption:[
          {
            value: '一年及以下',
            label: '一年及以下'
          }, {
            value: '两年',
            label: '两年'
          }, {
            value: '三年',
            label: '三年'
          }, {
            value: '四年',
            label: '四年'
          }, {
            value: '五年及以上',
            label: '五年及以上'
          }
        ],
        educationOption:[
          {
            value: '初中及以下',
            label: '初中及以下'
          }, {
            value: '中职',
            label: '中职'
          }, {
            value: '高职',
            label: '高职'
          }, {
            value: '高中',
            label: '高中'
          }, {
            value: '大专',
            label: '大专'
          }, {
            value: '本科',
            label: '本科'
          }, {
            value: '研究生',
            label: '研究生'
          }, {
            value: '硕士',
            label: '硕士'
          }, {
            value: '博士',
            label: '博士'
          }
        ],
        intypeOption:[
          {
            value: '一般面试',
            label: '一般面试'
          }, {
            value: '人事面试',
            label: '人事面试'
          }, {
            value: '经理面试',
            label: '经理面试'
          }, {
            value: '总裁面试',
            label: '总裁面试'
          }
        ],
        rul:{
          rname:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      /* 查询招聘信息和该招聘的简历信息*/
      loadData(){
        this.recruit=this.$route.query.recru;
        this.updateRecruForm=this.$route.query.recru;
        this.rid=this.recruit.rid;
        this.$axios.post("/resum/finall/"+this.recruit.rid).then(r=>{
          this.resumeData=r.objs;
        })
         this.displayButton();
        // console.log("有值吗？什么值？？",sessionStorage.getItem("key"));
        // console.log("再问一遍：有值吗？什么值？？",this.$route.query.recru);
      },
      /* 新增简历*/
      addResume(){
        //判断性别是否被选择
        if(this.rsex==null | this.rsex==""){
          this.$message({
            message:"请选择性别",
            type:"warning"
          })
        //判断工作年限是否被选择
        }else if(this.resumForm.workyear==null | this.resumForm.workyear==""){
          this.$message({
            message:"请选择工作年限",
            type:"warning"
          })
        //判断学历是否被选择
        }else if(this.resumForm.education==null | this.resumForm.education==""){
          this.$message({
            message:"请选择学历",
            type:"warning"
          })
        }else{
          let params={
            rname:this.resumForm.rname,
            rsex:this.rsex,
            rbirthday:this.resumForm.rbirthday,
            workyear:this.resumForm.workyear,
            education:this.resumForm.education,
            rid:this.rid
          }
          let p=this.$Qs.stringify(params);
          this.$axios.post("/resum/insert",p).then(r=>{
            if(r.code==1){
              this.loadData();
              this.dialogVisible=false;
            }
          })
        }
      },
      /* 关闭新增简历的弹框*/
      closeResume(){
        this.dialogVisible=false;
      },
      /* 修改招聘信息*/
      updateRecru(){
        //判断是否输入人数
        if(this.updateRecruForm.peopcout==null | this.updateRecruForm.peopcout==""){
          this.$message({
            message:"请输入人数",
            type:"warning"
          })
        //判断选择期望日期
        }else if(this.updateRecruForm.hopetime==null | this.updateRecruForm.hopetime==""){
          this.$message({
            message:"请选择期望日期",
            type:"warning"
          })
        }else{
          let params={
            peopcout:this.updateRecruForm.peopcout,
            hopetime:this.updateRecruForm.hopetime,
            rid:this.rid
          }
          let p=this.$Qs.stringify(params);
          this.$axios.post("/recru/update1",p).then(r=>{
            if(r.code==1){
              this.loadData();
              this.drawer=false;
            }
          })
        }
      },
      /* 招聘取消*/
      recruCancel(){
        let params={
          rid:this.rid
        }
        let p=this.$Qs.stringify(params);
        this.$axios.post("/recru/update2",p).then(r=>{
          if(r.code==1){
            this.loadData();
            this.drawer=false;
          }
        })
      },
      /* 将所有按钮禁用*/
      displayButton(){
        if(this.recruit.retype==2){
          this.a=true;
        }
      },
      openTheDrawers(r){
        this.drawers=true;
        this.resumes=r;
        this.rname=r.rname;
      },
      addInterView(){
        let params={
          intype:this.interViewForm.intype;
          intime:this.interViewForm.intime;
          inaddress:this.interViewForm.inaddress;
          rsid:this.resumes.rsid;
        }
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style>
  .tran{
    margin-top: 20px;
    /* margin-left: 20px; */
    border: 2px solid skyblue;
    border-radius: 15px ;
    width: 90px;
    text-align: center;
    font-weight: bold;
    color: skyblue;
  }
  #cent_div{
    margin-top: 10px;
    width:95%;
    margin: 0px auto;
  }
  .marlef_div{
    margin-left: 5.5%;
    margin-top: 10px;
  }
  #martop_tabs{
    width: 95%;
    margin: 0px auto;
    margin-top: 30px;
    border-top: 2px solid gainsboro;
    border-bottom: 0px white;
  }
</style>
