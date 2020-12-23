<template>
  <div>
    <el-container style="height: 700px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="[]" :default-active="$route.path" router>
          <!--招聘管理-->
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>招聘管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--人事管理-->
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-menu"></i>人事管理</template>
            <el-menu-item-group>
              <template slot="title">员工</template>
              <router-link to="/pxyemp">
              <el-menu-item index="2-1">
                  员工管理
              </el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="2-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--审批管理-->
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-setting"></i>审批管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="3-1">选项1</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="3-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="3-4">
              <template slot="title">选项4</template>
              <el-menu-item index="3-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--公告管理-->
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-setting"></i>公告管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="4-1">选项1</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="4-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="4-4">
              <template slot="title">选项4</template>
              <el-menu-item index="4-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--项目管理-->
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-setting"></i>项目管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="5-1">选项1</el-menu-item>
              <el-menu-item index="5-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="5-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="5-4">
              <template slot="title">选项4</template>
              <el-menu-item index="5-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--绩效管理-->
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-setting"></i>绩效管理</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <router-link to="/aclc">
              <el-menu-item index="6-1">活动主页</el-menu-item>
              </router-link>
              <el-menu-item index="6-2">我的成绩</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="6-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="6-4">
              <template slot="title">选项4</template>
              <el-menu-item index="6-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <!--物质管理-->
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-setting"></i>物质管理</template>
            <el-menu-item-group>
              <template slot="title">采购管理</template>
              <el-menu-item index="7-1">选项1</el-menu-item>
              <el-menu-item index="7-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="资产管理">
              <el-menu-item index="/home/assetsoverview" >资产列表</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="7-4">
              <template slot="title">领用归还记录</template>
              <el-menu-item index="/home/brassetsoverview">领用归还记录</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <span>王小虎</span>
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'page',
    data() {
      const item = {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      };
      return {
        tableData: Array(20).fill(item)
      }
    }
  }
</script>

<style>
  .el-header {
    background-color: #81d8d0;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
