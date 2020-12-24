<template>
    <div>
      <h3>调岗管理</h3>
      <div class="toou" >
        <el-button plain @click="xinzeng()" style="margin-left:10px;"><i class="fa fa-search" style="margin-right: 5px"></i>新增申请</el-button>
        <span style="margin-left: 350px;font-size: 14px">调岗单编号:</span>
        <el-input clearable  v-model="formInline.tids"   placeholder="请输入转正单编号" style="width: 250px;" ></el-input>
        <span style="margin-left: 10px;font-size: 14px">员工编号:</span>
        <el-input clearable  style="width:240px;margin-left: 5px" v-model="formInline.eid" placeholder="请输入员工编号"></el-input>
        <el-button plain @click="loadData()" style="margin-left:10px;"><i class="fa fa-search" style="margin-right: 5px"></i>查询</el-button>
      </div>
      <div class="mytable">
        <el-table :data="tableData" style="width: 100%; text-align:center;">
          <el-table-column label="编号"  >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.tids }}</span>
            </template>
          </el-table-column>
          <el-table-column label="员工姓名" prop="myemp.ename" > </el-table-column>
          <el-table-column label="调岗日期" prop="transfertime" width="200px"> </el-table-column>
          <el-table-column label="员工性别" prop="myemp.esex" > </el-table-column>
          <el-table-column label="调岗部门"  >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.myposition.dept.dname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="调岗岗位"  >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.myposition.poname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="调岗状态" >
            <template slot-scope="scope">
          <span v-if="scope.row.tsehngpi==0">
            <el-tag type="warning">待审批</el-tag>
          </span>
              <span v-else-if="scope.row.tsehngpi==1">
            <el-tag type="success">已通过</el-tag>
          </span>
              <span v-else-if="scope.row.tsehngpi==2">
            <el-tag type="danger">已驳回</el-tag>
          </span>
            </template></el-table-column>
          <el-table-column label="在职状态" prop="myemp.ezt" > </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
                size="mini" @click="drawer = true,xiangqing(scope.row)">详情</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current"
                         :page-sizes="[5,10,12]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <!--新增-->
      <el-drawer
        :visible.sync="drawer1"
        :direction="direction"
        :before-close="handleClose"
        size="50%">
        <h3  style="margin-left: 20px">新增申请调岗</h3>
        <div >
          <div style="margin-left: 20px;font-size: 14px">
            员工姓名:
            <el-select v-model="value" placeholder="请选择" @change="namebut(value)" style="margin-left: 5px;width: 600px;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
            所在部门:
            <el-input disabled="disabled" style="width:220px;margin-left: 5px;width: 600px;" v-model="shiyong.dname"></el-input>
          </div>
          <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
            所在岗位:
            <el-input disabled="disabled" style="width:220px;margin-left: 5px;width: 600px;" v-model="shiyong.poname"></el-input>
          </div>
          <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
            入职时间:
            <el-input disabled="disabled" style="width:220px;margin-left: 5px;width: 600px;" v-model="shiyong.rutime"></el-input>
          </div>
          <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
            转岗部门:
            <el-select v-model="zhuan.dname" placeholder="请选择" @change="dnamebut(zhuan.dname)"style="margin-left: 5px;width: 600px;">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
            转正岗位:
            <el-select v-model="zhuan.poname" placeholder="请选择" style="margin-left: 5px;width: 600px;">
              <el-option
                v-for="item in optionsPosition"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div style="margin-left: 20px;font-size: 14px">
            <div class="block">
              <span class="demonstration">  转岗时间:</span>
              <el-date-picker
                v-model="zhuan.rutime"
                style="width: 600px;margin-left: 5px;margin-top: 10px;"
                type="datetime"
                placeholder="选择日期"
                value-format="yyyy-MM-dd HH:mm:ss">
              </el-date-picker></div>
          </div>
          <div style="margin-left: 20px;margin-top: 10px;font-size: 14px;width: 600px;">
            转岗说明:
            <el-input type="textarea" v-model="zhuan.jzong" style="width: 600px;margin-left: 70px;margin-top: 10px;"></el-input>
          </div>
          <el-button
            size="mini"
            type="success"
            class="deng_but"
            @click="Liketijiao()"
          >立刻提交</el-button>
        </div>
      </el-drawer>
      <!--详情-->
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"
        size="40%">
        <div class="theredivyin1"  >
          <el-form >
            <div style="font-size:20px; text-align:center; margin-top:20px; margin-bottom:20px;">调岗详情</div>
            <div>
              <div style="width:530px;">
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>编号: {{tableDataXiang.tids}}</div>
                </div>
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>员工姓名:{{tableDataXiangemp.ename}}</div>
                </div>
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>员工性别: {{tableDataXiangemp.esex}}</div>
                </div>
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>联系电话:{{tableDataXiangemp.eiphone}} </div>
                </div>
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>调岗部门:{{tableDataXiangdept.dname}} </div>
                </div>
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>所在岗位:{{tableDataXiangmyposition.poname}} </div>
                </div>
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>员工总结:{{tableDataXiang.tzong}} </div>
                </div>
              </div>
            </div>
            <div style="width: 40%;margin-left: 200px;margin-top: -10px;">
              <div class="login_img">
                <img src="static/img/lihe.jpg" class="login_img1">
              </div>
            </div>
          </el-form>
        </div>
      </el-drawer>
    </div>
</template>

<script>
    export default {
        name: "PxyTransfer",
      data(){
          return{
            options: [],
            value:'',
            options1:[],
            optionsPosition:[],
            shiyong:{
              /*试用部门*/
              dname:'',
              /*试用岗位*/
              poname:'',
              /*入职时间*/
              rutime:''
            },
            zhuan:{
              /*转正部门*/
              dname:'',
              /*转正岗位*/
              poname:'',
              /*转正时间*/
              rutime:'',
              /*总结*/
              jzong:''
            },
            direction: 'rtl',
            drawer:false,
            /*新增弹窗*/
            drawer1:false,
            tableData:[],
            formInline: {
              eid: '',
              tids: ''
            },
            current: 1,
            pageNo:1,
            pageSize: 5,
            total: 0,
            tableDataXiang:[],
            tableDataXiangemp: [],
            tableDataXiangmyposition: [],
            tableDataXiangdept: [],
          }
      },methods:{
       /* handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },*/
        handleSizeChange(val) {
          this.pageSize = val;
          console.log(`每页 ${val} 条`);
          this.loadData() ;
        },
        handleCurrentChange(val) {
          this.current = val;
          console.log(`当前页: ${val}`);
          this.loadData() ;
        },
        loadData() {
          console.log("eid:",this.formInline.eid)
          console.log("tids:",this.formInline.tids)
          let param = {
            no: this.current,
            size: this.pageSize,
            eid:this.formInline.eid,
            tids:this.formInline.tids
          };
          console.log("调岗分页查询：", param)
          let ppp = this.$Qs.stringify(param);
          this.$axios.post("http://localhost:8089/transfer/listselectTransferPage",ppp)
            .then(r => {
              if (r.status === 200) {
                console.log("this.tableData:",r.data.list);
                this.tableData = r.data.list;
                this.total = r.data.total;
              }
            })
        },
        /*查看详情*/
        xiangqing(row){
          console.log("查看详情：",row)
          this.tableDataXiang=row
          this.tableDataXiangemp=row.myemp
          this.tableDataXiangmyposition=row.myposition
          this.tableDataXiangdept=row.myposition.dept
        },
        /*新增弹窗按钮*/
        xinzeng(){
          this.options.splice(0,this.options.length);
          this.drawer1 = true
          this.$axios.post("http://localhost:8089/emp/listempselect2")
            .then(r => {
              if (r.status === 200) {
                console.log("llll",r.data)
                this.userlist = r.data;
                this.userlist.forEach(v => {
                  var json = {
                    value: v.eid,
                    label: v.ename
                  }
                  this.options.push(json);
                })
                console.log("options：", this.options)
              }
            })
          this.$axios.post("http://localhost:8089/dept/listDeptAllpxy")
            .then(r => {
              if (r.status === 200) {
                console.log("222",r.data)
                this.userlist1 = r.data;
                this.userlist1.forEach(v => {
                  var json = {
                    value: v.did,
                    label: v.dname
                  }
                  this.options1.push(json);
                })
                console.log("options：", this.options1)
              }
            })
        },
        /*姓名选择器*/
        namebut(row){
          console.log("点击了选择姓名:",row)
          let param = {
            eid:row
          };
          console.log("根据id查询部门：", param)
          let ppp = this.$Qs.stringify(param);
          this.$axios.post("http://localhost:8089/emp/listempselectByeid",ppp)
            .then(r => {
              if (r.status === 200) {
                console.log("全部",r.data)
                this.shiyong.poname=r.data.myposition.poname
                this.shiyong.dname=r.data.myposition.dept.dname
                this.shiyong.rutime=r.data.erutime
              }
            })
        },
        /*部门选择器*/
        dnamebut(row){
          this.zhuan.poname='',
            console.log("点击了选择部门:",row)
          let param = {
            did:row
          };
          console.log("根据id查询岗位：", param)
          let ppp = this.$Qs.stringify(param);
          this.$axios.post("http://localhost:8089/posi/Positionselectbydid",ppp)
            .then(r => {
              if (r.status === 200) {
                console.log("全部",r.data)
                this.Positionlist = r.data;
                this.optionsPosition.splice(0,this.optionsPosition.length);
                this.Positionlist.forEach(v => {
                  var json = {
                    value: v.pid,
                    label: v.poname
                  }
                  this.optionsPosition.push(json);
                })
                console.log("options：", this.optionsPosition)
              }
            })
        },
        /*立刻提交*/
        Liketijiao(){
          console.log("点击了立刻提交：",this.zhuan)
          console.log("value：",this.value)
          let param = {
            eid:this.value,
            transfertime:this.zhuan.rutime,
            tzong:this.zhuan.jzong,
            did:this.zhuan.dname,
            pid:this.zhuan.poname
          };
          console.log("点击了立刻提交：", param)
          let ppp = this.$Qs.stringify(param);
          this.$axios.post("http://localhost:8089/transfer/InsertTransfer",ppp)
            .then(r => {
              if (r.status === 200) {
                console.log("全部",r.data)
                this.drawer1 = false;
                this.loadData();
              }
            })
        }
      },mounted() {
        this.loadData();
      }
    }
</script>

<style scoped>
  .deng_but{
    width: 200px;
    height: 40px;
    background-color:#85ce61 ;
    color: white;
    border: 1px #85ce61 solid;
    outline:none;
    font-size: 17px;
    margin-top: 30px;
    margin-left: 300px;
  }
  .login_img1{
    margin-top:10px;
    margin-left: 10px;
    width: 350px;
    height: 350px;
  }
</style>
