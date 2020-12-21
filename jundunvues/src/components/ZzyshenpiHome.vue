<template>
  <div>
    <div class="top_box">
      <div class="left_box">
        <div class="lett_img" style="background-image: url(../../static/imgs/文本.png);" ></div>
        <div class="p_box">
          <p style="color: #E29C00; font-style: oblique;">0</p>
          <p style="color: #5E6C8A;">待审批</p>
        </div>

      </div>
      <div class="left_box">
        <div class="lett_img" style="background-image: url(../../static/imgs/通过.png);" ></div>
        <div class="p_box">
          <p style="color: #E29C00; font-style: oblique;">0</p>
          <p style="color: #5E6C8A;">已审批</p>
        </div>
      </div>
      <div class="left_box">
        <div class="lett_img" style="background-image: url(../../static/imgs/驳回.png);" ></div>
        <div class="p_box">
          <p style="color: #E29C00; font-style: oblique;">0</p>
          <p style="color: #5E6C8A;">被删除</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {

      }
    },
    methods: {

    },
    mounted() {

    }
  }
</script>

<style scoped>
  * {
    margin: 0px;
    padding: 0px;
  }

  .top_box {
    width: 100%;
    height: 200px;
    border: 1px solid #D3D3D3;
  }

  .left_box {
    width: 350px;
    height: 150px;
    background-color: #EAF2FF;
    margin-top: 25px;
    margin-left: 50px;
    float: left;
    cursor:pointer;
  }

  .lett_img {
    width: 80px;
    height: 80px;
    margin-left: 80px;
    margin-top: 35px;
  }

  .p_box {
    margin-left: 170px;
    margin-top: -80px;
    width: 100px;
    height: 80px;
  }

  .p_box p {
    font-size: 18px;
    line-height: 40px;
  }
</style>
