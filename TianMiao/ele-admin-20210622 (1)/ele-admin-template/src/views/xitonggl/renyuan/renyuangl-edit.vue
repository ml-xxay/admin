<!-- 用户编辑弹窗 -->
<template>
  <el-dialog
    width="600px"
    :visible="visible"
    :lock-scroll="false"
    :destroy-on-close="true"
    custom-class="ele-dialog-form"
    :title="isUpdate?'修改公司信息':'添加公司信息'"
    @update:visible="updateVisible">
    <el-form
      ref="form"
      :model="form"
      label-width="120px">
      <el-row :gutter="15">
        <el-col :sm="12">

          <el-form-item label="账号:" prop="ZHANGHAO">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.ZHANGHAO"
              placeholder="请输入账号"
              :disabled="isUpdate"/>
<!--  :disabled="isUpdate"  禁用  -->
          </el-form-item>
          <el-form-item label="密码:" prop="MIMA">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.MIMA"
              placeholder="请输入密码"/>
          </el-form-item>

          <el-form-item label="公司ID:" prop="GONGSIID">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.GONGSIID"
              placeholder="请输入公司ID"/>
          </el-form-item>

          <el-form-item label="用户权限:" prop="YONGHUQUANXIAN">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.YONGHUQUANXIAN"
              placeholder="请输入用户权限"/>
          </el-form-item>

          <el-form-item label="访客:" prop="FANGKE">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.FANGKE"
              placeholder="请输入访客"/>
          </el-form-item>

          <el-form-item label="状态:" prop="ZHUANGTAI">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.ZHUANGTAI"
              placeholder="请输入状态"/>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer">
      <el-button
        @click="updateVisible(false)">取消
      </el-button>
      <el-button
        type="primary"
        :loading="loading"
        @click="save">保存
      </el-button>
    </div>
  </el-dialog>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import {post} from '@/utils/request'

export default {
  name: 'RenyuanglEdit',
  inject:['reload'],

  props: {
    // 弹窗是否打开
    visible: Boolean,
    // 修改回显的数据
    data: Object
  },
  data() {
    return {
      // 表单数据
      form: {
        ID: '',
        ZHANGHAO: '',
        MIMA: '',
        GONGSIID: '',
        YONGHUQUANXIAN: '',
        FANGKE: '',
        ZHUANGTAI: ''
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: []
    };
  },
  watch: {
    //监听porps里面接收的值  判断值有没有
    data() {
      if (this.data) {
        this.isUpdate = true;
        this.form = this.data;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    }
  },
  mounted() {
    this.queryRoles();  // 查询角色列表
  },
  methods: {
    /* 保存编辑 */
    save() {
      // eslint-disable-next-line no-unused-vars
      var self = this
      if (this.isUpdate) {
        console.log("修改");
        // eslint-disable-next-line no-unused-vars
        var formData = new FormData();//通过append方法添加数据

        formData.append("table", "TMDB_PMS_YONGHU")
        formData.append("ID", this.form.ID)
        formData.append("ZHANGHAO", this.form.ZHANGHAO)
        formData.append("MIMA", this.form.MIMA)
        formData.append("GONGSIID", this.form.GONGSIID)
        formData.append("YONGHUQUANXIAN", this.form.YONGHUQUANXIAN)
        formData.append("FANGKE", this.form.FANGKE)
        formData.append("ZHUANGTAI", this.form.ZHUANGTAI)


        // eslint-disable-next-line no-unused-vars
        post("/TM_updateone_controller", formData).then(res => {
          // eslint-disable-next-line no-empty
          if (res.data.code === 200){
            self.$message.success('修改数据成功')
            self.updateVisible(false);
            self.reload()
          }else {
            self.$message.error('修改数据失败')

            self.updateVisible(false);
          }

        }).catch(function (error) {
            console.log(error);
          });

      } else {
        console.log("添加");
        // eslint-disable-next-line no-redeclare
        let formData = new FormData();//通过append方法添加数据
        formData.append("table", "TMDB_PMS_YONGHU")
        formData.append("ID", this.form.ID)
        formData.append("ZHANGHAO", this.form.ZHANGHAO)
        formData.append("MIMA", this.form.MIMA)
        formData.append("GONGSIID", this.form.GONGSIID)
        formData.append("YONGHUQUANXIAN", this.form.YONGHUQUANXIAN)
        formData.append("FANGKE", this.form.FANGKE)
        formData.append("ZHUANGTAI", this.form.ZHUANGTAI)


        // eslint-disable-next-line no-unused-vars
        post("/TM_insertone_controller",formData).then(res => {
          if (res.data.code === 200){
            self.$message.success('添加成功')
            self.updateVisible(false);
            self.reload()
          }else {
            self.$message.error('添加失败')
            self.updateVisible(false);
            self.reload()
          }
        })

      }
    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value);
    },
    /* 查询角色列表 */
    queryRoles() {
      this.$http.get('/sys/role').then(res => {
        if (res.data.code === 0) {
          this.roleList = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        this.$message.error(e.message);
      });
    }
  }
}
</script>

<style scoped>
</style>
