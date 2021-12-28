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
            <el-form-item label="用户权限">
              <el-input
                clearable
                v-model="where.YONGHUQUANXIAN"
                placeholder="请输入用户权限"/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="公司ID">
              <el-input
                clearable
                v-model="where.GONGSIID"
                placeholder="请输入公司ID"/>
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
        <!-- 状态列 -->
        <template slot="state" slot-scope="{row}">
          <el-switch
            :active-value=start_yes
            :inactive-value=start_no
            v-model="row.ZHUANGTAI"
            @change="editState(row)"/>
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
import UserEdit from './user/user-edit';
import UserImport from './user/user-import';


export default {
  name: "renyuangl",
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
        /* {
           columnKey: 'index',
           label: '序号',
           type: 'index',
           width: 60,
           align: 'center',
           showOverflowTooltip: true
         },*/
        {
          prop: 'ID',
          label: 'ID',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'ZHANGHAO',
          label: '账号',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'MIMA',
          label: '密码',
          showOverflowTooltip: true,
          minWidth: 80
        },
        {
          prop: 'GONGSIID',
          label: '公司ID',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'YONGHUQUANXIAN',
          label: '用户权限',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'FANGKE',
          label: '访客',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'ZHUANGTAI',
          label: '状态',
          align: 'center',
          width: 80,
          slot: 'state'
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
        table: "TMDB_PMS_YONGHU",
        paging: true,
        orderarray: JSON.stringify([{"ID": "DESC"}])
      },
      // 表格选中数据
      selection: [],
      // 当前编辑数据
      current: null,
      // 是否显示编辑弹窗
      showEdit: false,
      // 是否显示导入弹窗
      showImport: false,
      start_yes: '可用',
      start_no: '不可用'
    };
  },
  inject: ['reload'],
  methods: {
    /* 刷新表格 */
    reloads() {
      this.where.likemap = JSON.stringify({
        "GONGSIID": this.where.GONGSIID,
        "YONGHUQUANXIAN": this.where.YONGHUQUANXIAN
      })
      this.$refs.table.reload({page: 1, where: this.where});
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
      console.log(row);
      var self = this
      var arr = []
      arr.push(row.ID)

      // eslint-disable-next-line no-unused-vars
      let formData = new FormData()
      //数据库表名
      formData.append('table', 'TMDB_PMS_YONGHU')
      formData.append('deletekey', "ID")
      formData.append('deletearray', JSON.stringify(arr))

      this.$requestsu.post("/TM_deletebatchbydeletekeys_controller", formData).then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          self.$message('删除用户信息数据成功');
          self.reload()
        } else {
          self.$message('删除用户信息数据失败');
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
      this.$confirm('确定要删除选中的用户吗?', '提示', {
        type: 'warning'
      }).then(() => {
        console.log(this.selection);

        var dellist = []

        for (var i = 0; i < this.selection.length; i++) {
          console.log(this.selection[i].ID);
          dellist.push(this.selection[i].ID)
        }

        // eslint-disable-next-line no-unused-vars
        let formData = new FormData()

        //数据库表名
        formData.append('table', 'TMDB_PMS_YONGHU')
        formData.append('deletekey', "ID")
        formData.append('deletearray', JSON.stringify(dellist))

        this.$requestsu.post("/TM_deletebatchbydeletekeys_controller", formData).then(function (response) {
          console.log(response);
          if (response.data.code === 200) {
            self.$message('批量删除用户信息数据成功');
            self.reload()
          } else {
            self.$message('批量删除用户信息数据失败');
          }
        })
          .catch(function (error) {
            console.log(error);
          });


      }).catch(() => {
      });
    },
    /* 更改状态 */
    editState(row) {
      const loading = this.$loading({lock: true});
      let params = new FormData();
      params.append('ZHUANGTAI', row.ZHUANGTAI);
      loading.close();

      var self = this

      // eslint-disable-next-line no-unused-vars
      let formData = new FormData()
      //数据库表名
      formData.append('table', 'TMDB_PMS_YONGHU')
      formData.append('ID', row.ID)
      formData.append('ZHUANGTAI', params.get("ZHUANGTAI"))

      this.$requestsu.post("/TM_updateone_controller", formData).then(function (response) {
        console.log(response);
        if (response.data.code === 200) {
          self.$message('修改用户信息状态数据成功');
          self.reload()
        } else {
          self.$message('修改用户信息状态数据失败');
          self.reload()
        }
      })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

}
</script>

<style scoped>

</style>
