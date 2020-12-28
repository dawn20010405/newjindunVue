
<template>
  <!-- 待审批页面 -->
  <div>
    <el-table :data="tableData.list" style="width: 100%">
      <el-table-column label="序号" prop="name" width="50px">
        <template slot-scope="scope">{{scope.$index+1}}</template>
      </el-table-column>
      <el-table-column label="标题" prop="exstate"></el-table-column>
      <el-table-column label="审批人" prop="myexemp.ename"></el-table-column>
      <el-table-column label="审批时间" prop="exdate"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="scope.row.extype === 1" style="color: #35BD23;">已审批</span>
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button size="mini" @click="shenpi(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="[1, 9,]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
    ></el-pagination>
    <!-- 详情界面 -->
    <el-dialog width="50%" title="详情" :visible.sync="dialogFormVisibles">
        <div class="xq_box" >
					<table border="1" style="border-collapse: collapse;border: 1px; border-color: #EBEEF5; font-size: 20px;" width="100%" cellspacing="0"
					 cellpadding="0">
						<tr>
							<td style="text-align: center; background-color: #F5F7FA;color: #909399; font-size: 12px;">申请人</td>
							<td>{{gonggaott.mynoemp.ename}}</td>
							<td style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 12px;">申请标题</td>
							<td>{{gonggaott.noname}}</td>
						</tr>
            <tr>
							<td style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 12px;">申请内容</td>
							<td colspan="4">{{gonggaott.zhengwen}}</td>
						</tr>
            <tr>
              <td style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 12px;">申请类型</td>
							<td>{{gonggaott.nofenlei}}</td>
              <td style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 12px;">申请时间</td>
							<td>{{gonggaott.nodzdate}}</td>
            </tr>
						<tr>
							<td style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 12px;">批准人</td>
							<td>{{shenghe.myexemp.ename}}</td>
							<td style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 12px;">批准时间</td>
							<td>{{shenghe.exdate}}</td>
						</tr>
						
					</table>
				</div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      shenghe:{
        myexemp:{ename:'',},
      },
      tableData: [],
      search: "",
      current: 1,
      pageSize: 9,
      dialogFormVisibles: false,
      radio: "",
      exyijian: "",
      gonggaott: {
        mynoemp:{
          ename:'',
        }
      },
    };
  },
  methods: {
    loadData() {
      this.$axios
        .get(
          "http://localhost:8089/shenpi/ysall?no=" +
            this.current +
            "&size=" +
            this.pageSize
        )
        .then((r) => {
          console.log(r);
          this.tableData = r;
        })
        .catch((e) => {
          this.$message({
            message: "报错了，请检查网络是否正常",
            type: "error",
          });
        });
    },
    handleSizeChange(p) {
      this.pageSize = p;
      this.loadData();
    },
    handleCurrentChange(p) {
      this.current = p;
      this.loadData();
    },
    /* 详情页面 */
    shenpi(row) {
      this.dialogFormVisibles = true;
      this.shenghe = row;
      console.log("当前行数据：", row);
      if (this.shenghe.exstate == "公告") {
        
        let url = "http://localhost:8089/gonggao/ggid";
        this.$axios
          .get(url + "?noid=" + row.wxwid)
          .then((r) => {
            console.log("获取当前行数据：", r);
            this.gonggaott = r;
          })
          .catch((e) => {
            this.$message({
              message: "报错了，请检查网络是否正常",
              type: "error",
            });
          });
      }else{
       this.dialogFormVisibles = false;
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>

	.xq_box {
		width: 100%;
		height: 360px;
		margin-top: -25px;
	}

	.xq_box tr td {
		width: 50px;
		height: 50px;
	}
</style>
