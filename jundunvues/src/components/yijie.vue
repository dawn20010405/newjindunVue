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
                        <b>已超期</b>
                        <br />
                        <span style="color:red">0</span>
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
        </el-row>

        <el-dialog title="项目信息" :visible.sync="seen" :fullscreen="true">
            <el-dialog title="添加项目人员" :visible.sync="seen2" append-to-body>
                <el-transfer v-model="valueyou" :data="data"></el-transfer>
                 <el-button type="primary"  @click="tianjia()" style="margin-left: 260px;" plain>添加</el-button>
            </el-dialog>
            <el-dialog title="更新进度" :visible.sync="seen3" append-to-body>
                <!-- <el-transfer v-model="valueyou" :data="data"></el-transfer> -->
                <h2>项目进度</h2>
                <el-slider v-model="jindus" show-input :max="100" :min="1"></el-slider>
                <h2>项目自评</h2>
                <el-slider v-model="zipings" show-input :max="100" :min="1"></el-slider>
                <h2>项目汇报</h2>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="jinduneirong"></el-input>
                <el-button type="primary" style="margin-left: 450px;" @click="tijiao()" plain>提交汇报</el-button>
                <el-button type="info" style="margin-left: 1px;" @click="seen3=false" plain>退出</el-button>
            </el-dialog>
            <el-dialog title="添加项目人员" :visible.sync="seen4" append-to-body>
                <!-- <el-transfer v-model="valueyou" :data="data"></el-transfer> -->
            </el-dialog>
            <el-dialog title="风险报告" :visible.sync="seen5" append-to-body>
                <el-input placeholder="请填写问题名称" v-model="wname" style="width:350px" clearable></el-input>
                <br />
                <br />
                <el-input
                    placeholder="填报人"
                    v-model="uname"
                    :disabled="true"
                    style="width:350px"
                    clearable
                ></el-input>
                <br />
                <br />

                <el-select v-model="ftype" clearable placeholder="请选择风险类型" style="width:350px">
                    <el-option v-for="f in fx" :key="f.value" :label="f.name" :value="f.name"></el-option>
                </el-select>
                <br />
                <br />
                <el-select v-model="fevel" clearable placeholder="请选择风险级别" style="width:350px">
                    <el-option v-for="f in fevels" :key="f.value" :label="f.name" :value="f.value"></el-option>
                </el-select>

                <br />
                <br />
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea3"></el-input>
                <br />

                <el-button type="primary" style="margin-left: 400px;" @click="tijiao2" plain>提交风险汇报</el-button>
                <el-button type="info" style="margin-left: 1px;" @click="seen5=false" plain>退出</el-button>
            </el-dialog>

            <el-tabs type="border-card">
                <el-tab-pane label="综合信息">
                    <el-row style="text-align: center;">
                        <el-col :span="6">
                            <div class="grid-content bg-purple">
                                <el-card shadow="hover">
                                    <el-progress
                                        type="circle"
                                        :percentage="jindu"
                                        style="height:90"
                                    ></el-progress>
                                    <br />项目进度
                                </el-card>
                            </div>
                        </el-col>
                        <el-col :span="6">
                            <div class="grid-content bg-purple-light">
                                <el-card shadow="hover">
                                    <el-progress
                                        type="circle"
                                        :percentage="ziping"
                                        style="height:90"
                                    ></el-progress>
                                    <br />自评进度
                                </el-card>
                            </div>
                        </el-col>
                        <el-col :span="12" style="text-align: center;">
                            <div class="grid-content bg-purple">
                                <el-card shadow="hover">
                                    <h1>项目操作</h1>
                                    <el-row>
                                        <el-col :span="12">
                                            <div class="grid-content bg-purple">
                                                <el-button
                                                    type="primary"
                                                    @click="gengxin()"
                                                    v-if="jindu<100"
                                                >进度更新</el-button>
                                                <el-button
                                                    type="primary"
                                                    @click="seen4=true"
                                                    v-if="jindu<100"
                                                >项目暂停</el-button>
                                            </div>
                                        </el-col>
                                        <el-col :span="12">
                                            <div class="grid-content bg-purple-light">
                                                <el-button
                                                    type="primary"
                                                    @click="seen5=true"
                                                    v-if="jindu<100"
                                                >风险报告</el-button>
                                                <el-button
                                                    type="primary"
                                                    @click="wancheng()"
                                                    v-if="jindu==100"
                                                >完成项目</el-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                </el-card>
                                <el-row>
                                    <el-col :span="24" style="margin-top: 20px;">
                                        <el-card
                                            shadow="hover"
                                            v-if="xmxq!=null &&xmxq.xname!=null && xmxq.xname!=''"
                                        >
                                            <h1>项目基本信息</h1>
                                            <h2>{{xmxq.xname}}</h2>
                                            <b>{{xmxq.mytype.tname}}</b>
                                            <br />
                                            <span>负责人：{{xmxq.myfzr.ename}}</span>
                                            <span>计划开始时间：{{xmxq.startime}}</span>
                                            <span>计划结束时间：{{xmxq.endtime}}</span>
                                        </el-card>
                                    </el-col>
                                </el-row>
                            </div>
                        </el-col>
                    </el-row>

                    <el-row style="text-align: center;">
                        <el-col :span="12" style="margin-top: -115px;">
                            <el-card shadow="hover">
                                <h1>项目动态</h1>
                                <el-timeline>
                                    <el-timeline-item
                                        placement="top"
                                        v-for="j in jilu"
                                        v-if="jilu!=null"
                                        :key="j.bid"
                                    >
                                        <el-card style="width:400px">
                                            <h3>{{j.bemp.ename}}---{{j.cdate}}</h3>
                                            <p
                                                style="font-size: 16px;font-family: '宋体'"
                                            >动态类型：{{j.btype}}</p>
                                            <p
                                                style="font-size: 16px;font-family: '宋体'"
                                            >动态内容：{{j.content}}</p>
                                        </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </el-card>
                        </el-col>

                        <el-col :span="12" style="margin-top: 20px;">
                            <div class="grid-content bg-purple">
                                <el-card shadow="hover">
                                    <h3>风险报告</h3>
                                    <el-table :data="risk" border style="width: 100%">
                                        <el-table-column prop="fname" label="风险名称" width="180"></el-table-column>
                                        <el-table-column prop="btype" label="类型"></el-table-column>
                                        <el-table-column prop="level" label="等级">
                                            <template slot-scope="scope">
                                                <el-tag type="danger" v-if="scope.row.level==1">非常紧急</el-tag>
                                                <el-tag
                                                    type="warning"
                                                    v-if="scope.row.level==2"
                                                >比较紧急</el-tag>
                                                <el-tag type="info" v-if="scope.row.level==3">一般紧急</el-tag>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                    <el-pagination
                                        @size-change="handleSizeChange2"
                                        @current-change="handleCurrentChange2"
                                        :current-page="current2"
                                        :page-sizes="[1, 2, 3, 4]"
                                        :page-size="size2"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total2"
                                    ></el-pagination>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                </el-tab-pane>
                <el-tab-pane label="人员信息">
                    <div>
                        <!-- <el-transfer v-model="valueyou" :data="data"></el-transfer> -->
                        <el-button type="primary" @click="addemp()" plain>添加人员</el-button>
                        <el-button type="danger" @click="delectemp()" plain>移出人员</el-button>

                        <el-table
                            ref="multipleTable"
                            :data="like"
                            tooltip-effect="dark"
                            style="width: 100%"
                            @selection-change="handleSelectionChange"
                        >
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column label="员工编号" width="120">
                                <template slot-scope="scope">{{ scope.row.eid }}</template>
                            </el-table-column>
                            <el-table-column prop="ename" label="员工姓名" width="120"></el-table-column>
                            <el-table-column prop="eiphone" label="手机号" show-overflow-tooltip></el-table-column>
                            <el-table-column
                                prop="eqianyue"
                                label="cid"
                                v-if="false"
                                show-overflow-tooltip
                            ></el-table-column>
                        </el-table>

                        <!-- <el-table :data="like" border style="width: 100%">
                            <el-table-column prop="eid" label="员工编号" width="180"></el-table-column>
                            <el-table-column prop="ename" label="员工姓名"></el-table-column>
                            <el-table-column prop="eiphone" label="手机号"></el-table-column>
                        </el-table>-->
                        <el-pagination
                            @size-change="handleSizeChange2"
                            @current-change="handleCurrentChange2"
                            :current-page="current2"
                            :page-sizes="[1, 2, 3, 4]"
                            :page-size="size2"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="total4"
                        ></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="风险报告">
                    <el-table :data="risk" border style="width: 100%">
                        <el-table-column prop="fname" label="风险名称" width="180"></el-table-column>
                        <el-table-column prop="btype" label="类型"></el-table-column>
                        <el-table-column prop="level" label="等级">
                            <template slot-scope="scope">
                                <el-tag type="danger" v-if="scope.row.level==1">非常紧急</el-tag>
                                <el-tag type="warning" v-if="scope.row.level==2">比较紧急</el-tag>
                                <el-tag type="info" v-if="scope.row.level==3">一般紧急</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="influence" label="影响程度"></el-table-column>
                        <el-table-column prop="wemp.ename" label="汇报人"></el-table-column>
                        <el-table-column prop="cdate" label="汇报时间"></el-table-column>
                        <el-table-column prop="content" label="内容"></el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeChange2"
                        @current-change="handleCurrentChange2"
                        :current-page="current2"
                        :page-sizes="[1, 2, 3, 4]"
                        :page-size="size2"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total2"
                    ></el-pagination>
                </el-tab-pane>
                <!-- <el-tab-pane label="项目进度">定时任务补偿</el-tab-pane> -->
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
                    <el-button size="mini" @click="chakan(scope.row)" v-if="scope.row.state!=3">查看</el-button>
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
            jinduneirong: null,
            seen2: false,
            seen3: false,
            seen4: false,
            seen5: false,
            seen6: false,
            man: null,
            data: [],
            delect: [],
            emp: [],
            jilu: [],
            jindus: 0,
            zipings: 0,
            valueyou: [],
            total2: 0,
            xtype: null,
            xevel: null,
            xzhuangtai: null,
            ealls: [],
            textarea: '这个项目我王多鱼投了',
            textarea2: null,
            textarea3: null,
            formLabelWidth: '100px',
            uid: null,
            dname: '市场部',
            uname: '',
            fevel: null,
            fyinxiang: null,
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
            fevels: [
                {
                    name: '风险很大',
                    value: 1
                },
                {
                    name: '风险较大',
                    value: 2
                },
                {
                    name: '一般风险',
                    value: 3
                }
            ],
            fx: [
                {
                    name: '人事风险',
                    value: 1
                },
                {
                    name: '质量风险',
                    value: 2
                },
                {
                    name: '设备风险',
                    value: 3
                },
                {
                    name: '成本风险',
                    value: 4
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
            jindu: 0,
            ziping: 0,
            time1: null,
            time2: null,
            time3: null,
            xmtypes: [],
            risk: [],
            xmtypes2: [],
            like: [],
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
            xmxq: {},
            xids: 0,
            evel: [],
            current: 1,
            size: 4,
            current2: 1,
            size2: 4,
            current3: 1,
            size3: 4,
            total3: 0,
            total4: 0,
            total: 0,
            xid: 0,
            multipleSelection: [],
            ename: null,
            wname: null,
            ftype: null,
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
        chaxun() {
            let url = 'xm/eall';
            //2、参数
            let param = {};
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                this.emp = pager;

               this.emp.forEach(a => {
                    console.log('测试', this.like);
                    this.data.push({
                        key: a.eid,
                        label: a.ename,
                        eid: a.eid,
                        disabled: a.eid==1 || a.eid==2
                    });

                    // i++;
                });
                console.log('记录', pager);
            });
        },

        chakan(r) {
            this.listjilu(r.xid);
            this.getByxid(r.xid);
            this.listcanyu(r.xid);
            this.chaxun();
            this.xids = r.xid;
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
                this.total2 = pager.length;
                // this.xmxq = pager;
                // this.ziping = pager[0].mproject.ziping;
                // this.jindu = pager[0].mproject.jindu;
            });
        },

        listjilu(xid) {
            let url = 'xm/jilu';
            //2、参数
            let param = {
                xid: xid,
                no: this.current3,
                size: this.size3
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                this.jilu = pager;
                this.total3 = pager.length;
                console.log('记录', pager);
            });
        },

        getByxid(xid) {
            let url = 'xm/byxid';
            //2、参数
            let param = {
                xid: xid
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                this.xmxq = pager;
                this.jindu = pager.jindu;
                this.ziping = pager.ziping;
                console.log('byid', pager);
            });
        },

        listcanyu(xid) {
            let url = 'xm/canyu';
            //2、参数
            let param = {
                xid: xid
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                this.like = pager;
                this.total4 = pager.length;

                console.log('返回的', pager);
                console.log('赋值的', this.like);
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
                    text: '项目风险',
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
                        name: '项目风险',
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
        handleCurrentChange2(c) {
            this.current2 = c;
            this.chakan();
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },

        handleSizeChange(size2) {
            this.size = size2;
            console.log(this.size); //每页下拉显示数据
            this.xiangmu();
        },

        handleSizeChange2(size2) {
            this.size2 = size2;
            console.log(this.size2); //每页下拉显示数据
            this.chakan();
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
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
            let url = 'xm/risktype';
            //2、参数
            let param = {};
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目风险统计饼图的值', pager);
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
            let url = 'xm/all';
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
        },
        tijiao() {
            if (this.textarea2 == null && this.textarea2 == '') {
                this.$message({
                    message: '请填写汇报内容',
                    type: 'warning'
                });
                return false;
            } else {
                let url = 'xm/updatejindu';
                //2、参数
                let param = {
                    jindu: this.jindus,
                    ziping: this.zipings,
                    xid: this.xids,
                    neirong: this.jinduneirong,
                    empno: this.uid
                };
                //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
                this.$myhttp.getObj(url, param, pager => {
                    console.log('值', pager);
                    if (pager > 0) {
                        this.$message({
                            message: '汇报成功',
                            type: 'success'
                        });
                        this.seen3 = false;

                        this.listjilu(this.xids);
                        this.getByxid(this.xids);
                    } else {
                        this.$message({
                            message: '汇报失败',
                            type: 'warning'
                        });
                        this.xiangmu();
                    }
                });
            }
        },
        tijiao2() {
            if (this.textarea3 == null && this.textarea3 == '' && this.wname == null && this.wname == '') {
                this.$message({
                    message: '请将信息填写完整',
                    type: 'warning'
                });
                return false;
            } else {
                let url = 'xm/addrisk';
                //2、参数
                let param = {
                    fname: this.wname,
                    empno: this.uid,
                    btype: this.ftype,
                    content: this.textarea3,
                    xid: this.xids,
                    level: this.fevel
                };
                //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
                this.$myhttp.getObj(url, param, pager => {
                    console.log('值', pager);
                    if (pager > 0) {
                        this.$message({
                            message: '风险汇报成功',
                            type: 'success'
                        });
                        this.xiangmu();
                    } else {
                        this.$message({
                            message: '风险汇报失败',
                            type: 'warning'
                        });
                        this.xiangmu();
                    }
                });
            }
        },
        delectemp() {
            this.multipleSelection;
            if (this.multipleSelection != null && this.multipleSelection != '') {
                for (let i = 0; i < this.multipleSelection.length; i++) {
                    this.delect.push(this.multipleSelection[i].eqianyue);
                }
                let url = 'xm/delectcanyu';
                //2、参数
                let param = {
                    cid: this.delect,
                    xid: this.xids,
                    empno: this.uid
                };
                //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
                this.$myhttp.getObj(url, param, pager => {
                    console.log('值', pager);
                    if (pager > 0) {
                        this.$message({
                            message: '移出成功',
                            type: 'success'
                        });
                        this.listcanyu(this.xids);
                        this.listjilu(this.xids);
                    } else {
                        this.$message({
                            message: '移出失败',
                            type: 'warning'
                        });
                        this.listcanyu(this.xids);
                    }
                });
                // delectcanyu
            } else {
                this.$message({
                    message: '请选择要移出的员工',
                    type: 'warning'
                });
                return false;
            }
            console.log(this.delect);
        },

        addemp() {
            this.seen2 = true;
            // this.valueyou
            // this.data.forEach(d => {
            //     this.valueyou.push(d.eid)
            // });
            
            // console.log(this.valueyou);
            
        },

        gengxin() {
            this.seen3 = true;
            console.log('jindu', this.jindu);
            console.log('ziping', this.ziping);
            var z = this.ziping;
            var j = this.jindu;
            this.jindus = j;
            this.zipings = z;

            console.log('jindu2', this.jindus);
            console.log('ziping2', this.zipings);
        },

        wancheng() {
            // this.seen6 = true;
            if (this.jindu < 100) {
                this.$message({
                    message: '该项目进度还未完成，请完成项目',
                    type: 'warning'
                });
            } else {
                let url = 'xm/wancheng';
                //2、参数
                let param = {
                    // cid: this.delect,
                    xid: this.xids,
                    empno: this.uid
                };
                //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
                this.$myhttp.getObj(url, param, pager => {
                    console.log('值', pager);
                    if (pager > 0) {
                        this.$message({
                            message: '完结成功',
                            type: 'success'
                        });
                        this.seen = false;
                        this.listjilu(this.xids);
                        this.getByxid(this.xids);
                        this.xiangmu();
                    } else {
                        this.$message({
                            message: '完结失败',
                            type: 'warning'
                        });
                        this.listjilu(this.xids);
                        this.getByxid(this.xids);
                    }
                });
            }
        },
        tianjia(){

             let url = 'xm/addempandxm';
                //2、参数
                let param = {
                    xid: this.xids,
                    empno: this.valueyou
                };
                //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
                this.$myhttp.getObj(url, param, pager => {
                    console.log('值', pager);
                    if (pager > 0) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.seen2 = false;
                        this.listcanyu(this.xids);
                        
               
                    } else {
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        });
                        this.listcanyu(this.xids);
                
                    }
                });
        }
    },
    created() {
        this.eall();
        this.xiangmu();
        this.countxiangmu();
        this.countype();
        this.countevel();
        // this.chaxun();
        this.nauser();
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
