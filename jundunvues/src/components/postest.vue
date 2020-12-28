<template>
  <div ref="capture">
    <div class="print ">
<!-- createPdf
generatorImage -->
      <!-- <el-button type="primary" @click="createPdf" style="margin-left: 550px;margin-top: 70px;" v-if="false" round>确认签订合同</el-button> -->
      <el-button type="primary" @click="no()" style="margin-left: 900px;margin-top:70px"
        round>返回上一页</el-button>

    </div>
    <div class="resume-wrap">

      <div class="resume-header">
        <span style="margin-right: 10px;">韬睿公司</span>
        <div class="header-title">劳动合同拟定</div>
      </div>
      <div class="resume-body">
        <p style="text-align: center;font-size: 28px;">
          <!--/*@thymesVar id="publisher" type=""*/-->
          劳动合同
        </p>

        <div class="body_content" style="font-size: 20px;font-family: '宋体';">
          <b style="margin-left: 10px;">韬睿公司</b>(单位)(以下简称甲方)
          <br>
          <br>
          　　<b v-if="emp.ename!=null && emp.ename!=''" style="margin-left: 10px;">{{emp.ename}}</b>(以下简称乙方)

          <br>
          　　开始时间：<b v-if="emp.ckaitime!=null && emp.ckaitime!=''">{{emp.ckaitime}}</b>
          <br>
          <br>
          　　结束时间：<b v-if="emp.cjietime!=null && emp.cjietime!=''">{{emp.cjietime}}</b>
          <br>
          <br>
          　　合同期限：<b v-if="emp.cqixian!=null && emp.cqixian!=''">{{emp.cqixian}}年</b>
          <br>
          <br>

          　　依照国家有关法律条例，就聘用事宜，订立本劳动合同。
          <br>

          　　第一条 试用期及录用
          <br>

          　　(一)甲方依照合同条款聘用乙方为员工，乙方于工作部门<b v-if="emp.dname!=null && emp.dname!=''">{{emp.dname}}</b>任职<b v-if="emp.gname!=null && emp.gname!=''">{{emp.gname}}</b>，乙方应经过三至六个月的试用期，在此期间，甲乙任何一方有权终止合同，但必须提前七天通知对方或以七天的试用工资作为补偿。
          <br>
          <br>

          　　(二)试用期满，双方无异议，乙方成为甲方的正式合同制劳务工，甲方将以书面方式给予确认。
          <br>
          <br>

          　　(三)乙方试用合格后被正式录用，其试用期应计算在合同有效期内。
          <br>
          <br>

          　　第二条 工资及其它补助奖金
          <br>
          <br>

          　　(一)乙方基本工资为{{emp.sal}}，甲方不得支付低于正式工资的８０％并且不能低于本单位相同岗位最低档工资或者劳动合同约定工资的百分之八十，且不能低于当地最低工资标准。
          <br>
          <br>

          　　(二)甲方根据国家有关规定和企业经营状况实行本企业的等级工资制度，并根据乙方所担负的职务和其他条件确定其相应的工资标准，以银行转帐形式支付，按月发放。
          <br>
          <br>

          　　(三)甲方根据盈利情况及乙方的行为和工作表现增加工资，如果乙方没达到甲方规定的要求指标，乙方的工资将得不到提升。
          <br>
          <br>

          　　(四)甲方(公司主管人员)会同人事部门，在如下情况，甲方将给乙方荣誉或物质奖励，如模范地遵守公司的规章制度，生产和工作中的突出贡献或物质奖励，技术革新、经营管理改善，乙方也
          <br>
          <br>

          　　由于有突出贡献得到工资和职务级别的提升。
          <br>
          <br>

          　　(五)甲方根据本企业利润情况设立年终奖金，可根据员工劳动表现及在单位服务年限发放奖金。
          <br>
          <br>

          　　(六)甲方根据政府的有关规定和企业状况，向乙方提供津贴和补助金。
          <br>
          <br>

          　　(七)除了法律、法规、规章明确提出的要求补助外，甲方将不再有义务向乙方提供其它补助津贴。
          <br>
          <br>

          　　第三条 工作时间及公假
          <br>

          　　(一)乙方的工作时间每天为8小时(不含吃饭时间)，每星期工作五天半或每周工作时间不超过44小时，除吃饭时间外，每个工作日不安排其它休息时间。
          <br>
          <br>
          　　(二)乙方有权享受法定节假日以及婚假、丧假等有薪假期。甲方如要求乙方在节假日工作，在征得乙方同意后，须安排相应的时间轮休，或按国家规定支付乙方加班费。
          <br>
          <br>
          　　(三)乙方成为正式员工，在本企业连续工作满半年后，可按比例获得每年根据其所担负的职务相应享受十天的有薪年假。
          <br>
          <br>
          　　(四)乙方在生病时，经甲方认可的医生及医院证明，过试用期的员工每月可享受有薪病假一天，病假工资超出有薪病假部分的待遇，按政府和单位的有关规定执行。
          <br>
          <br>
          　　(五)甲方根据生产经营需要，可调整变动工作时间，包括变更日工作开始和结束的时间，在照顾员工有合理的休息时间的情况下，日工作时间可做不连贯的变更，或要求员工在法定节假日及休息日到岗工作。乙方无特殊理由应积极支持和服从甲方安排，但甲方应严格控制加班加点。
          <br>
          <br>


          　　第四条 员工教育
          <br>
          <br>
          　　在乙方任职期间，甲方须经常对乙方进行职业道德、业务技术、安全生产及各种规章制度及社会法制教育，乙方应积极接受这方面的教育。
          <br>
          <br>

          　　第五条 工作安排与条件
          <br>
          <br>

          　　(一)甲方有权根据生产和工作需要及乙方的能力，合理安排和调整乙方的工作，乙方应服从甲方的管理和安排，在规定的工作时间内按质按量完成甲方指派的工作任务。
          <br>
          <br>
          　　(二)甲方须为乙方提供符合国家要求的安全卫生的工作环境，否则乙方有权拒绝工作或终止合同。
          <br>
          <br>
          　　第六条 劳动保护
          <br>
          <br>

          　　甲方根据生产和工作需要，按国家规定为乙方提供劳动保护用品和保健食品。对女职工经期、孕期、产期和哺乳期提供相应的保护，具体办法按国家有关规定执行。
          <br>
          <br>
          　　第七条 劳动保险及福利待遇
          <br>
          <br>

          　　(一)甲方按国家劳动保险条例规定，为乙方支付医药费用，病假工资、养老保险费用及工伤保险费用。
          <br>
          <br>
          　　(二)甲方根据单位规定提供乙方宿舍和工作餐(每天两次)
          <br>
          <br>
          　　第八条 解除合同
          <br>
          <br>

          　　(一)符合下列情况，甲方可以解除劳动合同
          <br>
          <br>
          　　(1)甲方因营业情况发生变化，而多余的职工又不能改换其它工种。
          <br>
          <br>
          　　(2)乙方患病或非因工负伤，按规定的医疗期满后，不能从事原工作，也不能调换其它工种
          <br>
          <br>
          　　3)乙方严重违反企业劳动纪律和规章制度，并造成一定后果，根据企业有关条例和规定应予辞退

          　　的，甲方有权随时解除乙方的劳动合同。
          <br>
          <br>
          　　(4)乙方因触犯国家法规被拘留，劳动教养、判刑，甲方将作开除处理，劳动合同随之终止。
          <br>
          <br>
          　　(二)符合下列情况，乙方可以解除劳动合同。
          <br>
          　　(1)经国家有关部门确认，劳动安全，卫生条件恶劣，严重危害了乙方身体健康的。
          <br>
          <br>
          <br>
          　　(2)甲方不履行劳动合同或违反国家政策、法规、侵害乙方合法利益。
          <br>
          <br>
          　　(3)甲方不按规定支付乙方劳动报酬的。
          <br>
          <br>
          　　(三)在下列情况下，甲方不得不解除劳动合同。
          <br>
          <br>
          　　(1)乙方患病和因工负伤，在规定的医疗期内的。
          <br>
          <br>
          　　(2)乙方因工负伤或患职业病，正在进行治疗的。
          <br>
          <br>
          　　(3)女员工在孕期、产期或哺乳期的。
          <br>
          <br>
          　　(四)乙方因工负伤或患职业病、医疗终结经政府有关部门确认为部分丧失劳动能力的，企业应予妥善安置。
          <br>
          <br>
          　　(五)任何一方解除劳动合同，一般情况下，必须提前一个月通知对方，或以一个月的工资作为补偿，解除合同的程序按企业有关规定办理。
          <br>
          <br>
          　　(六)乙方在合同期内，持有正当理由，不愿继续在本企业工作时，可以提出辞职，但须提前一个月书面通知甲方，经甲方批准后生效。辞职员工如系由企业出资培训，在培训期满后，工作未满合同规定年限的，应赔偿甲方一定的培训费用。未经甲方同意擅自离职，甲方有权通过政府劳动部门，要求乙方返回工作岗位，并赔偿因此给甲方造成的经济损失。
          <br>
          <br>
          　　第九条 劳动纪律
          <br>
          <br>
          　　(一)乙方应遵守国家的各项规定和企业的《员工手册》以及单位的各项规章制度。
          <br>
          <br>
          　　(二)乙方如触犯刑律，受法律制裁或违反《员工手册》和甲方规定的其它规章制度，甲方有权按《员工手册》等规定，分别给予乙方相应的纪律处分，直至开除，因乙方违反《员工手册》和其它规章制度，造成本企业利益受到损害，如企业声誉的损害、财产的损坏，甲方根据严重程度，可采取一次性罚款措施。
          <br>
          <br>
          　　(三)如果乙方违反合同规定，贪污受贿，严重玩忽职守或有不道德、粗鲁行为，引起或预示将引起严重损害到他人人身和财产利益，乙方触犯刑律受到法律制裁等，上述种种，甲方有权立即予以开除，并不给予“合同补偿金”和“合同履约金”。乙方贪污受贿或损害他人人身和财产利益所造成的损失。由乙方负完全承担赔偿责任。
          <br>
          <br>
          　　(四)乙方在合同期内和以后，不得向任何人泄漏本企业的商业机密消息。乙方在职期间不得同时在与本企业经营相似的企业、团体以及与本企业有业务关系的企业团体兼职。乙方合同终止或其他原因由本企业离职时，应向部门主管人员交回所有与经营有关的文件资料，包括通信、备忘录、顾客清单、图表资料及培训教材等。
          <br>
          <br>
          　　第十条 合同的实施和批准
          <br>
          <br>
          　　(一)本合同经集团总监办讨论制定，报经总经理批准，用文字书写，内容以中文为准，合同解释权属本公司人事部。
          <br>
          <br>
          　　(二)单位《员工手册》、《雇员犯规及警告通告》及其它经济纪律规定均为合同附件，是合同的组成部分。
          <br>
          <br>
          <br>
          <br>
          　　(三)本合同一经鉴定，甲、乙双方必须严格遵守，任何一方不得单方面修改合同内容，如有未尽事宜或与政府有关规定抵触时，按政府有关规定处理。
          <br>
          <br>
          　　(四)本合同自鉴定之日生效，有效期为<b>{{emp.qdate}}</b>于<b>{{emp.jdate}}</b>到期，合同期满前两个月，如双方无异议本合同自行延长三年。
          <br>
          <br>
          　　(五)本合同一式两份，甲乙双方各执一份，由甲方上级主管部门和国家劳动管理部门监督执行。
          <br>
          <br>
          <!--  <el-row :gutter="20">
            <el-col :offset="15"> -->
          　　<b>甲方(签字)</b>
          <b>韬睿公司</b>
          <!--    </el-col>
          </el-row> -->
          <br>
          <br>
          <el-row :gutter="20">
            <el-col :offset="11">
              　　<b style="display: inline;position: relative;bottom: 48px;">日期:{{emp.qdate}}</b>
            </el-col>
          </el-row>
          <br>
          　　<b>乙方(签字)</b>
          <br>
          <br>
          <el-row :gutter="20">
            <el-col :offset="11">
              　　<b style="display: inline;position: relative;bottom: 48px;">日期:{{emp.qdate}}</b>
            </el-col>
          </el-row>
          <br>
          <el-row :gutter="20">
            <el-col :offset="15">
              <!-- <p><img src="static/img/trgs1.png"></p> -->
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>

</template>

<script scoped="scoped">
// import axios from 'axios'
//   import html2canvas from 'html2canvas';
//   import JsPDF from 'jspdf'
//   import moment from 'moment'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          region: '',
          cause: '',
          dept: '',
          date1: '',
          date2: '',
          date3: '',
          delivery: false,
          type: [],
          resource: '',
          test: '',
          desc: ''
        },
        emp: {
          ename: '',
          ckaitime: '',
          cjietime: '',
          cqixian:'',
        },
        fileList: []
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      generatorImage() {
        html2canvas(this.$refs.capture).then(canvas => {
          // this.$refs.addImage.append(canvas);//在下面添加canvas节点
          let link = document.createElement("a");
          link.href = canvas.toDataURL(); //下载链接
          console.log("文件路径" + link.href)
          var time = this.format();
          console.log("时间为",time)
          var tupian = this.emp.ename + time + ".png"
          link.setAttribute("download", tupian);
          link.style.display = "none"; //a标签隐藏
          document.body.appendChild(link);
          link.click();

          // setTimeout(() =>{
              this.offers(tupian);
          // },3000);

        });
      },
        createPdf () {
              window.pageYOffset = 0;
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;

              let time = moment().format('YYYYMMDD')
              console.log("时间为",time)
              var tupian = this.emp.ename+time + ".pdf"

              html2canvas(this.$refs.capture, {
                allowTaint: true,
                scale: 2,
                dpi: 182,//导出图片清晰度
              }).then(function (canvas) {
                 let contentWidth = canvas.width
                let contentHeight = canvas.height
                //一页pdf显示html页面生成的canvas高度;
                let pageHeight = contentWidth / 592.28 * 841.89
                //未生成pdf的html页面高度
                let leftHeight = contentHeight
                //页面偏移
                let position = 0
                let imgWidth = 595.28
                let imgHeight = 592.28 / contentWidth * contentHeight
                //返回图片dataURL，参数：图片格式和清晰度(0-1)
                let pageData = canvas.toDataURL('image/jpeg', 1.0)
                //方向默认竖直，尺寸ponits，格式 a4纸 [595.28,841.89]
                let PDF = new JsPDF('', 'pt', 'a4')
                //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
                //当内容未超过pdf一页显示的范围，无需分页
                if (leftHeight < pageHeight) {
                  //addImage将图片添加到pdf中
                  //addImage中间两个参数控制x、y边距，
                  //后两个参数控制添加图片的尺寸，此处将页面高度按照a4纸宽高比列进行压缩
                  PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
                } else {
                  while (leftHeight > 0) {
                    PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                    leftHeight -= pageHeight
                    position -= 841.89
                    //避免添加空白页
                    if (leftHeight > 0) {
                      //addPage()添加pdf页数
                      PDF.addPage()
                    }
                  }
                }

                //保存名称
                PDF.save(tupian)
                // this.offers(tupian);
               } )
               setTimeout(() =>{
                   this.offers(tupian);
               },1000);


      },
      nadao() {
        this.emp.ckaitime = this.$route.params.ckaitime;
        this.emp.ename = this.$route.params.ename;
        this.emp.cjietime = this.$route.params.cjietime;
        this.emp.cqixian = this.$route.params.cqixian;
        console.log("返回的情况", this.emp)
      },

      offers(tupian) {

        let url = "laodong/add";
        //2、参数
        let param = {
          empno: this.emp.empno,
          startime: this.emp.qdate,
          endtime: this.emp.jdate,
          tupian: tupian,
        }
        //myhttp的封装结果getObj是返回单个的对象。最后接回调函数
        this.$myhttp.getObj(url, param, (pager) => {
          if (pager > 0) {
            this.$message({
              message: '签订成功！',
              type: 'success'
            });
            this.$router.push("/laodong");
          } else if (pager < 0) {
            this.$message({
              message: '签订失败',
              type: 'warning'
            });
          } else {
            this.$message.error('系统有误，请联系管理员');

          }

          console.log("返回的签订情况", pager);
        });
      },

      format() {
        var date = new Date()
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentDate = date.getFullYear() + '' + month + '' + strDate
        return currentDate
      },


      no() {
        console.log("进入了返回上一个操作", this.emp)
        this.emp.empno = 0;
        this.emp.ename = '';
        this.emp.phone = '';
        this.emp.idcar = '';
        this.emp.ip = '湖南省株洲市韬睿1306';
        this.gname = '';
        this.dname = '';
        this.emp.sal=0;
        console.log('清空后的值', this.emp)
        this.$router.push({
          path: '/Pxyjust'
        });
      },
    },
    created() {
       this.nadao();
      console.log("进入了钩子函数")
    },
    activated: function() {
      this.nadao();
    }


  };
</script>

<style scoped="scoped">
  .crumbs {
    height: 1000px;
    width: 100%;
    /* background: white; */

  }

  .d1 {
    width: 100%;
    height: 45px;
    background: #F9F9F9;

    background: white;

  }

  .fa-gg-circle {
    margin-top: 8px;
    margin-left: 15px;
    color: #5799E5;
  }

  .db {
    margin-left: 60px;
    display: inherit;
    margin-top: -26px;
    font-size: 15px;
  }

  .di_v1 {
    margin-top: 10px;
    background: white;
    height: 60px;
    /* border: 1px solid red; */
    text-align: center;
  }

  .di_v2 {
    margin-top: 10px;
    background: white;
    height: 900px;
  }

  .jbxx {
    height: 40px;
    /* border: 1px solid red; */
    width: 90%;
    margin-left: 5%;
    background: #f0f0f0;
  }

  .jbcc {
    display: inline-block;
    margin-left: 15px;
    margin-top: 10px;
  }

  .formyz {
    /* border: 1px solid gold; */
    /* position: absolute; */
    margin-top: 30px;
    width: 100%;
    height: 100%;
  }

  .el-form-item {
    margin-left: -40px;
    /* font-size: 20px; */
  }

  .is-required {
    width: 1000px;
  }

  .el-input--small {
    margin-left: 70px;
  }

  .el-button--primary {
    /* margin-left: -270px; */
    margin-top: 20%;
  }

  .upload-demo {
    margin-left: 330px;
  }

  .button1 {
    width: 200px;
    height: 100px;
    /* border: 1px solid red; */
    margin-left: 910px;
    margin-top: -10px;
  }

  .print {
    /* border: 1px solid red; */
    width: 100px;
    height: 50px;
  }



  /* 样式 */

  .resume-wrap {
    width: 621px;
    margin: 0 auto;
    background: #FFFFFF;
    border-radius: 4px;
    box-shadow: 0px 0px 18px 0px rgba(21, 21, 22, 0.17);
  }

  .logo-title {
    height: 25px;
    margin-right: 14px;
  }

  .header-title {
    padding-left: 14px;
    border-left: 1px solid #fff;
  }

  .resume-header {
    display: flex;
    align-items: center;
    padding: 0 22px;
    font-size: 20px;
    color: #fff;
    height: 75px;
    border-radius: 4px 4px 0px 0px;
    background: linear-gradient(251deg, #5FAEF9 0%, #3985FD 100%);
  }

  .resume-body {
    padding: 50px;
    color: #131415;
  }

  .resume_position {
    color: #5FAEF9;
  }

  .body_content {
    line-height: 25px;
  }

  .position-card {
    display: flex;
    margin-top: 36px;
    border-radius: 4px;
    /*  border: 1px solid #DBE0E6; */
    padding: 30px;
  }

  .avatar {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 1px solid #DBE0E6;
  }

  .avatar .avatar-sex-icon {
    position: absolute;
    width: 16px;
    height: 16px;
    bottom: 0;
    right: 0;
  }

  .card-info {
    margin-left: 15px;
  }

  .info-name {
    font-size: 18px;
    font-weight: 600;
    color: #3C3E43;
    line-height: 25px;
  }

  .info-pos {
    margin-top: 10px;
    margin-bottom: 16px;
    color: #3C3E43;
    font-size: 14px;
  }

  .info-pos span {
    padding: 0 10px;
    border-right: 1px solid #DBE0E6;
  }

  .info-pos span:first-child {
    padding-left: 0;
  }

  .info-pos span:nth-child(n+4) {
    padding-right: 0;
    border-right: none;
  }

  .info-pos span:nth-child(n+5) {
    padding: 0;
  }

  .info-bottom {
    font-size: 14px;
    font-weight: 400;
    color: #7F8289;
    line-height: 20px;
    margin-bottom: 10px;
  }

  .info-bottom img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-left: 2px;
  }

  .resume-bottom {
    margin: 46px auto 0;
    color: #fff;
    padding: 0 20px;
    /*width: 230px;*/
    height: 44px;
    line-height: 44px;
    /*background: #F9791B;*/
    border-radius: 4px;
    text-align: center;
    cursor: pointer;
    background: #5FAEF9;
  }

  a {
    display: inline-block;
    margin: 10px;
    color: #F9791B;
  }

  .resume-awrap {
    height: 30px;
  }
</style>
