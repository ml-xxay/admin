<!-- 用户编辑弹窗 -->
<template>
  <el-dialog
    width="680px"
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
        <el-col :sm="20">
          <!-- 公司ID-->
          <el-form-item label="ID:" prop="ID">
            <el-input
              clearable
              :maxlength="20"
              :disabled="isUpdate"
              v-model="form.ID"
              placeholder="ID(数据库自动产生)"/>
          </el-form-item>
<!--        公司名称  -->
          <el-form-item label="公司名称:" prop="GONGSIMC">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.GONGSIMC"
              placeholder="请输入公司名称"/>
          </el-form-item>
<!--          公司简称-->
          <el-form-item label="公司简称:" prop="GONGSIJC">
            <el-input
              clearable
              :maxlength="100"
              v-model="form.GONGSIJC"
              placeholder="请输入公司简称"/>
          </el-form-item>
<!--  用房类型-->

          <el-form-item label="用房类型:" prop="GONGSILX">
            <el-select
              clearable
              class="ele-block"
              v-model="form.GONGSILX"
              placeholder="请选择用房类型">
              <el-option label="一类用房" value="2"/>
              <el-option label="二类用房" value="3"/>
              <el-option label="三类用房" value="4"/>
            </el-select>
          </el-form-item>
<!--          父级公司名称-->
          <el-form-item  label="父级公司:" prop="FJGSMC">
            <el-input
              clearable
              :maxlength="100"
              v-model="form.FJGSMC"
              placeholder="请选择父级公司"/>
          </el-form-item>
<!--          公司规模-->
          <el-form-item label="公司规模:" prop="YFLX">
            <el-input
              clearable
              :maxlength="100"
              v-model="form.YFLX"
              placeholder="请选择公司规模"/>
          </el-form-item>
<!--          是否检修分公司-->
          <el-form-item label-width="80px" label="是否检修分公司:" prop="SHIFOUSJXFGSYWFB">
            <el-select
              clearable
              class="ele-block"
              v-model="form.SHIFOUSJXFGSYWFB"
              placeholder="请选择用房类型">
              <el-option label="是" value="是"/>
              <el-option label="否" value="否"/>

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
    data: Object //data接收父组件传来的row的所有数据
  },
  data() {
    return {
      // 表单数据
      form: {
        ID:'',
        GONGSIMC:'',//公司名称
        GONGSIJC:'',//公司简称
        GONGSILX:'',//用房类型
        FJGSMC:'',//父级公司名称
        FUJIID:'',//父级ID
        YFLX:'',//公司规模
        SHIFOUSJXFGSYWFB:'',//是否检修分公司
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
    //监听子组件props接收的data   判断接收的data有没有值
    data() {
      if (this.data) {
        //如果有值  把data赋值给form
        this.form = this.data
        this.isUpdate = true;  //isUpdate 为true的时候显示修改
      } else {
        //如果没值  让form清空  并显示添加
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
      this.$refs['form'].validate((valid) => {
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
      });
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
