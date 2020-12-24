<template>
<div>
  <h3>员工信息</h3>
  <div class="toou" >
    <span style="margin-left: 700px;font-size: 14px"> 订单编号:</span>
    <el-input clearable  v-model="formInline.eid"   placeholder="请输入员工编号" style="width: 250px;" ></el-input>
    <el-button plain @click="loadData()" style="margin-left:10px;"><i class="fa fa-search" style="margin-right: 5px"></i>查询</el-button>
    <el-popover
      class="Mypop"
      placement="bottom"
      title="高级查询"
      width="700"
      trigger="manual"
      v-model="visible"
    >
      <el-form :model="formInline" ref="stuForm">
        <el-row style="margin-top: 20px">
          <el-col :span="12">
            <el-form-item label="员工姓名:" label-width="100" clearable>
              <el-input clearable  style="width:240px;margin-left: 5px" v-model="formInline.ename" placeholder="请输入员工姓名"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话:" label-width="100" clearable>
              <el-input clearable  style="width:240px;margin-left: 5px" v-model="formInline.eiphone" placeholder="请输入联系人电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-button plain @click="loadData()" style="margin-left: 320px;width: 200px;background-color: #81d8d0;color: white;margin-top: 30px">查询</el-button>
      <el-button slot="reference" @click="gaojiiii()" >高级查询</el-button>
    </el-popover>
  </div>
  <div class="mytable">
    <!--产品数据显示 -->
    <el-table :data="tableData" style="width: 100%; text-align:center;">
      <el-table-column label="编号"  >
        <!-- scope属性：表示当前数据源-->
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.eid }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" prop="ename" > </el-table-column>
      <el-table-column label="性别" prop="esex" > </el-table-column>
      <el-table-column label="入职日期" prop="erutime" > </el-table-column>
      <el-table-column label="联系电话" prop="eiphone" > </el-table-column>
      <el-table-column label="在职状态" >
      <template  slot-scope="scope">
        <el-tag type="success">{{scope.row.ezt}}</el-tag>
      </template></el-table-column>
      <el-table-column label="在职部门"  >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.myposition.dept.dname }}</span>
        </template>
      </el-table-column>
      <el-table-column label="在职岗位"  >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.myposition.poname }}</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
                     :page-sizes="[5,10,12]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </div>
</div>
</template>
<script>
    export default {
        name: "PxyEmp",
      data(){
       return{
         formInline: {
           eid: '',
           ename: '',
           erutime:'',
           eiphone:''
         },
         tableData: [],
         current: 1,
         pageNo:1,
         pageSize: 5,
         total: 0,
         visible:false,
       }
      },
      methods:{
        gaojiiii() {
          /*判断高级查询弹窗*/
          if (this.visible == false) {
            this.visible = true
          } else {
            this.visible = false
          }
        },
        handleSizeChange(val) {
          this.pageSize = val;
          console.log(`每页 ${val} 条`);
          this.loadData() ;
        },
        handleCurrentChange(val) {
          this.current = val;
          console.log(`当前页: ${val}`);
          this.loadData() ;
        },
        loadData() {
          console.log("eid:",this.formInline.eid)
          console.log("ename:",this.formInline.ename)
          console.log("eiphone:",this.formInline.eiphone)
          let param = {
            no: this.current,
            size: this.pageSize,
            eid:this.formInline.eid,
            ename:this.formInline.ename,
            eiphone:this.formInline.eiphone,
          };
          console.log("1员工分页查询：", param)
          let ppp = this.$Qs.stringify(param);
          this.$axios.post("http://localhost:8089/emp/listselectemppage",ppp)
            .then(r => {
              if (r.status === 200) {
                console.log("this.tableData:",r.data.list);
                this.tableData = r.data.list;
                this.total = r.data.total;
              }
            })
       }
      }, mounted() {
        this.loadData();
      }
    }
</script>

<style scoped>
  .el-table th{
    text-align: center;
  }
  .el-table td{
    text-align: center;
  }
</style>
