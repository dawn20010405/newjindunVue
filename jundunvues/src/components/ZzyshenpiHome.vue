<template>
    <div>
        <!-- 头部盒子 -->
        <div class="top_box">
            <div class="left_box" @click="$router.push('dsp')">
                <div class="lett_img" style="background-image: url(../../static/img/文本.png);"></div>
                <div class="p_box">
                    <p style="color: #E29C00;">0</p>
                    <p style="color: #5E6C8A;">待审批</p>
                </div>
            </div>
            <div class="left_box">
                <div class="lett_img" style="background-image: url(../../static/img/通过.png);"></div>
                <div class="p_box">
                    <p style="color: #E29C00;">0</p>
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
            <div class="bleow_right_top_box">
                <h3>待审批</h3>
            </div>
            <!-- 公告待审批表 -->
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
                    <template slot="header">
                        <el-input v-model="search" size="mini" placeholder="输入关键字搜索" />
                    </template>
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

            <!-- 审批页面 -->
            <el-dialog width="80%" title="审批" :visible.sync="dialogFormVisibles">
                <el-container>
                    <el-header>
                        <el-row>
                            <el-col :span="5">
                                <el-button
                                    type="primary"
                                    size="mini"
                                    plain
                                    @click="shenpiqueren()"
                                >确认</el-button>
                                <el-button
                                    type="primary"
                                    size="mini"
                                    plain
                                    @click="dialogFormVisibles = false"
                                >取消</el-button>
                            </el-col>
                        </el-row>
                    </el-header>
                    <el-container>
                        <el-aside width="600px">
                            <table
                                border="1"
                                style="border-collapse: collapse;border: 1px; border-color: #EBEEF5;margin-top:20px;"
                                width="100%"
                                cellspacing="0"
                                cellpadding="0"
                            >
                                <tr>
                                    <td
                                        style="text-align: center;background-color: #FFFFFF;color: #909399; font-size: 20px;"
                                    >申请人</td>
                                    <td
                                        style="text-align: center;background-color: #FFFFFF;color: #909399; font-size: 20px;"
                                    >申请内容</td>
                                    <td
                                        style="text-align: center;background-color: #FFFFFF;color: #909399; font-size: 20px;"
                                    >申请日期日期</td>
                                </tr>
                                <tr style="font-size: 20px">
                                    <td style="text-align: center;">{{shenghe.mynoemp.ename}}</td>
                                    <td style="text-align: center;">{{shenghe.zhengwen}}</td>
                                    <td style="text-align: center;">{{shenghe.nodzdate}}</td>
                                </tr>
                            </table>
                        </el-aside>
                        <el-main>
                            <el-form>
                                <el-form-item label="是否通过:">
                                    <el-radio v-model="radio" label="1">批准</el-radio>
                                    <el-radio v-model="radio" label="2">不批准</el-radio>
                                </el-form-item>
                                <el-form-item label="审批意见:">
                                    <el-input
                                        type="textarea"
                                        placeholder="请输入审批意见"
                                        v-model="exyijian"
                                    ></el-input>
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
import moment from 'moment';
export default {
    data() {
        return {
            tableData: [],
            search: '',
            current: 1,
            pageSize: 6,
            dialogFormVisibles: false,
            radio: 1,
            exyijian: '',
            shenghe: {
                mynoemp: {
                    ename: ''
                }
            }
        };
    },
    methods: {
        loadData() {
            this.$axios
                .get('http://localhost:8089/gonggao/ggAll?no=' + this.current + '&size=' + this.pageSize)
                .then(r => {
                    console.log(r);
                    this.tableData = r;
                })
                .catch(e => {
                    this.$message({
                        message: '报错了，请检查网络是否正常',
                        type: 'error'
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
        /* 审批 */
        shenpi(row) {
            this.dialogFormVisibles = true;
            this.shenghe = row;
            console.log('当前行数据：', row);
        },
        // 确认审批
        shenpiqueren() {
            var wxwid = this.shenghe.noid;
            console.log('获取到的ID', this.shenghe.noid);
            var nofenlei = this.shenghe.nofenlei;
            console.log('获取到的类型：', this.shenghe.nofenlei);
            var exyijian = this.exyijian;
            console.log('获取到的审批意见：', this.exyijian);
            var extype = this.radio;
            console.log('获取到的审批状态：', this.radio);
            var xitongdate = new Date();
            var exdate = moment(xitongdate).unix() * 1000;
            console.log('当前系统时间：', exdate);

            // let user = sessionStorage.getItem('user');
            // var jsonObj = JSON.parse(user);
            // this.uname = jsonObj.ename;
            // console.log("获取到的当前系统登陆者：",this.uname)
            var shenpi = {
                exdate: exdate,
                exyijian: exyijian,
                extype: extype,
                exstate: nofenlei,
                wxwid: wxwid
            };
            console.log('审批结果集为：', shenpi);
            if (this.shenghe.nofenlei == '公告') {
                let url = 'http://localhost:8089/shenpi/updtsp';
                this.$axios
                    .get(
                        url +
                            '?exdate=' +
                            exdate +
                            '&exyijian=' +
                            this.exyijian +
                            '&extype=' +
                            this.radio +
                            '&exstate=' +
                            this.shenghe.nofenlei +
                            '&wxwid=' +
                            this.shenghe.noid
                    )
                    .then(res => {
                        // console.log("即将进入修改获取为：", res.mycwapply.abxId);
                        // let url = "http://localhost:8085/apply/baoxiao";
                        // this.$axios.get(url + "?id=" + res.mycwapply.abxId)
                        //   .then((ress) => {
                        //     this.$message({
                        //       type: "success",
                        //       message: "报销成功!",
                        //     });
                        //     // this.loadData();
                        //   })
                        //   .catch((e) => {
                        //     this.$message({
                        //       type: "success",
                        //       message: "报销失败!",
                        //     });
                        //   });
                        // this.$router.go(0);
                        this.$message({
                            type: 'success',
                            message: '审批成功!'
                        });
                    })
                    .catch(e => {
                        console.log('错误信息', e);
                        this.$message({
                            type: 'success',
                            message: '审批失败!!!'
                        });
                    });
                alert('这是公告');
            } else if (this.shenghe.nofenlei == '转正') {
                alert('这是转正');
            } else if (this.shenghe.nofenlei == '离职') {
                alert('这是离职');
            } else if (this.shenghe.nofenlei == '调岗') {
                alert('这是调岗');
            } else if (this.shenghe.nofenlei == '项目') {
                alert('这是项目');
            } else if (this.shenghe.nofenlei == '面试') {
                alert('这是面试');
            } else if (this.shenghe.nofenlei == '物资') {
                alert('这是物资');
            } else {
                alert('错误！！！');
            }
        }
    },
    mounted() {
        this.loadData();
    }
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
    margin-top: -18px;
    background-color: #f7f7f7;
    border-bottom: 1px solid #d3d3d3;
}
.bleow_right_top_box h3 {
    padding-top: 12px;
    padding-left: 15px;
}
</style>
