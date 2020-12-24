<template>
  <div>
    <!-- 头部盒子 -->
    <div class="top_box">
      <div class="left_box" @click="$router.push('dsp')">
        <div class="lett_img" style="background-image: url(../../static/img/文本.png);"></div>
        <div class="p_box">
          <p style="color: #E29C00;">{{dscount}}</p>
          <p style="color: #5E6C8A;">待审批</p>
        </div>
      </div>
      <div class="left_box">
        <div class="lett_img" style="background-image: url(../../static/img/通过.png);"></div>
        <div class="p_box">
          <p style="color: #E29C00;">{{yscount}}</p>
          <p style="color: #5E6C8A;">已审批</p>
        </div>
      </div>
      <div class="left_box">
        <div class="lett_img" style="background-image: url(../../static/img/驳回.png);"></div>
        <div class="p_box">
          <p style="color: #E29C00;">0</p>
          <p style="color: #5E6C8A;">被删除</p>
        </div>
      </div>
    </div>
    <!-- 下左 -->
    <div class="bleow_left_box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <!-- 公司公告 -->
        <el-tab-pane label="公告" name="first">
          <el-table :data="tableData.list" style="width: 100%">
            <el-table-column label="序号" prop="name" width="50px">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="标题" prop="noname"></el-table-column>
            <el-table-column label="编制人" prop="mynoemp.ename"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.notype === '0'" style="color: red;">待审批</span>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <!-- <template slot="header">
            <el-input v-model="search" size="mini" placeholder="输入名称搜索" />
              </template>-->
              <template slot-scope="scope">
                <el-button size="mini" @click="shenpi(scope.row)">审批</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[1, 6,]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="tableData.total"
          ></el-pagination>
        </el-tab-pane>
        <!-- 转正通知 -->
        <el-tab-pane label="转正" name="second">
          <el-table :data="zhuanzheng.list" style="width: 100%">
            <el-table-column label="序号" prop="name" width="50px">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="标题" prop="jzong"></el-table-column>
            <el-table-column label="编制人" prop="myemp.ename"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.jsehngpi === 0" style="color: red;">待审批</span>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="zhuanzhengsp(scope.row)">审批</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChangez"
            @current-change="handleCurrentChangez"
            :current-page="currentz"
            :page-sizes="[1, 6,]"
            :page-size="pageSizez"
            layout="total, sizes, prev, pager, next, jumper"
            :total="zhuanzheng.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="调岗" name="third">
          <el-table :data="listtiaogang.list" style="width: 100%">
            <el-table-column label="序号" prop="name" width="50px">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="标题" prop="tzong"></el-table-column>
            <el-table-column label="编制人" prop="myemp.ename"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.tsehngpi === 0" style="color: red;">待审批</span>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="tiaogangsp(scope.row)">审批</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChanget"
            @current-change="handleCurrentChanget"
            :current-page="currentt"
            :page-sizes="[1, 6,]"
            :page-size="pageSizet"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listtiaogang.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="离职" name="fourth">
          <el-table :data="listlizhi.list" style="width: 100%">
            <el-table-column label="序号" prop="name" width="50px">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="标题" prop="dzong"></el-table-column>
            <el-table-column label="编制人" prop="myemp.ename"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.dshenpi === '0'" style="color: red;">待审批</span>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="lizhisp(scope.row)">审批</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChangel"
            @current-change="handleCurrentChangel"
            :current-page="currentl"
            :page-sizes="[1, 6,]"
            :page-size="pageSizel"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listlizhi.total"
          ></el-pagination>
        </el-tab-pane>
        <!-- <el-tab-pane label="资源" name="ziyuan">资源</el-tab-pane> -->
        <el-tab-pane label="项目" name="xiangmu">
          <el-table :data="listxiangmu.list" style="width: 100%">
            <el-table-column label="序号" prop="name" width="50px">
              <template slot-scope="scope">{{scope.$index+1}}</template>
            </el-table-column>
            <el-table-column label="标题" prop="xname"></el-table-column>
            <el-table-column label="编制人" prop="myfzr.ename"></el-table-column>
            <el-table-column label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.state === 0" style="color: red;">待审批</span>
              </template>
            </el-table-column>
            <el-table-column align="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="xiangmurow(scope.row)">审批</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChangex"
            @current-change="handleCurrentChangex"
            :current-page="currentx"
            :page-sizes="[1, 6,]"
            :page-size="pageSizex"
            layout="total, sizes, prev, pager, next, jumper"
            :total="listxiangmu.total"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="绩效" name="=jixiao">绩效</el-tab-pane>
      </el-tabs>
      <!-- 公告审批 -->
      <el-dialog width="80%" title="公告审批" :visible.sync="dialogFormVisibles">
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="5">
                <el-button type="primary" size="mini" plain @click="shenpiqueren()">确认</el-button>
                <el-button type="primary" size="mini" plain @click="dialogFormVisibles = false">取消</el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-container>
            <el-aside width="600px">
              <div style="height: 260px;border-right:1px solid #C6C8CD;margin-top: 25px;">
                <table
                  border="1"
                  style="border-collapse: collapse;border: 1px; border-color: #EBEEF5;"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td
                      style="text-align: center; background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请标题</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请人</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请内容</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请日期</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" height="30px">{{shenghe.noname}}</td>
                    <td style="text-align: center;">{{shenghe.mynoemp.ename}}</td>
                    <td style="text-align: center;">{{shenghe.zhengwen}}</td>
                    <td style="text-align: center;">{{shenghe.nodzdate}}</td>
                  </tr>
                </table>
              </div>
            </el-aside>
            <el-main>
              <el-form>
                <el-form-item label="是否通过:">
                  <el-radio v-model="radio" label="1">批准</el-radio>
                  <el-radio v-model="radio" label="2">不批准</el-radio>
                </el-form-item>
                <el-form-item label="审批意见:">
                  <el-input type="textarea" placeholder="请输入审批意见" v-model="exyijian"></el-input>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </el-container>
      </el-dialog>
      <!-- 转正审批 -->
      <el-dialog width="80%" title="转正审批" :visible.sync="dialogFormVisibleszz">
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="5">
                <el-button type="primary" size="mini" plain @click="zhuanzhengqueren()">确认</el-button>
                <el-button type="primary" size="mini" plain @click="dialogFormVisibleszz = false">取消</el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-container>
            <el-aside width="600px">
              <div style="height: 260px;border-right:1px solid #C6C8CD;margin-top: 25px;">
                <table
                  border="1"
                  style="border-collapse: collapse;border: 1px; border-color: #EBEEF5;"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请人</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请内容</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请日期</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" height="30px">{{zhuanzhengrow.myemp.ename}}</td>
                    <td style="text-align: center;">{{zhuanzhengrow.jzong}}</td>
                    <td style="text-align: center;">{{zhuanzhengrow.justtime}}</td>
                  </tr>
                </table>
              </div>
            </el-aside>
            <el-main>
              <el-form>
                <el-form-item label="是否通过:">
                  <el-radio v-model="radio" label="1">批准</el-radio>
                  <el-radio v-model="radio" label="2">不批准</el-radio>
                </el-form-item>
                <el-form-item label="审批意见:">
                  <el-input type="textarea" placeholder="请输入审批意见" v-model="exyijian"></el-input>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </el-container>
      </el-dialog>
      <!-- 项目审批 -->
      <el-dialog width="80%" title="项目审批" :visible.sync="dialogFormVisiblesxm">
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="5">
                <el-button type="primary" size="mini" plain @click="xiangmuqueren()">确认</el-button>
                <el-button type="primary" size="mini" plain @click="dialogFormVisiblesxm = false">取消</el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-container>
            <el-aside width="600px">
              <div style="height: 260px;border-right:1px solid #C6C8CD;margin-top: 25px;">
                <table
                  border="1"
                  style="border-collapse: collapse;border: 1px; border-color: #EBEEF5;"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请人</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请内容</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请日期</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" height="30px">{{xiangmurows.myfzr.ename}}</td>
                    <td style="text-align: center;">{{xiangmurows.explain}}</td>
                    <td style="text-align: center;">{{xiangmurows.start}}</td>
                  </tr>
                </table>
              </div>
            </el-aside>
            <el-main>
              <el-form>
                <el-form-item label="是否通过:">
                  <el-radio v-model="radio" label="1">批准</el-radio>
                  <el-radio v-model="radio" label="2">不批准</el-radio>
                </el-form-item>
                <el-form-item label="审批意见:">
                  <el-input type="textarea" placeholder="请输入审批意见" v-model="exyijian"></el-input>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </el-container>
      </el-dialog>
      <!-- 调岗审批 -->
      <el-dialog width="80%" title="调岗审批" :visible.sync="dialogFormVisiblestg">
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="5">
                <el-button type="primary" size="mini" plain @click="tiaogangqueren()">确认</el-button>
                <el-button type="primary" size="mini" plain @click="dialogFormVisiblesxm = false">取消</el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-container>
            <el-aside width="600px">
              <div style="height: 260px;border-right:1px solid #C6C8CD;margin-top: 25px;">
                <table
                  border="1"
                  style="border-collapse: collapse;border: 1px; border-color: #EBEEF5;"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请人</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请内容</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请日期</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" height="30px">{{tiaogangrow.myemp.ename}}</td>
                    <td style="text-align: center;">{{tiaogangrow.tzong}}</td>
                    <td style="text-align: center;">{{tiaogangrow.transfertime}}</td>
                  </tr>
                </table>
              </div>
            </el-aside>
            <el-main>
              <el-form>
                <el-form-item label="是否通过:">
                  <el-radio v-model="radio" label="1">批准</el-radio>
                  <el-radio v-model="radio" label="2">不批准</el-radio>
                </el-form-item>
                <el-form-item label="审批意见:">
                  <el-input type="textarea" placeholder="请输入审批意见" v-model="exyijian"></el-input>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </el-container>
      </el-dialog>
      <!-- 离职审批 -->
      <el-dialog width="80%" title="调岗审批" :visible.sync="dialogFormVisibleslz">
        <el-container>
          <el-header>
            <el-row>
              <el-col :span="5">
                <el-button type="primary" size="mini" plain @click="lizhiqueren()">确认</el-button>
                <el-button type="primary" size="mini" plain @click="dialogFormVisiblesxm = false">取消</el-button>
              </el-col>
            </el-row>
          </el-header>
          <el-container>
            <el-aside width="600px">
              <div style="height: 260px;border-right:1px solid #C6C8CD;margin-top: 25px;">
                <table
                  border="1"
                  style="border-collapse: collapse;border: 1px; border-color: #EBEEF5;"
                  width="100%"
                  cellspacing="0"
                  cellpadding="0"
                >
                  <tr>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请人</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请内容</td>
                    <td
                      style="text-align: center;background-color: #F5F7FA;color: #909399; font-size: 20px;"
                    >申请日期</td>
                  </tr>
                  <tr>
                    <td style="text-align: center;" height="30px">{{lizhirow.myemp.ename}}</td>
                    <td style="text-align: center;">{{lizhirow.dzong}}</td>
                    <td style="text-align: center;">{{lizhirow.dimissiontime}}</td>
                  </tr>
                </table>
              </div>
            </el-aside>
            <el-main>
              <el-form>
                <el-form-item label="是否通过:">
                  <el-radio v-model="radio" label="1">批准</el-radio>
                  <el-radio v-model="radio" label="2">不批准</el-radio>
                </el-form-item>
                <el-form-item label="审批意见:">
                  <el-input type="textarea" placeholder="请输入审批意见" v-model="exyijian"></el-input>
                </el-form-item>
              </el-form>
            </el-main>
          </el-container>
        </el-container>
      </el-dialog>
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
      tableData: [],
      current: 1,
      pageSize: 6,
      dialogFormVisibles: false,
      shenghe: {
        mynoemp: {
          ename: "",
        },
      },

      zhuanzheng: [],
      currentz: 1,
      pageSizez: 6,
      dialogFormVisibleszz: false,
      zhuanzhengrow: {
        myemp: {
          ename: "",
        },
      },

      listxiangmu: [],
      currentx: 1,
      pageSizex: 6,
      dialogFormVisiblesxm: false,
      xiangmurows: {
        myfzr: { ename: "" },
      },

      listtiaogang: [],
      currentt: 1,
      pageSizet: 6,
      dialogFormVisiblestg: false,
      tiaogangrow: {
        myemp: {
          ename: "",
        },
      },

      listlizhi: [],
      currentl: 1,
      pageSizel: 6,
      dialogFormVisibleslz: false,
      lizhirow:{
        myemp:{
          ename:'',
        }
      },

      search: "",
      radio: "1",
      exyijian: "",
      activeName: "first",
      dscount:'',
      yscount:'',
    };
  },
  methods: {
    // 公告
    loadData() {
      this.$axios
        .get(
          "http://localhost:8089/gonggao/ggAll?no=" +
            this.current +
            "&size=" +
            this.pageSize
        )
        .then((r) => {
          // console.log("公告:", r);
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
    /* 公告审批 */
    shenpi(row) {
      this.dialogFormVisibles = true;
      this.shenghe = row;
      // console.log("公告当前行数据：", row);
    },
    // 公告确认审批
    shenpiqueren() {
      var wxwid = this.shenghe.noid;
      // console.log("公告获取到的ID", this.shenghe.noid);
      var nofenlei = this.shenghe.nofenlei;
      // console.log("公告获取到的类型：", this.shenghe.nofenlei);
      var exyijian = this.exyijian;
      // console.log("获取到的审批意见：", this.exyijian);
      var extype = this.radio;
      // console.log("获取到的审批状态：", this.radio);
      var xitongdate = new Date();
      var exdate = moment(xitongdate).unix() * 1000;
      // console.log("当前系统时间：", exdate);

      // let user = sessionStorage.getItem('user');
      // var jsonObj = JSON.parse(user);
      // this.uname = jsonObj.ename;
      // console.log("获取到的当前系统登陆者：",this.uname)
      var shenpi = {
        exdate: exdate,
        exyijian: exyijian,
        extype: extype,
        exstate: nofenlei,
        wxwid: wxwid,
      };
      console.log("审批结果集为：", shenpi);
      // 公告修改
      let url = "http://localhost:8089/shenpi/updtsp";
      this.$axios
        .get(
          url +
            "?exdate=" +
            exdate +
            "&exyijian=" +
            this.exyijian +
            "&extype=" +
            this.radio +
            "&exstate=" +
            this.shenghe.nofenlei +
            "&wxwid=" +
            this.shenghe.noid
        )
        .then((res) => {
          console.log("即将进入修改获取为：", this.shenghe.noid);
          let url = "http://localhost:8089/gonggao/updtgg";
          this.$axios
            .get(url + "?notype=" + this.radio + "&noid=" + this.shenghe.noid)
            .then((ress) => {
              this.$message({
                type: "success",
                message: "审批成功!",
              });
              this.loadData();
            })
            .catch((e) => {
              this.$message({
                type: "success",
                message: "审批失败!",
              });
            });
          this.$router.go(0);
        })
        .catch((e) => {
          // console.log("错误信息", e);
          this.$message({
            type: "success",
            message: "审批失败!!!",
          });
        });
    },
    // 转正
    loadDataz() {
      this.$axios
        .get(
          "http://localhost:8089/just/justall?no=" +
            this.current +
            "&size=" +
            this.pageSize
        )
        .then((r) => {
          // console.log("转正:", r);
          this.zhuanzheng = r;
        })
        .catch((e) => {
          this.$message({
            message: "报错了，请检查网络是否正常",
            type: "error",
          });
        });
    },
    handleSizeChangez(p) {
      this.pageSizez = p;
      this.loadDataz();
    },
    handleCurrentChangez(p) {
      this.currentz = p;
      this.loadDataz();
    },
    // 转正当前行数据
    zhuanzhengsp(row) {
      this.dialogFormVisibleszz = true;
      this.zhuanzhengrow = row;
      // console.log("转正当前行数据：", row);
    },
    /*转正审批*/
    zhuanzhengqueren() {
      var jid = this.zhuanzhengrow.jid;
      // console.log("公告获取到的ID", this.zhuanzhengrow.jid);
      var exyijian = this.exyijian;
      // console.log("获取到的审批意见：", this.exyijian);
      var nofenlei = "转正";
      var extype = this.radio;
      // console.log("获取到的审批状态：", this.radio);
      var ezt = "在职";
      var xitongdate = new Date();
      var exdate = moment(xitongdate).unix() * 1000;
      // console.log("当前系统时间：", exdate);

      let url = "http://localhost:8089/shenpi/updtsp";
      this.$axios
        .get(
          url +
            "?exdate=" +
            exdate +
            "&exyijian=" +
            this.exyijian +
            "&extype=" +
            this.radio +
            "&exstate=" +
            nofenlei +
            "&wxwid=" +
            this.zhuanzhengrow.jid
        )
        .then((res) => {
          console.log("即将进入转正表状态：", this.zhuanzhengrow.jid);
          let url = "http://localhost:8089/just/juszz";
          this.$axios
            .get(
              url + "?jsehngpi=" + this.radio + "&jid=" + this.zhuanzhengrow.jid
            )
            .then((ress) => {
              let url = "http://localhost:8089/emp/updtemp";
              this.$axios
                .get(
                  url + "?ezt=" + ezt + "&eid=" + this.zhuanzhengrow.myemp.eid
                )
                .then((ress) => {
                  this.$message({
                    type: "success",
                    message: "审批成功!",
                  });
                  this.loadData();
                })
                .catch((e) => {
                  this.$message({
                    type: "success",
                    message: "审批失败!",
                  });
                });
            })
            .catch((e) => {
              this.$message({
                type: "success",
                message: "审批失败!",
              });
            });
          this.$router.go(0);
        })
        .catch((e) => {
          // console.log("错误信息", e);
          this.$message({
            type: "success",
            message: "审批失败!!!",
          });
        });
    },
    /**项目 */
    loadDatax() {
      this.$axios
        .get(
          "http://localhost:8089/xm/xmall?no=" +
            this.currentx +
            "&size=" +
            this.pageSizex
        )
        .then((r) => {
          // console.log("项目:", r);
          this.listxiangmu = r;
        })
        .catch((e) => {
          this.$message({
            message: "报错了，请检查网络是否正常",
            type: "error",
          });
        });
    },
    /**项目当前行数据 */
    xiangmurow(row) {
      this.dialogFormVisiblesxm = true;
      this.xiangmurows = row;
      // console.log("转正当前行数据：", row);
    },
    /**项目审批 */
    xiangmuqueren() {
      var xid = this.xiangmurows.xid;
      // console.log("公告获取到的ID", this.xiangmurows.xid);
      var nofenlei = "项目";
      // console.log("公告获取到的类型：", this.shenghe.nofenlei);
      var exyijian = this.exyijian;
      // console.log("获取到的审批意见：", this.exyijian);
      var extype = this.radio;
      // console.log("获取到的审批状态：", this.radio);
      var xitongdate = new Date();
      var exdate = moment(xitongdate).unix() * 1000;
      // console.log("当前系统时间：", exdate);

      // let user = sessionStorage.getItem('user');
      // var jsonObj = JSON.parse(user);
      // this.uname = jsonObj.ename;
      // console.log("获取到的当前系统登陆者：",this.uname)

      let url = "http://localhost:8089/shenpi/updtsp";
      this.$axios
        .get(
          url +
            "?exdate=" +
            exdate +
            "&exyijian=" +
            this.exyijian +
            "&extype=" +
            this.radio +
            "&exstate=" +
            nofenlei +
            "&wxwid=" +
            this.xiangmurows.xid
        )
        .then((res) => {
          console.log("即将进入转正表状态：", this.xiangmurows.xid);
          let url = "http://localhost:8089/xm/xmupdt";
          this.$axios
            .get(url + "?state=" + this.radio + "&xid=" + this.xiangmurows.xid)
            .then((ress) => {
              this.$message({
                type: "success",
                message: "审批成功!",
              });
              this.loadData();
            })
            .catch((e) => {
              this.$message({
                type: "success",
                message: "审批失败!",
              });
            });
          this.$router.go(0);
        })
        .catch((e) => {
          // console.log("错误信息", e);
          this.$message({
            type: "success",
            message: "审批失败!!!",
          });
        });
    },
    handleSizeChangex(p) {
      this.pageSizex = p;
      this.loadDatax();
    },
    handleCurrentChangex(p) {
      this.currentx = p;
      this.loadDatax();
    },
    /**调岗 */
    loadDatat() {
      this.$axios
        .get(
          "http://localhost:8089/transfer/tiaogangall?no=" +
            this.currentt +
            "&size=" +
            this.pageSizet
        )
        .then((r) => {
          console.log("调岗:", r);
          this.listtiaogang = r;
        })
        .catch((e) => {
          this.$message({
            message: "报错了，请检查网络是否正常",
            type: "error",
          });
        });
    },
    /**调岗获取行数据 */
    tiaogangsp(row) {
      this.dialogFormVisiblestg = true;
      this.tiaogangrow = row;
      // console.log("调岗行数据:", this.tiaogangrow);
    },
    /**调岗审批 */
    tiaogangqueren() {
      var tids = this.tiaogangrow.tids;
      // console.log("公告获取到的ID", this.xiangmurows.xid);
      var nofenlei = "调岗";
      // console.log("公告获取到的类型：", this.shenghe.nofenlei);
      var exyijian = this.exyijian;
      // console.log("获取到的审批意见：", this.exyijian);
      var extype = this.radio;
      // console.log("获取到的审批状态：", this.radio);
      var xitongdate = new Date();
      var exdate = moment(xitongdate).unix() * 1000;
      // console.log("当前系统时间：", exdate);
      let url = "http://localhost:8089/shenpi/updtsp";
      this.$axios
        .get(
          url +
            "?exdate=" +
            exdate +
            "&exyijian=" +
            this.exyijian +
            "&extype=" +
            this.radio +
            "&exstate=" +
            nofenlei +
            "&wxwid=" +
            this.tiaogangrow.tids
        )
        .then((res) => {
          console.log("即将进入转正表状态：", this.tiaogangrow.tids);
          let url = "http://localhost:8089/transfer/uptg";
          this.$axios
            .get(
              url + "?tsehngpi=" + this.radio + "&tids=" + this.tiaogangrow.tids
            )
            .then((ress) => {
              this.$message({
                type: "success",
                message: "审批成功!",
              });
              this.loadData();
            })
            .catch((e) => {
              this.$message({
                type: "success",
                message: "审批失败!",
              });
            });
            this.$router.go(0);
        })
        .catch((e) => {
          this.$message({
            type: "success",
            message: "审批失败!",
          });
          this.$router.go(0);
        })
        .catch((e) => {
          // console.log("错误信息", e);
          this.$message({
            type: "success",
            message: "审批失败!!!",
          });
        });
    },
    handleSizeChanget(p) {
      this.pageSizet = p;
      this.loadDatat();
    },
    handleCurrentChanget(p) {
      this.currentt = p;
      this.loadDatat();
    },
    /**离职 */
    loadDatal() {
      this.$axios
        .get(
          "http://localhost:8089/dimission/lizhiall?no=" +
            this.currentl +
            "&size=" +
            this.pageSizel
        )
        .then((r) => {
          console.log("离职:", r);
          this.listlizhi = r;
        })
        .catch((e) => {
          this.$message({
            message: "报错了，请检查网络是否正常",
            type: "error",
          });
        });
    },
    /**获取离职当前行 */
    lizhisp(row){
      this.dialogFormVisibleslz = true;
      this.lizhirow = row;
      console.log("获取到离职行数据:",row)
    },
    /**离职审批 */
    lizhiqueren(){
      var tids = this.lizhirow.dimid;
      // console.log("公告获取到的ID", this.xiangmurows.xid);
      var nofenlei = "离职";
      // console.log("公告获取到的类型：", this.shenghe.nofenlei);
      var exyijian = this.exyijian;
      // console.log("获取到的审批意见：", this.exyijian);
      var extype = this.radio;
      // console.log("获取到的审批状态：", this.radio);
      var ezt = '离职';
      var xitongdate = new Date();
      var exdate = moment(xitongdate).unix() * 1000;
      // console.log("当前系统时间：", exdate);
      let url = "http://localhost:8089/shenpi/updtsp";
      this.$axios
        .get(
          url +
            "?exdate=" +
            exdate +
            "&exyijian=" +
            this.exyijian +
            "&extype=" +
            this.radio +
            "&exstate=" +
            nofenlei +
            "&wxwid=" +
            this.lizhirow.dimid
        )
        .then((res) => {
          console.log("即将进入转正表状态：", this.lizhirow.dimid);
          let url = "http://localhost:8089/dimission/uplizhi";
          this.$axios
            .get(
              url + "?dshenpi=" + this.radio + "&dimid=" + this.lizhirow.dimid
            )
            .then((ress) => {
              let url = "http://localhost:8089/emp/updtemp";
              this.$axios
                .get(
                  url + "?ezt=" + ezt + "&eid=" + this.lizhirow.myemp.eid
                )
                .then((ress) => {
                  this.$message({
                    type: "success",
                    message: "审批成功!",
                  });
                  this.loadData();
                })
                .catch((e) => {
                  this.$message({
                    type: "success",
                    message: "审批失败!",
                  });
                });
            })
            .catch((e) => {
              this.$message({
                type: "success",
                message: "审批失败!",
              });
            });
          this.$router.go(0);
        })
        .catch((e) => {
          // console.log("错误信息", e);
          this.$message({
            type: "success",
            message: "审批失败!!!",
          });
        });
    },
    handleSizeChangel(p) {
      this.pageSizel = p;
      this.loadDatal();
    },
    handleCurrentChangel(p) {
      this.currentl = p;
      this.loadDatal();
    },
    /**统计待审批 */
    dscountt(){
      this.$axios.put("http://localhost:8089/shenpi/dscoun")
      .then((r)=>{
        this.dscount = r;
      })
    },
    /**统计已审批 */
    yscountt(){
      this.$axios.put("http://localhost:8089/shenpi/yscoun")
      .then((r)=>{
        this.yscount = r;
      })
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  mounted() {
    this.loadData();
    this.loadDataz();
    this.loadDatax();
    this.loadDatat();
    this.loadDatal();
    this.dscountt();
    this.yscountt();
  },
};
</script>

<style scoped>
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
  line-height: 20px;
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
  margin-top: -18px;
  background-color: #f7f7f7;
  border-bottom: 1px solid #d3d3d3;
}
.bleow_right_top_box h3 {
  padding-top: 12px;
  padding-left: 15px;
}
</style>
