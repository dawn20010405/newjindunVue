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
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addnewExassetsVisible=true">新增领用记录</el-button>
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
      <el-table :data="oneexchangeassets.codes" border style="width: 100%;">
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
      <el-dialog
        width="80%"
        title="资产选择"
        :visible.sync="addnewExassetsinnerVisible"
        append-to-body
      >
      <el-tabs v-model="activeName">
        <el-tab-pane label="低值消耗品" name="first" >
          <el-table :data="assetslittlelist" border style="width: 100%;" max-height="250">
            <el-table-column prop="assetsnum" label="编号" align="center" fixed="left" ></el-table-column>
            <el-table-column prop="assetsname" label="名称" align="center" fixed="left" ></el-table-column>
            <el-table-column prop="assetsquantity" label="存放数量" fixed="left"  align="center"></el-table-column>
            <!-- <el-table-column prop="assetsretime" label="登记日期" align="center" width="240px">
              <template slot-scope="scope">
                <span>{{scope.row.assetsretime |  dateYMDHMSFormat2 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="assetsorivalue" label="资产原值" align="center">
              <template slot-scope="scope">
                <span>{{scope.row.assetsorivalue |  numberToMoney | nothingpull }}</span>
              </template>
            </el-table-column> -->
           <!-- <el-table-column prop="assetsgstatus" label="物品状态" align="center" fixed="right">
              <template slot-scope="scope">
                <el-tag  :type="tagcheck(scope.row)">
                  {{scope.row.assetsgstatus}}
                </el-tag>
              </template>
            </el-table-column> -->
            <el-table-column  label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="addlittle(scope.$index,scope.row)">添加</el-button>
              </template>
            </el-table-column>
          </el-table>

          <!-- 已经加入的低值消耗品-->

        </el-tab-pane>
        <el-tab-pane label="非低值消耗品" name="second">
           <el-table :data="assetsmustlist" border style="width: 100%;" max-height="250">
             <el-table-column prop="assetsnum" label="编号" align="center" fixed="left" ></el-table-column>
             <el-table-column prop="assetsname" label="名称" align="center" fixed="left" ></el-table-column>
             <el-table-column prop="assetsquantity" label="存放数量" fixed="left"  align="center"></el-table-column>


             <el-table-column  label="操作" align="center">
               <template slot-scope="scope">
                 <el-button @click="addmust(scope.$index,scope.row)">添加</el-button>
               </template>
             </el-table-column>
           </el-table>

          </el-tab-pane>
      </el-tabs>

      <el-row>
        <el-col :span="12">
          <span>已加入的低值消耗品</span>
          <el-table :data="exassetslittlelist" border style="width: 100%;margin-top: 20px;" max-height="250">
              <el-table-column prop="assetsnum" label="编号" align="center" fixed="left" width="220px"></el-table-column>
              <el-table-column prop="assetsname" label="名称" align="center" fixed="left" width="160px"></el-table-column>
              <el-table-column prop="codesquantity" label="领用数量" fixed="left" width="120px" align="center"></el-table-column>

              <el-table-column  label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="littlelistdelete(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12">
          <span>已加入的非低值消耗品</span>
          <el-table :data="exassetsmustlist" border style="width: 100%;margin-top: 20px;" max-height="250">
              <el-table-column prop="assetsnum" label="编号" align="center" fixed="left" width="220px"></el-table-column>
              <el-table-column prop="assetsname" label="名称" align="center" fixed="left" width="160px"></el-table-column>
              <el-table-column prop="codesquantity" label="领用数量" fixed="left" width="120px" align="center"></el-table-column>

              <el-table-column  label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="mustlistdelete(scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="11">
          <el-button @click="addnewExassetsinnerVisible=false;">取消</el-button>
          <el-button @click="addnewExassetsinnerVisible=false;makesure()" type="primary">确认</el-button>
        </el-col>
      </el-row>

      </el-dialog>
      <el-form :model="addexassetsform" ref="addexassetsform" >
        <el-row>
          <el-col :span="12">
            <el-form-item prop="exchassetsname" label="名称" label-width="80px">
              <el-input v-model="addexassetsform.exchassetsname"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="exastype" label="领用方式" label-width="80px">
              <el-select v-model="addexassetsform.exastype" placeholder="请选择"  style="width: 100% ;">
                 <el-option
                       v-for="item in exastypeOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item prop="exasreason" label="领用原因" label-width="80px">
              <el-input v-model="addexassetsform.exasreason"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="exasfollow" label="领用备注" label-width="80px">
              <el-input v-model="addexassetsform.exasfollow"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :span="2">
          <el-button @click="cleart()" type="warning">重置</el-button>
        </el-col>
        <el-col :span="17" :offset="5">
          <el-button @click="addnewExassetsVisible=false;clear();reset();" type="infor">取消</el-button>
          <el-button @click="addnewExassetsinnerVisible=true;" type="primary" plain>选择需要得物资</el-button>
          <el-button @click="lastMakeNewEx()" type="success">确认添加新申请</el-button>
        </el-col>
      </el-row>
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
        addnewExassetsinnerVisible:false,
        activeName:'first',
        //查询结果数组
        exchangeassetslist:[],
        oneexchangeassets:{},
        assetslittlelist:[],
        assetsmustlist:[],
        //加入的低值消耗品
        exassetslittlelist:[],
        //加入的非低值消耗品
        exassetsmustlist:[],
        //总的领用清单
        exassetsalllist:[],
        //添加表单
        addexassetsform:{
          exchangeassetsid:null,
          exchassetsname:null,
          exasnum:null,
          exastype:null,
          exasstatus:'领用完成',
          exasstart:null,
          exasreason:null,
          exasfollow:null,
          exasback:null,
          codes:[],
        },
        Consumingdetails:{
          consumingdetailsid:null,
          codename:null,
          codedept:null,
          codetype:'领用',
          codestatus:'领用完成',
          codestart:null,
          codesquantity:0,
          assets:{
            assetsid:null,
          }
        },
        //查询组件
        form:{
          pageNum:1,
          pageSize:5,
          exastype:'',
          exasnum:null,
          empid:6,
        },
        littleform:{

          assetstype:'低值消耗类',
        },
        mustform:{

          assetstype:'非低值消耗类',
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
        exastypeOptions:[
          {
            value:'长期领用',
            label:'长期领用'
          },
          {
            value:'短期领用',
            label:'短期领用'
          }
        ],

        //标签checke
        tagcheck(row){
          if(row.assetsgstatus == '未领用'){
            return 'success';
          }else if(row.assetsgstatus == '已领用'){
            return 'warning';
          }
        },


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
        warningopen(msg) {
                this.$message({
                  message: msg,
                  type: 'warning'
                });
         },
         //清理数据
         clear(){
           this.addexassetsform=this.$options.data().addexassetsform;
           this.exassetslittlelist=this.$options.data().exassetslittlelist;
           this.exassetsmustlist=this.$options.data().exassetsmustlist;
           this.exassetsalllist=this.$options.data().exassetsalllist;
           this.Consumingdetails=this.$options.data().Consumingdetails;
         },
         cleart(){
           this.addexassetsform=this.$options.data().addexassetsform;
         },
        //新增新的领用申请
         lastMakeNewEx(){
           console.log(this.addexassetsform);
          this.$axios.post('exchangeassets/addone',this.addexassetsform)
          .then(r=>{
          if(r.code=1){
             this.successopen("新增成功!");
             this.clear();
             this.reset();
          }else{
            this.erroropen("新增失败！");
          }
        }).catch(function(e) {
           console.log("报错了，错误信息是+", e);
        });
         },

       //最终领用资产列表
         makesure(){
          for(var i=0;i<this.exassetslittlelist.length;i++){
            this.Consumingdetails.assets.assetsid=this.exassetslittlelist[i].codeassetsid;
            this.Consumingdetails.codesquantity=this.exassetslittlelist[i].codesquantity;
            this.addexassetsform.codes.push(JSON.parse(JSON.stringify(this.Consumingdetails)));
          }
          for(var i=0;i<this.exassetsmustlist.length;i++){
            this.Consumingdetails.assets.assetsid=this.exassetsmustlist[i].codeassetsid;
            this.Consumingdetails.codesquantity=this.exassetsmustlist[i].codesquantity;
            this.addexassetsform.codes.push(JSON.parse(JSON.stringify(this.Consumingdetails)));
          }
            console.log(this.addexassetsform.codes);
         },

       //低值消耗类删除
       littlelistdelete(index,row){

        for(var i=0;i<this.assetslittlelist.length;i++){
          if(this.assetslittlelist[i].assetsname==row.assetsname){
            this.assetslittlelist[i].assetsquantity=this.assetslittlelist[i].assetsquantity+row.codesquantity;
          }
        }
        this.exassetslittlelist.splice(index,1);
       },
       //非低值消耗类删除
       mustlistdelete(index,row){
        this.exassetsmustlist.splice(index,1);
        this.assetsmustlist.push(row);
       },


      //添加低值消耗类
      addlittle(index,row){
        var good={
          codeassetsid:null,
          assetsname:null,
          assetsnum:null,
          codesquantity:0,
          assetsquantity:0,
        }
        console.log(row);
        if(row.assetsquantity>0){
          if(this.exassetslittlelist.length==0){
            good.codeassetsid=row.assetsid;
            good.assetsname=row.assetsname;
            good.assetsnum=row.assetsnum;
            good.codesquantity=1;
            good.assetsquantity=row.assetsquantity;
            this.assetslittlelist[index].assetsquantity=this.assetslittlelist[index].assetsquantity-1;
            console.log(1);
            this.exassetslittlelist.push(JSON.parse(JSON.stringify(good)));
          }else{
            for(var m=0;m<this.exassetslittlelist.length;m++){
              if(this.exassetslittlelist[m].assetsname==this.assetslittlelist[index].assetsname){
                this.exassetslittlelist[m].codesquantity=this.exassetslittlelist[m].codesquantity+1;
                this.assetslittlelist[index].assetsquantity=this.assetslittlelist[index].assetsquantity-1;
                console.log("新加一个单位");
                break;
              }
              if(m==this.exassetslittlelist.length-1){
                good.codeassetsid=row.assetsid;
                good.assetsname=row.assetsname;
                good.codesquantity=1;
                good.assetsnum=row.assetsnum;
                good.assetsquantity=row.assetsquantity;
                this.assetslittlelist[index].assetsquantity=this.assetslittlelist[index].assetsquantity-1;
                this.exassetslittlelist.push(JSON.parse(JSON.stringify(good)));
              }
            }
          }
        }else{
          this.warningopen("已经到达最大领用数");
          return false;
        }
      },
      //添加非低值消耗类
      addmust(index,row){
        this.assetsmustlist.splice(index,1);
        var good={
          codeassetsid:null,
          assetsname:null,
          assetsnum:null,
          codesquantity:0,
          assetsquantity:0,
        }
        good.codeassetsid=row.assetsid;
        good.assetsname=row.assetsname;
        good.assetsnum=row.assetsnum;
        good.codesquantity=1;
        good.assetsquantity=row.assetsquantity;
        this.exassetsmustlist.push(JSON.parse(JSON.stringify(good)));

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

      //加载低值消耗类
      fassetslittlelist(){
        this.$axios.post('assets/loadtype',this.$Qs.stringify(this.littleform))
        .then(r=>{
          if(r.code=1){
            this.assetslittlelist=r.objs;
             console.log("所有低值资产详情",this.assetslittlelist);

          }else{
            this.erroropen("查询失败！");
          }
        }).catch(function(e) {
           console.log("报错了，错误信息是+", e);
        });

       },
      //加载非低值消耗类
       fassetsmustlist(){
          this.$axios.post('assets/loadtype',this.$Qs.stringify(this.mustform))
          .then(r=>{
            if(r.code=1){
              this.assetsmustlist=r.objs;
               console.log("所有低值资产详情",this.assetsmustlist);

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
      //
      reset(){
        this.loadAll();
        this.fassetslittlelist();
        this.fassetsmustlist();
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
        this.fassetslittlelist();
        this.fassetsmustlist();
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
