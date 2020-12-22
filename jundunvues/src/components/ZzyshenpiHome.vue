<template>
  <div>
    <!-- 头部盒子 -->
    <div class="top_box">
      <div class="left_box" @click="$router.push('dsp')">
        <div class="lett_img" style="background-image: url(../../static/imgs/文本.png);"></div>
        <div class="p_box">
          <p style="color: #E29C00; font-style: oblique;">0</p>
          <p style="color: #5E6C8A;">待审批</p>
        </div>
      </div>
      <div class="left_box">
        <div class="lett_img" style="background-image: url(../../static/imgs/通过.png);"></div>
        <div class="p_box">
          <p style="color: #E29C00; font-style: oblique;">0</p>
          <p style="color: #5E6C8A;">已审批</p>
        </div>
      </div>
      <div class="left_box">
        <div class="lett_img" style="background-image: url(../../static/imgs/驳回.png);"></div>
        <div class="p_box">
          <p style="color: #E29C00; font-style: oblique;">0</p>
          <p style="color: #5E6C8A;">被删除</p>
        </div>
      </div>
    </div>
    <!-- 下左 -->
    <div class="bleow_left_box">
      <div class="bleow_right_top_box">
        <h3>不知道放什么，但是就是要放一个</h3>
      </div>
       <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
  </el-table>
    </div>
    <!-- 下右 -->
    <div class="bleow_right_box">
      <div class="bleow_right_top_box">
        <h3>饼状图</h3>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
       tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
    };
  },
  methods: {},
  mounted() {},
  
};
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

.top_box {
  width: 100%;
  height: 200px;
  border: 1px solid #d3d3d3;
}

.left_box {
  width: 350px;
  height: 150px;
  background-color: #eaf2ff;
  margin-top: 25px;
  margin-left: 50px;
  float: left;
  cursor: pointer;
}

.lett_img {
  width: 80px;
  height: 80px;
  margin-left: 80px;
  margin-top: 35px;
}

.p_box {
  margin-left: 170px;
  margin-top: -80px;
  width: 100px;
  height: 80px;
}

.p_box p {
  font-size: 18px;
  line-height: 40px;
}
.bleow_left_box {
  width: 65%;
  height: 400px;
  margin-top: 10px;
  border: 1px solid #d3d3d3;
  float: left;
}
.bleow_right_box {
  width: 400px;
  height: 400px;
  margin-top: 10px;
  margin-left: 20px;
  border: 1px solid #d3d3d3;
  float: left;
}
.bleow_right_top_box {
  width: 100%;
  height: 50px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #d3d3d3;
}
.bleow_right_top_box h3 {
  padding-top: 12px;
  padding-left: 15px;
}
</style>
