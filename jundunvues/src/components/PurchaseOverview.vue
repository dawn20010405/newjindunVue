<template>
  <div id="purchaseoverview">
      <div class="topfind">
        <el-row>
          <el-col :span="3">
            <el-select v-model="form.purchasetype" placeholder="请选择" @change="commind()">
               <el-option
                     v-for="item in ptypeoptions"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
                   </el-option>
            </el-select>
          </el-col>
          <el-col :span="4">
            <el-input v-model="form.pname" placeholder="请输入采购名称"></el-input>
          </el-col>
          <el-col :span="2">
            <el-button type="primary" icon="el-icon-search" @click="commind()"></el-button>
          </el-col>
          <el-col :span="2" style="line-height: 40px;">
            <span>共{{total}}条</span>
          </el-col>
          <el-col :span="4">
            <!-- <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogAddAssetsFormVisible = true">新增采购申请</el-button> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6" >
            <el-button @click="checkout=!checkout">更多查询条件</el-button>
          </el-col>


        </el-row>
        <el-row>
          <div v-if="checkout==true">
            <el-col :span="6">
            <span>开始时间</span>
              <el-date-picker
                    v-model="form.start"
                    type="date"
                    placeholder="选择日期"
                    :picker-options="pickerOptions">
                  </el-date-picker>
            </el-col>
            <el-col :span="6">
              <span>结束时间</span>
                <el-date-picker
                      v-model="form.end"
                      type="date"
                      placeholder="选择日期"
                      >
                    </el-date-picker>
            </el-col>
            <el-col :span="6">
              <el-select v-model="form.empid" placeholder="请选择" @change="commind()">
                 <el-option
                       v-for="item in empoptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
              </el-select>
            </el-col>
          </div>
        </el-row>
      </div>
      <el-table :data="purchaselist"  border style="width: 100%;">
        <el-table-column prop="purchaseid" label="编号" align="center"></el-table-column>
        <el-table-column prop="purchasename" label="采购名称" align="center"></el-table-column>
        <el-table-column prop="emp.ename" label="申请人" align="center"></el-table-column>
        <el-table-column prop="purchasedept" label="申请部门" align="center"></el-table-column>
        <el-table-column prop="purchasemoney" label="预计金额" align="center"></el-table-column>
        <el-table-column prop="purchasereson" label="申请理由" align="center"></el-table-column>
        <el-table-column prop="purchasetype" label="状态" align="center"></el-table-column>
        <el-table-column prop="purchasestart" label="开始时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.purchasestart |  dateYMDHMSFormat2 }}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
            @size-change="purchaseListSizeChange"
            @current-change="purchaseListNumChange"
            :current-page.sync="form.pageNum"
            :page-sizes="[5, 8, 10]"
            :page-size="form.pageSize"
            layout="sizes, prev, pager, next"
            :total="total"
            align="center">
          </el-pagination>
  </div>
</template>

<script>
  export default{
    data(){
      return{
       //页面控件
      checkout:false,
      total:0,
      //查询结果
      purchaselist:[],
       //查询控件
      form:{
        pageNum:1,
        pageSize:5,
        purchasetype:'',
        start:new Date()  - 3600 * 1000 * 24 * 7  ,
        end:new Date(),
        pname:null,
        empid:6,
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();;
        },
       },
      //采购种类
      ptypeoptions:[
        {
          value:'审批中',
          label:'审批中'
        },
        {
          value:'正在采购',
          label:'正在采购'
        },
        {
           value:'采购完毕',
           label:'采购完毕',
         },
         {
           value:'',
           label:'全部数据',
         }
      ],
      empoptions:[
        {
          value:1,
          label:'彭欣雨'
        },
        {
          value:2,
          label:'丁刚'
        },
        {
          value:3,
          label:'左增源'
        },
        {
          value:4,
          label:'曾泽林'
        },
        {
          value:5,
          label:'梨超'
        },
        {
          value:6,
          label:'秦千淳'
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
        purchaseListSizeChange(val){
          this.form.pageSize=val;
          this.form.pageNum=1;
          this.loadAll();
        },
        purchaseListNumChange(val){
          this.form.pageNum=val;
          this.loadAll();
        },

        //查询所有采购信息
      loadAll(){
        var form={
          pageNum:this.form.pageNum,
          pageSize:this.form.pageSize,
          purchasetype:this.form.purchasetype,
          start:this.moment(this.form.start).format('YYYY:MM:DD'),
          end:this.moment(this.form.end).format('YYYY:MM:DD'),
          pname:this.form.pname,
          empid:this.form.empid,
        }
        this.$axios.post('purchase/load',this.$Qs.stringify(form))
        .then(r=>{
          if(r.code=1){
            console.log(r);
            this.purchaselist=r.obj.list;
            this.total=r.obj.total;
            this.form.pageNum=r.obj.pageNum;
            this.form.pageSize=r.obj.pageSize;
             console.log("所有采购详情",this.purchaselist);
             this.successopen("查询成功!");
          }else{
            this.erroropen("查询失败！");
          }
        }).catch(function(e) {
           console.log("报错了，错误信息是+", e);
        });
      },
      commind(){
        this.loadAll();
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
  #purchaseoverview{
  padding: 20px;
  }
  .topfind{
    margin: 20px 0;
  }
 </style>
