<template>
  <div class="ele-body">
    <div class="ele-cell ele-cell-align-top ele-extension-more">
      <el-card shadow="never" body-style="padding: 5px 0;" style="width: 150px;">
        <el-menu :mode="mode" :default-active="active" style="border: none;" @select="onSelect">
          <el-menu-item index="icon">字体图标</el-menu-item>
          <el-menu-item index="tag">标签组件</el-menu-item>
          <el-menu-item index="message">消息提示</el-menu-item>
          <el-menu-item index="step">步骤条</el-menu-item>
          <el-menu-item index="menu">菜单导航</el-menu-item>
          <el-menu-item index="other">其它组件</el-menu-item>
        </el-menu>
      </el-card>
      <div class="ele-cell-content">
        <more-icon v-if="active==='icon'"/>
        <more-tag v-if="active==='tag'"/>
        <more-message v-if="active==='message'"/>
        <more-steps v-if="active==='step'"/>
        <more-menu v-if="active==='menu'"/>
        <more-other v-if="active==='other'"/>
      </div>
    </div>
  </div>
</template>

<script>
import MoreIcon from './more-icon';
import MoreTag from './more-tag';
import MoreSteps from './more-steps';
import MoreMenu from './more-menu';
import MoreMessage from './more-message';
import MoreOther from './more-other';

export default {
  name: 'ExtensionMore',
  components: {
    MoreIcon,
    MoreTag,
    MoreSteps,
    MoreMenu,
    MoreMessage,
    MoreOther
  },
  data() {
    return {
      active: 'icon'
    };
  },
  computed: {
    mode() {
      return this.$store.state.theme.screenWidth < 768 ? 'horizontal' : 'vertical';
    }
  },
  mounted() {
    this.active = this.$route.query.active || 'icon';
  },
  methods: {
    onSelect(index) {
      if (this.$route.path !== '/extension/more' || this.$route.query.active !== index) {
        this.$router.push({path: '/extension/more', query: {active: index}});
      }
    }
  },
  watch: {
    $route() {
      this.active = this.$route.query.active || 'icon';
    }
  }
}
</script>

<style scoped>
</style>
