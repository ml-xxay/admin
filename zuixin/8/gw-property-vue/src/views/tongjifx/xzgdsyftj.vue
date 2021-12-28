<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form label-width="77px" class="ele-form-search" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="7" :sm="12">
            <el-form-item label="所属公司:" style="width: 370px">
              <treeselect v-model="GONGSIID" :options="orageList" placeholder="请选择所属公司" :defaultExpandLevel="1"
                :appendToBody="true" :normalizer="normalizer" />
            </el-form-item>
          </el-col>

          <el-col :md="8" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="reloads">查询
              </el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>

      <!-- 数据表格 -->
      <ele-pro-table :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}" ref="table" method="POST" :where="where" :datasource="url"
        :columns="columns" :selection.sync="selection">
        <!-- 操作列 -->
        <template slot="action" slot-scope="{row}">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-view"
            @click="openShow(row)">查看
          </el-link>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 详情弹窗 -->
    <xzgdsyftj-detail :visible.sync="showInfo" :data="current||{}"/>
  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import myutils from "@/utils/myutils";
  import xzgdsyftjDetail from './xzgdsyftj-detail.vue';

  export default {
    name: "xzgdsyftj",
    components: {
      Treeselect,
      xzgdsyftjDetail
    },
    data() {
      return {
        // 表格数据接口
        url: this.serviceurl + '/TM_getallinfo_controller',
        orageList: [], //所属公司下拉列表
        GONGSIID: null, //所属公司ID
        // 表格列配置
        columns: [
        {
          prop: 'ID',
          label: 'ID',
          showOverflowTooltip: true,
          minWidth: 110,
          show: false
        },
        {
          prop: 'GONGSIMC',
          label: '供电所名称',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'GONGSILX',
          label: '用房类型',
          showOverflowTooltip: true,
          //处理数据
          formatter: (row) => {
            return myutils.getGONGSILXNAME(row.GONGSILX)
          },
          minWidth: 110
        },
        {
          prop: 'GUIMOFL',
          label: '用房规模分类',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'COMPANYNAME',
          label: '父级公司名称',
          showOverflowTooltip: true,
          minWidth: 130
        },
        {
          prop: 'ZONGRS',
          label: '总人数',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'SHITANGMJ',
          label: '总面积',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          columnKey: 'action',
          label: '用房数据填报详情',
          width: 140,
          align: 'center',
          resizable: false,
          slot: 'action',
          fixed: "right"//固定右侧
        }
        ],
        // 表格搜索条件
        where: {
          table: "TMDB_PMS_GONGSISJ",
          paging: true,
          equalmap: JSON.stringify({
            "GONGSILX": "5",
          }),
          orderarray: JSON.stringify([{
            "GONGSIID": "ASC",
            "ID": "ASC"
          }]),
          secondsearch: JSON.stringify(
            [{
                "condition": "GONGSIID",
                "targettable": "TMDB_PMS_GONGSI",
                "targetcolumn": "GONGSIMC",
                "returnname": "GONGSIMC"
              },{
                "condition": "GONGSIID",
                "targettable": "TMDB_PMS_GONGSI",
                "targetcolumn": "FUJIID",
                "returnname": "FUJIID"
              },{
                "condition": "FUJIID",
                "targettable": "TMDB_PMS_GONGSI",
                "targetcolumn": "GONGSIMC",
                "returnname": "COMPANYNAME"
              },
              {
                "condition": "GONGSIID",
                "targettable": "TMDB_PMS_GONGSI",
                "targetcolumn": "GONGSIGUIMOID",
                "returnname": "GONGSIGUIMOID"
              },
              {
                "condition": "GONGSIGUIMOID",
                "targettable": "TMDB_PMS_GONGSIGUIMO",
                "targetcolumn": "GUIMOFL",
                "returnname": "GUIMOFL"
              }
            ]
          )
        },
        // 当前选中数据
        current: null,
        // 是否显示查看弹窗
        showInfo: false,
        // 表格选中数据
        selection: [],
      }
    },
    inject: ['reload'],
    created() {
      this.getOrageList(); //获取下拉框所属公司列表
    },
    methods: {
      //获取公司列表下拉树
      getOrageList() {
        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_GONGSI",
          inmap: JSON.stringify({
            "GONGSILX": "4",
          }),
          orderarray: JSON.stringify([{
            "FUJIID": "ASC",
            "GONGSIGUIMOID": "ASC",
            "ID": "ASC"
          }]),
        }).then(res => {
          let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
          this.orageList = result
        }).catch(e => {
          console.log(e)
        });
      },
      /* 刷新表格 */
      reloads() {
        if (this.GONGSIID == '' || this.GONGSIID == null) {
          this.$message('请选择所属公司！');
        } else {
          this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
            table: "TMDB_PMS_GONGSI",
            equalmap:JSON.stringify({"FUJIID": this.GONGSIID}),
            orderarray: JSON.stringify([{"GONGSIGUIMOID": "ASC","ID": "ASC"}]),
          }).then(res => {
            var idtext='0'
            if(res.data.data.length>0)
            {
              res.data.data.forEach(item=>{
                idtext= idtext+','+item.ID
              })
            }
            this.where.inmap = JSON.stringify({"GONGSIID": idtext})
            this.$refs.table.reload({
              page: 1,
              where: this.where
            });
          }).catch(e => {
            console.log(e)
          });
        }
      },
      /* 重置搜索 */
      reset() {
        this.reload();
      },
      openShow(row) {
        this.current = row;
        this.showInfo = true;
      },
      /* 下拉树组件格式化数据 */
      normalizer(d) {
        return {
          id: d.ID,
          label: d.GONGSIMC
        };
      }
    }
  }
</script>

<style scoped>

</style>
