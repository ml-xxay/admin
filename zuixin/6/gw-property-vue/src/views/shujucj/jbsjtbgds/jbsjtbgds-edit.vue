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
    :title="isUpdate?'修改乡镇供电所基本数据':'添加乡镇供电所基本数据'"
    @update:visible="updateVisible">
    <el-form
      :rules="addfromrules"
      ref="form"
      :model="form"
      label-width="150px">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="ID:" prop="ID">
            <el-input
              style="width: 280px"
              clearable
              v-model="form.ID"
              placeholder="ID(数据库自动产生)"
              :disabled="true"/>
          </el-form-item>


          <el-form-item label="所属供电所:" prop="GONGSIID">
            <el-select
              clearable
              filterable
              style="width: 280px"
              class="ele-block"
              v-model="form.GONGSIID"
              placeholder="请选择所属供电所">
              <el-option v-for="item in GONGSILIST_jb" :key="item.ID" :label="item.GONGSIMC" :value="item.ID"/>
            </el-select>
          </el-form-item>


          <el-form-item label="综合管理人数:" prop="ZONGHEGLRS" v-show="false">
            <el-input
              style="width: 280px"
              clearable
              v-model="form.ZONGHEGLRS"
              placeholder="请输入综合管理人数"/>
          </el-form-item>

          <el-form-item label="总人数:" prop="ZONGRS">
            <el-input
              style="width: 280px"
              clearable
              v-model="form.ZONGRS"
              placeholder="请输入总人数"/>
          </el-form-item>

          <el-form-item label="总面积:" prop="SHITANGMJ">
            <el-input
              style="width: 280px"
              clearable
              v-model="form.SHITANGMJ"
              placeholder="请输入总面积"/>
          </el-form-item>

          <el-form-item label="现有楼栋数:" prop="XIAOYOULOUDONGSHU" v-show="false">
            <el-input
              style="width: 280px"
              clearable
              v-model="form.XIAOYOULOUDONGSHU"
              placeholder="请输入现有楼栋数"/>
          </el-form-item>

          <el-form-item label="备注:" prop="BEIZHU">
            <el-input
              style="width: 280px"
              clearable
              v-model="form.BEIZHU"
              placeholder="请输入备注"/>
          </el-form-item>

          <el-form-item>
          </el-form-item>
          <el-form-item>
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
    //公司列表
    GONGSILIST_jb: Array
  },
  data() {
    return {
      // 表单数据
      form: {
        ID: '',
        GONGSIID: '',
        ZONGHEGLRS: '',
        ZONGRS: '',
        SHITANGMJ: '',
        XIAOYOULOUDONGSHU: '',
        BEIZHU: ''
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: [],
      //验证规则
      addfromrules: {
        GONGSIID: [
          {required: true, message: '请选择所属供电所', trigger: 'blur'},
        ],
        ZONGRS: [
          {required: true, message: '请输入总人数', trigger: 'blur'},
        ],
        SHITANGMJ: [
          {required: true, message: '请输入总面积', trigger: 'blur'},
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
      this.reload()
    },
    /* 保存编辑 */
    save() {
      var self = this

      if (this.isUpdate) {
        //修改操作

        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()
        //数据库表名
        formData.append('table', 'TMDB_PMS_GONGSISJ')
        formData.append('ID', this.form.ID!=null?this.form.ID:"")
        formData.append('GONGSIID', this.form.GONGSIID!=null?this.form.GONGSIID:"")
        formData.append('ZONGHEGLRS', "")
        formData.append('SHITANGMJ', this.form.SHITANGMJ!=null?this.form.SHITANGMJ:"")
        formData.append('ZONGRS', this.form.ZONGRS!=null?this.form.ZONGRS:"")
        formData.append('XIAOYOULOUDONGSHU', "")
        formData.append('BEIZHU', this.form.BEIZHU!=null?this.form.BEIZHU:"")
        formData.append('GONGSILX', 5)       //乡镇供电所

        this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('修改数据成功');
            self.updateVisible(false);
            self.reload()
          } else {
            self.$message('修改数据失败');
            self.updateVisible(false);
            self.reload()
          }
        })
          .catch(function (error) {
            console.log(error);
          });


      } else {
        //添加操作
        this.$refs.form.validate(async valid => {
          if (!valid) return
          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_GONGSISJ')
          formData.append('GONGSIID', this.form.GONGSIID!=null?this.form.GONGSIID:"")
          formData.append('ZONGHEGLRS', "")
          formData.append('SHITANGMJ', this.form.SHITANGMJ!=null?this.form.SHITANGMJ:"")
          formData.append('ZONGRS', this.form.ZONGRS!=null?this.form.ZONGRS:"")
          formData.append('XIAOYOULOUDONGSHU', "")
          formData.append('BEIZHU', this.form.BEIZHU!=null?this.form.BEIZHU:"")
          formData.append('GONGSILX', 5)       //乡镇供电所

          this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加数据失败');
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
    },
  }
}
</script>

<style scoped>
</style>
