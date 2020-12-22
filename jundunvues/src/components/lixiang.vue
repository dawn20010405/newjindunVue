<template>
    <div>
        <el-row>
            <!-- <el-col :span="24">
                <el-card shadow="hover" class="li">
                  <i class="el-icon-s-check" style="font-size: 30px;"></i><b>立单项</b>
                  </el-card>
            </el-col>-->

            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card shadow="hover" class="li">
                        <b>待审批</b>
                        <br />
                        <span style="color:red">{{shenpi}}</span>
                    </el-card>
                </div>
            </el-col>

            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-card shadow="hover" class="li">
                        <b>已通过</b>
                        <br />
                        <span style="color:red">{{pass}}</span>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card shadow="hover" class="li">
                        <b>已完成</b>
                        <br />
                        <span style="color:red">{{yes}}</span>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-card shadow="hover" class="li">
                        <b>已作废</b>
                        <br />
                        <span style="color:red">{{no}}</span>
                    </el-card>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-card shadow="hover" class="li">
                        <!-- <div id="myChart4" style="border:1px solid red;height:500px"></div> -->
                         <div class="HelloWorld echart-box" id="myChart4" style="hegith:500px"></div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-card shadow="hover" class="li">项目级别</el-card>
                </div>
            </el-col>
        </el-row>
        <br>
        <br>
        <br>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="xid" label="项目编号" width="180"></el-table-column>
            <el-table-column prop="mytype.tname" label="项目类型"></el-table-column>
            <el-table-column prop="xname" label="项目名称" width="180"></el-table-column>
            <el-table-column prop="myfzr.ename" label="负责人"></el-table-column>
            <el-table-column prop="start" label="计划开始时间"></el-table-column>
            <el-table-column prop="end" label="计划结束时间"></el-table-column>
            <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <el-tag type="warning" v-if="scope.row.state==0">待通过</el-tag>
                    <el-tag type="success" v-if="scope.row.state==1">已通过</el-tag>
                    <el-tag type="danger" v-if="scope.row.state==2">已作废</el-tag>
                    <el-tag type="success" v-if="scope.row.state==3">已完成</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="evel" label="级别">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.evel==1">非常紧急</el-tag>
                    <el-tag type="warning" v-if="scope.row.evel==2">比较紧急</el-tag>
                    <el-tag type="info" v-if="scope.row.evel==3">一般紧急</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="cdate" label="申请时间"></el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="current"
            :page-sizes="[1, 2, 3, 4]"
            :page-size="size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

    <script>
export default {
    data() {
        return {
            tableData: [],

            zhuangtai: [],
            shenpi: 0,
            pass: 0,
            no: 0,
            yes: 0,
            type: [],
            evel: [],
            current: 1,
            size: 2,
            total: 0,
            form: {
                username: '',
                password: ''
            },
            rules: {
                username: [
                    { required: true, message: '用户名不能为空', trigger: 'blur' },
                    { min: 3, max: 12, message: '用户名3-5位', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' },
                    { min: 1, max: 20, message: '密码1-20位', trigger: 'blur' }
                ]
            }
        };
    },
    watch: {
        type: {
            handler: function() {
                this.drawLine4();
            },
            deep: true
        }
    },
    mounted: function() {
        this.drawLine4();
    },

    methods: {
        drawLine4() {
            // 1、基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart4'));
            //2、构造图表数据
            let options = {
                title: {
                    // text: "项目类型",
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.type.name
                },
                series: [
                    {
                        name: '项目类型',
                        type: 'pie',
                        radius: '30%',
                        center: ['20%', '20%'],
                        data: this.type,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            // 3、绘制图表
            myChart.setOption(options);
        },

        handleCurrentChange(c) {
            this.current = c;
            this.xiangmu();
        },

        handleSizeChange(size2) {
            this.size = size2;
            console.log(this.size); //每页下拉显示数据
            this.xiangmu();
        },

        countxiangmu() {
            let url = 'xm/counts';
            //2、参数
            let param = {};
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目状态统计的值', pager);
                //   for(var i=0;i<pager.length;i++){
                //   console.log('人数',pager[i].xid);
                // }
                for (let i = 0; i < pager.length; i++) {
                    console.log('人数', pager[i].xid);
                    if (pager[i].state == 0) {
                        this.shenpi = pager[i].xid;
                    } else if (pager[i].state == 1) {
                        this.pass = pager[i].xid;
                    } else if (pager[i].state == 2) {
                        this.no = pager[i].xid;
                    } else if (pager[i].state == 3) {
                        this.yes = pager[i].xid;
                    }
                }
            });
        },

        countype() {
            let url = 'xm/countype';
            //2、参数
            let param = {};
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目类型统计饼图的值', pager);
                this.type.length = 0; //清空数组
                for (let i = 0; i < pager.data.length; i++) {
                    var item = {
                        value: pager.data[i],
                        name: pager.name[i]
                    };
                    this.type.push(item);
                }
            });
        },

        countevel() {
            let url = 'xm/countevel';
            //2、参数
            let param = {};
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目级别统计饼图的值', pager);
            });
        },

        xiangmu() {
            let url = 'xm/all';
            //2、参数
            let param = {
                no: this.current,
                size: this.size
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('值', pager);
                this.total = pager.size;
                this.tableData = pager.list;
                // let user = sessionStorage.getItem('user');
                // var jsonObj = JSON.parse(user);
                // console.log(jsonObj.eid);
            });
        },

        denglu() {
            //链接地址
            let url = 'login/denglu';
            //2、参数
            let param = {
                phone: this.form.username,
                pass: this.form.password
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('值', pager);

                if (pager != null) {
                    sessionStorage.setItem('user', JSON.stringify(pager));
                    this.$router.push({
                        name: '/home'
                    });

                    this.$message({
                        message: '登录成功！',
                        type: 'success'
                    });
                } else {
                    this.$message({
                        message: '账号或密码错误',
                        type: 'warning'
                    });
                    return false;
                }
            });
        },
        submitForm() {
            if (this.form.username == null || this.form.username == '') {
                this.$message({
                    message: '用户名不能为空',
                    type: 'warning'
                });
                return false;
            } else if (this.form.password == null || this.form.password == '') {
                this.$message({
                    message: '密码不能为空',
                    type: 'warning'
                });
                return false;
            } else {
                this.denglu();
            }
        }
    },
    created() {
        this.xiangmu();
        this.countxiangmu();
        this.countype();
        this.countevel();
    }
};
</script >

  <style scoped>
.li {
    text-align: center;
    font-size: 23px;
}
</style>
