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
    :title="isUpdate?'修改房产信息':'添加房产信息'"
    @update:visible="updateVisible">
    <el-form

      ref="form"
      :rules="rules"
      :model="form"
      label-width="140px">
      <el-row :gutter="15" style="height: 500px;overflow: scroll">
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

          <el-form-item label="所属公司:" prop="GONGSIID">
            <treeselect
              style="width: 300px"
              v-model="form.GONGSIID"
              :options="orageList"
              placeholder="请选择所属公司"
              :defaultExpandLevel="1"
              :normalizer="normalizer"/>
          </el-form-item>


          <el-form-item label="实物ID编码:" prop="SHIWUID">
            <el-input
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.SHIWUID"
              placeholder="请输入实物ID编码"/>
          </el-form-item>

          <el-form-item label="房产名称:" prop="FANGCHANMC">
            <el-input
              style="width: 300px"
              clearable
              :maxlength="20"
              v-model="form.FANGCHANMC"
              placeholder="请输入房产名称"/>
          </el-form-item>

          <el-form-item label="房产编号:" prop="FANGCHANBH">
            <el-input
              style="width: 300px"
              clearable
              :maxlength="20"
              v-model="form.FANGCHANBH"
              placeholder="请输入房产编号"/>
          </el-form-item>

          <el-form-item label="所属土地:" prop="SUOSHUTUDI">
            <el-input
              style="width: 300px"
              clearable
              class="ele-block"
              v-model="form.SUOSHUTUDI"
              placeholder="请输入所属土地">
<!--              <el-option v-for="item in LANDLIST" :key="item.ID" :label="item.LAND_SHIWID" :value="item.ID"/>-->
            </el-input>
          </el-form-item>

          <el-form-item label="地址:" prop="DIZHI">
            <el-input
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.DIZHI"
              placeholder="请输入地址"/>
          </el-form-item>
          <el-form-item label="面积:" prop="MIANJI">
            <el-input
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.MIANJI"
              placeholder="请输入面积"/>
          </el-form-item>


          <el-form-item label="房产来源:" prop="FANGCHANLAIYUAN">
            <el-select
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.FANGCHANLAIYUAN"
              placeholder="请选择房产来源">
              <el-option label="录入" value="1"/>
              <el-option label="导入" value="2"/>
            </el-select>
          </el-form-item>


          <el-form-item label="房产属性:" prop="FANGCHANSX">
            <el-select
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.FANGCHANSX"
              placeholder="请选择房产属性">
              <el-option label="自有" value="1"/>
              <el-option label="承租" value="2"/>
            </el-select>
          </el-form-item>




          <el-form-item label="投入使用时间:" prop="TOURUSHIYONGSJ">
            <el-col :span="11" style="width: 305px">
              <el-date-picker type="date" placeholder="请输入投入使用时间" v-model="form.TOURUSHIYONGSJ"
                              style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item>


          <el-form-item label="房屋使用情况:" prop="SHIYONGZHUANGTAI">
            <el-select
              clearable
              style="width: 300px"
              class="ele-block"
              v-model="form.SHIYONGZHUANGTAI"
              placeholder="请选择房屋使用情况">
              <el-option label="闲置" value="闲置"/>
              <el-option label="被占用" value="被占用"/>
              <el-option label="自用" value="自用"/>
              <el-option label="出租" value="出租"/>
            </el-select>
          </el-form-item>


          <el-form-item label="在建:" prop="ZAIJIAN">
            <el-select
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.ZAIJIAN"
              placeholder="请选择是否在建">
              <el-option label="是" value="是"/>
              <el-option label="否" value="否"/>
            </el-select>

          </el-form-item>

          <el-form-item label="拟拆迁:" prop="NICHAIQIAN">
            <el-select
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.NICHAIQIAN"
              placeholder="请选择是否拟拆迁">
              <el-option label="是" value="是"/>
              <el-option label="否" value="否"/>
            </el-select>
          </el-form-item>


          <el-form-item label="不适宜:" prop="BUSHIYI">
            <el-select
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.BUSHIYI"
              placeholder="请选择是否适宜">
              <el-option label="是" value="是"/>
              <el-option label="否" value="否"/>
            </el-select>
          </el-form-item>


          <el-form-item label="危房:" prop="WEIFANG">
            <el-select
              clearable
              style="width: 300px"
              :maxlength="20"
              v-model="form.WEIFANG"
              placeholder="请选择是否危房">
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
    data: Object,
    //公司列表
    GONGSILIST: Array
  },
  data() {
    return {
      orageList: [],
      // 表单验证规则
      rules: {
        GONGSIID: [
          {required: true, message: '请选择所属公司', trigger: 'blur'}
        ], 
        FANGCHANMC: [
          {required: true, message: '请输入房产名称', trigger: 'blur'}
        ],
        FANGCHANBH: [
          {required: true, message: '请输入房产编号', trigger: 'blur'}
        ],
        FANGCHANLAIYUAN: [
          {required: true, message: '请选择房产来源', trigger: 'blur'}
        ],
        TOURUSHIYONGSJ: [
          {required: true, message: '请选择投入使用时间', trigger: 'blur'}
        ],
        SHIYONGZHUANGTAI: [
          {required: true, message: '请选择房屋使用情况', trigger: 'blur'}
        ],
        ZAIJIAN: [
          {required: true, message: '请输入在建数量', trigger: 'blur'}
        ],
        NICHAIQIAN: [
          {required: true, message: '请选择是否拟拆迁', trigger: 'blur'}
        ],
        BUSHIYI: [
          {required: true, message: '请选择是否适宜房', trigger: 'blur'}
        ],
        WEIFANG: [
          {required: true, message: '请选择是否危房', trigger: 'blur'}
        ],
        FANGCHANSX:[
          {required: true, message: '请选择房产属性', trigger: 'blur'}
        ]


      },
      // 表单数据
      form: {
        ID: '',
        GONGSIID: '',
        SHIWUID: '',
        FANGCHANMC: '',
        FANGCHANBH: '',
        SUOSHUTUDI: '',
        DIZHI: '',
        FANGCHANLAIYUAN: '',
        TOURUSHIYONGSJ: '',
        SHIYONGZHUANGTAI: '',
        FANGCHANLX: '',
        ZAIJIAN: '',
        NICHAIQIAN: '',
        BUSHIYI: '',
        WEIFANG: '',
        MIANJI: '',
        FANGCHANSX:''

      },
      // 提交状态
      loading: false,
      // 是否是修改
      isUpdate: false,
      // 角色列表
      roleList: [],
      //下拉土地列表
      LANDLIST: []
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

    /* 下拉树组件格式化数据 */
    normalizer(d) {
      return {
        id: d.ID,
        label: d.GONGSIMC
      };
    },

    getOrageList() {
      this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
        table: "TMDB_PMS_GONGSI",
		inmap: JSON.stringify({"GONGSILX": "2,3,4,5"}),
      }).then(res => {
        let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
        this.orageList = result
      }).catch(e => {
        console.log(e)
      });
    },

    /*js格式转换*/
    getLocalTime(time) {
      let date = new Date(time);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      date = year + '-' + month + '-' + day;
      return date;
    },

    guanbichongzhi() {
      //通过$refs这个对象能找到  addfromref 这个属性
      this.$refs.form.resetFields()
      this.reload()
    },

    /* 保存编辑 */
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // this.loading = true;
          var self = this
          if (this.isUpdate) {
            //修改操作
            // eslint-disable-next-line no-unused-vars
            let formData = new FormData()
            //数据库表名
            formData.append('table', 'TMDB_PMS_FANGCHAN')
            formData.append('ID', this.form.ID!=null?this.form.ID:"")
            formData.append('GONGSIID', this.form.GONGSIID!=null?this.form.GONGSIID:"")
            formData.append('SHIWUID', this.form.SHIWUID!=null?this.form.SHIWUID:"")
            formData.append('FANGCHANMC', this.form.FANGCHANMC!=null?this.form.FANGCHANMC:"")
            formData.append('FANGCHANBH', this.form.FANGCHANBH!=null?this.form.FANGCHANBH:"")
            formData.append('DIZHI', this.form.DIZHI!=null?this.form.DIZHI:"")
            formData.append('FANGCHANLAIYUAN', this.form.FANGCHANLAIYUAN!=null?this.form.FANGCHANLAIYUAN:"")
            formData.append('TOURUSHIYONGSJ', this.getLocalTime(this.form.TOURUSHIYONGSJ!=null?this.form.TOURUSHIYONGSJ:""))
            formData.append('SHIYONGZHUANGTAI', this.form.SHIYONGZHUANGTAI!=null?this.form.SHIYONGZHUANGTAI:"")
            formData.append('ZAIJIAN', this.form.ZAIJIAN!=null?this.form.ZAIJIAN:"")
            formData.append('NICHAIQIAN', this.form.NICHAIQIAN!=null?this.form.NICHAIQIAN:"")
            formData.append('BUSHIYI', this.form.BUSHIYI!=null?this.form.BUSHIYI:"")
            formData.append('WEIFANG', this.form.WEIFANG!=null?this.form.WEIFANG:"")
            formData.append('MIANJI', this.form.MIANJI!=null?this.form.MIANJI:"")
            formData.append('SUOSHUTUDI', this.form.SUOSHUTUDI!=null?this.form.SUOSHUTUDI:"")
            formData.append('FANGCHANSX', this.form.FANGCHANSX!=null?this.form.FANGCHANSX:"")



            this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
              console.log(response);
              if (response.data.code === 200) {
                self.$message('修改房产管理数据成功');
                self.updateVisible(false);
                self.reload()
              } else {
                self.$message('修改房产管理数据失败');
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
            formData.append('table', 'TMDB_PMS_FANGCHAN')
            formData.append('GONGSIID', this.form.GONGSIID!=null?this.form.GONGSIID:"")
            formData.append('SHIWUID', this.form.SHIWUID!=null?this.form.SHIWUID:"")
            formData.append('FANGCHANMC', this.form.FANGCHANMC!=null?this.form.FANGCHANMC:"")
            formData.append('FANGCHANBH', this.form.FANGCHANBH!=null?this.form.FANGCHANBH:"")
            formData.append('DIZHI', this.form.DIZHI!=null?this.form.DIZHI:"")
            formData.append('FANGCHANLAIYUAN', this.form.FANGCHANLAIYUAN!=null?this.form.FANGCHANLAIYUAN:"")
            formData.append('TOURUSHIYONGSJ', this.getLocalTime(this.form.TOURUSHIYONGSJ!=null?this.form.TOURUSHIYONGSJ:""))
            formData.append('SHIYONGZHUANGTAI', this.form.SHIYONGZHUANGTAI!=null?this.form.SHIYONGZHUANGTAI:"")
            formData.append('ZAIJIAN', this.form.ZAIJIAN!=null?this.form.ZAIJIAN:"")
            formData.append('NICHAIQIAN', this.form.NICHAIQIAN!=null?this.form.NICHAIQIAN:"")
            formData.append('BUSHIYI', this.form.BUSHIYI!=null?this.form.BUSHIYI:"")
            formData.append('WEIFANG', this.form.WEIFANG!=null?this.form.WEIFANG:"")
            formData.append('MIANJI', this.form.MIANJI!=null?this.form.MIANJI:"")
            formData.append('SUOSHUTUDI', this.form.SUOSHUTUDI!=null?this.form.SUOSHUTUDI:"")
            formData.append('FANGCHANSX', this.form.FANGCHANSX!=null?this.form.FANGCHANSX:"")
            this.$requestsu.post("/TM_insertone_controller", formData).then(function (response) {
              console.log(response);
              if (response.data.code === 200) {
                self.$message('添加房产管理数据成功');
                self.updateVisible(false);
                self.reload()
              } else {
                self.$message('添加房产管理数据失败');
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
    },
    /* 更新visible */
    updateVisible(value) {

      this.$emit('update:visible', value);
    }
  }, created() {

    this.getOrageList();

    this.form.GONGSIID = null

    //获取所属土地下拉列表
    var self = this

    // eslint-disable-next-line no-unused-vars
    let formDatas = new FormData()
    //数据库表名
    formDatas.append('table', 'TMDB_LMS_LAND')
    this.$requestsu.post("/TM_getallinfo_controller", formDatas).then(function (response) {
      console.log(response);
      self.LANDLIST = response.data.data
    })
      .catch(function (error) {
        console.log(error);
      });
  }
}
</script>

<style scoped>
</style>
