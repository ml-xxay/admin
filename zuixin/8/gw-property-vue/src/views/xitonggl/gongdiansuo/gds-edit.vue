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
    :title="isUpdate?'修改供电所数据':'添加供电所数据'"
    @update:visible="updateVisible">
    <el-form
      :rules="addfromrules"
      ref="form"
      :model="form"
      label-width="150px">
      <el-row :gutter="15">
        <el-col :sm="22">
          <!--公司ID（ID） -->
          <el-form-item label="ID:" prop="ID">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.ID"
              placeholder="ID(数据库自动产生)"
              :disabled="true"/>
          </el-form-item>

          <el-form-item label="父级公司:" prop="FUJIID">
            <el-select
              clearable
              filterable
              class="ele-block"
              v-model="FUJIID"
              placeholder="请选择父级公司">
              <el-option v-for="fu in FUJIIDLIST" :key="fu.ID" :label="fu.GONGSIMC" :value="fu.ID"/>
            </el-select>
          </el-form-item>

          <el-form-item label="供电所用房规模:" prop="GONGSIGUIMOID">
            <el-select
              clearable
              class="ele-block"
              v-model="GONGSIGUIMOID"
              placeholder="请选择供电所用房规模">
              <el-option v-for="guimo in GUIMOLIST" :key="guimo.ID" :label="guimo.GUIMOFL" :value="guimo.ID"/>
            </el-select>
          </el-form-item>
          <el-form-item label="供电所名称:" prop="GONGSIMC">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.GONGSIMC"
              placeholder="请输入供电所名称"/>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item>
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
    data: Object
  },
  data() {
    return {
      // 表单数据
      form: {
        ID: '',
        GONGSIMC: '',
        FUJIID: '',
        GONGSIGUIMOID: '',
        SHIFOUSJXFGSYWFB: '',
      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: [],
      //用房规模数组
      GUIMOLIST: [],
      //用房规模ID
      GONGSIGUIMOID: '',
      //父级ID
      FUJIID: '',
      //规模设置公司ID
      SHEZHIGSID:'',
      //父级ID数组
      FUJIIDLIST: [],
      addfromrules: {
        GONGSIMC: [
          {required: true, message: '请输入供电所名称', trigger: 'blur'},
        ],
        FUJIID: [
          {required: true, message: '请选择父级公司', trigger: 'blur'},
        ],
        GONGSIGUIMOID: [
          {required: true, message: '请选择用房规模', trigger: 'blur'},
        ]
      },
      CHECKUPDATE:'0'
    };
  },
  created() {
    this.getFUJILIST();
    this.getGUIMOList();
  },
  watch: {
    data() {
      if (this.data) {
        this.CHECKUPDATE = "1"
        this.form = this.data
        //赋值规模ID
        this.GONGSIGUIMOID = this.data.GONGSIGUIMOID
        //父级ID
        this.FUJIID = this.data.FUJIID.toString()
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    }
  },
  methods: {
    guanbichongzhi() {
      this.GONGSILX = ''
      this.GONGSIGUIMOID = ''
      this.FUJIID = ''
      //通过$refs这个对象能找到  addfromref 这个属性
      this.$refs.form.resetFields()

      this.reload()
    },
    getFUJILIST(){
        //父级ID数组
        var FuList = []
        var self = this
        // eslint-disable-next-line no-unused-vars
        let formDatas = new FormData()
        formDatas.append('table', 'TMDB_PMS_GONGSI')
        formDatas.append('equalmap', JSON.stringify({"GONGSILX": 4}))
        this.$requestsu.post("/TM_getallinfo_controller", formDatas).then(function (response) {
          for (var i = 0; i < response.data.data.length; i++) {
            var tang = {}
            tang.GONGSIMC = response.data.data[i].GONGSIMC.toString()
            tang.ID = response.data.data[i].ID.toString()
            FuList.push(tang)
          }
          //父级ID下拉框列表
          self.FUJIIDLIST = FuList
        })
    },
    getGUIMOList(){
      var self = this
      var GUIMOList = []
      // eslint-disable-next-line no-unused-vars
      let formData = new FormData()
      formData.append('table', 'TMDB_PMS_GONGSIGUIMO')
      formData.append('equalmap', JSON.stringify({"GONGSILX": 5, "SHEZHIGSID": 0}))
      this.$requestsu.post("/TM_getallinfo_controller", formData).then(function (response) {

        for (var i = 0; i < response.data.data.length; i++) {
          var su = {}
          su.ID = response.data.data[i].ID
          su.GUIMOFL = response.data.data[i].GUIMOFL
          GUIMOList.push(su)
        }
        self.GUIMOLIST = GUIMOList
      })
    },
    /* 保存编辑 */
    save() {
      if (this.FUJIID === null || this.FUJIID === '') {
        this.$message.error('父级公司不能为空');
      } else if (this.GONGSIGUIMOID === null || this.GONGSIGUIMOID === '') {
        this.$message.error('供电所规模不能为空');
      } else if (this.form.GONGSIMC === null || this.form.GONGSIMC === '') {
        this.$message.error('供电所名称不能为空');
      } else {
        var self = this

        if (this.isUpdate) {
          //修改操作

          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_GONGSI')
          formData.append('ID', this.form.ID!=null?this.form.ID:"")
          formData.append('GONGSILX', 5)
          formData.append('GONGSIMC', this.form.GONGSIMC!=null?this.form.GONGSIMC:"")
          formData.append('FUJIID', this.FUJIID!=null?this.FUJIID:"")
          formData.append('GONGSIGUIMOID', this.GONGSIGUIMOID!=null?this.GONGSIGUIMOID:"")
          formData.append('SHIFOUSJXFGSYWFB', "否")

          this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('修改供电所数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('修改供电所数据失败');
              self.updateVisible(false);
              self.reload()
            }
          })
            .catch(function (error) {
              console.log(error);
            });


        } else {
          //添加操作

          this.form.GONGSILX = this.GONGSILX
          this.form.FUJIID = this.FUJIID
          this.form.GONGSIGUIMOID = this.GONGSIGUIMOID

          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_GONGSI')
          formData.append('GONGSILX', 5)
          formData.append('GONGSIMC', this.form.GONGSIMC!=null?this.form.GONGSIMC:"")
          formData.append('FUJIID', this.FUJIID!=null?this.FUJIID:"")
          formData.append('GONGSIGUIMOID', this.GONGSIGUIMOID!=null?this.GONGSIGUIMOID:"")
          formData.append('SHIFOUSJXFGSYWFB', "否")

          this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加供电所数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加供电所数据失败');
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
