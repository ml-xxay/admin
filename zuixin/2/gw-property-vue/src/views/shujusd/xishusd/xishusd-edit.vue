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
    :title="isUpdate?'修改系数设定':'添加系数设定'"
    @update:visible="updateVisible">
    <el-form
      :rules="addfromrules"
      ref="form"
      :model="form"
      label-width="190px">
      <el-row :gutter="15">
        <el-col :sm="12">
          <el-form-item label="ID:" prop="ID">
            <el-input
              style="width: 300px"
              clearable
              :maxlength="20"
              v-model="form.ID"
              placeholder="ID(数据库自动产生)"
              :disabled="true"/>
          </el-form-item>


          <el-form-item label="公司规模ID:" prop="GONGSIGUIMOID">
            <el-input
              style="width: 300px"
              clearable
              :maxlength="20"
              v-model="form.GONGSIGUIMOID"
              placeholder="请输入公司规模ID"/>
          </el-form-item>


          <el-form-item label="调度生产管理用房面积:" prop="DIAODUSCGLYFMJ">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.DIAODUSCGLYFMJ"
              placeholder="请输入调度生产管理用房面积">
            </el-input>
          </el-form-item>

          <el-form-item label="运维检修用房面积:" prop="YUNWEIJXYFMJ">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.YUNWEIJXYFMJ"
              placeholder="请输入运维检修用房面积">
            </el-input>
          </el-form-item>

          <el-form-item label="营销用房面积:" prop="YINGXIAOYFMJ">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.YINGXIAOYFMJ"
              placeholder="请输入营销用房面积">
            </el-input>
          </el-form-item>
          <el-form-item label="档案库房面积:" prop="DANGANKFMJ">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.DANGANKFMJ"
              placeholder="请输入档案库房面积">
            </el-input>
          </el-form-item>
          <el-form-item label="综合管理面积系数:" prop="ZONGHEGUANLIMJXS">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.ZONGHEGUANLIMJXS"
              placeholder="请输入综合管理面积系数">
            </el-input>
          </el-form-item>
          <el-form-item label="食堂面积系数:" prop="SHITANGMJXS">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.SHITANGMJXS"
              placeholder="请输入食堂面积系数">
            </el-input>
          </el-form-item>
          <el-form-item label="拟建房数:" prop="NIJIANFANGSHU">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.NIJIANFANGSHU"
              placeholder="请输入拟建房数">
            </el-input>
          </el-form-item>
          <el-form-item label="设备设施用房面积:" prop="SHEBEISHEZHIYFMJ">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.SHEBEISHEZHIYFMJ"
              placeholder="请输入设备设施用房面积">
            </el-input>
          </el-form-item>
          <el-form-item label="预留面积系数:" prop="YULIUMJXS">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.YULIUMJXS"
              placeholder="请输入预留面积系数">
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


import {post} from "@/utils/request";

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
        GONGSIGUIMOID: '',
        DIAODUSCGLYFMJ: '',
        YUNWEIJXYFMJ: '',
        YINGXIAOYFMJ: '',
        DANGANKFMJ: '',
        ZONGHEGUANLIMJXS: '',
        SHITANGMJXS: '',
        NIJIANFANGSHU: '',
        YULIUMJXS: '',
        SHEBEISHEZHIYFMJ: ''
      },

      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: [],
      addfromrules: {
        GONGSIGUIMOID: [
          {required: true, message: '请输入公司规模ID', trigger: 'blur'},
        ],
        DIAODUSCGLYFMJ: [
          {required: true, message: '请输入调度生产管理用房面积', trigger: 'blur'},
        ],
        YUNWEIJXYFMJ: [
          {required: true, message: '请输入运维检修用房面积', trigger: 'blur'},
        ],
        YINGXIAOYFMJ: [
          {required: true, message: '请输入营销用房面积', trigger: 'blur'},
        ],
        DANGANKFMJ: [
          {required: true, message: '请输入档案库房面积', trigger: 'blur'},
        ],
        ZONGHEGUANLIMJXS: [
          {required: true, message: '请输入综合面积系数', trigger: 'blur'},
        ],
        SHITANGMJXS: [
          {required: true, message: '请输入食堂面积系数', trigger: 'blur'},
        ],
        NIJIANFANGSHU: [
          {required: true, message: '请输入拟建房数', trigger: 'blur'},
        ],
        YULIUMJXS: [
          {required: true, message: '请输入设备设施用房面积', trigger: 'blur'},
        ],
        SHEBEISHEZHIYFMJ: [
          {required: true, message: '请输入预留面积系数', trigger: 'blur'},
        ],
      }
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
        formData.append('table', 'TMDB_PMS_GESHENGONGSISJSD')
        formData.append('ID', this.form.ID)
        formData.append('GONGSIGUIMOID', this.form.GONGSIGUIMOID)
        formData.append('DIAODUSCGLYFMJ', this.form.DIAODUSCGLYFMJ)
        formData.append('YUNWEIJXYFMJ', this.form.YUNWEIJXYFMJ)
        formData.append('YINGXIAOYFMJ', this.form.YINGXIAOYFMJ)
        formData.append('DANGANKFMJ', this.form.DANGANKFMJ)
        formData.append('ZONGHEGUANLIMJXS', this.form.ZONGHEGUANLIMJXS)
        formData.append('SHITANGMJXS', this.form.SHITANGMJXS)
        formData.append('NIJIANFANGSHU', this.form.NIJIANFANGSHU)
        formData.append('YULIUMJXS', this.form.YULIUMJXS)
        formData.append('SHEBEISHEZHIYFMJ', this.form.SHEBEISHEZHIYFMJ)


        post("/TM_updateone_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('修改系数数据成功');
            self.updateVisible(false);
            self.reload()
          } else {
            self.$message('修改系数数据失败');
            self.updateVisible(false);
            self.reload()
          }
        })
          .catch(function (error) {
            console.log(error);
          });


      } else {
        //添加操作
        console.log("添加");
        this.$refs.form.validate(async valid => {
          console.log(valid)
          if (!valid) return
          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_GESHENGONGSISJSD')
          formData.append('GONGSIGUIMOID', this.form.GONGSIGUIMOID)
          formData.append('DIAODUSCGLYFMJ', this.form.DIAODUSCGLYFMJ)
          formData.append('YUNWEIJXYFMJ', this.form.YUNWEIJXYFMJ)
          formData.append('YINGXIAOYFMJ', this.form.YINGXIAOYFMJ)
          formData.append('DANGANKFMJ', this.form.DANGANKFMJ)
          formData.append('ZONGHEGUANLIMJXS', this.form.ZONGHEGUANLIMJXS)
          formData.append('SHITANGMJXS', this.form.SHITANGMJXS)
          formData.append('NIJIANFANGSHU', this.form.NIJIANFANGSHU)
          formData.append('YULIUMJXS', this.form.YULIUMJXS)
          formData.append('SHEBEISHEZHIYFMJ', this.form.SHEBEISHEZHIYFMJ)

          post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加系数数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加系数数据失败');
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
