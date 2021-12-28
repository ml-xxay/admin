<template>
  <div>
    <el-card shadow="never" header="消息提示">
      <div style="margin:0 0 10px 0;">边框风格</div>
      <el-button @click="showSuccessMessage(true)">成功</el-button>
      <el-button @click="showWarningMessage(true)">警告</el-button>
      <el-button @click="showErrorMessage(true)">错误</el-button>
      <el-button @click="showInfoMessage(true)">消息</el-button>
      <div style="margin:20px 0 10px 0;">默认风格</div>
      <el-button @click="showSuccessMessage(false)">成功</el-button>
      <el-button @click="showWarningMessage(false)">警告</el-button>
      <el-button @click="showErrorMessage(false)">错误</el-button>
      <el-button @click="showInfoMessage(false)">消息</el-button>
      <el-button @click="showLoadingMessage">loading</el-button>
    </el-card>
    <el-card shadow="never" header="警告组件" body-style="padding: 20px 20px 0 20px;">
      <el-row :gutter="20">
        <el-col :sm="6" :xs="12">
          <el-alert
            show-icon
            type="success"
            title="Success Tips"
            class="ele-alert-border"/>
          <el-alert
            show-icon
            type="success"
            title="Success Tips"
            class="ele-alert-border"
            description="Detailed description and advice about successful copywriting."/>
        </el-col>
        <el-col :sm="6" :xs="12">
          <el-alert
            show-icon
            type="info"
            class="ele-alert-border"
            title="Informational Notes"/>
          <el-alert
            show-icon
            type="info"
            class="ele-alert-border"
            title="Informational Notes"
            description="Additional description and information about copywriting."/>
        </el-col>
        <el-col :sm="6" :xs="12">
          <el-alert
            show-icon
            type="warning"
            title="Warning"
            class="ele-alert-border"/>
          <el-alert
            show-icon
            type="warning"
            title="Warning"
            class="ele-alert-border"
            description="This is a warning notice about copywriting."/>
        </el-col>
        <el-col :sm="6" :xs="12">
          <el-alert
            show-icon
            type="error"
            title="Error"
            class="ele-alert-border"/>
          <el-alert
            show-icon
            type="error"
            title="Error"
            class="ele-alert-border"
            description="This is an error message about copywriting."/>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'MoreMessage',
  methods: {
    showSuccessMessage(border) {
      this.$message({
        type: 'success',
        message: '这是一条成功的提示',
        customClass: border ? 'ele-message-border' : ''
      });
    },
    showWarningMessage(border) {
      this.$message({
        type: 'warning',
        message: '这是一条警告的提示',
        customClass: border ? 'ele-message-border' : ''
      })
    },
    showErrorMessage(border) {
      if (border) {
        this.$message({
          type: 'error',
          message: '这是一条错误的提示',
          customClass: 'ele-message-border'
        });
      } else {
        this.$message.error('这是一条错误的提示');
      }
    },
    showInfoMessage(border) {
      if (border) {
        this.$message({
          type: 'info',
          message: '这是一条普通的提示',
          customClass: 'ele-message-border'
        });
      } else {
        this.$message('这是一条普通的提示');
      }
    },
    showLoadingMessage() {
      let loading = this.$messageLoading({
        message: '正在加载中..',
        background: 'rgba(0, 0, 0, .15)'
      });
      setTimeout(() => {
        loading.close();
      }, 3000);
    }
  }
}
</script>

<style scoped>
.ele-alert-border {
  margin-bottom: 20px;
}
</style>
