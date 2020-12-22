<template>
  <div id="recru_div">
    <div></div>
    <div id="main_div">
      <div class="boxs-card" v-for="(v,k) in recru">
        <p class="trans" v-if="v.retype==0">进行中</p>
        <p class="trans" v-if="v.retype==1">已完成</p>
        <p class="trans" v-if="v.retype==2">已取消</p>
        <div class="dept_posi">
          <a style="font-size: 20px;font-weight: bold;">{{v.posi.dept.dname}}</a>-
          {{v.posi.poname}}
        </div>
        <div>
          期望日期：{{v.hopetime}}
        </div>
        <div>
          需求人数：{{v.peopcout}}
        </div>
        <div>
          招聘需求：{{v.recrudemand}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        recru:[]
      }
    },
    methods:{
      loadData(){
        this.$axios.post("/recru/finall").then(r=>{
          this.recru=r.objs;
          console.log("TT：",this.recru);
        })
      }
    },
    mounted(){
      this.loadData();
    }
  }
</script>

<style>
  .boxs-card{
    height: 240px;
    width: 600px;
    margin: 0px auto;
    margin-top: 20px;
    -moz-box-shadow: 2px 2px 8px #909090;/*firefox*/
    -webkit-box-shadow: 2px 2px 8px #909090;/*safari或chrome*/
    box-shadow:2px 2px 8px #909090;/*opera或ie9*/
  }
  .trans{
    transform: rotate(-45deg);
    width: 100px;
    text-align: center;
    line-height: 40px;
    margin-right: 20px;
    background-color: skyblue;
  }
  .dept_posi{
    margin-top: 50px;
    margin-left: 20px;
  }
</style>
