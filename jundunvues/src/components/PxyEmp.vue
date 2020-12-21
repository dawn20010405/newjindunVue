<template>
<div>
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
    </el-table>

  </div>
</div>
</template>

<script>
    export default {
        name: "PxyEmp",
      data(){
       return{
         tableData: []
       }
      },
      methods:{
        loadData() {
          this.$axios.post("http://localhost:8089/emp/listselectemp")
            .then(r => {
              console.log("this.tableData:",r.data)
              if (r.status === 200) {
                this.tableData = r.data;
                console.log("this.tableData:",r.data)
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
