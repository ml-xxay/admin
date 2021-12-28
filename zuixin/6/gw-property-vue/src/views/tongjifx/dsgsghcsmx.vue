<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form label-width="77px" class="ele-form-search" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="7" :sm="12">
            <el-form-item label="所属公司:" style="width: 370px">
              <treeselect v-model="GONGSIID" :options="orageList" placeholder="请选择所属公司" :defaultExpandLevel="4"
                :appendToBody="true" :normalizer="normalizer" />
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="reloads">查询
              </el-button>
              <el-button @click="reset">重置</el-button>
              <el-button @click="exportBas" v-if="false">导出</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->


      <el-table v-if="refresh" :indent="30" :header-cell-style="{textAlign: 'center'}" :data="tableData" border
        row-key="c" default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
        <el-table-column :label="this.tableheader" header-align="center" label-class-name="headertitle">
        <el-table-column align="left" prop="c" label="公司名称" sortable width="290">
        </el-table-column>
        <el-table-column align="center" prop="b" width="220" label="用房规模">
        </el-table-column>
        <el-table-column label="用房规模（业务类）">
          <el-table-column align="center" prop="d" width="220" label="调度通信用房面积(平方米)">
          </el-table-column>
          <el-table-column align="center" prop="ab" width="220" label="运维检修用房面积(平方米)">
          </el-table-column>
          <el-table-column align="center" prop="ac" width="220" label="营销服务用房面积(平方米)">
          </el-table-column>
        </el-table-column>

        <el-table-column label="综合管理">
          <el-table-column align="center" prop="e" width="220" label="经营、管理、技术人员数量(人)">
          </el-table-column>
          <el-table-column align="center" prop="f" width="220" label="面积(平方米)">
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" prop="g" width="220" label="档案库房面积(平方米)">
        </el-table-column>

        <el-table-column label="食堂">
          <el-table-column align="center" prop="h" width="220" label="单位总人数(人)">
          </el-table-column>
          <el-table-column align="center" prop="i" width="220" label="面积(平方米)">
          </el-table-column>
        </el-table-column>

        <el-table-column label="设备设施用房">
          <el-table-column align="center" prop="j" width="220" label="拟建用房栋数(栋)">
          </el-table-column>
          <el-table-column align="center" prop="k" width="220" label="面积(平方米)">
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" prop="m" width="420" label="预留发展用房面积（5%增加人）(平方米)">
        </el-table-column>

        <el-table-column align="center" prop="n" width="220" label="测算规模需求合计(平方米)">
        </el-table-column>

        <el-table-column label="现用房情况">
          <el-table-column align="center" prop="o" width="220" label="自有用房面积(平方米)">
          </el-table-column>
          <el-table-column align="center" prop="p" width="220" label="楼栋数(栋)">
          </el-table-column>

          <el-table-column align="center" prop="q" width="220" label="承租用房面积(平方米)">
          </el-table-column>
        </el-table-column>

        <el-table-column label="存在问题情况">
          <el-table-column align="center" prop="r" width="220" label="危房面积(平方米)">
          </el-table-column>
          <el-table-column align="center" prop="s" width="220" label="拟规划拆迁面积(平方米)">
          </el-table-column>

          <el-table-column align="center" prop="t" width="320" label="其它原因不适宜使用面积(平方米)">
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" prop="u" width="220" label="总面积缺口(平方米)">
        </el-table-column>

        <el-table-column align="center" prop="v" width="220" label="自有用房面积缺口(平方米)">
        </el-table-column>

        <el-table-column align="center" prop="z" width="220" label="总面积紧缺率">
        </el-table-column>

        <el-table-column align="center" prop="aa" width="220" label="自有面积紧缺率">
        </el-table-column>
         </el-table-column>
      </el-table>
    </el-card>

  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import {
    Loading
  } from 'element-ui';
  import XLSX from 'xlsx';
  export default {
    name: "dsgsghcsmx",
    components: {
      Treeselect
    },
    data() {
      return {
        tableheader: '',
        tableData: [],
        GONGSIID: '',
        orageList: [],
        GONGSIMC: '',
        refresh: false
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
      /* 刷新表格 */
      reloads() {
        if (this.GONGSIID == '' || this.GONGSIID == null) {
          this.$message('请选择所属公司！');
        } else {
          this.getData();
        }
      },
      /* 重置搜索 */
      reset() {
        this.reload();
      },
      getOrageList() {
        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_GONGSI",
          inmap: JSON.stringify({
            "GONGSILX": "2,3,4",
          })
        }).then(res => {
          let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
          this.orageList = result
        }).catch(e => {
          console.log(e)
        });
      },
      getData() {
        var self = this
        self.refresh = true
        let loadingInstance = Loading.service({
          fullscreen: false,
          target: '.ele-body'
        });
        //根据公司ID获取公司信息

        this.$util.eachTreeData(this.orageList, (item) => {
          if (item.ID == this.GONGSIID) {
            this.GONGSILX = item.GONGSILX;
            this.GONGSIGUIMOID = item.GONGSIGUIMOID
            this.GONGSIMC = item.GONGSIMC
          }
        }, 'children');
        this.tableheader = this.GONGSIMC + "小型基建规划测算模型";

        let formDatas = new FormData()
        formDatas.append('table', 'TMDB_PMS_GONGSI')
        formDatas.append('equalmap', JSON.stringify({
          "ID": this.GONGSIID
        }))
        this.$requestsu.post("/TM_getallinfo_controller", formDatas).then(function(response) {
          self.GONGSIMC = response.data.data[0].GONGSIMC
        })


        //根据公司Id获取测算模型
        //eslint-disable-next-line no-unused-vars
        let formData = new FormData()
        //数据库表名
        formData.append('GONGSIID', JSON.stringify(this.GONGSIID))

        this.$requestsu.post("/TM_PMS_getsubcompanyhousecalculate_controller", formData).then(function(response) {
            self.tableData = response.data.data
            self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
              loadingInstance.close();
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      /* 导出excel */
      exportBas() {
        let array = [
          ['用户名', '省', '市', '区', '街道', '详细地址', '金额']
        ];
        this.users.forEach(d => {
          array.push([d.username, d.province, d.city, d.zone, d.street, d.address, d.amount]);
        });
        this.$util.exportSheet(XLSX, array, '用户数据');
      }
    },
    created() {
      this.GONGSIID = null;
      this.getOrageList();
    }
  }
</script>

<style>
  .headertitle {
    font-size: 20px;
  }
</style>
