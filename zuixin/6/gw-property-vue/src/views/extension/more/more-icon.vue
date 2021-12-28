<template>
  <div>
    <el-alert
      show-icon
      type="info"
      :closable="true"
      :title="tipTitle"
      class="ele-alert-border"
      style="margin-bottom: 10px;"/>
    <el-card shadow="never" body-style="position: relative;padding: 0;">
      <div class="demo-icon-search">
        <el-input
          size="small"
          v-model="keywords"
          placeholder="输入关键词搜索..."/>
      </div>
      <el-tabs v-model="active" class="demo-icon-tabs">
        <el-tab-pane
          v-for="(item, index) in result"
          :key="index"
          :name="item.title"
          :label="item.title">
          <el-row class="demo-icon">
            <el-col
              v-for="(d, i) in item.icons"
              :key="i"
              :xs="8"
              :sm="6"
              :md="4"
              class="demo-icon-item"
              v-clipboard:copy="d"
              v-clipboard:error="onError"
              v-clipboard:success="onCopy">
              <div class="demo-icon-content">
                <i :class="d"></i>
              </div>
              <div class="demo-icon-text ele-text-secondary">{{ d }}</div>
              <div class="demo-icon-tip ele-bg-primary">点击复制</div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import EleIconPicker from 'ele-admin/packages/ele-icon-picker';

export default {
  name: 'MoreIcon',
  data() {
    return {
      // 图标数据
      data: EleIconPicker.defaultIcons,
      // 搜索关键字
      keywords: ''
    };
  },
  computed: {
    // 搜索后的结果
    result() {
      if (!this.keywords) {
        return this.data;
      }
      let result = [];
      this.data.forEach(item => {
        result.push({
          title: item.title,
          icons: item.icons.filter(d => d.indexOf(this.keywords) !== -1)
        });
      });
      return result;
    },
    // 标签页选中位置
    active: {
      get() {
        if (!this.result || this.result.length === 0) {
          return null;
        }
        for (let i = 0; i < this.result.length; i++) {
          if (this.result[i].icons.length !== 0) {
            return this.result[i].title;
          }
        }
        return null;
      },
      set() {
      }
    },
    // 计算总个数
    total() {
      let num = {el: 0, ele: 0};
      this.data.forEach(item => {
        item.icons.forEach(d => {
          if (d.indexOf('el-icon-_') === 0) {
            num.ele++;
          } else {
            num.el++;
          }
        });
      });
      num.all = num.el + num.ele;
      return num;
    },
    // 提示文本
    tipTitle() {
      return `新增 ${this.total.ele} 个图标 + Element UI ${this.total.el} 个图标, 共计 ${this.total.all} 个图标`;
    }
  },
  methods: {
    onCopy() {
      this.$message.success('复制成功');
    },
    onError() {
      this.$message.error('复制失败');
    }
  }
}
</script>

<style scoped>
/* 选项卡 */
.demo-icon-tabs ::v-deep .el-tabs__nav-scroll {
  padding: 0 0 0 30px;
}

.demo-icon-tabs ::v-deep .el-tabs__item {
  height: 48px;
  line-height: 48px;
  padding: 0 30px 0 0 !important;
}

.demo-icon-tabs ::v-deep .el-tabs__item:focus.is-active.is-focus:not(:active) {
  box-shadow: none;
}

/* 搜索框 */
.demo-icon-search {
  position: absolute;
  top: 8px;
  right: 15px;
  width: 180px;
  z-index: 1;
}

@media screen and (max-width: 660px) {
  .demo-icon-search {
    width: auto;
    position: static;
    margin: 10px 10px 0 10px;
  }
}

/* 图标 */
.demo-icon {
  margin: 15px;
  border-top: 1px solid hsla(0, 0%, 60%, .15);
  border-left: 1px solid hsla(0, 0%, 60%, .15);
}

.demo-icon-item {
  text-align: center;
  padding: 24px 0;
  border-right: 1px solid hsla(0, 0%, 60%, .15);
  border-bottom: 1px solid hsla(0, 0%, 60%, .15);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}

.demo-icon-item > .demo-icon-content > i {
  font-size: 38px;
}

.demo-icon-item > .demo-icon-text {
  padding: 0 5px;
  font-size: 14px;
  margin-top: 8px;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
}

.demo-icon-item > .demo-icon-tip {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -30px;
  color: #fff;
  padding: 4px 0;
  font-size: 12px;
  transition: bottom .2s;
}

.demo-icon-item:hover > .demo-icon-tip {
  bottom: 0;
}
</style>
