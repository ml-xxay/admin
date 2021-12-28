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
    :title="isUpdate?'修改公司数据':'添加公司数据'"
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

          <!--公司类型-->
          <el-form-item label="公司类型:" prop="GONGSILX">
            <el-select
              clearable
              class="ele-block"
              v-model="GONGSILX"
              placeholder="请选择公司类型">
              <el-option label="国家电网" value="1"/>
              <el-option label="一类公司" value="2"/>
              <el-option label=" 二类公司" value="3"/>
              <el-option label="三类公司 " value="4"/>
              <el-option label="乡镇供电所 " value="5"/>
            </el-select>
          </el-form-item>


          <el-form-item label="父级公司:" prop="FUJIID">
            <el-select
              clearable
              class="ele-block"
              v-model="FUJIID"
              placeholder="请选择父级公司">
              <el-option v-for="fu in FUJIIDLIST" :key="fu.ID" :label="fu.GONGSIMC" :value="fu.ID"/>
            </el-select>
          </el-form-item>


          <el-form-item label="公司规模:" prop="GONGSIGUIMOID">
            <el-select
              clearable
              class="ele-block"
              v-model="GONGSIGUIMOID"
              placeholder="请选择公司规模">
              <el-option v-for="guimo in GUIMOLIST" :key="guimo.ID" :label="guimo.GUIMOFL" :value="guimo.ID"/>
            </el-select>
          </el-form-item>


          <el-form-item label="公司名称:" prop="GONGSIMC">
            <el-input
              clearable
              :maxlength="20"
              v-model="form.GONGSIMC"
              placeholder="请输入公司名称"/>
          </el-form-item>


          <el-form-item label="是否省检修（分）公司运维分部:" prop="SHIFOUSJXFGSYWFB">
            <el-select
              clearable
              :maxlength="20"
              class="ele-block"
              v-model="form.SHIFOUSJXFGSYWFB"
              placeholder="是否省检修（分）公司运维分部">
              <el-option label="是" value="是"/>
              <el-option label=" 否" value="否"/>
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
        GONGSILX: '',
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
      //公司类型
      GONGSILX: '',
      //公司规模数组
      GUIMOLIST: [],
      //公司规模ID
      GONGSIGUIMOID: '',
      //父级ID
      FUJIID: '',
      //父级ID数组
      FUJIIDLIST: [],
      addfromrules: {
        GONGSILX: [
          {required: true, message: '请输入公司类型', trigger: 'blur'},
        ],
        GONGSIMC: [
          {required: true, message: '请输入公司名称', trigger: 'blur'},
        ],
        FUJIID: [
          {required: true, message: '请输入父级ID', trigger: 'blur'},
        ],
        GONGSIGUIMOID: [
          {required: true, message: '请输入公司规模ID', trigger: 'blur'},
        ], SHIFOUSJXFGSYWFB: [
          {required: true, message: '请选择是否检修(分)公司运维分部', trigger: 'blur'},
        ],

      }
    };
  },
  watch: {

    data() {
      if (this.data) {
        this.form = this.data
        //赋值公司类型
        this.GONGSILX = this.data.GONGSILX.toString()
        //赋值规模ID
        this.GONGSIGUIMOID = this.data.GONGSIGUIMOID
        //父级ID
        this.FUJIID = this.data.FUJIID.toString()
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    },
    //监听公司类型发生改变
    GONGSILX() {

      //----------------------------------------------------
      //获取父级ID
      var s = Number(this.GONGSILX);
      //父级ID
      var GONGSILXS = s - 1
      //父级ID数组
      var FuList = []
      var self = this
      // eslint-disable-next-line no-unused-vars
      let formDatas = new FormData()
      formDatas.append('table', 'TMDB_PMS_GONGSI')
      formDatas.append('equalmap', JSON.stringify({"GONGSILX": GONGSILXS}))
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

    }
    ,
    //监听父级ID发生变化
    FUJIID() {

      var self = this
      var GUIMOList = []

      // eslint-disable-next-line no-unused-vars
      let formData = new FormData()
      formData.append('table', 'TMDB_PMS_GONGSIGUIMO')
      formData.append('equalmap', JSON.stringify({"GONGSILX": this.GONGSILX, "SHEZHIGSID": this.FUJIID}))
      this.$requestsu.post("/TM_getallinfo_controller", formData).then(function (response) {

        for (var i = 0; i < response.data.data.length; i++) {
          var su = {}
          su.ID = response.data.data[i].ID
          su.GUIMOFL = response.data.data[i].GUIMOFL
          GUIMOList.push(su)
        }
        self.GUIMOLIST = GUIMOList
      })

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
    /* 保存编辑 */
    save() {
      if (this.GONGSILX === null || this.GONGSILX === '') {
        this.$message.error('公司类型不能为空');
      } else if (this.FUJIID === null || this.FUJIID === '') {
        this.$message.error('父级ID不能为空');
      } else if (this.GONGSIGUIMOID === null || this.GONGSIGUIMOID === '') {
        this.$message.error('公司规模ID不能为空');
      } else if (this.form.GONGSIMC === null || this.form.GONGSIMC === '') {
        this.$message.error('公司名称不能为空');
      } else if (this.form.SHIFOUSJXFGSYWFB === null || this.form.SHIFOUSJXFGSYWFB === '') {
        this.$message.error('是否检修(分)公司运维分部不能为空');
      } else {
        var self = this

        if (this.isUpdate) {
          //修改操作

          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_GONGSI')
          formData.append('ID', this.form.ID)
          formData.append('GONGSILX', this.GONGSILX)
          formData.append('GONGSIMC', this.form.GONGSIMC)
          formData.append('FUJIID', this.FUJIID)
          formData.append('GONGSIGUIMOID', this.GONGSIGUIMOID)
          formData.append('SHIFOUSJXFGSYWFB', this.form.SHIFOUSJXFGSYWFB)

          this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('修改公司管理数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('修改公司管理数据失败');
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
          formData.append('GONGSILX', this.GONGSILX)
          formData.append('GONGSIMC', this.form.GONGSIMC)
          formData.append('FUJIID', this.FUJIID)
          formData.append('GONGSIGUIMOID', this.GONGSIGUIMOID)
          formData.append('SHIFOUSJXFGSYWFB', this.form.SHIFOUSJXFGSYWFB)

          this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
            console.log(response);
            if (response.data.code === 200) {
              self.$message('添加公司管理数据成功');
              self.updateVisible(false);
              self.reload()
            } else {
              self.$message('添加公司管理数据失败');
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
