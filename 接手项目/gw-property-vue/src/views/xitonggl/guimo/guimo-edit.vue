<!-- 用户编辑弹窗 -->
<template>
  <el-dialog
    :close-on-click-modal=false
    width="600px"
    :visible="visible"
    :lock-scroll="false"
    :destroy-on-close="true"
    custom-class="ele-dialog-form"
    :title="isUpdate?'修改公司规模数据':'添加公司规模数据'"
    @update:visible="updateVisible">
    <el-form
      :rules="addfromrules"
      ref="form"
      :model="form"
      label-width="100px">
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

          <el-form-item label="公司ID:" prop="SHEZHIGSID">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.SHEZHIGSID"
              placeholder="公司ID(系统自动读取登录用户身份信息)"
              :disabled="true"/>
          </el-form-item>

          <el-form-item label="公司类型:" prop="GONGSILX">
            <el-select
              clearable
              class="ele-block"
              v-model="form.GONGSILX"
              placeholder="请选择公司类型">
              <el-option label="一类公司" value="一类公司"/>
              <el-option label=" 二类公司" value="二类公司"/>
              <el-option label="三类公司 " value="三类公司"/>
              <el-option label="乡镇供电所 " value="乡镇供电所"/>
            </el-select>
          </el-form-item>

          <el-form-item label="规模分类:" prop="GUIMOFL">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.GUIMOFL"
              placeholder="请输入规模分类"/>
          </el-form-item>


          <el-form-item label="年售电量:" prop="NIANSHOUDIANLIANG">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.NIANSHOUDIANLIANG"
              placeholder="请输入年售电量"/>
          </el-form-item>

          <el-form-item label="辖区户数:" prop="XIAQUHUSHU">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.XIAQUHUSHU"
              placeholder="请输入辖区户数"/>
          </el-form-item>

          <el-form-item label="序号:" prop="XUHAO">
            <el-select
              clearable
              class="ele-block"
              v-model="form.XUHAO"
              placeholder="请输入选择序号">
              <el-option label="序号1" value="序号1"/>
              <el-option label="序号2" value="序号2"/>
              <el-option label="序号3 " value="序号3"/>
              <el-option label="序号4" value="序号4"/>
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
  name: 'UserEdit',
  inject: ['reload'],
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
        XUHAO: '',
        SHEZHIGSID: '',
        GONGSILX: '',
        GUIMOFL: '',
        NIANSHOUDIANLIANG: '',
        XIAQUHUSHU: ''
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: [],
      addfromrules: {
        XUHAO:[
          {required: true, message: '请选择序号', trigger: 'blur'},
        ],

        GONGSILX:[
          {required: true, message: '请选择公司类型', trigger: 'blur'},
        ],
        GUIMOFL:[
          {required: true, message: '请输入规模分类', trigger: 'blur'},
        ],
        NIANSHOUDIANLIANG:[
          {required: true, message: '请输入年售电量', trigger: 'blur'},
        ],
        XIAQUHUSHU:[
          {required: true, message: '请输入辖区户数', trigger: 'blur'},
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

    /* 保存编辑 */
    save: function () {

      console.log(this.form);

      var self = this

      if (this.isUpdate) {
        //修改操作
        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()
        //数据库表名
        formData.append('table', 'TMDB_PMS_GONGSIGUIMO')
        formData.append('ID', this.form.ID)
        formData.append('XUHAO', this.form.XUHAO)

        //设置公司ID
        sessionStorage.setItem("SHEZHIGSID", 1)
        formData.append('SHEZHIGSID', sessionStorage.getItem("SHEZHIGSID"))

        formData.append('GONGSILX', this.form.GONGSILX)
        formData.append('GUIMOFL', this.form.GUIMOFL)
        formData.append('NIANSHOUDIANLIANG', this.form.NIANSHOUDIANLIANG)
        formData.append('XIAQUHUSHU', this.form.XIAQUHUSHU)

        this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('修改公司规模数据成功');
            self.updateVisible(false);
          } else {
            self.$message('修改公司规模数据失败');
            self.updateVisible(false);
          }
        })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        //添加操作
        // eslint-disable-next-line no-unused-vars
        this.$refs.form.validate(async valid => {
          console.log(valid)
          if (!valid) return
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_GONGSIGUIMO')
          formData.append('XUHAO', this.form.XUHAO)

          //设置公司ID
          sessionStorage.setItem("SHEZHIGSID", 1)
          formData.append('SHEZHIGSID', sessionStorage.getItem("SHEZHIGSID"))

          formData.append('GONGSILX', this.form.GONGSILX)
          formData.append('GUIMOFL', this.form.GUIMOFL)
          formData.append('NIANSHOUDIANLIANG', this.form.NIANSHOUDIANLIANG)
          formData.append('XIAQUHUSHU', this.form.XIAQUHUSHU)

          this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加公司规模数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加公司规模数据失败');
              self.updateVisible(false);
              self.reload()
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        })
      }


    },
    /* 更新visible */
    updateVisible(value) {
      this.form={}
      this.$emit('update:visible', value);
    }
  }
}
</script>

<style scoped>
</style>
