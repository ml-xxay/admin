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
    :title="isUpdate?'修改基本数据':'添加基本数据'"
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

          <el-form-item label="所属公司:"  style="width: 430px">
            <treeselect
              v-model="form.GONGSIID"
              :options="treeList"
              placeholder="请选择所属公司"
              :defaultExpandLevel="1"
              :maxHeight="250"
              :normalizer="normalizer"/>
          </el-form-item>


          <el-form-item label="综合管理人数:" prop="ZONGHEGLRS">
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

          <el-form-item label="食堂面积:" prop="SHITANGMJ">
            <el-input
              style="width: 280px"
              clearable
              v-model="form.SHITANGMJ"
              placeholder="请输入食堂面积"/>
          </el-form-item>

          <el-form-item label="现有楼栋数:" prop="XIAOYOULOUDONGSHU">
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
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  inject: ['reload'],
  components: {
    Treeselect
  },
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
          {required: true, message: '请选择所属公司', trigger: 'blur'},
        ],
        ZONGHEGLRS: [
          {required: true, message: '请输入综合管理人数人数', trigger: 'blur'},
        ],
        ZONGRS: [
          {required: true, message: '请输入总人数', trigger: 'blur'},
        ],
        SHITANGMJ: [
          {required: true, message: '请输入食堂面积数', trigger: 'blur'},
        ],
        XIAOYOULOUDONGSHU: [
          {required: true, message: '请输入现有楼栋数', trigger: 'blur'},
        ],
      },
      treeList: []
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
  created() {
    this.form.GONGSIID = null
    this.getTreeList();
  },
  methods: {
    /* 下拉树组件格式化数据 */
    normalizer(d) {
      return {
        id: d.ID,
        label: d.GONGSIMC
      };
    },
    getTreeList() {
      this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
        table: "TMDB_PMS_GONGSI",
        inmap: JSON.stringify({
          "GONGSILX": "2,3,4",
        })
      }).then(res => {
        let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
        this.treeList = result
      }).catch(e => {
        console.log(e)
      });
    },
    //刷新表格
    guanbichongzhi: function () {
      this.$refs.form.resetFields()
      this.reload()
    },
    /* 保存编辑 */
    save() {
      var self = this
      if (this.form.ZONGHEGLRS == null || this.form.ZONGHEGLRS == '') {
        this.$message.error('综合管理人数不能为空');
        return false;
      }
      if (this.isUpdate) {
        //修改操作

        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()
        //数据库表名
        formData.append('table', 'TMDB_PMS_GONGSISJ')
        formData.append('ID', this.form.ID!=null?this.form.ID:"")
        formData.append('GONGSIID', this.form.GONGSIID!=null?this.form.GONGSIID:"")
        formData.append('ZONGHEGLRS', this.form.ZONGHEGLRS!=null?this.form.ZONGHEGLRS:"")
        formData.append('SHITANGMJ', this.form.SHITANGMJ!=null?this.form.SHITANGMJ:"")
        formData.append('ZONGRS', this.form.ZONGRS!=null?this.form.ZONGRS:"")
        formData.append('XIAOYOULOUDONGSHU', this.form.XIAOYOULOUDONGSHU!=null?this.form.XIAOYOULOUDONGSHU:"")
        formData.append('BEIZHU', this.form.BEIZHU!=null?this.form.BEIZHU:"")
        formData.append('GONGSILX', 0)       //一类  二类 三类用房       乡镇供电所=5

        this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('修改基本数据成功');
            self.updateVisible(false);
            self.reload()
          } else {
            self.$message('修改基本数据失败');
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
          formData.append('ZONGHEGLRS', this.form.ZONGHEGLRS!=null?this.form.ZONGHEGLRS:"")
          formData.append('SHITANGMJ', this.form.SHITANGMJ!=null?this.form.SHITANGMJ:"")
          formData.append('ZONGRS', this.form.ZONGRS!=null?this.form.ZONGRS:"")
          formData.append('XIAOYOULOUDONGSHU', this.form.XIAOYOULOUDONGSHU!=null?this.form.XIAOYOULOUDONGSHU:"")
          formData.append('BEIZHU', this.form.BEIZHU!=null?this.form.BEIZHU:"")
          formData.append('GONGSILX', 0)       //一类  二类 三类用房      乡镇供电所=5

          this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加基本数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加基本数据失败');
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
