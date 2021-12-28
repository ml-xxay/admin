<!-- 用户编辑弹窗 -->
<template>
  <el-dialog
    @close="guanbichongzhi"
    :close-on-click-modal=false
    width="600px"
    :visible="visible"
    :lock-scroll="false"
    :destroy-on-close="true"
    custom-class="ele-dialog-form"
    :title="isUpdate?'修改用户信息':'添加用户信息'"
    @update:visible="updateVisible">
    <el-form

      :rules="addfromrules"
      ref="form"
      :model="form"
      label-width="82px">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="ID:" prop="ID">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.ID"
              placeholder="ID(数据库自动产生)"
              :disabled="true"/>
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

          <el-form-item label="用户权限:" prop="YONGHUQUANXIAN">
            <el-select
              clearable
              class="ele-block"
              v-model="form.YONGHUQUANXIAN"
              placeholder="请选择用户权限">
              <el-option label="超级管理员" value="1"/>
              <el-option label=" 国网用户" value="2"/>
              <el-option label="省级用户 " value="3"/>
              <el-option label="市级用户" value="4"/>
              <el-option label="县级用户" value="5"/>
            </el-select>
          </el-form-item>

          <el-form-item label="访客:" prop="FANGKE">
            <el-select
              clearable
              v-model="form.FANGKE"
              placeholder="请选择访客">
              <el-option label="是" value="是"/>
              <el-option label="否" value="否"/>
            </el-select>
          </el-form-item>


          <el-form-item label="用户状态:" prop="ZHUANGTAI">
            <el-select
              clearable
              v-model="form.ZHUANGTAI"
              placeholder="请选择用户状态">
              <el-option label="可用" value="可用"/>
              <el-option label=" 停用" value="不可用"/>
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


export default {
  inject: ['reload'],
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
      roleList: [],
      addfromrules: {
        ZHANGHAO: [
          {
            required: true,
            type: 'string',
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (!value) {
                return callback(new Error('请输入用户账号'));
              }

              // eslint-disable-next-line no-unused-vars
              let formData = new FormData()
              //数据库表名
              formData.append('table', 'TMDB_PMS_YONGHU')
              formData.append('equalmap', JSON.stringify({
                "ZHANGHAO": this.form.ZHANGHAO
              }))

              this.$requestsu.post('/TM_getallinfo_controller', formData).then(res => {
                console.log(res.data.data)
                if (res.data.data.length > 0) {
                  callback(new Error('账号已经存在'));
                }

              }).catch(() => {
                callback();
              });
            }
          }
        ],
        MIMA: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        GONGSIID: [
          {required: true, message: '请输入公司ID', trigger: 'blur'},
        ],
        YONGHUQUANXIAN: [
          {required: true, message: '请选择用户权限', trigger: 'blur'},
        ],
        FANGKE: [
          {required: true, message: '请选择访客', trigger: 'blur'},
        ],
        ZHUANGTAI: [
          {required: true, message: '请选择用户状态', trigger: 'blur'},
        ]
      }
    };
  },
  watch: {
    data() {
      if (this.data) {
        this.form = this.data
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    }
  },
  methods: {
    //刷新表格
    guanbichongzhi: function () {
      this.$refs.form.resetFields()
    },

    /* 更新visible */
    updateVisible(value) {
      this.$emit('update:visible', value);
    },
    /* 保存编辑 */
    /*save() {
      this.$refs['form'].validate((valid) => {
        if (valid) {

          if (this.isUpdate) {
            //修改操作
            console.log("修改");

            // eslint-disable-next-line no-unused-vars
            let formData = new FormData()
            //数据库表名
            formData.append('table', 'TMDB_PMS_YONGHU')
            formData.append('ID', this.form.ID)
            formData.append('ZHANGHAO', this.form.ZHANGHAO)
            formData.append('MIMA', this.form.MIMA)
            formData.append('GONGSIID', this.form.GONGSIID)
            formData.append('YONGHUQUANXIAN', this.form.YONGHUQUANXIAN)
            formData.append('FANGKE', this.form.FANGKE)
            formData.append('ZHUANGTAI', this.form.ZHUANGTAI)

            this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
              console.log(response);
              if (response.data.code === 200) {
                self.$message('修改用户信息数据成功');
                self.updateVisible(false);
              } else {
                self.$message('修改用户信息数据失败');
                self.updateVisible(false);
              }
            })
              .catch(function (error) {
                console.log(error);
              });


          } else {
            //添加操作
            console.log("添加");
            console.log(this.form);

            // eslint-disable-next-line no-unused-vars
            let formData = new FormData()
            //数据库表名
            formData.append('table', 'TMDB_PMS_YONGHU')
            formData.append('ID', this.form.ID)
            formData.append('ZHANGHAO', this.form.ZHANGHAO)
            formData.append('MIMA', this.form.MIMA)
            formData.append('GONGSIID', this.form.GONGSIID)
            formData.append('YONGHUQUANXIAN', this.form.YONGHUQUANXIAN)
            formData.append('FANGKE', this.form.FANGKE)
            formData.append('ZHUANGTAI', this.form.ZHUANGTAI)

            this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
              console.log(response);
              if (response.data.code === 200) {
                self.$message('添加用户信息数据成功');
                self.updateVisible(false);
                self.reload()
              } else {
                self.$message('添加用户信息数据失败');
                self.updateVisible(false);
                self.reload()
              }
            })
              .catch(function (error) {
                console.log(error);
              });
          }

        } else {
          return false;
        }
      });
    },*/

    //保存操作
    save() {
      if (this.form.ZHANGHAO === null || this.form.ZHANGHAO === '') {
        this.$message.error('账号不能为空');
      } else if (this.form.MIMA === null || this.form.MIMA === '') {
        this.$message.error('密码不能为空');
      } else if (this.form.GONGSIID === null || this.form.GONGSIID === '') {
        this.$message.error('公司ID不能为空');
      } else if (this.form.YONGHUQUANXIAN === null || this.form.YONGHUQUANXIAN === '') {
        this.$message.error('用户权限不能为空');
      } else if (this.form.FANGKE === null || this.form.FANGKE === '') {
        this.$message.error('访客不能为空');
      } else if (this.form.ZHUANGTAI === null || this.form.ZHUANGTAI === '') {
        this.$message.error('状态不能为空');
      } else {
        var self = this

        if (this.isUpdate) {
          //修改操作
          console.log("修改");

          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_YONGHU')
          formData.append('ID', this.form.ID)
          formData.append('ZHANGHAO', this.form.ZHANGHAO)
          formData.append('MIMA', this.form.MIMA)
          formData.append('GONGSIID', this.form.GONGSIID)
          formData.append('YONGHUQUANXIAN', this.form.YONGHUQUANXIAN)
          formData.append('FANGKE', this.form.FANGKE)
          formData.append('ZHUANGTAI', this.form.ZHUANGTAI)

          this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('修改用户信息数据成功');
              self.updateVisible(false);
            } else {
              self.$message('修改用户信息数据失败');
              self.updateVisible(false);
            }
          })
            .catch(function (error) {
              console.log(error);
            });


        } else {
          //添加操作
          console.log("添加");
          console.log(this.form);
          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_YONGHU')
          formData.append('ID', this.form.ID)
          formData.append('ZHANGHAO', this.form.ZHANGHAO)
          formData.append('MIMA', this.form.MIMA)
          formData.append('GONGSIID', this.form.GONGSIID)
          formData.append('YONGHUQUANXIAN', this.form.YONGHUQUANXIAN)
          formData.append('FANGKE', this.form.FANGKE)
          formData.append('ZHUANGTAI', this.form.ZHUANGTAI)

          this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加用户信息数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加用户信息数据失败');
              self.updateVisible(false);
              self.reload()
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        }

      }
    }
  }

}
</script>

<style scoped>
</style>
