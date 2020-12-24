<template>
  <div>

    <el-row :gutter="20">
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-page-header
              @back="goBack"
              content="绩效详情"
            >
            </el-page-header>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">

          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="17">
        <div class="grid-content bg-purple">
          <el-card class="box-card22222">
            <!-- <h2>{{tableData[0].aclcone.acname}}</h2> -->
          </el-card>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card22222">
            <h2>考核组人员平均分</h2>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row style="margin-top:10px;">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-card3434">
            <el-table
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column
                prop="atlempone.ename"
                label="姓名"
              >
              </el-table-column>
              <el-table-column
                prop="aclcone.acobjectives"
                label="考核目的"
              >
              </el-table-column>
              <el-table-column
                prop=""
                label="评分"
              >
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    @click="addtow(scope.row)"
                    v-show="scope.row.scoreeid==null"
                  >立即评分</el-button>

                  <el-tag
                    type="success"
                    v-show="scope.row.scoreeid!=null"
                  ><span>已评分</span></el-tag>
                  <el-button
                    type="text"
                    @click="add(scope.row)"
                    v-show="scope.row.scoreeid!=null"
                  >查看详情</el-button>

                </template>
              </el-table-column>
            </el-table>
            <div class="block">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="pagesize"
                layout="total, prev, pager, next"
                :total="total"
              >
              </el-pagination>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="绩效内容"
      :visible.sync="dialogTableVisible"
      width="70"
    >
      <h2>定量指标：</h2>
      <el-table :data="gridData">
        <el-table-column
          property="date"
          label="绩效项"
          width="150"
        ></el-table-column>
        <el-table-column
          property="type"
          label="类型"
          width="200"
        ></el-table-column>
        <el-table-column
          property="name"
          label="评分方式"
        ></el-table-column>
        <el-table-column
          property="address"
          label="权重"
        ></el-table-column>
        <el-table-column
          property=""
          label="打分"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.inte"
              controls-position="right"
              :min="1"
              :max="25"
            >
            </el-input-number>
          </template>
        </el-table-column>

      </el-table>
      <h2>定性指标：</h2>
      <el-table :data="gridData2">
        <el-table-column
          property="date"
          label="绩效项"
          width="150"
        ></el-table-column>
        <el-table-column
          property="type"
          label="类型"
          width="200"
        ></el-table-column>
        <el-table-column
          property="name"
          label="评分方式"
        ></el-table-column>
        <el-table-column
          property="address"
          label="权重"
        ></el-table-column>
        <el-table-column
          property=""
          label="打分"
        >
          <template slot-scope="scope">
            <el-input-number
              v-model="scope.row.inte"
              controls-position="right"
              :min="1"
              :max="5"
            ></el-input-number>
          </template>
        </el-table-column>

      </el-table>
      <h2>评分意见（5分）：</h2>
      <el-row style="margin-top:10px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
            >
            </el-input>
          </div>
        </el-col>
      </el-row>

      <el-button
        type="primary"
        @click="addcommit()"
      >确认评分</el-button>
      <el-button>返回</el-button>
    </el-dialog>
    <!-- 详情 -->
    <el-dialog
      title="绩效内容"
      :visible.sync="dialogTableVisible2"
      width="70"
    >
      <el-row style="margin-top:10px;">
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <el-card class="box-card22222">
             {{numtest}}
            </el-card>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <el-card class="box-card22222">
             <h2>评级：{{num2}}</h2>
            </el-card>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple-light">
            <el-card class="box-card22222">
              <h1>总分：{{num1}} 分</h1>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <h2>定量指标：</h2>
      <el-table :data="gitdata1">
        <el-table-column
          property="raname"
          label="绩效项"
          width="150"
        ></el-table-column>
        <el-table-column
          property="type"
          label="类型"
          width="200"
        >定量</el-table-column>
        <el-table-column
          property="name"
          label="评分方式"
        >直接打分</el-table-column>
        <el-table-column
          property="address"
          label="权重"
        >25分</el-table-column>
        <el-table-column
          property="rascore"
          label="打分"
        >

        </el-table-column>

      </el-table>
      <h2>定性指标：</h2>
      <el-table :data="gitdata2">
        <el-table-column
          property="quname"
          label="绩效项"
          width="150"
        ></el-table-column>
        <el-table-column
          property="type"
          label="类型"
          width="200"
        >定性</el-table-column>
        <el-table-column
          property="name"
          label="评分方式"
        >直接打分</el-table-column>
        <el-table-column
          property="address"
          label="权重"
        >5分</el-table-column>
        <el-table-column
          property="quscore"
          label="打分"
        >

        </el-table-column>

      </el-table>
      <h2>评分意见：</h2>
      <el-row style="margin-top:10px">
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">
            <el-input
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea2"
              :readonly="bj"
            >
            </el-input>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gitdata1: [],
      gitdata2: [],
      bj: true,
      textarea: "",
      textarea2: "",
      numtest:"",
      gridData: [
        {
          date: "月度绩效计划完成率",
          name: "直接打分",
          address: "25分",
          type: "定量",
          inte: 1,
        },
        {
          date: "月度工作量",
          name: "直接打分",
          address: "25分",
          type: "定量",
          inte: 1,
        },
        {
          date: "上级交办其他事项",
          name: "直接打分",
          address: "25分",
          type: "定量",
          inte: 1,
        },
      ],
      gridData2: [
        {
          date: "业务拓展情况",
          name: "直接打分",
          address: "5分",
          type: "定性",
          inte: 1,
        },
        {
          date: "团队协作性",
          name: "直接打分",
          address: "5分",
          type: "定性",
          inte: 1,
        },
        {
          date: "工作态度",
          name: "直接打分",
          address: "5分",
          type: "定性",
          inte: 1,
        },
      ],
      tableData: [],
      pagesize: 0,
      total: 0,
      haha: [],
      currentPage1: 1,
      aa: "",
      hang: {},
      dialogTableVisible: false,
      dialogTableVisible2: false,
      jishiqi: [],
      jishiqi2: [],
      user: {},
      num1: 0,
      num2: "",
    };
  },
  methods: {
    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$axios
        .get(
          "http://localhost:8089/atlcontroller/allatlc?no=" +
            val +
            "&acid=" +
            this.$route.params.acid
        )
        .then((res) => {
          this.tableData = res.list;
          this.pagesize = res.pageSize;
          this.total = res.total;
          this.tableData.aclcone = this.haha;
        });
    },
    //查询
    onetomanyac() {
      this.$axios
        .get(
          "http://localhost:8089/atlcontroller/allatlc?no=1&acid=" +
            this.$route.params.acid
        )
        .then((res) => {
          console.log("我是res", res);
          this.tableData = res.list;
          this.pagesize = res.pageSize;
          this.total = res.total;
        });
    },
    goBack() {
      this.$router.push("/aclc");
    },
    add(val) {
      console.log("我是这行的数据", val);
      this.hang = val;
      this.num1 = val.actotal;
      if ((val.actotal >= 60) & (val.actotal < 70)) {
        this.num2 = "D";
        this.numtest="勉强及格"
      } else if ((val.actotal >= 70) & (val.actotal < 80)) {
        this.num2 = "C";
        this.numtest="热度平平，再加把劲"
      } else if ((val.actotal >= 80) & (val.actotal < 90)) {
        this.num2 = "B";
        this.numtest="你已经步入新的阶层了，工作效率飞快"
      } else if ((val.actotal >= 90) & (val.actotal < 100)) {
        this.num2 = "A";
        this.numtest="工作狂人"
      } else if (val.actotal >= 100) {
        this.num2 = "S";
        this.numtest="您的工作效率超乎我的想象"
      } else {
        this.num2 = "E";
        this.numtest="再不加油，就卷铺盖回家了"
      }
      this.textarea2 = val.acopinion;
      this.$axios
        .get("http://localhost:8089/atlcontroller/aa?atid=" + val.atid)
        .then((res) => {
          this.gitdata1 = res;
        });
      this.$axios
        .get("http://localhost:8089/atlcontroller/bb?atid=" + val.atid)
        .then((res) => {
          this.gitdata2 = res;
        });
      this.dialogTableVisible2 = true;
    },
    addtow(val) {
      this.dialogTableVisible = true;
      this.hang = val;
    },
    addcommit() {
      this.jishiqi = [];
      this.jishiqi2 = [];
      this.gridData.forEach((g) => {
        this.jishiqi.push(g.inte);
      });
      this.gridData2.forEach((g) => {
        this.jishiqi2.push(g.inte);
      });
      //统计分数
      let totalSumAll = 0;
      this.jishiqi.map((item) => {
        totalSumAll += item;
      });
      console.log(totalSumAll);
      //统计分数
      let totalSumAll2 = 0;
      this.jishiqi2.map((item) => {
        totalSumAll2 += item;
      });
      console.log(totalSumAll2);
      //总分
      let zong = 0;
      zong = totalSumAll2 + totalSumAll+5;
      console.log("总分", zong);
      //获取当前登录者
      let user = sessionStorage.getItem("user");
      var jsonObj = JSON.parse(user);

      // //新增定量表
      this.$axios
        .post(
          "http://localhost:8089/atlcontroller/addration/" + this.hang.atid,
          this.jishiqi
        )
        .then((res) => {});
      //新增定性表
      this.$axios
        .post(
          "http://localhost:8089/atlcontroller/addqualitative/" +
            this.hang.atid,
          this.jishiqi2
        )
        .then((vv) => {});
      // //修改总分
      this.$axios
        .get(
          "http://localhost:8089/atlcontroller/updaatlc?scoreeid=" +
            jsonObj.eid +
            "&acopinion=" +
            this.textarea +
            "&actotal=" +
            zong +
            "&atid=" +
            this.hang.atid,
          {}
        )
        .then((vv1) => {});
      this.dialogTableVisible = false;
      this.textarea = "";
    },
  },
  created() {
    this.onetomanyac();
  },
};
</script>

<style scoped>
.box-card22222 {
  height: 100px;
}
</style>