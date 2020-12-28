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
          <el-input disabled v-model="resumes.rname"></el-input>
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
            type="datetime"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="面试地点">
          <el-select class="wids" v-model="interViewForm.inaddress" filterable placeholder="请选择">
            <el-option
              v-for="item in inAddressOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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

    <!-- 入职新增-->
    <el-drawer
      :visible.sync="drawszs"
      :direction="direction"
      size="40%"
      >
      <el-form :model="entryForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="姓名">
          <el-input disabled v-model="resumes.rname"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <template>
            <span v-if="resumes.rsex==0">
              <el-input disabled>女</el-input>
            </span>
            <span v-if="resumes.rsex==1">
              <el-input disabled>男</el-input>
            </span>
          </template>
        </el-form-item>
        <el-form-item label="电话">
          <el-input-number v-model="entryForm.eniphone"></el-input-number>
        </el-form-item>
        <el-form-item label="学历">
          <el-input disabled v-model="resumes.education"></el-input>
        </el-form-item>
        <el-form-item label="岗位">
          <el-input disabled v-model="poname">
          </el-input>
        </el-form-item>
        <el-form-item label="薪水">
          <el-input-number v-model="entryForm.emoney">
          </el-input-number>
        </el-form-item>
        <el-form-item label="到岗日期">
          <el-date-picker
            style="width: 213px;"
            v-model="entryForm.gotime"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addEntry">确定</el-button>
          <el-button @click="drawszs=false">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>

    <!-- 面试结果查询-->
    <el-drawer
      :visible.sync="drawz"
      :direction="direction"
      size="40%"
      >
      <el-form :model="inc">
        <el-row class="elRow">
          <el-col><div class="grid-content bg-purple">应聘人</div></el-col>
          <el-col><div class="grid-content bg-purple-light">{{rname}}</div></el-col>
        </el-row>
        <el-row class="elRow">
          <el-col><div class="grid-content bg-purple">应聘岗位</div></el-col>
          <el-col><div class="grid-content bg-purple-light">{{poname}}</div></el-col>
        </el-row>
        <el-row class="elRow">
          <el-col><div class="grid-content bg-purple">面试类型</div></el-col>
          <el-col><div class="grid-content bg-purple-light">{{inc.intype}}</div></el-col>
        </el-row>
        <el-row class="elRow">
          <el-col><div class="grid-content bg-purple">面试时间</div></el-col>
          <el-col><div class="grid-content bg-purple-light">{{inc.intime}}</div></el-col>
        </el-row>
        <el-row class="elRow">
          <el-col><div class="grid-content bg-purple">面试地点</div></el-col>
          <el-col><div class="grid-content bg-purple-light">{{inc.inaddress}}</div></el-col>
        </el-row>
        <el-row class="elRow">
          <el-col><div class="grid-content bg-purple">面试结果</div></el-col>
          <template>
            <el-col v-if="inc.iresult==1">
              <div class="grid-content bg-purple-light">录用</div>
            </el-col>
            <el-col v-if="inc.iresult==0">
              <div class="grid-content bg-purple-light">弃用</div>
            </el-col>
          </template>
        </el-row>
        <el-row class="elRow">
          <el-col><div class="grid-content bg-purple">备注</div></el-col>
          <el-col><div class="grid-content bg-purple-light">{{inc.iremark}}</div></el-col>
        </el-row>
        <p style="margin-top: 20px;margin-left: 20px;">
          <el-button @click="drawz=false">关闭</el-button>
        </p>
      </el-form>
    </el-drawer>

    <el-tabs v-model="activeName" id="martop_tabs">

    <!-- 面试记录新增-->
    <el-dialog
    title="面试记录新增"
      :visible.sync="dialogVisiblzz"
      width="32%">
      <el-form :model="intcord">
        <el-form-item label="备注:" style="margin-top: 30px;">
          <el-input :autosize="{ minRows: 2, maxRows: 8}" type="textarea" style="width: 240px;" v-model="intcord.iremark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisiblzz = false" style="float: left;">取 消</el-button>
        <el-button type="primary" @click="addIntrecord">确 定</el-button>
      </span>
    </el-dialog>

      <!-- 简历查询-->
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
              <template slot-scope="r">
                <span v-if="r.row.rsex==0">
                  <el-tag type="danger">女</el-tag>
                </span>
                <span v-if="r.row.rsex==1">
                  <el-tag>男</el-tag>
                </span>
              </template>
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
                <span v-if="r.row.rstype==1">
                  <el-button type="text" size="mini" @click="openTheDrawers(r.row)">预约面试</el-button>
                </span>
                <span v-if="r.row.rstype==0">
                  <el-button type="text" disabled size="mini" @click="openTheDrawers(r.row)">预约面试</el-button>
                </span>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[1, 2, 3, 5, 7, 8]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
      </el-tab-pane>

      <!-- 面试查询-->
      <el-tab-pane label="面试管理" name="second">
        <el-table
            :data="interviewData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="resu.rname"
              label="应聘人"
              width="100">
            </el-table-column>
            <el-table-column
              prop="intype"
              label="面试类型">
              <template slot-scope="i">
                <span v-if="i.row.intype==0">
                  <el-tag type="warning">一般面试</el-tag>
                </span>
                <span v-if="i.row.intype==1">
                  <el-tag>人事面试</el-tag>
                </span>
                <span v-if="i.row.intype==2">
                  <el-tag>经理面试</el-tag>
                </span>
                <span v-if="i.row.intype==3">
                  <el-tag type="success">总裁面试</el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="intime"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              label="面试时间">
            </el-table-column>
            <el-table-column
              prop="inaddress"
              label="面试地点">
            </el-table-column>
            <el-table-column
              prop="resu.recru.posi.poname"
              label="面试职位">
            </el-table-column>
            <el-table-column
              label="操作">
              <template slot-scope="i">
                  <el-button type="text" :disabled="a" size="mini" @click="openTheDrawerz4(i.row)">办理入职</el-button>
                  <el-button type="text" :disabled="a" size="mini" @click="openTheDrawers1(i.row)">录用</el-button>
                  <el-button type="text" :disabled="a" size="mini" @click="openTheDrawers2(i.row)">弃用</el-button>
                  <el-button type="text" :disabled="a" size="mini" @click="openTheDrawers3(i.row)">查看结果</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChanges"
            @current-change="handleCurrentChanges"
            :current-page="currents"
            :page-sizes="[1, 2, 3, 5, 7, 8]"
            :page-size="pagesizes"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totals">
          </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="入职管理" name="ruzhi">
        <el-table
            :data="entryData"
            stripe
            style="width: 100%">
            <el-table-column
              prop="resu.rname"
              label="应聘人"
              width="100">
            </el-table-column>
            <el-table-column
              prop="resu.recru.posi.dept.dname"
              label="部门">
            </el-table-column>
            <el-table-column
              prop="resu.recru.posi.poname"
              label="岗位">
            </el-table-column>
            <el-table-column
              prop="emoney"
              label="薪水">
            </el-table-column>
            <el-table-column
              prop="gotime"
              label="到岗日期">
            </el-table-column>
            <el-table-column
              prop="creatime"
              label="创建日期">
            </el-table-column>
          </el-table>
          <el-pagination
            @size-change="handleSizeChangesz"
            @current-change="handleCurrentChangesz"
            :current-page="currentsz"
            :page-sizes="[1, 2, 3, 5, 7, 8]"
            :page-size="pagesizesz"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalsz">
          </el-pagination>
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
        total:0,
        pagesize:5,
        current:1,
        totals:0,
        pagesizes:5,
        currents:1,
        totalsz:0,
        pagesizesz:5,
        currentsz:1,
        entryData:[],
        interViewForm:{},
        interviewData:[],
        dialogVisiblzz:false,
        intcord:{},
        incor:{},
        aaa:false,
        drawszs:false,
        inc:{
          intype:null,
          intime:null,
          inaddress:null,
          iresult:null,
          iremark:null
        },
        iresult:undefined,
        drawz:false,
        entryForm:{},
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
            value: '0',
            label: '一般面试'
          }, {
            value: '1',
            label: '人事面试'
          }, {
            value: '2',
            label: '经理面试'
          }, {
            value: '3',
            label: '总裁面试'
          }
        ],
        inAddressOption:[
          {
            value: '会议室1',
            label: '会议室1'
          }, {
            value: '会议室2',
            label: '会议室2'
          }, {
            value: '会议室3',
            label: '会议室3'
          }, {
            value: '会议室4',
            label: '会议室4'
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
        let params={
          pagesize:this.pagesize,
          pagenum:this.current
        }
        this.recruit=this.$route.query.recru;
        this.updateRecruForm=this.$route.query.recru;
        this.poname=this.recruit.posi.poname;
        this.rid=this.recruit.rid;
        let p = this.$Qs.stringify(params);
        this.$axios.post("/resum/finall/"+this.rid,p).then(r=>{
          console.log("A：",r);
          this.resumeData=r.list;
          console.log("rstype：",r.list[0].rstype);
          this.total=r.total;
        });
        this.displayButton();
      },
      loadData3(){
        let params={
          pagesize:this.pagesizes,
          pagenum:this.currents
        }
        let p = this.$Qs.stringify(params);
        this.$axios.post("/intview/finall",p).then(r=>{
          console.log("B：",r);
          this.interviewData=r.list;
          console.log("poname：",r.list[0].resu.recru.posi.poname);
          this.totals=r.total;
        });
        this.displayButton();
      },
      loadData5(){
        let params={
          pagesize:this.pagesizesz,
          pagenum:this.currentsz
        }
        let p = this.$Qs.stringify(params);
        this.$axios.post("/entry/finall",p).then(r=>{
          console.log("C：",r);
          this.entryData=r.list;
          this.totalsz=r.total;
        });
        this.displayButton();
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
        handleSizeChange(pagesize){
          this.pagesize=pagesize;
          this.loadData();
        },
        handleCurrentChange(pagenum) {
          this.current = pagenum;
          this.loadData();
        },
        handleSizeChanges(pagesizes){
          this.pagesizes=pagesizes;
          this.loadData3();
        },
        handleCurrentChanges(pagenums) {
          this.currents = pagenums;
          this.loadData3();
        },
        handleSizeChangesz(pagesizesz){
          this.pagesizesz=pagesizesz;
          this.loadData5();
        },
        handleCurrentChangesz(pagenumsz) {
          this.currentsz = pagenumsz;
          this.loadData5();
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
      },
      openTheDrawers1(i){
        this.dialogVisiblzz=true;
        this.incor=i;
        this.iresult=1;
      },
      openTheDrawers2(i){
        this.dialogVisiblzz=true;
        this.incor=i;
        this.iresult=0;
      },
      openTheDrawers3(i){
        console.log("Iid：",i);
        this.drawz=true;
        this.$axios.post("/intcord/getOne/"+i.iid).then(r=>{
          console.log("R：",r);
          this.inc={
            intype:r.obj.invw.intype,
            intime:r.obj.invw.intime,
            inaddress:r.obj.invw.inaddress,
            iresult:r.obj.iresult,
            iremark:r.obj.iremark
          }
        })
      },
      openTheDrawerz4(i){
        this.drawszs=true;
      },
      addInterView(){
        //判断是否输入面试类型
        if(this.interViewForm.intype==null | this.interViewForm.intype==""){
          this.$message({
            message:"请选择面试类型",
            type:"warning"
          })
        //判断选择面试时间
        }else if(this.interViewForm.intime==null | this.interViewForm.intime==""){
          this.$message({
            message:"请选择面试时间",
            type:"warning"
          })
        //判断选择面试地点
        }else if(this.interViewForm.inaddress==null | this.interViewForm.inaddress==""){
          this.$message({
            message:"请选择面试地点",
            type:"warning"
          })
        }else{
          let params={
            intype:this.interViewForm.intype,
            intime:this.interViewForm.intime,
            inaddress:this.interViewForm.inaddress,
            rsid:this.resumes.rsid
          }
          console.log("Params：",params);
          let p = this.$Qs.stringify(params);
          this.$axios.post("/intview/insert",p).then(r=>{
            if(r.code==1){
              this.loadData3();
            }
          })
        }
      },
      addIntrecord(){
        let params={
          iresult:this.iresult,
          iremark:this.intcord.iremark,
          iid:this.incor.iid
        }
        console.log("Params：",params);
        let p = this.$Qs.stringify(params);
        this.$axios.post("/intcord/insert",p).then(r=>{
          if(r.code==1){
          }
        })
      },
      /* 新增入职信息*/
      addEntry(){
        if(this.entryForm.emoney==null | this.entryForm.emoney==""){
          this.$message({
            message:"请输入薪水",
            type:"warning"
          })
        //判断选择到岗时间
        }else if(this.entryForm.gotime==null | this.entryForm.gotime==""){
          this.$message({
            message:"请选择到岗时间",
            type:"warning"
          })
        //判断电话号码
        }else if(this.entryForm.eniphone==null | this.entryForm.eniphone==""){
          this.$message({
            message:"请输入电话号码",
            type:"warning"
          })
        }else{
          let params={
            rsid:this.resumes.rsid,
            emoney:this.entryForm.emoney,
            gotime:this.entryForm.gotime,
            eniphone:this.entryForm.eniphone
          }
          let p = this.$Qs.stringify(params);
          this.$axios.post("/entry/insert",p).then(r=>{
            if(r.code==1){
              this.loadData5();
            }
          })
        }
      }
    },
    mounted(){
      this.loadData();
      this.loadData3();
      this.loadData5();
    }
  }
</script>

<style scoped="scoped">
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
    /* margin-left: 5.5%; */
    margin-top: 7px;
  }
  #martop_tabs{
    width: 95%;
    margin: 0px auto;
    margin-top: 30px;
    border-top: 2px solid gainsboro;
    border-bottom: 0px white;
  }
  .elRow{
    margin-top: 20px;
    margin-left: 20px;
  }
  .bg-purple-light{
    font-size: 14px;
    color: orange;
  }
</style>
