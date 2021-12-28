<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form label-width="85px" class="ele-form-search" @keyup.enter.native="reload" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="7" :sm="12">
            <el-form-item label="所属公司:" style="width: 370px">
              <treeselect v-model="GONGSIID" :options="orageList" placeholder="请选择所属公司" :defaultExpandLevel="1"
                :appendToBody="true" :normalizer="normalizer" @select="treeSelect"/>
            </el-form-item>
          </el-col>
          <el-col :md="7" :sm="12" >
            <el-form-item label="所属房产">
              <el-select clearable v-model="FANGCHANID" placeholder="请选择所属房产" style="width: 270px;"  @change="fangchanSelect">
                <el-option v-for="item in FANGCHANLIST" :key="item.ID" :label="item.FANGCHANMC+'——'+item.FANGCHANBH"
                  :value="item.ID" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="reloads">查询
              </el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <el-table  v-if="refresh" ref="table" row-key="ID" border @cell-click="tableCellClick"
        default-expand-all :row-class-name="tableRowClassName"  :cell-class-name="
        ({ row, column, rowIndex, columnIndex }) => (
          (row.index = rowIndex), (column.index = columnIndex)
        )
      " :data="tableData" style="width: 100%;margin-top: 0px">

        <el-table-column :label="this.tableheader" header-align="center">
          <el-table-column prop="ID" label="标准ID" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="FUJIID" label="父级ID" width="90" v-if="false">
          </el-table-column>

          <el-table-column prop="XUHAO" label="序号" width="90" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGSIFL" label="用房分类" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGSILX" label="用房类型" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGNENGYF" label="房产大类" width="250">
          </el-table-column>

          <el-table-column prop="ZIXIANGYI" label="房产小类" width="250">
          </el-table-column>

          <el-table-column prop="ZIXIANGER" label="使用功能" width="200">
          </el-table-column>

          <el-table-column prop="MIANJISHUZHI" label="面积数值" minWidth="130">
            <template slot-scope="scope">
              <span v-if="
                scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
                <el-input v-model="scope.row.MIANJISHUZHI" @blur="tableCellInputBlur" size="mini" v-focus />
              </span>
              <span v-else>{{ scope.row.MIANJISHUZHI }}</span>
            </template>
          </el-table-column>

          <!-- 功能用房表字段不显示在页面上  只做数据写入时用 -->
          <el-table-column prop="YONGFANGID" label="用房ID" width="30" v-if="false">
          </el-table-column>
        </el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
  import myutils from "@/utils/myutils";
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: "gongnengyfsjtb",
    components: {
      Treeselect
    },
    data() {
      return {
        tableheader: '',    //表头
        //表格数据
        tableData: [],
        tableCellClickRowIndex: null, // 点击的单元格行索引
        tableCellClickColumnIndex: null, // 点击的单元格列索引
        //组件刷新
        refresh: false,
        //公用对象
        sutang: {},
        editChanged: false, // 是否修改标识
        formsu: {
          //国网标准表的字段
          ID: '',
          GONGSIFL: '',
          GONGSILX: '',
          FUJIID: '',
          XUHAO: '',
          GONGNENGYF: '',
          ZIXIANGYI: '',
          ZIXIANGER: '',
          SHIFOUSJXFGSYWFB: '',
          SHUZHILX: '',
          ZUIXIAOZHI: '',
          ZUIDAZHI: ''
        },
        //所属公司下拉列表
        orageList: [],
        //房产列表
        FANGCHANLIST: [],
        //功能用房填报列表
        YONGFANGSJCJ: [],
        //所属公司ID
        GONGSIID: null,
        //用房类型
        GONGSILX:'',
        //所属房产ID
        FANGCHANID: '',
        GONGSINAME:'',
        GONGSIGUIMO:'',
        GUIMOFL:'',
        FANGCHANNAME:'',
        GONGSILEIXING:'',

        // 表格搜索条件
        where: {},

      };
    },
    inject: ['reload'],
    created() {
      //获取下拉框所属公司列表
      this.getOrageList()
    },
    watch: {
      GONGSIID() {
        this.refresh = false; //隐藏表格
        this.FANGCHANID = null;
        if (this.GONGSIID == null || this.GONGSIID == '') {
          this.$message('请选择所属公司！');
          return false;
        }

        var self = this
        //---------------获取房产-----------------------------------------
        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()
        //数据库表名
        formData.append('table', 'TMDB_PMS_FANGCHAN')
        formData.append('equalmap', JSON.stringify({
          "GONGSIID": this.GONGSIID
        }))
        this.$requestsu.post("/TM_getallinfo_controller", formData).then(function(response) {
          console.log(response);
          self.FANGCHANLIST = response.data.data
        })
      },
      FANGCHANID() {
        this.refresh = false; //隐藏表格
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
      treeSelect(node) {
        this.GONGSINAME = node.GONGSIMC
        this.GONGSILEIXING = node.GONGSILX;
        this.GONGSIGUIMO = node.GONGSIGUIMOID;
      },
      fangchanSelect(val){
        this.FANGCHANNAME = val ? this.FANGCHANLIST.find(ele => ele.ID === val).FANGCHANMC : ''
      },
      //获取公司列表下拉树
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

      getData() {
        var self = this
        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_GONGSIGUIMO",
          equalmap: JSON.stringify({
            "ID": this.GONGSIGUIMO
          }),
        }).then(res => {
          this.GUIMOFL = res.data.data[0].GUIMOFL;
        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_YONGFANGSJCJ",
          equalmap: JSON.stringify({
            "GONGSIID": this.GONGSIID,
            "FANGCHANID": this.FANGCHANID
          }),
        }).then(res => {
          this.YONGFANGSJCJ = res.data.data; //在功能用房数据表中  查找 选中公司 选中房产后 的数据
          this.$util.eachTreeData(this.orageList, (item) => {
            if (item.ID == self.GONGSIID) {
              self.GONGSILX = item.GONGSILX
            }
          }, 'children');
          var leixing = '';
          if(this.GONGSILEIXING!=5){
            leixing = this.GONGSILX
          }else
          {
            leixing = this.GUIMOFL
          }
          this.tableheader = this.GONGSINAME+" ("+myutils.getGONGSILXNAME(leixing)+" ) —— "+this.FANGCHANNAME+" 数据填报"	  
          this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
            table: "TMDB_PMS_BIAOZHUN",
            equalmap: JSON.stringify({"GONGSILX": myutils.getGONGSILXNAME(leixing)}),
            orderarray: JSON.stringify([{
              "FUJIID": "ASC"
            }, {
              "XUHAO": "ASC"
            }])
          }).then(res => {
            let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
            this.$util.eachTreeData(result, (item) => {
              this.YONGFANGSJCJ.forEach((yfitem) => {
                if (yfitem.BIAOZHUNID == item.ID)       //在功能用房数据表中 当 标准ID  和 树状图的ID 相同时
                {
                  item.MIANJISHUZHI = yfitem.MIANJISHUZHI;   // 把用房表的面积数值绑定到 树状图中MIANJISHUZHI字段中
                  item.YONGFANGID = yfitem.ID;   // 把用房表的ID绑定到 树状图中YONGFANGID字段中
                }
              })
            }, 'children');
            self.tableData = result
            this.refresh = true;
          }).catch(e => {
            console.log(e)
          });
          }).catch(e => {
            console.log(e)
          });
        }).catch(e => {
          console.log(e)
        });
      },
      /* 获取表格数据 */
      reloads() {
        if (this.GONGSIID == '' || this.GONGSIID == null) {
          this.$message('请选择所属公司！');
        } else if (this.FANGCHANID == '' || this.FANGCHANID == null) {
          this.$message('请选择所属房产！');
        } else {
          this.getData(); 
        }
      },
      /* 重置搜索 */
      reset() {
        this.reload();
      },
      //进入单元格
      // eslint-disable-next-line no-unused-vars
      tableCellClick(row, column, cell, event) {
        this.formsu = row
        this.tableCellClickRowIndex = row.index;
        this.tableCellClickColumnIndex = column.index;
        this.sutang = Object.assign({}, row);
      },
      // 单元格失去焦点
      // eslint-disable-next-line no-unused-vars
      tableCellInputBlur(row, event, column) {
        var self = this
        const loading = this.$messageLoading({message: '数据校对中..'});
        this.tableCellClickRowIndex = null;
        this.tableCellClickColumnIndex = null;
        for (let i in this.formsu) {
          if (this.formsu[i] != this.sutang[i]) {
            this.editChanged = true;
            break;
          } else {
            this.editChanged = false;
            loading.close();
          }
        }
        if (this.editChanged) {
          loading.close();
          let formData = new FormData()
          formData.append('table', 'TMDB_PMS_YONGFANGSJCJ')
          formData.append('GONGSIID', self.GONGSIID != null ? self.GONGSIID : "")
          formData.append('FANGCHANID', self.FANGCHANID != null ? self.FANGCHANID : "")
          formData.append('BIAOZHUNID', self.formsu.ID != null ? self.formsu.ID : "")
          formData.append('MIANJISHUZHI', self.formsu.MIANJISHUZHI != null ? self.formsu.MIANJISHUZHI : "")

          if (self.formsu.YONGFANGID == "undefined" || self.formsu.YONGFANGID == null) {
            //添加操作
            this.$requestsu.post("/TM_insertone_controller", formData).then(function(response) {
                console.log(response);
                if (response.data.code === 200) {
                  self.$message('功能用房数据填报成功');
                  self.getData(); //刷新功能用房表ID 绑定到树状表上
                } else {
                  self.$message('功能用房数据填报失败');
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            formData.append('ID', self.formsu.YONGFANGID != null ? self.formsu.YONGFANGID : "")
            //修改操作
            this.$requestsu.post("/TM_updateone_controller", formData).then(function(response) {
                console.log(response);
                if (response.data.code === 200) {
                  self.$message('功能用房数据填报成功');
                } else {
                  self.$message('功能用房数据填报失败');
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      },
      tableRowClassName({row}){
        if(row.FUJIID === 0){
          return 'warning-row';
        }
      }
    }
  }
</script>

<style scoped>

</style>
