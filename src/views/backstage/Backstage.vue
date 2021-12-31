<template>
  <el-container class="home_container">
    <!-- 头部 -->
    <el-header>
      <div>
        <span>电大后台管理系统</span>
      </div>
      <el-button type="primary">退出</el-button>
    </el-header>
    <el-container>
      <!-- 左侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409FFF"
          unique-opened
          router
        >
        <!-- 一级菜单 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>课程相关</span>
            </template> 
            <!-- 二级 -->
            <el-menu-item-group>
              <el-menu-item index="uploadvideo">
                <i class="el-icon-upload2"></i>上传视屏
              </el-menu-item>
              <el-menu-item index="coursemanagement">
                <i class="el-icon-s-fold"></i> 课程管理
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 平级一级菜单 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-postcard"></i>
              <span>试卷管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="testpaperlist">
                <i class="el-icon-reading"></i>试卷列表
                </el-menu-item>
              <el-menu-item index="testpapercenter">
                <i class="el-icon-document-copy"></i>试卷中心
                </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Backstage",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.home_container {
  position: relative;
  height: 100%;
  z-index: 999;
}
.el-header {
  background-color: #373d41;
  display: flex;
  /* 左右两边贴边对齐 */
  justify-content: space-between;
  align-items: center;
  color: #fff;
  font-size: 20px;
}
.el-header,
.el-footer {
  text-align: center;
  line-height: 60px;
  height: 100%;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-menu {
  border-right: 0;
  font-size: 20px;
}
.el-aside {
  background-color: #333744;
}
</style>