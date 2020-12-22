<template>
<div>
  <h3>员工信息</h3>
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
      <el-table-column label="入职日期" prop="erutime" > </el-table-column>
      <el-table-column label="联系电话" prop="eiphone" > </el-table-column>
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
         tableData: [],
         current: 1,
         pageNo:1,
         pageSize: 5,
         total: 0,
       }
      },
      methods:{
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
          let param = {
            no: this.current,
            size: this.pageSize
          };
          console.log("1产品分页查询：", param)
          let ppp = this.$qs.stringify(param);
          this.$axios.post("http://localhost:8089/emp/listselectemp",ppp)
            .then(r => {
              console.log("this.tableData:",r.data)
              if (r.status === 200) {
                this.tableData = r.data;
                console.log("this.tableData:",r.data);
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

</style>
