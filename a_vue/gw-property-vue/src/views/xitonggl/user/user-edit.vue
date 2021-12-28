<!-- 用户编辑弹窗 -->
<template>
  <el-dialog
    width="600px"
    :visible="visible"
    :lock-scroll="false"
    :destroy-on-close="true"
    custom-class="ele-dialog-form"
    :title="isUpdate?'修改用户':'添加用户'"
    @update:visible="updateVisible">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="82px">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="ID:" prop="YONGHUID">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.YONGHUID"
              placeholder="请输入用户ID"
              :disabled="isUpdate"/>
          </el-form-item>
          <el-form-item label="账号:" prop="ZHANGHAO">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.ZHANGHAO"
              placeholder="请输入账号"/>
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

          <!--          <el-form-item label="用户权限:" prop="YONGHUQUANXIAN">
                      <el-input
                        clearable
                        :maxlength="20"
                        v-model="form.YONGHUQUANXIAN"
                        placeholder="请输入用户权限"/>
                    </el-form-item>-->

          <el-form-item label="用户权限:" prop="YONGHUQUANXIAN">
            <el-select
              clearable
              class="ele-block"
              v-model="form.YONGHUQUANXIAN"
              placeholder="请选择用户权限">
              <el-option label="超级管理员" value="超级管理员"/>
              <el-option label=" 国网用户" value="国网用户"/>
              <el-option label="省级用户 " value="省级用户"/>
              <el-option label="市级用户" value="市级用户"/>
              <el-option label="县级用户" value="县级用户"/>
            </el-select>
          </el-form-item>

          <el-form-item label="访客:" prop="FANGKE">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.FANGKE"
              placeholder="请输入访客"/>
          </el-form-item>

          <el-form-item label="用户状态:" prop="ZHUANGTAI">
            <el-select
              clearable
              v-model="form.ZHUANGTAI"
              placeholder="请选择用户状态">
              <el-option label="使用" value="0"/>
              <el-option label=" 停用" value="1"/>
            </el-select>
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
import validate from 'ele-admin/packages/validate';

export default {
  name: 'UserEdit',
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
        YONGHUID: '',
        ZHANGHAO: '',
        MIMA: '',
        GONGSIID: '',
        YONGHUQUANXIAN: '',
        FANGKE: '',
        ZHUANGTAI: ''
      },
      // 表单验证规则
      rules: {
        username: [
          {
            required: true,
            type: 'string',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请输入用户账号'));
              }
              this.$http.get('/sys/user?username=' + value).then(res => {
                if (res.data.code !== 0 || !res.data.data.length) {
                  return callback();
                }
                if (this.isUpdate && res.data.data[0].username === this.data.username) {
                  return callback();
                }
                callback(new Error('账号已经存在'));
              }).catch(() => {
                callback();
              });
            }
          }
        ],
        nickname: [
          {required: true, message: '请输入用户名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选择性别', trigger: 'blur'}
        ],
        roleIds: [
          {required: true, message: '请选择角色', trigger: 'blur'}
        ],
        email: [
          {pattern: validate.email, message: '邮箱格式不正确', trigger: 'blur'}
        ],
        password: [
          {required: true, pattern: /^[\S]{5,18}$/, message: '密码必须为5-18位非空白字符', trigger: 'blur'}
        ],
        phone: [
          {pattern: validate.phone, message: '手机号格式不正确', trigger: 'blur'}
        ]
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
    data() {
      if (this.data) {
        /* this.form = Object.assign({}, this.data, {
           roleIds: this.data.roles.map(d => d.roleId)
         });*/

        this.form = this.data

        this.isUpdate = true;
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
      /*   this.$refs['form'].validate((valid) => {
           if (valid) {
             this.loading = true;
             this.$http[this.isUpdate ? 'put' : 'post']('/sys/user', this.form).then(res => {
               this.loading = false;
               if (res.data.code === 0) {
                 this.$message({type: 'success', message: res.data.msg});
                 if (!this.isUpdate) {
                   this.form = {};
                 }
                 this.updateVisible(false);
                 this.$emit('done');
               } else {
                 this.$message.error(res.data.msg);
               }
             }).catch(e => {
               this.loading = false;
               this.$message.error(e.message);
             });
           } else {
             return false;
           }
         });*/

      console.log(this.form);

    },
    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value);
    },
    /* 查询角色列表 */
    queryRoles() {
      this.$http.get('http://localhost:8081/userlist.json').then(res => {
        if (res.data.code === 0) {
          this.roleList = res.data;
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
