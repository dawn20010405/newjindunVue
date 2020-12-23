<template>
    <div>
        <el-row>
            <!-- <el-col :span="24">
                <el-card shadow="hover" class="li">
                  <i class="el-icon-s-check" style="font-size: 30px;"></i><b>立单项</b>
                  </el-card>
            </el-col>-->

            <!-- <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card shadow="hover" class="li">
                        <b>待审批</b>
                        <br />
                        <span style="color:red">{{shenpi}}</span>
                    </el-card>
                </div>
            </el-col>-->

            <el-col :span="8">
                <div class="grid-content bg-purple-light">
                    <el-card shadow="hover" class="li">
                        <b>进行中</b>
                        <br />
                        <span style="color:red">{{pass}}</span>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-card shadow="hover" class="li">
                        <b>已完成</b>
                        <br />
                        <span style="color:red">{{yes}}</span>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="8">
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
                        <div id="myChart4" style="height:200px"></div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-card shadow="hover" class="li">
                        <div id="myChart5" style="height:200px"></div>
                    </el-card>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-select v-model="man" clearable placeholder="请选择负责人" @change="xiangmu()">
                        <el-option v-for="e in ealls" :key="e.eid" :label="e.ename" :value="e.eid"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-select v-model="xtype" clearable placeholder="请选择项目类型" @change="xiangmu()">
                        <el-option
                            v-for="t in xmtypes2"
                            :key="t.tid"
                            :label="t.tname"
                            :value="t.tid"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple">
                    <el-select
                        v-model="xzhuangtai"
                        clearable
                        placeholder="请选择项目状态"
                        @change="xiangmu()"
                    >
                        <el-option v-for="z in zt" :key="z.value" :label="z.name" :value="z.value"></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="4">
                <div class="grid-content bg-purple-light">
                    <el-select v-model="xevel" clearable placeholder="请选择项目级别" @change="xiangmu()">
                        <el-option
                            v-for="j in jibie2"
                            :key="j.value"
                            :label="j.name"
                            :value="j.value"
                        ></el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                    <el-button type="primary" @click="seen=true" plain>项目立项</el-button>
                </div>
            </el-col>
        </el-row>

        <el-dialog title="项目立项" :visible.sync="seen" :fullscreen="true" style="text-align:center">
            <el-tabs type="border-card">
                <el-tab-pane label="综合信息">
                    <el-row>
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-card shadow="hover">
                                    <el-progress type="circle" :percentage="25"></el-progress>
                                    <br />项目进度
                                </el-card>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-light">
                                <el-card shadow="hover">
                                    <el-progress type="circle" :percentage="25"></el-progress>
                                    <br />自评进度
                                </el-card>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="grid-content bg-purple">
                                <el-card shadow="hover">
                                    <h3>风险报告</h3>
                                    <el-table :data="risk" border style="width: 100%">
                                        <el-table-column prop="fname" label="风险名称" width="180"></el-table-column>
                                        <el-table-column prop="btype" label="类型"></el-table-column>
                                        <el-table-column prop="level" label="等级"></el-table-column>
                                    </el-table>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="人员信息">配置管理</el-tab-pane>
                <el-tab-pane label="风险报告">角色管理</el-tab-pane>
                <el-tab-pane label="项目进度">定时任务补偿</el-tab-pane>
            </el-tabs>
        </el-dialog>

        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="mytype.tname" label="项目类型"></el-table-column>
            <el-table-column prop="xname" label="项目名称" width="180"></el-table-column>
            <el-table-column prop="myfzr.ename" label="负责人"></el-table-column>
            <!-- <el-table-column prop="startime" label="计划开始时间"></el-table-column>
            <el-table-column prop="endtime" label="计划结束时间"></el-table-column>-->

            <el-table-column prop="xid" label="项目进度" width="180">
                <template slot-scope="scope">
                    工期进度：
                    <el-progress
                        :text-inside="true"
                        :stroke-width="26"
                        :percentage="scope.row.jindu"
                        style="color:black"
                    ></el-progress>自评进度：
                    <el-progress
                        :text-inside="true"
                        :stroke-width="24"
                        :percentage="scope.row.ziping"
                        status="success"
                        style="color:black"
                    ></el-progress>
                </template>
            </el-table-column>
            <el-table-column prop="state" label="状态">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.state==1">进行中</el-tag>
                    <el-tag type="danger" v-if="scope.row.state==2">已作废</el-tag>
                    <el-tag type="success" v-if="scope.row.state==3">已完成</el-tag>
                    <el-tag
                        type="warning"
                        v-if="(ceshi(scope.row.endtime)-ceshi(scope.row.startime))/3600/24<60"
                    >快到期</el-tag>
                    <el-tag
                        type="warning"
                        v-if="(ceshi(scope.row.endtime)-ceshi(scope.row.startime))/3600/24<=0"
                    >已超时</el-tag>
                </template>
            </el-table-column>

            <el-table-column prop="evel" label="级别">
                <template slot-scope="scope">
                    <el-tag type="danger" v-if="scope.row.evel==1">非常紧急</el-tag>
                    <el-tag type="warning" v-if="scope.row.evel==2">比较紧急</el-tag>
                    <el-tag type="info" v-if="scope.row.evel==3">一般紧急</el-tag>
                </template>
            </el-table-column>

            <!-- :prop="ceshi(scope.row.endtime)-ceshi(scope.row.startime)" -->
            <el-table-column label="剩余工时">
                <template
                    slot-scope="scope"
                >{{(ceshi(scope.row.endtime)-ceshi(scope.row.startime))/3600/24}}天</template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="chakan(scope.row)"
                        v-if="scope.row.state=1 || scope.row.state==2"
                    >查看</el-button>
                </template>
            </el-table-column>
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
import moment from 'moment';
export default {
    data() {
        return {
            man: null,
            xtype: null,
            xevel: null,
            xzhuangtai: null,
            ealls: [],
            textarea: '这个项目我王多鱼投了',
            formLabelWidth: '100px',
            uid: null,
            dname: '市场部',
            uname: '',
            jibie: [
                {
                    name: '非常紧急',
                    value: 1
                },
                {
                    name: '比较紧急',
                    value: 2
                },
                {
                    name: '一般紧急',
                    value: 3
                }
            ],
            jibie2: [
                {
                    name: '非常紧急',
                    value: 1
                },
                {
                    name: '比较紧急',
                    value: 2
                },
                {
                    name: '一般紧急',
                    value: 3
                }
            ],
            zt: [
                {
                    name: '待通过',
                    value: 0
                },
                {
                    name: '已通过',
                    value: 1
                },
                {
                    name: '已作废',
                    value: 2
                },
                {
                    name: '已完成',
                    value: 3
                }
            ],
            value: null,
            value2: null,
            form2: {
                name: ''
            },
            time1: null,
            time2: null,
            time3: null,
            xmtypes: [],
            risk: [],
            xmtypes2: [],
            seen: false,
            tableData: [],
            dialogFormVisible: false,
            zhuangtai: [],
            shenpi: 0,
            pass: 0,
            no: 0,
            activeName: 'second',
            yes: 0,
            type: [],
            evel: [],
            current: 1,
            size: 4,
            current2: 1,
            size2: 4,
            total: 0,
            xid: 0,
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
        },
        evel: {
            handler: function() {
                this.drawLine5();
            },
            deep: true
        }
    },
    mounted: function() {
        this.drawLine4();
        this.drawLine5();
    },

    methods: {
        chakan(r) {
            this.seen = true;
            let url = 'xm/risk';
            //2、参数
            let param = {
                xid: r.xid,
                no: this.current2,
                size: this.size2
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                this.risk = pager;
            });
        },

        eall() {
            let url = 'xm/eall';
            //2、参数
            let param = {};
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                this.ealls = pager;
            });
        },

        addxiangmu() {
            if (this.form2.name == null || this.form2.name == '') {
                this.$message({
                    message: '请填写项目名称',
                    type: 'warning'
                });
                return false;
            } else if (this.value == null || this.value == '') {
                this.$message({
                    message: '请选择项目类型',
                    type: 'warning'
                });
                return false;
            } else {
                let url = 'xm/add';
                //2、参数

                let param = {
                    empno: this.uid,
                    xname: this.form2.name,
                    start: this.time1,
                    end: this.time2,
                    explain: this.textarea,
                    evel: this.value2,
                    tid: this.value
                };
                //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
                this.$myhttp.getObj(url, param, pager => {
                    if (pager == 1) {
                        this.$message({
                            message: '新增立项申请成功！请等待审批',
                            type: 'success'
                        });
                        this.seen = false;
                        this.xiangmu();
                        this.countxiangmu();
                    } else {
                        this.$message({
                            message: '新增立项申请失败',
                            type: 'warning'
                        });
                    }
                    console.log('值', pager);
                });
            }
        },

        ceshi(time) {
            time = moment(time).unix();
            return time;
        },

        jieshu() {
            if (this.time1 == null) {
                (this.time2 = null),
                    this.$message({
                        message: '开始时间不能为空',
                        type: 'warning'
                    });
                this.time3 = null;
                return false;
            } else if (this.time1 >= this.time2) {
                (this.time2 = null),
                    this.$message({
                        message: '开始时间不能小于结束时间',
                        type: 'warning'
                    });
                this.time3 = null;
                return false;
            } else {
                this.time3 = (this.ceshi(this.time2) - this.ceshi(this.time1)) / 3600 / 24 / 1 + '天';

                console.log('时间', this.time3);
            }
        },

        drawLine4() {
            // 1、基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart4'));
            //2、构造图表数据
            let options = {
                title: {
                    text: '项目类型',
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
                        radius: '70%',
                        center: ['50%', '50%'],
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

        drawLine5() {
            // 1、基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart5'));
            //2、构造图表数据
            let options = {
                title: {
                    text: '项目级别',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: this.evel.name
                },
                series: [
                    {
                        name: '项目级别',
                        type: 'pie',
                        radius: '70%',
                        center: ['50%', '50%'],
                        data: this.evel,
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
        handleClick(tab, event) {
            console.log(tab, event);
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
                this.evel.length = 0; //清空数组
                for (let i = 0; i < pager.data.length; i++) {
                    var item = {
                        value: pager.data[i],
                        name: pager.name[i]
                    };
                    this.evel.push(item);
                }
            });
        },

        userdept() {
            let url = 'xm/userdept';

            //2、参数
            let param = {
                eid: this.uid
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                // this.xmtype = pager;
                this.dname = pager.dname;
                console.log('值', pager);
            });
        },

        xmtype() {
            let url = 'xm/xmtype';
            //2、参数
            let param = {};
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                this.xmtypes = pager;
                this.xmtypes2 = pager;
                console.log('值', pager);
            });
        },

        xiangmu() {
            let url = 'xm/all2';
            //2、参数
            let param = {
                no: this.current,
                size: this.size,
                empno: this.man,
                tid: this.xtype,
                state: this.xzhuangtai,
                evel: this.xevel
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('值', pager);
                this.total = pager.total;
                this.tableData = pager.list;
            });
        },

        nauser() {
            let user = sessionStorage.getItem('user');
            var jsonObj = JSON.parse(user);
            this.uname = jsonObj.ename;
            this.uid = jsonObj.eid;
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
        kaishi() {
            var t = moment().unix();
            var t2 = moment(this.time1).unix();
            var t3 = t2 - t;
            if (t3 < 0) {
                this.$message({
                    message: '不能选择今天之前的时间',
                    type: 'warning'
                });
                this.time1 = null;
                return false;
            }
        }
    },
    created() {
        this.xiangmu();
        this.countxiangmu();
        this.countype();
        this.countevel();
        this.nauser();
        this.eall();
        this.xmtype();
    }
};
</script >

  <style scoped>
.li {
    text-align: center;
    font-size: 23px;
}
</style>
