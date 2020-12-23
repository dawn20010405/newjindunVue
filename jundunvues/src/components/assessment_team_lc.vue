<template>
  <div>
    <el-page-header
      @back="goBack"
      content="绩效详情"
    >

    </el-page-header>
    <el-card class="box-carddddd">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-carddddd">
      <el-table
        :data="tableData2"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180"
        >
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
        >
        </el-table-column>
      </el-table>
    </el-card>
    <el-card class="box-carddddd">
        <p>评分意见：</p>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="textarea"
      >
      </el-input>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goBack() {
        console.log("/aclc");
      },
      textarea: "",
      tableData: [],

      tableData2: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      acid: 0,
    };
  },
  methods: {},
};
</script>

<style scoped>
.box-carddddd {
  margin-top: 10px;
}
</style>