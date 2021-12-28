<!-- 用户编辑弹窗 -->
<template>
  <el-dialog
    width="600px"
    :visible="visible"
    :lock-scroll="false"
    :destroy-on-close="true"
    custom-class="ele-dialog-form"
    :title="isUpdate?'修改省公司数据设定':'添加省公司数据设定'"
    @update:visible="updateVisible">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="160px">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="ID:" prop="ID">
            <el-input
              style="width: 300px"
              clearable
              :maxlength="20"
              v-model="form.ID"
              placeholder="请输入ID"
              :disabled="isUpdate"/>
          </el-form-item>

          <el-form-item label="设置公司ID:" prop="GONGSIID">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.GONGSIID"
              placeholder="设置公司ID">
            </el-input>
          </el-form-item>


          <el-form-item label="公司规模ID:" prop="GONGSIGUIMOID">
            <el-input
              style="width: 300px"
              clearable
              :maxlength="20"
              v-model="form.GONGSIGUIMOID"
              placeholder="请输入公司规模ID"/>
          </el-form-item>


          <el-form-item label="（国网)标准ID:" prop="BIAOZHUNID">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.BIAOZHUNID"
              placeholder="请输入（国网)标准ID">
            </el-input>
          </el-form-item>

          <el-form-item label="面积数值:" prop="MIANJISHUZHI">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.MIANJISHUZHI"
              placeholder="请输入面积数值">
            </el-input>
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
        ID: '',
        GONGSIID: '',
        GONGSIGUIMOID: '',
        BIAOZHUNID: '',
        MIANJISHUZHI: ''
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
      // this.$http.get('http://localhost:8081/userlist.json').then(res => {
      //   if (res.data.code === 0) {
      //     this.roleList = res.data;
      //   } else {
      //     this.$message.error(res.data.msg);
      //   }
      // }).catch(e => {
      //   this.$message.error(e.message);
      // });
    }
  }
}
</script>

<style scoped>
</style>
