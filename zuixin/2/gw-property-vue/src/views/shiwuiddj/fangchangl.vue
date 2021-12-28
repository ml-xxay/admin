<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form
        :model="where"
        label-width="100px"
        class="ele-form-search"
        @keyup.enter.native="reload"
        @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="5" :sm="12">
            <el-form-item label="实物ID编码">
              <el-input
                clearable
                v-model="where.SHIWUID"
                placeholder="请输入实物ID编码"/>
            </el-form-item>
          </el-col>
          <el-col :md="5" :sm="12">
            <el-form-item label="房产名称">
              <el-input
                clearable
                v-model="where.FANGCHANMC"
                placeholder="请输入房产名称"/>
            </el-form-item>
          </el-col>

          <el-col :md="5" :sm="12">
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
        :default-sort="{prop: 'ID', order: 'DESC'}"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
        :fit=true
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
      :GONGSILIST="GONGSILIST"
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
import UserEdit from './fangchan/fangchan-edit';
import UserImport from './fangchan/fangchan-import';
import myutils from "@/utils/myutils";


export default {
  inject: ['reload'],
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
          show: false//隐藏这个表头
        },
        {
          prop: 'COMPANYNAME',
          label: '公司名称',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'GONGSIID',
          label: '公司ID',
          showOverflowTooltip: true,
          minWidth: 110,
          show: false//隐藏这个表头
        },
        {
          prop: 'SHIWUID',
          label: '实物ID编码',
          showOverflowTooltip: true,
          minWidth: 180
        },
        {
          prop: 'FANGCHANMC',
          label: '房产名称',
          showOverflowTooltip: true,
          minWidth: 180
        },
        {
          prop: 'FANGCHANBH',
          label: '房产编号',
          showOverflowTooltip: true,
          minWidth: 180
        },
        {
          prop: 'SUOSHUTUDI',
          label: '所属土地',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'DIZHI',
          label: '地址',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'MIANJI',
          label: '面积',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'FANGCHANLAIYUAN',
          label: '房产来源',
          showOverflowTooltip: true,
          minWidth: 150,
          //处理数据
          formatter: (row) => {
            return myutils.getFangchan(row.FANGCHANLAIYUAN)
          },


        }, {
          prop: 'TOURUSHIYONGSJ',
          label: '投入使用时间',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'SHIYONGZHUANGTAI',
          label: '使用状态',
          showOverflowTooltip: true,
          minWidth: 150
        },

        {
          prop: 'ZAIJIAN',
          label: '在建',
          showOverflowTooltip: true,
          minWidth: 150
        },

        {
          prop: 'NICHAIQIAN',
          label: '拟拆迁',
          showOverflowTooltip: true,
          minWidth: 150
        },

        {
          prop: 'BUSHIYI',
          label: '不适宜',
          showOverflowTooltip: true,
          minWidth: 150
        },

        {
          prop: 'WEIFANG',
          label: '危房',
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
          fixed: "right"
        }
      ],
      // 表格搜索条件
      where: {
        table: "TMDB_PMS_FANGCHAN",
        paging: true,
        //排序
        orderarray: JSON.stringify([{"ID": "DESC"}]),
        //二次查询
        secondsearch: JSON.stringify(
          [
            {
              "condition": "GONGSIID",   //当前表的公司ID
              "targettable": "TMDB_PMS_GONGSI",// 去哪张表查询的表名
              "targetcolumn": "GONGSIMC",//  查询表的字段名称
              "returnname": "COMPANYNAME"//  查询表的字段名称  赋值给当前value的值
            }
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
      //公司列表
      GONGSILIST: []
    };
  },
  methods: {
    /* 刷新表格 */
    reloads() { 
      this.where.likemap = JSON.stringify({"SHIWUID": this.where.SHIWUID, "FANGCHANMC": this.where.FANGCHANMC})
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
      formData.append('table', 'TMDB_PMS_FANGCHAN')
      formData.append('deletekey', "ID")
      formData.append('deletearray', JSON.stringify(arr))

      this.$requestsu.post("/TM_deletebatchbydeletekeys_controller", formData).then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          self.$message('删除房产管理数据成功');
          self.reload()
        } else {
          self.$message('删除房产管理数据失败');
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
      this.$confirm('确定要删除选中的房产管理信息吗?', '提示', {
        type: 'warning'
      }).then(() => {

        var dellist = []

        for (var i = 0; i < this.selection.length; i++) {
          dellist.push(this.selection[i].ID)
        }

        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()

        //数据库表名
        formData.append('table', 'TMDB_PMS_FANGCHAN')
        formData.append('deletekey', "ID")
        formData.append('deletearray', JSON.stringify(dellist))

        this.$requestsu.post("/TM_deletebatchbydeletekeys_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('批量删除房产管理数据成功');
            self.reload()
          } else {
            self.$message('批量删除房产管理数据失败');
          }
        })
          .catch(function (error) {
            console.log(error);
          });

      }).catch(() => {
      });
    }
  },

}
</script>

<style scoped>

</style>
