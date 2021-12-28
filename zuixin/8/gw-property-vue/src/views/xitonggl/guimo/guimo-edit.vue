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
    :title="isUpdate?'修改用房规模数据':'添加用房规模数据'"
    @update:visible="updateVisible">
    <el-form
      :rules="addfromrules"
      ref="form"
      :model="form"
      label-width="100px">
      <el-row :gutter="15">
        <el-col :sm="20">
          <el-form-item label="ID:" prop="ID">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.ID"
              placeholder="ID(数据库自动产生)"
              :disabled="true"/>
          </el-form-item>

          <el-form-item label="用房ID:" prop="SHEZHIGSID" style="display: none">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.SHEZHIGSID"
              placeholder="用房ID(系统自动读取登录用户身份信息)"
              :disabled="true"/>
          </el-form-item>


          <el-form-item label="用房类型:" prop="GONGSILX">
            <el-select
              clearable
              class="ele-block"
              v-model="form.GONGSILX"
              placeholder="请选择用房类型">
              <el-option label="国网用房" value="0"/>
              <el-option label="一类用房" value="1"/>
              <el-option label="二类用房" value="2"/>
              <el-option label="三类用房 " value="3"/>
              <el-option label="乡镇供电所 " value="4"/>
            </el-select>
          </el-form-item>

          <el-form-item label="规模分类:" prop="GUIMOFL">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.GUIMOFL"
              placeholder="请输入规模分类"/>
          </el-form-item>


          <el-form-item label="年售电量:" label-width="100px" prop="NIANSHOUDIANLIANG">
            <div >
              <el-input
                clearable
                style="width: 323px"
                :maxlength="20"
                v-model="form.NIANSHOUDIANLIANG"
                placeholder="请输入年售电量"/>
              <span>(亿度)</span>
            </div>
          </el-form-item>

          <el-form-item label="辖区户数:" prop="XIAQUHUSHU">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.XIAQUHUSHU"
              placeholder="请输入辖区户数"/>
          </el-form-item>

          <el-form-item label="序号:" prop="XUHAO">

            <el-input-number style="width: 360px"

                             clearable :maxlength="20" prop="form.XUHAO" v-model="form.XUHAO" controls-position="right"
                             :min="0" :max="100000000000000000000000" placeholder="请输入序号"/>


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
    data: Object,
    //用房列表
    GONGSILIST: Array
  },
  data() {
    return {
      num: 0,
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
        XUHAO: [
          {required: true, message: '请选择序号', trigger: 'blur'},
        ],

        GONGSILX: [
          {required: true, message: '请选择用房类型', trigger: 'blur'},
        ],
        GUIMOFL: [
          {required: true, message: '请输入规模分类', trigger: 'blur'},
        ],

      }
    };
  },
  watch: {
    data() {
      if (this.data) {
        this.form = this.data
        this.form.GONGSILX = this.data.GONGSILX.toString()
        console.log(this.form);
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    }
  },
  methods: {

    guanbichongzhi() {
      //通过$refs这个对象能找到  addfromref 这个属性
      this.$refs.form.resetFields()
      this.reload()
    },

    /* 保存编辑 */
    save: function () {
      if (this.form.GONGSILX === null || this.form.GONGSILX === '') {
        this.$message.error('用房类型不能为空');
      } else if (this.form.GUIMOFL === null || this.form.GUIMOFL === '') {
        this.$message.error('规模分类不能为空');
      } else if (this.form.XUHAO === null || this.form.XUHAO === '') {
        this.$message.error('序号不能为空');
      } else {
        var self = this

        if (this.isUpdate) {
          //修改操作
          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_GONGSIGUIMO')
          formData.append('ID', this.form.ID!=null?this.form.ID:"")
          formData.append('XUHAO', this.form.XUHAO!=null?this.form.XUHAO:"")

          //设置用房ID
          sessionStorage.setItem("SHEZHIGSID", 3)
          formData.append('SHEZHIGSID', sessionStorage.getItem("SHEZHIGSID"))


          formData.append('GONGSILX', this.form.GONGSILX!=null?this.form.GONGSILX:"")


          formData.append('GUIMOFL', this.form.GUIMOFL!=null?this.form.GUIMOFL:"")
          formData.append('NIANSHOUDIANLIANG', this.form.NIANSHOUDIANLIANG!=null?this.form.NIANSHOUDIANLIANG:"")
          formData.append('XIAQUHUSHU', this.form.XIAQUHUSHU!=null?this.form.XIAQUHUSHU:"")


          this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('修改用房规模数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('修改用房规模数据失败');
              self.updateVisible(false);
              self.reload()
            }
          })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          //添加操作
          // eslint-disable-next-line no-unused-vars

          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_GONGSIGUIMO')
          formData.append('XUHAO', this.form.XUHAO!=null?this.form.XUHAO:"")

          //设置用房ID
          sessionStorage.setItem("SHEZHIGSID", 1)
          formData.append('SHEZHIGSID', sessionStorage.getItem("SHEZHIGSID"))

          formData.append('GONGSILX', this.form.GONGSILX!=null?this.form.GONGSILX:"")
          formData.append('GUIMOFL', this.form.GUIMOFL!=null?this.form.GUIMOFL:"")
          formData.append('NIANSHOUDIANLIANG', this.form.NIANSHOUDIANLIANG!=null?this.form.NIANSHOUDIANLIANG:"")
          formData.append('XIAQUHUSHU', this.form.XIAQUHUSHU!=null?this.form.XIAQUHUSHU:"")

          this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加用房规模数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加用房规模数据失败');
              self.updateVisible(false);
              self.reload()
            }
          })
            .catch(function (error) {
              console.log(error);
            });

        }
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
