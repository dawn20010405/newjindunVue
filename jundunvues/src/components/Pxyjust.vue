<template>
  <div>
    <h3 style="margin-left:15px;">转正单管理</h3>
    <div class="toou" >
      <el-button plain @click="xinzeng()" style="margin-left:10px;"><i class="fa fa-search" style="margin-right: 5px"></i>新增申请</el-button>
      <span style="margin-left: 350px;font-size: 14px">转正单编号:</span>
      <el-input clearable  v-model="formInline.jid"   placeholder="请输入转正单编号" style="width: 250px;" ></el-input>
      <span style="margin-left: 10px;font-size: 14px">员工编号:</span>
        <el-input clearable  style="width:240px;margin-left: 5px" v-model="formInline.eid" placeholder="请输入员工编号"></el-input>
      <el-button plain @click="loadData()" style="margin-left:10px;"><i class="fa fa-search" style="margin-right: 5px"></i>查询</el-button>
    </div>
    <div style="margin-top: 20px">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick"  type="card">
          <el-tab-pane label="已申请转正员工" name="first">
            <div class="mytable">
              <el-table :data="tableData" style="width: 100%; text-align:center;">
                <el-table-column label="编号"  >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.jid }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="员工姓名" prop="myemp.ename" > </el-table-column>
                <el-table-column label="入职日期" prop="justtime" width="200px"> </el-table-column>
                <el-table-column label="员工性别" prop="myemp.esex" > </el-table-column>
                <el-table-column label="在职部门"  >
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.myemp.myposition.dept.dname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="在职岗位"  >
                  <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.myemp.myposition.poname }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="转正状态" >
                  <template slot-scope="scope">
                    <span v-if="scope.row.jsehngpi==0">
                      <el-tag type="warning">待审批</el-tag>
                    </span>
                              <span v-else-if="scope.row.jsehngpi==1">
                      <el-tag type="success">已通过</el-tag>
                    </span>
                              <span v-else-if="scope.row.jsehngpi==2">
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
          </el-tab-pane>
          <el-tab-pane label="劳动合同" name="second">
           <h3>劳动合同</h3>
            <div class="mytable" >
              <el-table :data="tableDatatong" style="width:100%; text-align:center;">
                <el-table-column label="编号"  >
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.jid }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="员工姓名" prop="myemp.ename" > </el-table-column>
                <el-table-column label="入职日期" prop="justtime" width="200px"> </el-table-column>
                <el-table-column label="转正状态" >
                  <template slot-scope="scope">
                    <span v-if="scope.row.jsehngpi==0">
                      <el-tag type="warning">待审批</el-tag>
                    </span>
                    <span v-else-if="scope.row.jsehngpi==1">
                      <el-tag type="success">已通过</el-tag>
                    </span>
                    <span v-else-if="scope.row.jsehngpi==2">
                      <el-tag type="danger">已驳回</el-tag>
                    </span>
                  </template></el-table-column>
                <el-table-column label="在职状态" prop="myemp.ezt" > </el-table-column>
                <el-table-column label="操作" >
                  <template slot-scope="scope">
                    <el-button
                      size="mini" @click="tianjiahetong(scope.row)">添加合同</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="block">
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="current1"
                               :page-sizes="[5,10,12]" :page-size="pageSize1" layout="total, sizes, prev, pager, next, jumper" :total="total1">
                </el-pagination>
              </div>
            </div>
            <div >
              <el-button
                type="success"
                class="deng_but"
                style="margin-left: 1050px"
                @click="hetongAll()"
              >查看全部合同</el-button>
            </div>
            <!--<div class="laowu">
              <h2 style="margin-left: 300px">固定期限劳动合同</h2>
              <div>
                <ul>
                  <li><span>合同类型:</span>固定期限劳动合同</li>
                  <li><span>开始日期:</span>{{hetongtable.ckaitime}}</li>
                  <li><span>到期日期:</span>{{hetongtable.cjietime}}</li>
                  <li><span>期限(年):</span>{{hetongtable.cqixian}}</li>
                  <li><span>所在部门:</span>{{hetongtable.dname}}</li>
                  <li><span>所在岗位:</span>{{hetongtable.poname}}</li>
                  <li><span style="margin-left: 500px;margin-right: 15px">签约公司:</span>中科韬睿有限公司</li>
                  <li><span style="margin-left: 500px;margin-right: 15px">签约人:</span>{{hetongtable.ename}}</li>
                </ul>
              </div>
            </div>-->
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <!--添加合同-->
    <el-dialog  title="添加合同时间" :visible.sync="dialogFormVisible" style="width: 1500px;margin-left: 10px;margin-top: 50px">
        <div >
          <el-row>
            <el-col>
              <div style="margin-left: 20px;font-size: 14px">
                <div class="block">
                  <span class="demonstration">开始时间:</span>
                  <el-date-picker
                    v-model="contracts.ckaitime"
                    style="width: 400px;margin-left: 5px;margin-top: 10px;"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd HH:mm:ss">
                  </el-date-picker></div>
              </div>
            </el-col>
          </el-row>
          <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
            期限:
            <el-select v-model="valueqixian" placeholder="请选择" @change="qixianbut(valueqixian)" style="width:220px;margin-left: 35px;width:400px;">
              <el-option
                v-for="item in optionsqixian"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <el-row style="margin-top: 10px">
            <el-col>
              <div style="margin-left: 20px;font-size: 14px">
                结束时间:
                <el-input disabled="disabled" style="width:220px;margin-left: 5px;width: 400px;" v-model="contracts.cjietime"></el-input>
              </div>
            </el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer" style="margin-top: 20px" >
          <el-button type="warning"  round @click="qvxiao()" style="margin-left: 300px">取 消</el-button>
          <el-button type="primary" round @click="steponeInthere()">确定</el-button>
        </div>
    </el-dialog>
    <!--查看全部合同-->
    <el-dialog  title="签约合同" :visible.sync="dialogFormVisible1" style="width: 2200px;margin-left: -340px;margin-top: 50px">
      <div class="mytable">
        <el-table :data="tableDatacontracts" style="width: 100%; text-align:center;">
          <el-table-column label="编号"  >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ scope.row.cids }}</span>
            </template>
          </el-table-column>
          <el-table-column label="员工姓名" prop="myemp.ename" > </el-table-column>
          <el-table-column label="员工性别" prop="myemp.esex" > </el-table-column>
          <el-table-column label="合同类型" prop="cleixing" width="200px"> </el-table-column>
          <el-table-column label="期限" prop="cqixian"></el-table-column>
          <el-table-column label="在职部门"  >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.myemp.myposition.dept.dname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="在职岗位"  >
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.myemp.myposition.poname }}</span>
            </template>
          </el-table-column>
          <el-table-column label="在职状态" prop="myemp.ezt" > </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <el-button
                size="mini" @click="hetong(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="current2"
                         :page-sizes="[5,2]" :page-size="pageSize2" layout="total, sizes, prev, pager, next, jumper" :total="total2">
          </el-pagination>
        </div>
      </div>
    </el-dialog>
    <!--详情-->
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
   
        size="40%">
        <div class="theredivyin1"  >
          <el-form >
            <div style="font-size:20px; text-align:center; margin-top:20px; margin-bottom:20px;">转正详情</div>
            <div>
              <div style="width:530px;">
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>编号: {{tableDataXiang.jid}}</div>
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
                  <div>所在部门:{{tableDataXiangdept.dname}} </div>
                </div>
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>所在岗位:{{tableDataXiangmyposition.poname}} </div>
                </div>
                <div style="margin-top: 20px;margin-left: 30px;font-size: 15px;border-bottom: 1px solid grey">
                  <div>员工总结:{{tableDataXiang.jzong}} </div>
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
    <!--新增-->
    <el-drawer
      :visible.sync="drawer1"
      :direction="direction"
    
      size="50%">
      <h3  style="margin-left: 20px">新增申请转正</h3>
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
         试用部门:
         <el-input disabled="disabled" style="width:220px;margin-left: 5px;width: 600px;" v-model="shiyong.dname"></el-input>
       </div>
       <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
         试用岗位:
         <el-input disabled="disabled" style="width:220px;margin-left: 5px;width: 600px;" v-model="shiyong.poname"></el-input>
       </div>
       <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
         入职时间:
         <el-input disabled="disabled" style="width:220px;margin-left: 5px;width: 600px;" v-model="shiyong.rutime"></el-input>
       </div>
       <div style="margin-left: 20px;margin-top: 10px;font-size: 14px">
         转正部门:
         <el-select v-model="zhuan.dname" placeholder="请选择" @change="dnamebut(zhuan.dname)" style="margin-left: 5px;width: 600px;">
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
             <span class="demonstration"> 转正时间:</span>
             <el-date-picker
               v-model="zhuan.rutime"
               style="width: 600px;margin-left: 5px;margin-top: 10px;"
               type="datetime"
               placeholder="选择日期"
               value-format="yyyy-MM-dd HH:mm:ss">
             </el-date-picker></div>
       </div>
       <div style="margin-left: 20px;margin-top: 10px;font-size: 14px;width: 600px;">
         转正总结:
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
  </div>
</template>
<script>
import axios from 'axios'
    export default {
        name: "Pxyjust",
        data(){
          return{
            optionsqixian: [{
              value: '3',
              label: '3'
            }, {
              value: '5',
              label: '5'
            }, {
              value: '10',
              label: '10'
            }],
            valueqixian:'',
            dialogFormVisible1:false,
            dialogFormVisible:false,
            activeName: 'first',
            options1:[],
            options: [],
            optionsPosition:[],
            userlist:[],
            userlist1:[],
            Positionlist:[],
            value: '',
            drawer: false,
            drawer1: false,
            direction: 'rtl',
            formInline: {
              eid: '',
              jid: '',
              ename:''
            },
            tableData: [],
            tableDatatong:[],
            tableDataXiang: [],
            tableDataXiangemp: [],
            tableDataXiangmyposition: [],
            tableDataXiangdept: [],
            current: 1,
            pageNo:1,
            pageSize: 5,
            total: 0,
            /*合同分页*/
            current1: 1,
            pageNo1:1,
            pageSize1: 5,
            total1: 0,
            current2: 1,
            pageNo2:1,
            pageSize2: 5,
            total2: 0,
            visible:false,
            orderdetailsDate:[],
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
            /*合同*/
            contracts:{
              ckaitime:'',
              cjietime:'',
              cqixian:0,
              dname:'',
              poname:'',
              ename:'',
              eid:0,
            },
            hetongtable:{
              ckaitime:'',
              cjietime:'',
              cqixian:'',
              dname:'',
              poname:'',
              ename:'',
              eid:0,
            },
            tableDatacontracts:[]
          }
      },methods:{
        hetongAll(){
          this.dialogFormVisible1=true;
          let param = {
            no: this.current2,
            size: this.pageSize2,
          };
           let url = 'contracts/listselectcontracts';
            //2、参数
            
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目状态统计的值', pager);
            this.tableDatacontracts = pager.list;
            this.total2 = pager.total;

          // console.log("合同分页查询：", param)
          // let ppp = this.$Qs.stringify(param);
          // this.$axios.post("http://localhost:8089/contracts/listselectcontracts",ppp)
          //   .then(r => {
          //     if (r.status === 200) {
          //       console.log("this.tableDatacontracts:",r.data.list);
          //       this.tableDatacontracts = r.data.list;
          //       this.total2 = r.data.total;
          //     }
            })
        },
        handleClick(tab, event) {
          console.log(tab, event);
          if(tab.name == 'second'){
            // 触发‘合同’事件
            console.log("合同")

            this.loadDatatong();
          }
        },
      /*  handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },*/
        gaojiiii() {
          /*判断高级查询弹窗*/
          if (this.visible == false) {
            this.visible = true
          } else {
            this.visible = false
          }
        },
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
        /*合同分页*/
        handleSizeChange1(val) {
          this.pageSize1 = val;
          console.log(`每页 ${val} 条`);
          this.tableDatatong() ;
        },
        handleCurrentChange1(val) {
          this.current1 = val;
          console.log(`当前页: ${val}`);
          this.tableDatatong() ;
        },
        handleSizeChange2(val) {
          this.pageSize2 = val;
          console.log(`每页 ${val} 条`);
          this.hetongAll() ;
        },
        handleCurrentChange2(val) {
          this.current2 = val;
          console.log(`当前页: ${val}`);
          this.hetongAll() ;
        },
        loadData() {
          console.log("eid:",this.formInline.eid)
          console.log("jid:",this.formInline.jid)
          console.log("ename:",this.formInline.ename)
          let param = {
            no: this.current,
            size: this.pageSize,
            eid:this.formInline.eid,
            jid:this.formInline.jid,
            ename:this.formInline.ename,
          };
           let ppp = this.$Qs.stringify(param);
            let url = 'just/listselectJust';
            //2、参数
            
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目状态统计的值', pager);
            this.tableData = pager.list;
            this.total = pager.total;
            });

          // console.log("转正分页查询：", param)
          // let ppp = this.$Qs.stringify(param);
          // this.$axios.post("http://localhost:8089/just/listselectJust",ppp)
          //   .then(r => {
          //     if (r.status === 200) {
          //       console.log("this.tableData:",r.data.list);
          //       this.tableData = r.data.list;
          //       this.total = r.data.total;
          //     }
          //   })
        },
        loadDatatong(){
          let param = {
            no: this.current1,
            size: this.pageSize1,
          };
          let ppp = this.$Qs.stringify(param);
            let url = 'just/selectJustByjsehngpi';
            //2、参数
            
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目状态统计的值', pager);
            this.tableDatatong = pager.list;
            this.total1 = pager.total;
            });

        },
        /*查看详情*/
        xiangqing(row){
          console.log("查看详情：",row)
          this.tableDataXiang=row
          this.tableDataXiangemp=row.myemp
          this.tableDataXiangmyposition=row.myemp.myposition
          this.tableDataXiangdept=row.myemp.myposition.dept
        },
        /*新增弹窗按钮*/
        xinzeng(){
           console.log('新增弹窗按钮');
          this.options.splice(0,this.options.length);
          this.drawer1 = true
           let param = {
         
          };
           let url = 'emp/listempselect';
            //2、参数
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url,param,pager => {
                console.log('根据项目状态统计的值', pager);
                this.userlist =pager;
                this.userlist.forEach(v => {
                  var json = {
                    value: v.eid,
                    label: v.ename
                  }
                  this.options.push(json);
                })
            })

            let param1 = {
         
          };
           console.log('部门');
           let url1 = 'dept/listDeptAllpxy';
            //2、参数
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url1, param1, pager => {
                console.log('根据项目状态统计的值', pager);
            this.userlist1 = pager;
             this.userlist1.forEach(v => {
                  var json = {
                    value: v.did,
                    label: v.dname
                  }
                  this.options1.push(json);
                })
            })
        },
        /*姓名选择器*/
        namebut(row){
          console.log("点击了选择姓名:",row)
          let param = {
            eid:row
          };
           let url = 'emp/listempselectByeid';
            //2、参数
            
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目状态统计的值', pager);
          
            this.shiyong.poname= pager.myposition.poname
                this.shiyong.dname =pager.myposition.dept.dname
                this.shiyong.rutime= pager.erutime
            
            })
        },
        /*部门选择器*/
        dnamebut(row){
          this.zhuan.poname='',
          console.log("点击了选择部门:",row)
          let param = {
            did:row
          };
           let url = 'posi/Positionselectbydid';
            //2、参数
            
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目状态统计的值', pager);
            this.Positionlist = pager;
            this.optionsPosition.splice(0,this.optionsPosition.length);
                this.Positionlist.forEach(v => {
                  var json = {
                    value: v.pid,
                    label: v.poname
                  }
                  this.optionsPosition.push(json);
                })
            })

      
        },
        /*立刻提交*/
        Liketijiao(){
          console.log("点击了立刻提交：",this.zhuan)
          console.log("value：",this.value)
          let param = {
            eid:this.value,
            justtime:this.zhuan.rutime,
            jzong:this.zhuan.jzong,
            did:this.zhuan.dname,
            pid:this.zhuan.poname
          };
           let url = 'just/InsertJust';
            //2、参数
            
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目状态统计的值', pager);
                 this.drawer1 = false;
                   this.loadData();
            })
        },
        /*合同表格添加按钮*/
        tianjiahetong(row){
          console.log("合同表格添加按钮获取的值：",row)
          this.contracts.dname=row.myemp.myposition.dept.dname
          this.contracts.poname=row.myemp.myposition.poname
          this.contracts.ename=row.myemp.ename
          this.contracts.eid=row.myemp.eid
          this.dialogFormVisible=true
        },
        /*取消*/
        qvxiao(){
          this.dialogFormVisible=false
        },
        /*选择了期限*/
        qixianbut(row){
          if(this.contracts.ckaitime==''){
            this.$message({
              message: '请选择开始时间',
              type: 'warning'
            });
          }else {
            this.contracts.cqixian=parseInt(row)
            console.log("选择了期限:",row)
            console.log("开始时间:",this.contracts.ckaitime)
            let m=this.contracts.ckaitime.split(" ")[0].split("-")[0];
            console.log();
            let c=parseInt(m)+parseInt(row)
            let d=parseInt(m)+parseInt(row)+"-"+this.contracts.ckaitime.split(" ")[0].split("-")[1]+"-"+this.contracts.ckaitime.split(" ")[0].split("-")[2]+" "+this.contracts.ckaitime.split(" ")[1];
            this.contracts.cjietime=d
            console.log(d,"分割后的值");
          }
        },
        /*选择时间点击确定*/
        steponeInthere(){
          this.hetongtable.ckaitime=this.contracts.ckaitime;
          this.hetongtable.cjietime=this.contracts.cjietime;
          this.hetongtable.cqixian=this.contracts.cqixian;
          this.hetongtable.dname=this.contracts.dname;
          this.hetongtable.poname=this.contracts.poname;
          this.hetongtable.ename=this.contracts.ename;
          this.hetongtable.eid=this.contracts.eid;
          console.log("选择时间点击确定:",this.hetongtable)

          let param = {
            ckaitime:this.hetongtable.ckaitime,
            cjietime:this.hetongtable.cjietime,
            cqixian:this.hetongtable.cqixian,
            eid:this.hetongtable.eid,
            cleixing:'固定期限劳动合同',
          };
           let url = 'contracts/Insertcontracts';
            //2、参数
            
            //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
            this.$myhttp.getObj(url, param, pager => {
                console.log('根据项目状态统计的值', pager);
              this.dialogFormVisible=false
                this. loadDatatong();
                this.$message({
                  message: '新增合同成功',
                  type: 'success'
                });
            })

        },
        hetong(row){
          /*查看合同*/
          console.log("查看合同：",row.myemp.ename)
          this.$router.push({
            name: 'postest',
            params: {
              ename:row.myemp.ename,
              ckaitime:row.ckaitime,
              cjietime:row.cjietime,
              cqixian:row.cqixian,
            },
          }, );
        }
      }, mounted() {
        this.loadData();
      }
    }
</script>

<style scoped>
  .theredivyin1{
    width:570px;
    height:700px;
    margin:20px;
    margin-top: -70px;
    margin-left:15px;
    background: white;
    border:2px solid gainsboro;
    box-shadow: darkgrey 10px 10px 30px 5px;
  }
  .login_img1{
       margin-top:10px;
       margin-left: 10px;
       width: 350px;
       height: 350px;
     }
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
  .laowu{
    width: 800px;
    height: 600px;
    margin-left: 220px;
    margin-top: 20px;
    background: white;
    border:1px solid gainsboro;
    box-shadow: darkgrey 10px 10px 20px 10px;
  }

</style>
