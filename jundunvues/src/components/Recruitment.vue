<template>
    <div id="recru_div">
        <div id="select_div">
            <div class="retype_div">
                <!-- 根据状态查询(普通查询)-->
                <el-radio-group v-model="retype">
                    <el-radio :label="0" @change="loadData">进行中</el-radio>
                    <el-radio :label="1" @change="loadData">已完成</el-radio>
                    <el-radio :label="2" @change="loadData">已取消</el-radio>
                </el-radio-group>
                <el-button
                    type="primary"
                    style="float: right;margin-right: 10px;"
                    @click="drawer= true"
                >新增需求</el-button>
            </div>
            <!-- 新增需求弹框-->
            <el-drawer
                :visible.sync="drawer"
                :direction="direction"
                :before-close="handleClose"
                size="40%"
            >
                <el-form :model="recruForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="招聘状态">
                        <el-radio-group v-model="addRetype" disabled>
                            <el-radio :label="0">进行中</el-radio>
                            <el-radio :label="1">已完成</el-radio>
                            <el-radio :label="2">已取消</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="部门">
                        <el-select
                            @change="findPosition"
                            class="wids"
                            v-model="recruForm.dept"
                            filterable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in deptOption"
                                :label="item.dname"
                                :value="item.did"
                                :key="item.did"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="岗位">
                        <el-select
                            class="wids"
                            v-model="recruForm.posi"
                            filterable
                            placeholder="请选择"
                        >
                            <el-option
                                v-for="item in posiOption"
                                :label="item.poname"
                                :value="item.pid"
                                :key="item.pid"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="期望日期">
                        <el-date-picker
                            style="width: 213px;"
                            v-model="recruForm.hopetime"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期"
                        ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="需求人数">
                        <el-input-number v-model="recruForm.peopcout" :min="1" :max="300"></el-input-number>
                    </el-form-item>
                    <el-form-item label="招聘需求">
                        <el-input
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 8}"
                            placeholder="请输入内容"
                            v-model="recruForm.recrudemand"
                        ></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="addRecru">立即创建</el-button>
                        <el-button @click="clearRecru">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-drawer>
            <el-collapse accordion style="border-top: 0px;margin-top: -20px;" class="hide">
                <!-- 高级查询-->
                <el-collapse-item>
                    <p class="martop_p">
                        <el-input v-model="dname" placeholder="部门"></el-input>
                    </p>
                    <p class="martop_p">
                        <el-input v-model="poname" placeholder="岗位"></el-input>
                    </p>
                    <p class="martop_p">
                        <el-input v-model="recrudemand" placeholder="招聘需求"></el-input>
                    </p>
                    <p class="martop_p">
                        <el-input v-model="peopcout" placeholder="人数"></el-input>
                    </p>
                    <p class="martop_p">
                        <el-date-picker
                            style="width: 213px;"
                            v-model="hopetime1"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择期望日期"
                        ></el-date-picker>-
                        <el-date-picker
                            style="width: 214px;"
                            v-model="hopetime2"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择期望日期"
                        ></el-date-picker>
                    </p>
                    <p class="martop_p">
                        <el-date-picker
                            style="width: 440px;"
                            v-model="rcreate"
                            type="date"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd"
                            placeholder="选择创建日期"
                        ></el-date-picker>
                    </p>
                    <p class="martop_p">
                        <el-button type="primary" @click="loadData">搜索</el-button>
                        <el-button type="primary" @click="clearAll">重置</el-button>
                    </p>
                </el-collapse-item>
            </el-collapse>
        </div>
        <div id="main_div">
            <!-- 查询所有需求-->
            <div class="boxs-card" v-for="(v,k) in recru" :key="v.retype">
                <div @click="recru_detail(v)" style="overflow: hidden;display: block;">
                    <p class="trans" v-if="v.retype==0">进行中</p>
                    <p class="trans" v-if="v.retype==1">已完成</p>
                    <p class="trans" v-if="v.retype==2" style="background-color: mistyrose;">已取消</p>
                    <div class="dept_posi" style="font-weight: bold;">
                        <a style="font-size: 16px;">{{v.posi.dept.dname}}</a>
                        &nbsp;
                        {{v.posi.poname}}
                    </div>
                    <div class="times tops fonts">
                        创建日期：
                        <a>{{v.rcreate}}</a>
                    </div>
                    <div
                        class="times tops"
                        style="font-weight: bold;
          width: 1px;
          height: 15px;
          line-height: 15px;
          border-right: 2px solid orange;"
                    ></div>
                    <div class="fonts tops fonts" style="margin-left: 33.5%;">
                        期望日期：
                        <a>{{v.hopetime}}</a>
                    </div>
                    <div class="rec1 tops" style="color: darkgray;">
                        需求人数：
                        <a style="color: orange;font-size: 14px;">{{v.peopcout}}</a>
                    </div>
                    <div class="rec1 tops" style="color: darkgray;">
                        招聘需求：
                        <a style="color: orange;font-size: 14px;">{{v.recrudemand}}</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recru: [],
            retype: undefined,
            poname: undefined,
            dname: undefined,
            recrudemand: undefined,
            peopcout: undefined,
            hopetime1: undefined,
            hopetime2: undefined,
            rcreate: undefined,
            drawer: false,
            direction: 'rtl',
            recruForm: {},
            deptOption: [],
            posiOption: [],
            addRetype: 0
        };
    },
    methods: {
        /* 查询方法*/
        loadData() {
            let params = {
                retype: this.retype,
                dname: this.dname,
                poname: this.poname,
                recrudemand: this.recrudemand,
                peopcout: this.peopcout,
                hopetime1: this.hopetime1,
                hopetime2: this.hopetime2,
                rcreate: this.rcreate
            };
            let p = this.$Qs.stringify(params);
            this.$axios.post('/recru/finall', p).then(r => {
                this.recru = r.objs;
                console.log('TT：', this.recru);
            });
        },
        /* 查询所有部门*/
        findDept() {
            this.$axios.post('/dept/finall').then(r => {
                console.log('部门：', r.objs);
                this.deptOption = r.objs;
            });
        },
        /* 根据部门查询对应岗位*/
        findPosition(v) {
            console.log('当前行：', this.recruForm.dept);
            this.$axios.post('/posi/finbydid/' + v).then(r => {
                console.log('RR：', r);
                this.posiOption = r.objs;
            });
        },
        /* 重置*/
        clearAll() {
            this.retype = undefined;
            this.dname = undefined;
            this.poname = undefined;
            this.recrudemand = undefined;
            this.peopcout = undefined;
            this.hopetime1 = undefined;
            this.hopetime2 = undefined;
            this.rcreate = undefined;
            this.loadData();
        },
        /* 新增招聘需求*/
        addRecru() {
            //判断岗位是否被选择
            if ((this.recruForm.posi == null) | (this.recruForm.posi == '')) {
                this.$message({
                    message: '请选择岗位',
                    type: 'warning'
                });
                //判断日期是否被选择
            } else if ((this.recruForm.hopetime == null) | (this.recruForm.hopetime == '')) {
                this.$message({
                    message: '请选择期望日期',
                    type: 'warning'
                });
                //判断是否输入人数
            } else if ((this.recruForm.peopcout == null) | (this.recruForm.peopcout == '')) {
                this.$message({
                    message: '请输入需求人数',
                    type: 'warning'
                });
            } else {
                let params = {
                    retype: this.addRetype,
                    pid: this.recruForm.posi,
                    hopetime: this.recruForm.hopetime,
                    peopcout: this.recruForm.peopcout,
                    recrudemand: this.recruForm.recrudemand
                };
                let p = this.$Qs.stringify(params);
                this.$axios.post('/recru/insert', p).then(r => {
                    if (r.code == 1) {
                        this.loadData();
                    }
                });
            }
        },
        /* 重置招聘表单*/
        clearRecru() {
            this.recruForm = {};
            // this.recruForm.retype;
            // this.recruForm.posi;
            // this.recruForm.hopetime;
            // this.recruForm.peopcout;
            // this.recruForm.recrudemand;
        },
        /* 跳转到招聘的流程页面*/
        recru_detail(v) {
            console.log('V的值：', v);
            this.$router.push({
                path: '/proce',
                query: {
                    recru: v
                }
            });
            // let a={
            //   rid:v.rid,
            //   dname:v.posi.dept.dname,
            //   poname:v.posi.poname,
            //   hopetime:v.hopetime,
            //   peopcout:v.peopcout,
            //   rcreate:v.rcreate
            // }
            // sessionStorage.setItem("key",a);
        },
        /* 关闭弹框*/
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }
    },
    mounted() {
        this.loadData();
        this.findDept();
    }
};
</script>

<style scoped="scoped">
.boxs-card {
    height: 240px;
    width: 600px;
    margin: 0px auto;
    margin-top: 20px;
    -moz-box-shadow: 2px 2px 8px #909090; /*firefox*/
    -webkit-box-shadow: 2px 2px 8px #909090; /*safari或chrome*/
    box-shadow: 2px 2px 8px #909090; /*opera或ie9*/
}
.trans {
    transform: rotate(-45deg);
    width: 160px;
    text-align: center;
    line-height: 40px;
    margin-left: -50px;
    margin-top: 10px;
    margin-bottom: -10px;
    color: white;
    background-color: skyblue;
}
#select_div {
    margin-left: 20px;
}
.dept_posi {
    margin-top: 50px;
    margin-left: 20px;
}
.retype_div {
    margin-top: 20px;
}
.hide i {
    display: none;
}
.hide .el-input {
    width: 440px;
}
.martop_p {
    margin-top: 25px;
}
.times {
    float: left;
    /* width: 30%; */
    margin-left: 20px;
    overflow: hidden;
    display: block;
}
.tops {
    margin-top: 10px;
}
.rec1 {
    width: 100%;
    margin-left: 20px;
}
.fonts {
    font-size: 12px;
    color: darkgray;
}
</style>
