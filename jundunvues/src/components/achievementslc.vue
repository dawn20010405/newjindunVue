<template>
  <div>
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
          <el-select
            v-model="value"
            placeholder="请选择"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </el-card>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
        
      input1: "",
      input2: "",

      options: [{
          value: '年度',
          label: '年度绩效活动'
        }, {
          value: '选项2',
          label: '半年度绩效活动'
        }, {
          value: '选项3',
          label: '非周期性'
        }],
        value: '',
      dialogVisible: false,
    };
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
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