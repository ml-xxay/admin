<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="where" label-width="80px" class="ele-form-search" @keyup.enter.native="reload"
               @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="7" :sm="12">
            <el-form-item label="所属供电所:" label-width="100px">
                <el-select
                  clearable
                  filterable
                  class="ele-block"
                  v-model="GONGSIID"
                  placeholder="请选择所属供电所">
                  <el-option v-for="item in GONGSILIST" :key="item.ID" :label="item.GONGSIMC" :value="item.ID"/>
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
      <!-- 数据表格 -->
      <ele-pro-table  :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" ref="table"
                     method="POST" :where="where" :datasource="url" :columns="columns" :selection.sync="selection">
        <!-- 表头工具栏 -->
        <template slot="toolbar">
          <el-button @click="openEdit(null)" type="primary" icon="el-icon-plus" class="ele-btn-icon" size="small">添加
          </el-button>
          <el-button @click="removeBatch" type="danger" icon="el-icon-delete" class="ele-btn-icon" size="small">删除
          </el-button>
        </template>

        <!-- 操作列 -->
        <template slot="action" slot-scope="{row}">
          <el-link type="primary" :underline="false" icon="el-icon-edit" @click="openEdit(row)">修改
          </el-link>
          <el-popconfirm class="ele-action" title="确定要删除此条记录吗？" @confirm="remove(row)">
            <el-link type="danger" slot="reference" :underline="false" icon="el-icon-delete">删除
            </el-link>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <user-edit :GONGSILIST_jb="GONGSILIST_jb" :data="current" :visible.sync="showEdit" @done="reload"/>
    <!-- 导入弹窗 -->
    <user-import :visible.sync="showImport" @done="reload"/>
  </div>
</template>

<script>
import UserEdit from './jbsjtbgds/jbsjtbgds-edit';
import UserImport from './jbsjtbgds/jbsjtbgds-import';
import myutils from "@/utils/myutils";

export default {
  name: "gongdiansuo",
  components: {
    UserImport,
    UserEdit
  },
  data() {
    return {
      orageList: [],
      // 表格数据接口
      url: this.serviceurl + '/TM_getallinfo_controller',
      // 表格列配置
      columns: [{
        columnKey: 'selection',
        type: 'selection',
        width: 45,
        align: 'center'
      },
        {
          show: false,
          prop: 'ID',
          label: 'ID',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'COMPANYNAME',
          label: '供电所名称',
          showOverflowTooltip: true,
          minWidth: 130
        },
        {
          show: false,
          prop: 'GONGSIID',
          label: '供电所ID',
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
          prop: 'COMGUIMOFL',
          label: '用房规模分类',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'ZONGHEGLRS',
          label: '综合管理人数',
          showOverflowTooltip: true,
          minWidth: 110,
          show:false
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
          prop: 'XIAOYOULOUDONGSHU',
          label: '现有楼栋数',
          showOverflowTooltip: true,
          minWidth: 150,
          show:false
        },
        {
          prop: 'BEIZHU',
          label: '备注',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          columnKey: 'action',
          label: '操作',
          width: 130,
          align: 'center',
          resizable: false,
          slot: 'action',
          fixed: "right" //固定右侧
        }
      ],
      // 表格搜索条件
      where: {
        table: "TMDB_PMS_GONGSISJ",
        paging: true,
        equalmap: JSON.stringify({"GONGSILX": 5}),     //乡镇供电所
        //排序  升序
        orderarray: JSON.stringify([{
          "ID": "DESC"
        }]),
        //二次查询
        secondsearch: JSON.stringify(
          [{
            "condition": "GONGSIID",
            "targettable": "TMDB_PMS_GONGSI",
            "targetcolumn": "GONGSIMC",
            "returnname": "COMPANYNAME"
          },{
            "condition": "GONGSIID",
            "targettable": "TMDB_PMS_GONGSI",
            "targetcolumn": "GONGSILX",
            "returnname": "GONGSILX"
          },{
            "condition": "GONGSIID",
            "targettable": "TMDB_PMS_GONGSI",
            "targetcolumn": "GONGSIGUIMOID",
            "returnname": "GONGSIGUIMOID"
          },
            {
              "condition": "GONGSIGUIMOID",
              "targettable": "TMDB_PMS_GONGSIGUIMO",
              "targetcolumn": "GUIMOFL",
              "returnname": "COMGUIMOFL"
            }]
        ),
      },
      // 表格选中数据
      selection: [],
      // 当前编辑数据
      current: null,
      // 是否显示编辑弹窗
      showEdit: false,
      // 是否显示导入弹窗
      showImport: false,
      GONGSIID: null,
      //公司列表
      GONGSILIST: [],
      GONGSILIST_jb: []
    };
  },
  inject: ['reload'],
  methods: {
    //获取公司排序列表
    getGONGSILIST() {
      var self = this
      // eslint-disable-next-line no-unused-vars
      let formDatas = new FormData()
      //数据库表名
      formDatas.append('table', 'TMDB_PMS_GONGSI')
      formDatas.append('inmap', JSON.stringify({"GONGSILX": "5"}))
      this.$requestsu.post("/TM_getallinfo_controller", formDatas).then(function (response) {
        self.GONGSILIST = response.data.data
        self.GONGSILIST_jb = response.data.data
      })
        .catch(function (error) {
          console.log(error);
        });
    },

    /* 刷新表格 */
    reloads() {
      let selobj = JSON.parse(this.where.equalmap);
      this.where.equalmap = JSON.stringify(Object.assign({}, selobj, {"GONGSIID": this.GONGSIID }))
      this.$refs.table.reload({
        page: 1,
        where: this.where
      });
    },
    /* 重置搜索 */
    reset() {
      this.where = {};
      this.reload();
    },
    /* 添加 */
    openEdit(row) {
      this.current = row;
      this.showEdit = true;
    },
    /* 删除 */
    remove(row) {
      var self = this

      var arr = []

      arr.push(row.ID)

      //eslint-disable-next-line no-unused-vars
      let formData = new FormData()
      //数据库表名
      formData.append('table', 'TMDB_PMS_GONGSISJ')
      formData.append('deletekey', "ID")
      formData.append('deletearray', JSON.stringify(arr))

      this.$requestsu.post("/TM_deletebatchbydeletekeys_controller", formData).then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          self.$message('删除公司数据成功');
          self.reload()
        } else {
          self.$message('删除公司数据失败');
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    },
    /* 批量删除 */
    removeBatch() {
      var self = this
      if (!this.selection.length) {
        this.$message.error('请至少选择一条数据')
        return;
      }
      this.$confirm('确定要删除选中的公司信息吗?', '提示', {
        type: 'warning'
      }).then(() => {
        var dellist = []

        for (var i = 0; i < this.selection.length; i++) {
          dellist.push(this.selection[i].ID)
        }

        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()

        //数据库表名
        formData.append('table', 'TMDB_PMS_GONGSISJ')
        formData.append('deletekey', "ID")
        formData.append('deletearray', JSON.stringify(dellist))

        this.$requestsu.post("/TM_deletebatchbydeletekeys_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('批量删除公司数据成功');
            self.reload()
          } else {
            self.$message('批量删除公司数据失败');
          }
        })
          .catch(function (error) {
            console.log(error);
          });

      }).catch(() => {
      });
    },

  },
  created() {
    this.getGONGSILIST()
    this.where.GONGSIID = null
  }

}
</script>

<style scoped>

</style>
