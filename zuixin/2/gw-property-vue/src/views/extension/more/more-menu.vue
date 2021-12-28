<template>
  <el-card shadow="never" header="菜单导航">
    <el-radio-group v-model="dark" size="small">
      <el-radio-button :label="false">Light</el-radio-button>
      <el-radio-button :label="true">Dark</el-radio-button>
    </el-radio-group>
    <div style="max-width: 600px;margin-top: 20px;">
      <el-menu
        mode="horizontal"
        :class="themeClass"
        default-active="1-1">
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">角色管理</el-menu-item>
          <el-menu-item index="1-3">权限管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-opportunity"></i>
            <span>日志管理</span>
          </template>
          <el-menu-item index="2-1">登录日志</el-menu-item>
          <el-menu-item index="2-2">操作日志</el-menu-item>
          <el-menu-item index="2-3">错误日志</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-s-opportunity"></i>
            <span>订单查询</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-s-opportunity"></i>
            <span>退款记录</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-s-opportunity"></i>
            <span>订单报表</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-s-opportunity"></i>
          <span>订单报表</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div style="margin-top: 40px;">
      <el-radio-group v-model="collapse" size="small">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">折叠</el-radio-button>
      </el-radio-group>
    </div>
    <div style="max-width: 200px;margin-top: 20px;">
      <el-menu
        mode="vertical"
        :class="themeClass"
        :collapse="collapse"
        default-active="1-1">
        <el-submenu index="1" :popper-class="themeClass">
          <template slot="title">
            <i class="el-icon-s-tools"></i>
            <span>系统管理</span>
          </template>
          <el-menu-item index="1-1">用户管理</el-menu-item>
          <el-menu-item index="1-2">角色管理</el-menu-item>
          <el-menu-item index="1-3">权限管理</el-menu-item>
        </el-submenu>
        <el-submenu index="2" :popper-class="themeClass">
          <template slot="title">
            <i class="el-icon-s-opportunity"></i>
            <span>日志管理</span>
          </template>
          <el-menu-item index="2-1">登录日志</el-menu-item>
          <el-menu-item index="2-2">操作日志</el-menu-item>
          <el-menu-item index="2-3">错误日志</el-menu-item>
        </el-submenu>
        <el-submenu index="3" :popper-class="themeClass">
          <template slot="title">
            <i class="el-icon-s-order"></i>
            <span>订单管理</span>
          </template>
          <el-menu-item index="3-1">
            <i class="el-icon-s-opportunity"></i>
            <span>订单查询</span>
          </el-menu-item>
          <el-menu-item index="3-2">
            <i class="el-icon-s-opportunity"></i>
            <span>退款记录</span>
          </el-menu-item>
          <el-menu-item index="3-3">
            <i class="el-icon-s-opportunity"></i>
            <span>订单报表</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item index="4">
          <i class="el-icon-s-opportunity"></i>
          <span slot="title">订单报表</span>
        </el-menu-item>
      </el-menu>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'MoreMenu',
  data() {
    return {
      dark: false,
      collapse: false
    };
  },
  computed: {
    themeClass() {
      return this.dark ? 'ele-menu-dark' : '';
    }
  }
}
</script>

<style scoped>
</style>
