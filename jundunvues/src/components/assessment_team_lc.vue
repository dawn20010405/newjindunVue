<template>
  <div>
    <el-row>
      <el-col :span="12">
        <div class="grid-content bg-purple">
          <el-card class="box-card">

            <div
              id="myChart"
              :style="{ width: '50%', height: '500px' }"
            ></div>

          </el-card>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="grid-content bg-purple-light">
          <el-card class="box-card">
            <div>
              <div
                id="myChart2"
                :style="{ width: '50%', height: '500px' }"
              ></div>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <el-card class="box-carddddd">
            <el-tabs
              v-model="activeName"
              @tab-click="handleClick"
            >
              <el-tab-pane
                label="我参与的绩效"
                name="first"
              >
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%"
                >
                  <el-table-column
                    prop="aclcone.acname"
                    label="活动名称"
                    width="180"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="aclcone.acobjectives"
                    label="考核目的"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="aclcone.startup"
                    label="活动状态"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.aclcone.startup==0">未启动</span>
                      <span v-if="scope.row.aclcone.startup==1">进行中</span>
                      <span v-if="scope.row.aclcone.startup==2">已完结</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="aclcone.actype"
                    label="状态"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.aclcone.actype==0">年度绩效规则</span>
                      <span v-if="scope.row.aclcone.actype==1">半年度绩效规则</span>
                      <span v-if="scope.row.aclcone.actype==2">非周期性</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="actotal"
                    label="总分"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.actotal==null">暂无评分</span>
                      <span v-if="scope.row.actotal!=null">{{scope.row.actotal}}</span>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop=""
                    label="操作"
                  >
                    <template slot-scope="scope">
                      <el-button
                        type="text"
                        style="color:red;"
                        @click="atlc(scope.row)"
                        v-show="scope.row.aclcone.feedbacklc==0"
                      >我要申诉</el-button>
                      <el-button
                        type="text"
                        @click="zongjie(scope.row)"
                        v-show="scope.row.aclcone.feedbacklc==0"
                      >我要总结</el-button>
                      <el-button
                        type="text"
                        @click="xiangq(scope.row)"
                      >详情评分</el-button>
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
              </el-tab-pane>
              <el-tab-pane
                label="所有申诉"
                name="second"
              >
                <el-table
                  :data="tableData2"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="afid"
                    label="编号"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="afadopt"
                    label="申诉状态"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.afadopt==0">未审批</span>
                      <span v-if="scope.row.afadopt==1">已审批</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="aftime"
                    label="申诉时间"
                  >
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page.sync="currentPage2"
                    :page-size="pagesize2"
                    layout="total, prev, pager, next"
                    :total="total2"
                  >
                  </el-pagination>
                </div>
              </el-tab-pane>
              <!-- <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>-->
              <el-tab-pane
                label="所有总结"
                name="fourth"
              >
                <el-table
                  :data="tableData3"
                  style="width: 100%"
                >
                  <el-table-column
                    prop="suid"
                    label="编号"
                  >
                  </el-table-column>
                  <el-table-column
                    prop="suneirong"
                    label="总结内容"
                  >

                  </el-table-column>
                  <el-table-column
                    prop="sutime"
                    label="总结时间"
                  >
                  </el-table-column>
                </el-table>
                <div class="block">
                  <el-pagination
                    @size-change="handleSizeChange3"
                    @current-change="handleCurrentChange3"
                    :current-page.sync="currentPage3"
                    :page-size="pagesize3"
                    layout="total, prev, pager, next"
                    :total="total3"
                  >
                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-dialog
      title="绩效内容"
      :visible.sync="dialogTableVisible"
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

      <el-card
        class="box-card1"
        v-show="ni"
      >
        <h2>我的总结：</h2>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="suneirong"
        >
        </el-input>
      </el-card>
      <el-card
        class="box-card2"
        v-show="wo"
      >
        <h2>我要申诉：</h2>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="shensu"
        >
        </el-input>
        <h2>你认为合理的分数：</h2>
        <el-input
          v-model="input"
          placeholder="请输入内容"
          oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
        ></el-input>
      </el-card>
      <el-button
        @click="addSu()"
        v-show="made"
      >提交</el-button>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData2: [],
      currentPage2: 1,
      pagesize2: 0,
      total2: 0,
      tableData3: [],
      currentPage3: 1,
      pagesize3: 0,
      total3: 0,
      made: true,
      input: "",
      ni: true,
      wo: true,
      shensu: "",
      numtest: "",
      gitdata1: [],
      gitdata2: [],
      bj: true,
      textarea2: "",
      dialogTableVisible: false,
      currentPage1: 1,
      pagesize: 0,
      total: 0,
      activeName: "first",
      tableData: [],
      hang: {},
      suneirong: "",
      num1: 0,
      num2: "",
      out: 1,
      av1: [],
      av2: [],
      av3: [],
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart2.setOption({
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: "bar",
            showBackground: true,
            backgroundStyle: {
              color: "rgba(220, 220, 220, 0.8)",
            },
          },
        ],
      });
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: 10,
          data: ["申诉", "总结"],
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "30",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: this.av3,
          },
        ],
      });
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    //新增总结表kaohe
    addSu() {
      if (this.out == 1) {
        this.$axios
          .post("http://localhost:8089/suCrud/insetaf/" + this.hang.atid, {
            afreason: this.shensu,
            oldrascore: this.hang.actotal,
            newrascore: this.input,
          })
          .then((res) => {
            if (res == 1) {
              this.$message({
                message: "申诉成功",
                type: "success",
              });
              this.shensu = "";
              this.out == 0;
              this.input = "";
              this.gagaga();
              this.gagaga2();
              this.dialogTableVisible = false;
            } else {
              this.$message.error("提交失败了");
            }
          });
      } else {
        console.log("我是行", this.hang);
        this.$axios
          .post("http://localhost:8089/suCrud/insetsu/" + this.hang.atid, {
            suneirong: this.suneirong,
          })
          .then((res) => {
            console.log("无数", res);
            if (res == 1) {
              this.$message({
                message: "总结成功",
                type: "success",
              });
              this.suneirong = "";
              this.out == 0;
              this.gagaga();
              this.gagaga2();
              this.dialogTableVisible = false;
            } else {
              this.$message.error("提交失败了");
            }
          });
      }
    },
    atlc(val) {
      this.out = 1;
      this.ni = false;
      this.wo = true;
      if (val.actotal == null) {
        this.$message.error("暂时无人评分，或者项目未启动");
      } else {
        this.dialogTableVisible = true;
        this.hang = val;
        this.num1 = val.actotal;
        if ((val.actotal >= 60) & (val.actotal < 70)) {
          this.num2 = "D";
          this.numtest = "再不加油，就卷铺盖回家了";
        } else if ((val.actotal >= 70) & (val.actotal < 80)) {
          this.num2 = "C";
          this.numtest = "热度平平，再加把劲";
        } else if ((val.actotal >= 80) & (val.actotal < 90)) {
          this.num2 = "B";
          this.numtest = "你已经步入新的阶层了，工作效率飞快";
        } else if ((val.actotal >= 90) & (val.actotal < 100)) {
          this.num2 = "A";
          this.numtest = "工作狂人";
        } else if (val.actotal >= 100) {
          this.num2 = "S";
          this.numtest = "您的工作效率超乎我的想象";
        } else {
          this.num2 = "无";
          this.numtest = "无人评分";
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
      }
    },

    zongjie(val) {
      console.log("我是这行的数据", val);
      this.out = 2;
      this.ni = true;
      this.wo = false;
      if (val.actotal == null) {
        this.$message.error("暂时无人评分，或者项目未启动");
      } else {
        this.dialogTableVisible = true;
        this.hang = val;
        this.num1 = val.actotal;
        if ((val.actotal >= 60) & (val.actotal < 70)) {
          this.num2 = "D";
          this.numtest = "再不加油，就卷铺盖回家了";
        } else if ((val.actotal >= 70) & (val.actotal < 80)) {
          this.num2 = "C";
          this.numtest = "热度平平，再加把劲";
        } else if ((val.actotal >= 80) & (val.actotal < 90)) {
          this.num2 = "B";
          this.numtest = "你已经步入新的阶层了，工作效率飞快";
        } else if ((val.actotal >= 90) & (val.actotal < 100)) {
          this.num2 = "A";
          this.numtest = "工作狂人";
        } else if (val.actotal >= 100) {
          this.num2 = "S";
          this.numtest = "您的工作效率超乎我的想象";
        } else {
          this.num2 = "无";
          this.numtest = "无人评分";
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
      }
    },
    xiangq(val) {
      this.ni = false;
      this.wo = false;
      this.made = false;
      if (val.actotal == null) {
        this.$message.error("暂时无人评分，或者项目未启动");
      } else {
        this.dialogTableVisible = true;
        this.hang = val;
        this.num1 = val.actotal;
        if ((val.actotal >= 60) & (val.actotal < 70)) {
          this.num2 = "D";
          this.numtest = "再不加油，就卷铺盖回家了";
        } else if ((val.actotal >= 70) & (val.actotal < 80)) {
          this.num2 = "C";
          this.numtest = "热度平平，再加把劲";
        } else if ((val.actotal >= 80) & (val.actotal < 90)) {
          this.num2 = "B";
          this.numtest = "你已经步入新的阶层了，工作效率飞快";
        } else if ((val.actotal >= 90) & (val.actotal < 100)) {
          this.num2 = "A";
          this.numtest = "工作狂人";
        } else if (val.actotal >= 100) {
          this.num2 = "S";
          this.numtest = "您的工作效率超乎我的想象";
        } else {
          this.num2 = "无";
          this.numtest = "无人评分";
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
      }
    },

    //分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.$axios
        .get(
          "http://localhost:8089/atlcontroller/byatid?no=1&ateid=" + jsonObj.eid
        )
        .then((res) => {
          console.log("我是res", res);
          this.tableData = res.list;
          this.pagesize = res.pageSize;
          this.total = res.total;
        });
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //查询我的
    selectAll() {
      //获取当前登录者
      let user = sessionStorage.getItem("user");
      var jsonObj = JSON.parse(user);
      this.$axios
        .get(
          "http://localhost:8089/atlcontroller/byatid?no=1&ateid=" + jsonObj.eid
        )
        .then((res) => {
          console.log("我是res", res);
          this.tableData = res.list;
          this.pagesize = res.pageSize;
          this.total = res.total;
        });
    },
    av() {
      this.$axios.get("http://localhost:8089/suCrud/tu").then((res) => {
        this.$axios.get("http://localhost:8089/suCrud/selectsu").then((v) => {
          this.av1 = res;
          this.av2 = v;
          console.log("我是v", this.av1);
          console.log("我是v", this.av2);
          let a = "申诉";
          let b = "总结";
          this.av3.push({
            value: this.av1.length,
            name: a,
          });
          this.av3.push({
            value: this.av2.length,
            name: b,
          });
          console.log("我是av3", this.av3);
          this.drawLine();
        });
      });
    },
    gagaga() {
      this.$axios.get("http://localhost:8089/suCrud/tu2?no=1").then((res) => {
        console.log("tu", res);
        this.tableData2 = res.list;
        this.pagesize2 = res.pageSize;
        this.total2 = res.total;
      });
    },
    //分页
    handleSizeChange2(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange2(val) {
      this.$axios
        .get("http://localhost:8089/suCrud/tu2?no=" + val)
        .then((res) => {
          console.log("tu", res);
          this.tableData2 = res.list;
          this.pagesize2 = res.pageSize;
          this.total2 = res.total;
        });
    },
    gagaga2() {
      this.$axios
        .get("http://localhost:8089/suCrud/selectsu2?no=1")
        .then((res) => {
          console.log("selectsu2", res);
          this.tableData3 = res.list;
          this.pagesize3 = res.pageSize;
          this.total3 = res.total;
        });
    },
    //分页
    handleSizeChange3(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange3(val) {
      this.$axios
        .get("http://localhost:8089/suCrud/selectsu2?no=" + val)
        .then((res) => {
          console.log("selectsu2", res);
          this.tableData3 = res.list;
          this.pagesize3 = res.pageSize;
          this.total3 = res.total;
        });
    },
  },
  created() {
    this.av();
    this.selectAll();
    this.gagaga();
    this.gagaga2();
  },
};
</script>

<style scoped>
.box-card22222 {
  height: 100px;
}
.box-card2 {
  margin-top: 5px;
}
</style>