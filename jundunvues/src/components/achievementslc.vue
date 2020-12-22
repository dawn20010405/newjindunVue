<template>
  <div>
    <div>
      
    </div>
    <el-button
      type="text"
      @click="dialogVisible = true"
    >点击打开 Dialog</el-button>
    <el-dialog
      title=""
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <el-card class="box-cardlc1">
        <h2>新建绩效活动</h2>
        <div class="a">
          <span>
            输入活动名称：
          </span>

          <el-input
            v-model="input1"
            placeholder="输入活动名称"
          ></el-input>
        </div>

        <div class="a">
          <span>
            输入考核目的：
          </span>

          <el-input
            v-model="input2"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div>
          <span>
            绩效活动类型：
          </span>
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
          <div v-show="acpanduan1">
            <h2>sss1</h2>
          </div>
          <div v-show="acpanduan2">
            <h2>sss2</h2>
          </div>
          <div v-show="acpanduan3">
            <h2>sss3 </h2>
          </div>
        </div>
        <div>
          <span>反馈是否启用：</span>
          <el-switch
            @change="oo2()"
            v-model="huokuai"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <div v-show="acpanduan4">
            <h2>sss4 </h2>
          </div>
        </div>
        <div>
          <span>成绩是否公开：</span>
          <el-switch
            v-model="chengji"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
          <div v-show="acpanduan4">
            <h2>sss4 </h2>
          </div>
        </div>
        <div>
          <span>
            活动结束时间：
          </span>
          <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
              v-model="timevalue"
              type="datetime"
              placeholder="选择日期时间"
            >
            </el-date-picker>
          </div>
        </div>
        <div>
          <span>计划填报人/流程:</span>
          <el-input
            v-model="faqiren"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div>
          <span>开启申诉/总结:</span>
          <el-checkbox v-model="checked1">申诉</el-checkbox>
          <el-checkbox v-model="checked2">总结</el-checkbox>
        </div>
        <div>
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
      radio:'1',
      checked1: false,
      checked2: false,
      faqiren: "",
      chengji: true,
      huokuai: false,
      input1: "",
      input2: "",
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
      value: "",
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
    oo2() {
      if (this.huokuai == true) {
        this.acpanduan4 = true;
      } else {
        this.acpanduan4 = false;
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
    tijiao(){
     
      console.log( this.radio)
    }
  },
};
</script>

<style scoped>
.a span {
  float: left;
}
.a {
  margin-bottom: 5px;
}
</style>