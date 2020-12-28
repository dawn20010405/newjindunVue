<template>
  <div id="assetsoverview">
    <div class="topfind">
      <el-row>
        <el-col :span="3">
          <el-select v-model="form.assetstype" placeholder="请选择" @change="commind()">
             <el-option
                   v-for="item in options1"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
                 </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="form.assetsname" placeholder="请输入物品名称"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-search" @click="commind()"></el-button>
        </el-col>
        <el-col :span="2" style="line-height: 40px;">
          <span>共{{total}}条</span>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogAddAssetsFormVisible = true">新增登记物品</el-button>
        </el-col>
      </el-row>
      <!-- <el-select v-model="form.assetsgstatus" placeholder="请选择">
         <el-option
               v-for="item in options2"
               :key="item.value"
               :label="item.label"
               :value="item.value">
             </el-option>
      </el-select> -->
    </div>

    <!-- 资产列表-->

    <el-table :data="assetslist" border style="width: 100%;">
        <el-table-column prop="assetsnum" label="编号" align="center" fixed="left" width="220px"></el-table-column>
        <el-table-column prop="assetsname" label="名称" align="center" fixed="left" width="160px"></el-table-column>
        <el-table-column prop="assetstype" label="分类" align="center" fixed="left" width="160px"></el-table-column>
        <el-table-column prop="assetsquantity" label="存放数量" fixed="left" width="120px" align="center"></el-table-column>
        <el-table-column prop="assetsretime" label="登记日期" align="center" width="240px">
          <template slot-scope="scope">
            <span>{{scope.row.assetsretime |  dateYMDHMSFormat2 }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="assetsstatus" label="资产状态" align="center"></el-table-column> -->
        <el-table-column prop="assetsorivalue" label="资产原值" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.assetsorivalue |  numberToMoney | nothingpull }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="assetsgstatus" label="物品状态" align="center" fixed="right">
          <template slot-scope="scope">
            <el-tag  :type="tagcheck(scope.row)">
              {{scope.row.assetsgstatus}}
            </el-tag>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination
          @size-change="assetsListSizeChange"
          @current-change="assetsListNumChange"
          :current-page.sync="form.pageNum"
          :page-sizes="[5, 8, 10]"
          :page-size="form.pageSize"
          layout="sizes, prev, pager, next"
          :total="total"
          align="center">
        </el-pagination>

    <!-- 新增物品弹窗内容-->
    <el-dialog title="新增登记物品" :visible.sync="dialogAddAssetsFormVisible">
      <el-row style="height: 40px;line-height: 40px;">
        是否关联物品
        <el-switch
          v-model="connextvalue"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="clearStatus()"
          >
        </el-switch>
        <el-cascader
            :options="typeOptions"

            clearable
            v-if="connextvalue"
            v-model="type"
            :show-all-levels="false"
            @change="assetsTypeChange()"></el-cascader>
            <!-- :props="{ checkStrictly: true }" -->
      </el-row>
      <!-- 新增物品信息-->
      <el-form :model="addassetsform" style="padding-top: 40px;" :rules="addassetsrules" ref="addassetsform">
        <el-row>
          <el-col :span="12">
            <el-form-item label="物品名称" :label-width="formLabelWidth" prop="assetsname">

                <el-input v-model="addassetsform.assetsname"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物品类别" :label-width="formLabelWidth" prop="assetstype">
              <el-select v-model="addassetsform.assetstype" placeholder="请选择"  style="width: 100%;">
                 <el-option
                       v-for="item in options3"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="物品价值" :label-width="formLabelWidth" prop="assetsorivalue">
              <el-input-number v-model.number="addassetsform.assetsorivalue" :controls="false" style="width: 100%;" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="物品数量" :label-width="formLabelWidth" prop="assetsquantity">
              <el-input-number v-model.number="addassetsform.assetsquantity" :controls="false" style="width: 100%;" :min="1"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddAssetsFormVisible = false;resetForm('addassetsform')">取 消</el-button>
        <el-button @click="resetForm('addassetsform')" type="warning">重置</el-button>
        <el-button type="primary" @click="dialogAddAssetsFormVisible = false;submitForm('addassetsform')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        //查询结果
        assetslist:[],
        //页面控件
        total:0,
        dialogAddAssetsFormVisible: false,
        formLabelWidth: '120px',
        connextvalue:false,
        type:null,
        //查询控件
        form:{
          pageNum:1,
          pageSize:5,
          assetsname:null,
          assetstype:'',

        },

        //表单组件
        addassetsform:{
          assetsid:null,
          assetsnum:undefined,
          assetsname:undefined,
          assetstype:'非低值消耗类',
          assetsquantity:1,
          assetsretime:undefined,
          assetsgstatus:'未领用',
          assetsorivalue:1,
          assetsstatus:undefined,
        },

        //表单验证
        addassetsrules:{
          assetsname:[
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }
          ],
          assetsquantity:[
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }, {
              type: 'number',
              message: '必须为数字值'
            }
          ],
          assetsorivalue:[
            {
              required: true,
              message: '不能为空',
              trigger: 'blur'
            }, {
              type: 'number',
              message: '必须为数字值'
            }
          ],
        },
        //选项
        /* options2:[
          {
            value:'未领用',
            label:'未领用'
          },
          {
            value:'已领用',
            label:'已领用'
          },
           {
             value:'',
             label:'全部数据'
           },
        ], */
        typeOptions:[
          {
            value:'非低值消耗类',
            label:'非低值消耗类',
            children:[
              {
                value:'台式机内存',
                label:'台式机内存'
              },
              {
                value:'办公用键盘',
                label:'办公用键盘'
              },
              {
                value:'办公用鼠标',
                label:'办公用鼠标'
              },
            ]
          },
          {
            value:'低值消耗类',
            label:'低值消耗类',
            children:[
              {
                value:'固定资产',
                label:'绿植'
              },
              {
                value:'固定资产',
                label:'签字笔'
              }
            ]
          }
        ],
        options1:[
          {
            value:'非低值消耗类',
            label:'非低值消耗类'
          },
          {
            value:'低值消耗类',
            label:'低值消耗类'
          },
           {
             value:'',
             label:'全部数据'
           },
        ],
        options3:[
          {
            value:'非低值消耗类',
            label:'非低值消耗类'
          },
          {
            value:'低值消耗类',
            label:'低值消耗类'
          },
        ],

        //标签checke
        tagcheck(row){
          if(row.assetsgstatus == '未领用'){
            return 'success';
          }else if(row.assetsgstatus == '已领用'){
            return 'warning';
          }
        },
      }
    },
    methods:{
      //消息提示
      successopen(msg) {
              this.$message({
                message: msg,
                type: 'success'
              });
       },
       erroropen(msg) {
               this.$message({
                 message: msg,
                 type: 'error'
               });
        },
      //加载所有的资产详情
      loadAll(){
        let user = sessionStorage.getItem('user');
        var jsonObj = JSON.parse(user);
        console.log(jsonObj);
        this.$axios.post('assets/load',this.$Qs.stringify(this.form))
        .then(r=>{
          if(r.code=1){
            this.assetslist=r.obj.list;
            this.total=r.obj.total;
            this.form.pageNum=r.obj.pageNum;
            this.form.pageSize=r.obj.pageSize;
             console.log("所有资产详情",this.assetslist);
             this.successopen("查询成功!");
          }else{
            this.erroropen("查询失败！");
          }
        }).catch(function(e) {
           console.log("报错了，错误信息是+", e);
        });
      },
      //复合条件查询
      commind(){
        this.loadAll();
      },

      //新增资产
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(this.connextvalue==true ){
              this.addassetsform.assetsstatus=this.type[this.type.length-1];
              this.addassetsform.assetstype=this.type[0];
            }
            console.log("新增的物资",this.addassetsform);
            this.$axios.post('assets/add',this.addassetsform)
            .then(r=>{
              if(r.code=1){
                 this.successopen("新增成功!");
                  this.addassetsform=this.$options.data().addassetsform;
          this.loadAll();
              }else{
                this.erroropen("新增失败！");
              }

            }).catch(function(e) {
               console.log("报错了，错误信息是+", e);
            });
          } else {
            this.erroropen("表单验证有误！请重新输入");
            return false;
          }
         
        });
      },

      //重置添加表单
      resetForm(formName){
        this.$refs[formName].resetFields();
       },
      //选择关联产品
      assetsTypeChange(){
        this.addassetsform.assetsstatus=this.type[this.type.length-1];

        console.log("物资状态",this.addassetsform.assetsstatus);
      },
      //每一页的长度改变
      assetsListSizeChange(val){
        this.form.pageSize=val;
        this.form.pageNum=1;
        this.loadAll();
      },
      //页数发生改变
      assetsListNumChange(val){
        this.form.pageNum=val;
        this.loadAll();
      },
      //清除关联物品
      clearStatus(){
        if(this.connextvalue==false){
          this.addassetsform.assetsstatus=undefined;
          this.type=null;
        }
        console.log("最后的状态",this.addassetsform.assetsstatus);
      },

    },

    created() {
        this.loadAll();
    },

  }
</script>

<style scoped="scoped">
  #assetsoverview{
  padding: 20px;
  }
  .topfind{
    margin: 20px 0;
  }
 </style>
