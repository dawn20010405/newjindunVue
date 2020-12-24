<template>
  <div id="BRAssetsOverview">
    <!-- 顶部查询组件-->
    <div class="topfind">
      <el-row>
        <el-col :span="3">
          <el-select v-model="form.exastype" placeholder="请选择" @change="commind()">
             <el-option
                   v-for="item in options1"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="form.exasnum" placeholder="请输入领用编号"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="commind()"></el-button>
        </el-col>
        <el-col :span="2" style="line-height: 40px;">
          <span>共{{total}}条</span>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="">新增领用记录</el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 查询结果组件-->
    <el-table :data="exchangeassetslist" border style="width: 100%;" >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="序号">
              <span>{{ props.row.exchangeassetsid }}</span>
            </el-form-item>
            <el-form-item label="备注">
              <span>{{ props.row.exasfollow | nothingpull }}</span>
            </el-form-item>
            <el-form-item label="归还时间">
              <span>{{ props.row.exasback |  dateYMDHMSFormat2 | nothingpull}}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="exchangeassetsid" label="序号" align="center"></el-table-column> -->
      <el-table-column prop="exchassetsname" label="名称" align="center"></el-table-column>
      <el-table-column prop="exasnum" label="编号" align="center" width="200px"></el-table-column>
      <el-table-column prop="exastype" label="方式" align="center"></el-table-column>
      <el-table-column prop="exasstatus" label="状态" align="center" width="120px"></el-table-column>
      <el-table-column prop="exasstart" label="开始时间" align="center" width="230pxs">
        <template slot-scope="scope">
          <span>{{scope.row.exasstart |  dateYMDHMSFormat2 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="exasreason" label="事由" align="center"></el-table-column>
      <el-table-column  label="详细信息查看" align="center">
        <template slot-scope="scope">
          <el-button type="infor" icon="el-icon-search" @click="openOneExassets(scope.row); oneExassetsVisible=true"></el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="exasfollow" label="备注" align="center"></el-table-column> -->
      <!-- <el-table-column prop="exasback" label="归还时间" align="center" v-if="form.exastype!='领用'"></el-table-column> -->
    </el-table>
    <!-- 分页组件-->
    <el-pagination
          @size-change="exassetsListSizeChange"
          @current-change="exassetsListNumChange"
          :current-page.sync="form.pageNum"
          :page-sizes="[5, 8, 10]"
          :page-size="form.pageSize"
          layout="sizes, prev, pager, next"
          :total="total"
          align="center">
        </el-pagination>

    <el-dialog title="领用归还记录详情" :visible.sync="oneExassetsVisible" class="oneexcontext" width="80%">
      <el-row>
        <el-col :span="3">名称</el-col>
        <el-col :span="9">{{oneexchangeassets.exchassetsname}}</el-col>
        <el-col :span="3">编号</el-col>
        <el-col :span="9">{{oneexchangeassets.exasnum}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">方式</el-col>
        <el-col :span="9">{{oneexchangeassets.exasnum}}</el-col>
        <el-col :span="3">状态</el-col>
        <el-col :span="9">{{oneexchangeassets.exasstatus}}</el-col>
      </el-row>
      <el-row>
        <el-col :span="3">开始时间</el-col>
        <el-col :span="9">{{oneexchangeassets.exasstart | dateYMDHMSFormat2}}</el-col>
        <el-col :span="3">事由</el-col>
        <el-col :span="9">{{oneexchangeassets.exasreason}}</el-col>
      </el-row>
      <!-- oneexchangeassets.codes -->
      <el-table  border style="width: 100%;">
        <el-table-column prop="consumingdetailsid" label="序号" align="center" width="80px"></el-table-column>
        <el-table-column prop="codename" label="申请名称" align="center"></el-table-column>
        <el-table-column prop="codedept" label="申请部门" align="center"></el-table-column>
        <el-table-column prop="codetype" label="方式" align="center"></el-table-column>
        <el-table-column prop="codestatus" label="状态" align="center"></el-table-column>
        <el-table-column prop="codestart" label="办理时间" align="center" width="230px">
          <template slot-scope="scope">
            <span>{{scope.row.codestart |  dateYMDHMSFormat2 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="codesquantity" label="数量" align="center"></el-table-column>
        <el-table-column prop="assets.assetsname" label="物品名称" align="center"></el-table-column>

      </el-table>
      <el-button type=""></el-button>
    </el-dialog>

    <el-dialog title="新增领用记录" :visible.sync="addnewExassetsVisible">
      <el-form  ref="addexassetsform" >
        <el-form-item prop="" label="名称" label-width=""></el-form-item>
        <el-form-item prop="" label="领用方式" label-width=""></el-form-item>
        <el-form-item prop="" label="领用原因" label-width=""></el-form-item>
        <el-form-item prop="" label="领用备注" label-width=""></el-form-item>
        <el-form-item prop="" label="归还时间" label-width=""></el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        //页面控件
        total:0,
        uname:null,
        uid:null,
        oneExassetsVisible:false,
        addnewExassetsVisible:false,
        //查询结果数组
        exchangeassetslist:[],
        oneexchangeassets:{},
        //添加表单
        addexassetsform:{

        },
        //查询组件
        form:{
          pageNum:1,
          pageSize:5,
          exastype:'',
          exasnum:null,
          empid:6,
        },
        options1:[
          {
            value:'领用',
            label:'领用'
          },
          {
            value:'归还',
            label:'归还'
          },
           {
             value:'',
             label:'全部数据'
           },
        ],
      }
    },
    methods:{
      //消息提示
      successopen(msg) {
              this.$message({
                message: msg,
                type: 'success'
              });
       },
       erroropen(msg) {
               this.$message({
                 message: msg,
                 type: 'error'
               });
        },
      //加载所有详情
      loadAll(){
        /* this.nauser(); */
        this.$axios.post('exchangeassets/load',this.$Qs.stringify(this.form))
        .then(r=>{
          if(r.code=1){
            this.exchangeassetslist=r.obj.list;
            this.total=r.obj.total;
            this.form.pageNum=r.obj.pageNum;
            this.form.pageSize=r.obj.pageSize;
             console.log("所有领用归还详情",this.exchangeassetslist);
             this.successopen("查询成功!");
          }else{
            this.erroropen("查询失败！");
          }
        }).catch(function(e) {
           console.log("报错了，错误信息是+", e);
        });

      },
      //分页操作
      exassetsListSizeChange(val){
        this.form.pageSize=val;
        this.form.pageNum=1;
        this.loadAll();
      },
      exassetsListNumChange(val){
        this.form.pageNum=val;
        this.loadAll();
      },
      //获取当前用户
      nauser() {
          let user = sessionStorage.getItem('user');
          var jsonObj = JSON.parse(user);
          console.log("使用者",jsonObj);
          this.uname = jsonObj.ename;
          this.uid = jsonObj.eid;

      },
      //普通查询
      commind(){
        this.loadAll();
      },
      //查询某一条详细信息
      openOneExassets(row){
        var param={
          exchangeassetsid:row.exchangeassetsid,
        }
        this.$axios.post('exchangeassets/findone',this.$Qs.stringify(param))
        .then(r=>{
          if(r.code=1){
            this.oneexchangeassets=r.obj;
             console.log("单条领用归还详情",this.oneexchangeassets);
             this.successopen("查询成功!");
          }else{
            this.erroropen("查询失败！");
          }
        }).catch(function(e) {
           console.log("报错了，错误信息是+", e);
        });

      },


    },

    created() {
        this.loadAll();
    }
  }
</script>

<style>
</style>
<style scoped="scoped">
  #BRAssetsOverview{
    padding: 20px;
  }
  .topfind{
      margin: 20px 0;
    }
    .demo-table-expand {
        font-size: 0;
      }
      .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
      }
      .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
      }

    .oneexcontext .el-row{
      padding: 10px;

      font-size: 14px;
    }
</style>
