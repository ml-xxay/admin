<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form
        :model="where"
        label-width="77px"
        class="ele-form-search"
        @keyup.enter.native="reload"
        @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="公司名称">
              <el-input
                clearable
                v-model="where.GONGSIMC"
                placeholder="请输入公司名称"/>
            </el-form-item>
          </el-col>


          <el-col :md="6" :sm="12">
            <el-form-item label="公司类型:" prop="GONGSILX">
              <el-select
                clearable
                class="ele-block"
                v-model="where.GONGSILX"
                placeholder="请选择公司类型">
                <el-option label="一类公司" value="2"/>
                <el-option label=" 二类公司" value="3"/>
                <el-option label="三类公司 " value="4"/>
                <el-option label="乡镇供电所 " value="5"/>
              </el-select>
            </el-form-item>

          </el-col>


          <el-col :md="6" :sm="12">
            <div class="ele-form-actions">
              <el-button
                type="primary"
                icon="el-icon-search"
                class="ele-btn-icon"
                @click="reloads">查询
              </el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->
      <ele-pro-table
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        ref="table"
        method="POST"
        :where="where"
        :datasource="url"
        :columns="columns"
        :selection.sync="selection">


        <!-- 表头工具栏 -->
        <template slot="toolbar">
          <el-button
            @click="openEdit(null)"
            type="primary"
            icon="el-icon-plus"
            class="ele-btn-icon"
            size="small">添加
          </el-button>
          <el-button
            @click="removeBatch"
            type="danger"
            icon="el-icon-delete"
            class="ele-btn-icon"
            size="small">删除
          </el-button>

        </template>

        <!-- 操作列 -->
        <template slot="action" slot-scope="{row}">
          <el-link
            type="primary"
            :underline="false"
            icon="el-icon-edit"
            @click="openEdit(row)">修改
          </el-link>
          <el-popconfirm
            class="ele-action"
            title="确定要删除此用户吗？"
            @confirm="remove(row)">
            <el-link
              type="danger"
              slot="reference"
              :underline="false"
              icon="el-icon-delete">删除
            </el-link>
          </el-popconfirm>
        </template>
      </ele-pro-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <user-edit
      :data="current"
      :visible.sync="showEdit"
      @done="reload"/>
    <!-- 导入弹窗 -->
    <user-import
      :visible.sync="showImport"
      @done="reload"/>
  </div>
</template>

<script>
import UserEdit from './gongsi/gongsi-edit';
import UserImport from './gongsi/gongsi-import';
import myutils from "@/utils/myutils";

export default {
  name: "gongsigl",
  components: {UserImport, UserEdit},
  data() {
    return {
      // 表格数据接口
      url: this.serviceurl + '/TM_getallinfo_controller',
      // 表格列配置
      columns: [
        {
          columnKey: 'selection',
          type: 'selection',
          width: 45,
          align: 'center'
        },
        {
          columnKey: 'index',
          label: '序号',
          type: 'index',
          width: 60,
          align: 'center',
          showOverflowTooltip: true
        },
        {
          prop: 'ID',
          label: 'ID',
          showOverflowTooltip: true,
          minWidth: 110,
          show: false
        },
        {
          prop: 'GONGSIMC',
          label: '公司名称',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'GONGSILX',
          label: '公司类型',
          showOverflowTooltip: true,
          //处理数据
          formatter: (row) => {
            return myutils.getGONGSILXNAME(row.GONGSILX)
          },
          minWidth: 110,
        },
        {
          prop: 'COMGUIMOFL',
          label: '规模分类',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'COMPANYNAME',
          label: '父级公司名称',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'FUJIID',
          label: '父级ID',
          showOverflowTooltip: true,
          minWidth: 80,
          show: false
        },
        {
          prop: 'GONGSIGUIMOID',
          label: '公司规模ID',
          showOverflowTooltip: true,
          minWidth: 110,
          show: false
        },
        {
          prop: 'SHIFOUSJXFGSYWFB',
          label: '是否省检修（分）公司运维分部',
          showOverflowTooltip: true,
          minWidth: 180
        },
        {
          columnKey: 'action',
          label: '操作',
          width: 130,
          align: 'center',
          resizable: false,
          slot: 'action',
          fixed: "right"//固定右侧
        }
      ],
      // 表格搜索条件
      where: {
        table: "TMDB_PMS_GONGSI",
        paging: true,
        orderarray: JSON.stringify([{"ID": "DESC"}]),
        secondsearch: JSON.stringify(
          [
            {
              "condition": "FUJIID",//当前表的公司ID
              "targettable": "TMDB_PMS_GONGSI",// 去哪张表查询的表名
              "targetcolumn": "GONGSIMC",//  查询表的字段名称
              "returnname": "COMPANYNAME"//  查询表的字段名称  赋值给当前value的值
            },
            {
              "condition": "GONGSILX",
              "targettable": "TMDB_PMS_GONGSIGUIMO",
              "targetcolumn": "GUIMOFL",
              "returnname": "COMGUIMOFL"
            },

          ]
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
      GONGSILIST: []
    };
  },
  inject: ['reload'],
  methods: {
    /* 刷新表格 */
    reloads() {
      this.where.likemap = JSON.stringify({"GONGSIMC": this.where.GONGSIMC})
      this.where.equalmap = JSON.stringify({"GONGSILX": this.where.GONGSILX})
      this.$refs.table.reload({page: 1, where: this.where});
    },
    /* 重置搜索 */
    reset() {
      this.where = {};
      this.reload();
    },
    /* 添加 */
    openEdit(row) {

      var self = this

      // eslint-disable-next-line no-unused-vars
      let formDatas = new FormData()
      //数据库表名
      formDatas.append('table', 'TMDB_PMS_GONGSI')
      this.$requestsu.post("/TM_getallinfo_controller", formDatas).then(function (response) {
        console.log(response);
        self.GONGSILIST = response.data.data
      })
        .catch(function (error) {
          console.log(error);
        });

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
      formData.append('table', 'TMDB_PMS_GONGSI')
      formData.append('deletekey', "ID")
      formData.append('deletearray', JSON.stringify(arr))

      this.$requestsu.post("/TM_deletebatchbydeletekeys_controller", formData).then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          self.$message('删除公司管理数据成功');
          self.reload()
        } else {
          self.$message('删除公司管理数据失败');
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
      this.$confirm('确定要删除选中的公司管理信息吗?', '提示', {
        type: 'warning'
      }).then(() => {

        var dellist = []

        for (var i = 0; i < this.selection.length; i++) {
          dellist.push(this.selection[i].ID)
        }

        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()

        //数据库表名
        formData.append('table', 'TMDB_PMS_GONGSI')
        formData.append('deletekey', "ID")
        formData.append('deletearray', JSON.stringify(dellist))

        this.$requestsu.post("/TM_deletebatchbydeletekeys_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('批量删除公司管理数据成功');
            self.reload()
          } else {
            self.$message('批量删除公司管理数据失败');
          }
        })
          .catch(function (error) {
            console.log(error);
          });

      }).catch(() => {
      });
    }
  }

}
</script>

<style scoped>

</style>
