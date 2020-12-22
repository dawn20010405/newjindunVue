<template>
    <div>
        <el-row>
            <el-col :span="24">
                <el-card shadow="hover" class="li">上面的正方形统计</el-card>
            </el-col>

            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card shadow="hover" class="li">上面的正方形统计</el-card>
                </div>
            </el-col>

            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-card shadow="hover" class="li">上面的正方形统计</el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple">
                    <el-card shadow="hover" class="li">上面的正方形统计</el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple-light">
                    <el-card shadow="hover" class="li">上面的正方形统计</el-card>
                </div>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="12">
                <div class="grid-content bg-purple">
                    <el-card shadow="hover" class="li">下方的饼图正方形统计</el-card>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="grid-content bg-purple-light">
                    <el-card shadow="hover" class="li">下方的饼图统计</el-card>
                </div>
            </el-col>
        </el-row>

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
            zhuangtai:[],
            type:[],
            evel:[],
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
    watch(){

    },

    methods: {
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
            let param = {
                
            };
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('值', pager);
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
                let user = sessionStorage.getItem('user');
                var jsonObj = JSON.parse(user);
                console.log(jsonObj.eid);
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
    }
};
</script>

  <style scoped>
.li {
    text-align: center;
    font-size: 23px;
}
</style>
