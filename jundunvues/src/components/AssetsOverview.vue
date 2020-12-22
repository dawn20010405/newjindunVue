<template>
  <div id="assetsoverview">
    <div class="topfind">
      <el-row>
        <el-col :span="3">
          <el-select v-model="form.assetstype" placeholder="请选择" @change="commind()">
             <el-option
                   v-for="item in options1"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="form.assetsname" placeholder="请输入物品名称"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="commind()"></el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogAddAssetsFormVisible = true">新增登记物品</el-button>
        </el-col>
      </el-row>

      <!-- <el-select v-model="form.assetsgstatus" placeholder="请选择">
         <el-option
               v-for="item in options2"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
      </el-select> -->


    </div>

    <!-- 资产列表-->
    <el-table :data="assetslist" border style="width: 100%;">
        <el-table-column prop="assetsnum" label="编号" align="center" fixed="left" width="180px"></el-table-column>
        <el-table-column prop="assetsname" label="名称" align="center" fixed="left" width="160px"></el-table-column>
        <el-table-column prop="assetstype" label="分类" align="center" fixed="left" width="160px"></el-table-column>
        <el-table-column prop="assetsquantity" label="存放数量" fixed="left" width="120px" align="center"></el-table-column>
        <el-table-column prop="assetsretime" label="登记日期" align="center" width="240px">
          <template slot-scope="scope">
            <span>{{scope.row.assetsretime |  dateYMDHMSFormat2 }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="assetsstatus" label="资产状态" align="center"></el-table-column> -->
        <el-table-column prop="assetsorivalue" label="资产原值" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.assetsorivalue |  numberToMoney | nothingpull }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assetsgstatus" label="物品状态" align="center" fixed="right"></el-table-column>

    </el-table>


    <!-- 新增物品弹窗内容-->
    <el-dialog title="新增登记物品" :visible.sync="dialogAddAssetsFormVisible">
      是否关联物品
      <el-switch
        v-model="connextvalue"
        active-color="#13ce66"
        inactive-color="#ff4949"
        @change="">
      </el-switch>
      <el-form :model="addassetsform">
        <el-form-item label="物品名称" :label-width="formLabelWidth">

        </el-form-item>
        <el-form-item label="物品类别" :label-width="formLabelWidth"></el-form-item>

        <el-form-item label="物品价值" :label-width="formLabelWidth"></el-form-item>
        <el-form-item label="物品数量" :label-width="formLabelWidth"></el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddAssetsFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogAddAssetsFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        //查询结果
        assetslist:[],
        //页面控件
        total:0,
        dialogAddAssetsFormVisible: false,
        formLabelWidth: '120px',
        connextvalue:false,
        //查询控件
        form:{
          pageNum:1,
          pageSize:5,
          assetsname:null,
          assetstype:'',

        },
        value:'',
        //表单组件
        addassetsform:{
          assetsid:null,
          assetsnum:undefined,
          assetsname:undefined,
          assetstype:undefined,
          assetsquantity:undefined,
          assetsretime:undefined,
          assetsgstatus:undefined,
          assetsorivalue:undefined,
          assetsstatus:undefined,
        },

        //表单验证
        addassetsrules:{

        },
        //选项
        /* options2:[
          {
            value:'未领用',
            label:'未领用'
          },
          {
            value:'已领用',
            label:'已领用'
          },
           {
             value:'',
             label:'全部数据'
           },
        ], */
        options1:[
          {
            value:'非低值消耗类',
            label:'非低值消耗类'
          },
          {
            value:'低值消耗类',
            label:'低值消耗类'
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
      //加载所有的资产详情
      loadAll(){
        let user = sessionStorage.getItem('user');
        var jsonObj = JSON.parse(user);
        console.log(jsonObj);
        this.$axios.post('/assets/load',this.$Qs.stringify(this.form))
        .then(r=>{
          if(r.code=1){
            this.assetslist=r.obj.list;
            this.total=r.obj.total;
            this.form.pageNum=r.obj.pageNum;
            this.form.pageSize=r.obj.pageSize;
             console.log("所有资产详情",this.assetslist);
             this.successopen("查询成功!");
          }else{
            this.erroropen("查询失败！");
          }
        }).catch(function(e) {
           console.log("报错了，错误信息是+", e);
        });
      },
      //复合条件查询
      commind(){
        this.loadAll();
      },

      //新增资产
      addAssets(){

      },

    },

    created() {
        this.loadAll();
    },

  }
</script>

<style>
</style>
<style scoped="scoped">
  #assetsoverview{
  padding: 20px;
  }
  .topfind{
    margin: 20px 0;
  }
 </style>
