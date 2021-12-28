<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form :model="where" label-width="77px" class="ele-form-search" @keyup.enter.native="reload"
               @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="所属公司:" style="width: 300px">
              <treeselect
                v-model="where.GONGSIID"
                :options="orageList"
                placeholder="请选择所属公司"
                :defaultExpandLevel="4"
                :normalizer="normalizer"/>
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
      <ele-pro-table :header-cell-style="{'text-align':'center'}" :cell-style="{'text-align':'center'}" ref="table"
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
          <el-popconfirm class="ele-action" title="确定要删除此用户吗？" @confirm="remove(row)">
            <el-link type="danger" slot="reference" :underline="false" icon="el-icon-delete">删除
            </el-link>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <user-edit :GONGSILIST_jb="GONGSILIST" :data="current" :visible.sync="showEdit" @done="reload"/>
    <!-- 导入弹窗 -->
    <user-import :visible.sync="showImport" @done="reload"/>
  </div>
</template>

<script>
import UserEdit from './jibensjtb/jibensjtb-edit';
import UserImport from './jibensjtb/jibensjtb-import';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'


export default {
  name: "jibensjtb",
  components: {
    UserImport,
    UserEdit,
    Treeselect
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
          label: '公司名称',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          show: false,
          prop: 'GONGSIID',
          label: '公司ID',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'ZONGHEGLRS',
          label: '综合管理人数',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'ZONGRS',
          label: '总人数',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'SHITANGMJ',
          label: '食堂面积',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'XIAOYOULOUDONGSHU',
          label: '现有楼栋数',
          showOverflowTooltip: true,
          minWidth: 150
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
        //排序  升序
        orderarray: JSON.stringify([{
          "ID": "DESC"
        }]),
        //二次查询
        secondsearch: JSON.stringify(
          [{
            //当前表的  公司ID
            "condition": "GONGSIID",
            //去哪一张表查询（公司表）
            "targettable": "TMDB_PMS_GONGSI",
            //查询表的字段名称
            "targetcolumn": "GONGSIMC",
            //查询表的字段名称赋值给当前value值
            "returnname": "COMPANYNAME"
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
      //公司列表
      GONGSILIST: []
    };
  },
  inject: ['reload'],
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
        table: "TMDB_PMS_GONGSI"
      }).then(res => {
        let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
        console.log(res)
        console.log(result)
        this.orageList = result
        console.log(this.orageList)
      }).catch(e => {
        console.log(e)
      });
    },

    /* 选择数据 */
    onNodeClick(row) {
      console.log(row);
    },
    //获取公司排序列表
    getGONGSILIST() {
      var self = this
      // eslint-disable-next-line no-unused-vars
      let formDatas = new FormData()
      //数据库表名
      formDatas.append('table', 'TMDB_PMS_GONGSI')
      this.$requestsu.post("/TM_getallinfo_controller", formDatas).then(function (response) {
        self.GONGSILIST = response.data.data

        //根据GONGSILX排序
        function sortId(a, b) {
          return a.GONGSILX - b.GONGSILX
        }

        self.GONGSILIST.sort(sortId);
        //遍历排序后公司列表去除GONGSILX=1的数据
        for (var i = 0; i < self.GONGSILIST.length; i++) {
          if (self.GONGSILIST[i].GONGSILX === 1) {
            self.GONGSILIST.splice(i, 1)
          }

        }
      })
        .catch(function (error) {
          console.log(error);
        });

    },

    /* 刷新表格 */
    reloads() {
      this.where.likemap = JSON.stringify({
        "GONGSIID": this.where.GONGSIID
      })
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
    //数组排序
    sortId(a, b) {
      return a.GONGSILX - b.GONGSILX
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
    this.getOrageList();
    this.where.GONGSIID = null
  }

}
</script>

<style scoped>

</style>
