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
    :title="isUpdate?'修改功能用房数据':'添加功能用房数据'"
    @update:visible="updateVisible">
    <el-form
      :rules="addfromrules"
      ref="form"
      :model="form"
      label-width="130px">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="ID:" prop="ID">
            <el-input
              style="width: 280px"
              clearable
              :maxlength="20"
              v-model="form.ID"
              placeholder="ID(数据库自动产生)"
              :disabled="true"/>
          </el-form-item>
          <el-form-item label="选择公司:" prop="GONGSIID">
            <el-select
              clearable
              style="width: 300px"
              class="ele-block"
              v-model="form.GONGSIID"
              placeholder="请选择公司">
              <el-option v-for="item in GONGSILIST_jb" :key="item.ID" :label="item.GONGSIMC" :value="item.ID"/>
            </el-select>
          </el-form-item>
          <el-form-item label="房产ID:" prop="FANGCHANID">
            <el-input
              style="width: 280px"
              clearable
              :maxlength="20"
              v-model="form.FANGCHANID"
              placeholder="房产ID"/>
          </el-form-item>

          <el-form-item label="（国网）标准ID:" prop="BIAOZHUNID">
            <el-input
              style="width: 280px"
              clearable
              :maxlength="20"
              v-model="form.BIAOZHUNID"
              placeholder="（国网）标准ID"/>
          </el-form-item>

          <el-form-item label="面积数值:" prop="MIANJISHUZHI">
            <el-input
              style="width: 280px"
              clearable
              :maxlength="20"
              v-model="form.MIANJISHUZHI"
              placeholder="请输入面积数值"/>
          </el-form-item>

          <el-form-item label="人数:" prop="RENSHU">
            <el-input
              style="width: 280px"
              clearable
              :maxlength="20"
              v-model="form.RENSHU"
              placeholder="请输入人数"/>
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
    data: Object,
    GONGSILIST_jb: Array
  },
  data() {
    return {
      // 表单数据
      form: {
        ID: '',
        GONGSIID: '',
        FANGCHANID: '',
        BIAOZHUNID: '',
        MIANJISHUZHI: '',
        RENSHU: ''
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: [],
      addfromrules: {
        GONGSIID: [
          {required: true, message: '请输入公司ID', trigger: 'blur'},
        ],
        FANGCHANID: [
          {required: true, message: '请输入房产ID', trigger: 'blur'},
        ],
        BIAOZHUNID: [
          {required: true, message: '请输入(国网)标准ID', trigger: 'blur'},
        ],
        MIANJISHUZHI: [
          {required: true, message: '请输入面积数值', trigger: 'blur'},
        ],
        RENSHU: [
          {required: true, message: '请输入人数', trigger: 'blur'},
        ],
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
      self.reload()
    },
    /* 保存编辑 */
    save() {

      console.log(this.form);
      var self = this

      if (this.isUpdate) {
        //修改操作
        console.log("修改");

        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()
        //数据库表名
        formData.append('table', 'TMDB_PMS_YONGFANGSJCJ')
        formData.append('ID', this.form.ID!=null?this.form.ID:"")
        formData.append('GONGSIID', this.form.GONGSIID!=null?this.form.GONGSIID:"")
        formData.append('FANGCHANID', this.form.FANGCHANID!=null?this.form.FANGCHANID:"")
        formData.append('BIAOZHUNID', this.form.BIAOZHUNID!=null?this.form.BIAOZHUNID:"")
        formData.append('MIANJISHUZHI', this.form.MIANJISHUZHI!=null?this.form.MIANJISHUZHI:"")
        formData.append('RENSHU', this.form.RENSHU!=null?this.form.RENSHU:"")


        this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('修改功能用房数据成功');
            self.updateVisible(false);
            self.reload()
          } else {
            self.$message('修改功能用房数据失败');
            self.updateVisible(false);
            self.reload()
          }
        })
          .catch(function (error) {
            console.log(error);
          });


      } else {

        console.log("添加");
        this.$refs.form.validate(async valid => {
          console.log(valid)
          if (!valid) return
          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_YONGFANGSJCJ')
        formData.append('GONGSIID', this.form.GONGSIID!=null?this.form.GONGSIID:"")
        formData.append('FANGCHANID', this.form.FANGCHANID!=null?this.form.FANGCHANID:"")
        formData.append('BIAOZHUNID', this.form.BIAOZHUNID!=null?this.form.BIAOZHUNID:"")
        formData.append('MIANJISHUZHI', this.form.MIANJISHUZHI!=null?this.form.MIANJISHUZHI:"")
        formData.append('RENSHU', this.form.RENSHU!=null?this.form.RENSHU:"")

          this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加功能用房数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加功能用房数据失败');
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
      this.$emit('update:visible', value);
    }
  }
}
</script>

<style scoped>
</style>
