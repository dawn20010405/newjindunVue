<template>
  <div>
    <el-card class="box-cardlc111">
      <div class="topone">
        <span>
          输入活动名称查找：</span>
        <span>
          <el-input
            v-model="acnamevalue"
            placeholder="请输入活动名称"
            @change="topchage()"
          ></el-input>
        </span>
      </div>
      <div class="toptow">
        <el-button
          type="text"
          @click="dialogVisible = true"
        >新建绩效活动+</el-button>
      </div>

    </el-card>
    <div>
      <el-card class="box-cardlc111">
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="acname"
            label="活动名称"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="acobjectives"
            label="考核目的"
          >
          </el-table-column>
          <el-table-column
            prop="acend"
            label="结束时间"
          >
          </el-table-column>
          <el-table-column
            prop="actype"
            label="活动类型"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.actype==0">年度绩效规则</span>
              <span v-if="scope.row.actype==1">半年度绩效规则</span>
              <span v-if="scope.row.actype==2">非周期性</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="empacone.ename"
            label="发起人"
          >
          </el-table-column>
          <el-table-column
            prop=""
            label="操作"
          >
            <el-button type="primary">查看详情</el-button>

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

    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-card class="box-cardlc1">
        <div class="lc">
          <h2>新建绩效活动</h2>
        </div>
        <div class="a">
          <span>
            输入活动名称：
          </span>
          <span>
            <el-input
              v-model="input1"
              placeholder="输入活动名称"
            ></el-input>
          </span>
        </div>

        <div class="a">
          <span>
            输入考核目的：
          </span>
          <span>
            <el-input
              v-model="input2"
              placeholder="请输入内容"
            ></el-input>
          </span>
        </div>
        <div class="a">
          <span>
            绩效活动类型：
          </span>
          <span>
            <el-select
              v-model="value"
              placeholder="请选择"
              @change="oo()"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </span>
          <div
            v-show="acpanduan1"
            class="a"
          >
            <el-card class="a">
              <el-select
                v-model="acpanduan1value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in acpanduan1options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              年
            </el-card>
          </div>
          <div
            v-show="acpanduan2"
            class="a"
          >
            <el-card class="a">
              <el-select
                v-model="acpanduan2value"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in acpanduan2options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-card>
          </div>
          <div
            v-show="acpanduan3"
            class="a"
          >
            <el-card class="a">
              <div class="block">
                <span class="demonstration">选择时间</span>
                <el-date-picker
                  v-model="acpanduan3value"
                  type="daterange"
                  align="right"
                  unlink-panels
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </div>
            </el-card>
          </div>
        </div>
        <div class="a">
          <span>反馈是否启用：</span>
          <el-switch
            @change="oo2()"
            v-model="huokuai"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <div v-show="acpanduan4">
            <div class="a">
              <span>开启申诉/总结:</span>
            </div>
          </div>
        </div>
        <div class="a">
          <span>成绩是否公开：</span>
          <el-switch
            v-model="chengji"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>

        </div>
        <div class="a">
          <span>
            <div class="block">
              <span class="demonstration"> 活动结束时间：</span>
              <el-date-picker
                v-model="timevalue"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>

            </div>
          </span>
        </div>
        <div class="a">
          <span>计划填报人/流程:</span>
          <span>
            <el-input
              v-model="faqiren"
              placeholder="请输入内容"
            ></el-input>
          </span>
        </div>

        <div class="a">
          <span>是否开启匿名:</span>
          <el-radio
            v-model="radio"
            label="1"
          >开启</el-radio>
          <el-radio
            v-model="radio"
            label="2"
          >关闭</el-radio>
        </div>
      </el-card>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="tijiao()"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      acnamevalue: "",
      total: 0,
      pagesize: 0,
      currentPage1: 1,
      tableData: [],
      radio: "1",
      fankui2: 0,
      faqiren: "",
      chengji: true,
      huokuai: false,
      input1: "",
      input2: "",
      acpanduan1options: [
        {
          value: "2016",
          label: "2016",
        },
        {
          value: "2017",
          label: "2017",
        },
        {
          value: "2018",
          label: "2018",
        },
        {
          value: "2019",
          label: "2019",
        },
        {
          value: "2020",
          label: "2020",
        },
      ],
      options: [
        {
          value: "1",
          label: "年度绩效活动",
        },
        {
          value: "2",
          label: "半年度绩效活动",
        },
        {
          value: "3",
          label: "非周期性",
        },
      ],
      acpanduan2options: [
        {
          value: "1",
          label: "上半年",
        },
        {
          value: "2",
          label: "下半年",
        },
      ],
      acpanduan2value: "",
      value: "",
      gongkai2: 0,
      acpanduan1value: "",
      acpanduan3value: "",
      dialogVisible: false,
      actype: 0,
      acpanduan1: false,
      acpanduan2: false,
      acpanduan3: false,
      acpanduan4: false,
      timevalue: "",
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    //like查询
    topchage() {
      this.$axios
        .get(
          "http://localhost:8089/aclc/likename?no=1&acname=" + this.acnamevalue
        )
        .then((v) => {
          console.log("我是", v);
          this.tableData = v.list;
          this.pagesize = v.pagesize;
          this.total = v.total;
        });
    },
    //新增一条绩效表
    addac() {
      
    },
    //查询公开的绩效表
    selectAc() {
      this.$axios.get("http://localhost:8089/aclc/pageac?no=1").then((res) => {
        console.log(res);
        this.tableData = res.list;
        this.pagesize = res.pagesize;
        this.total = res.total;
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      if (this.acnamevalue != null) {
        this.$axios
          .get(
            "http://localhost:8089/aclc/likename?no="+val+"&acname=" +
              this.acnamevalue
          )
          .then((v) => {
            console.log("我是", v);
            this.tableData = v.list;
            this.pagesize = v.pagesize;
            this.total = v.total;
          });
      } else {
        this.$axios
          .get("http://localhost:8089/aclc/pageac?no=" + val)
          .then((res) => {
            this.tableData = res.list;
            this.pagesize = res.pagesize;
            this.total = res.total;
          });
      }
    },
    oo2() {
      if (this.huokuai == true) {
        this.acpanduan4 = true;
        this.fankui2 = 0;
      } else {
        this.acpanduan4 = false;
        this.fankui2 = 1;
      }
    },
    oo() {
      if (this.value == "1") {
        this.acpanduan1 = true;
        this.acpanduan2 = false;
        this.acpanduan3 = false;
      } else if (this.value == "2") {
        this.acpanduan1 = false;
        this.acpanduan2 = true;
        this.acpanduan3 = false;
      } else if (this.value == "3") {
        this.acpanduan1 = false;
        this.acpanduan2 = false;
        this.acpanduan3 = true;
      } else {
        this.$message.error("没有选择");
      }
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    tijiao() {
      if (this.chengji == true) {
        this.gongkai2 = 0;
      } else {
        this.gongkai2 = 1;
      }
      let user = sessionStorage.getItem("user");
      var jsonObj = JSON.parse(user);
      this.$axios
        .post("http://localhost:8089/aclc/addac/eid/" + jsonObj.eid, {
          acname: this.input1,
          acobjectives: this.input2,
          actype: this.value,
          acyear: this.acpanduan1value,
          achalf: this.acpanduan2value,
          starttime: this.acpanduan3value[0],
          endtime: this.acpanduan3value[0],
          acend: this.timevalue,
          fachievement: this.gongkai2,
          fanonymous: this.radio,
          startup: 0,
          feedbacklc: this.fankui2,
          acother: "暂无",
        })
        .then((res) => {
          console.log("我姓曾了", res);
        });
    },
  },
  created() {
    this.selectAc();
  },
};
</script>

<style scoped>
.topone {
  width: 40%;
}
.topone span {
  float: left;
  padding-bottom: 17px;
}
.toptow {
  float: right;
}
.box-cardlc111 {
  margin-top: 10px;
  margin-bottom: 10px;
}
.lc h2 {
  margin: 0 auto;
}
.a {
  margin-bottom: 15px;
}
</style>