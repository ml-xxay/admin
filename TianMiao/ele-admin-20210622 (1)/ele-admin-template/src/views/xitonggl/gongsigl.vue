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
            <el-form-item label="公司名称:">
              <el-input
                clearable
                v-model="where.GONGSIMC"
                placeholder="请输入公司名称"/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <el-form-item label="公司类型:">
              <el-input
                clearable
                v-model="where.GONGSILX"
                placeholder="请输入公司类型"/>
            </el-form-item>
          </el-col>

          <el-col :md="6" :sm="12">
            <div class="ele-form-actions">
              <el-button
                type="primary"
                icon="el-icon-search"
                class="ele-btn-icon"
                @click="reload">查询
              </el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->
      <ele-pro-table
        ref="table"
        :where="where"
        method="POST"
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
          <el-button
            @click="showImport=true"
            icon="el-icon-upload2"
            class="ele-btn-icon"
            size="small">导入
          </el-button>
        </template>
        <!-- 用户名列 -->
        <template slot="nickname" slot-scope="{row}">
          <router-link :to="'/system/user/info?id=' + row.userId">
            {{ row.nickname }}
          </router-link>
        </template>
        <!-- 角色列 -->
        <template slot="roles" slot-scope="{row}">
          <el-tag
            v-for="item in row.roles"
            :key="item.roleId"
            size="mini"
            type="primary"
            :disable-transitions="true">
            {{ item.roleName }}
          </el-tag>
        </template>
        <!-- 状态列 -->
        <template slot="state" slot-scope="{row}">
          <el-switch
            :active-value="0"
            :inactive-value="1"
            v-model="row.state"
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
import UserEdit from './xtgl/xitonggl-edit';
import UserImport from './xtgl/xitonggl-import';
import {post} from "@/utils/request";

export default {
  name: 'SystemUser',

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
          type: 'index',
          width: 45,
          align: 'center',
          showOverflowTooltip: true
        },
        {
          prop: 'ID',
          label: 'ID',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110,
        },
        {
          prop: 'GONGSILX',
          label: '公司类型',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110,
        },

        {
          prop: 'GONGSIMC',
          label: '公司名称',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'FUJIID',
          label: '父级ID',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110,

        },
        {
          prop: 'GONGSIGUIMOID',
          label: '公司规模ID',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110,
        },

        {
          columnKey: 'action',
          label: '操作',
          width: 130,
          align: 'center',
          resizable: false,
          slot: 'action'
        }
      ],
      // 表格搜索条件
      where: {
        table: "TMDB_PMS_GONGSI",
        paging: "true",
        orderarray: JSON.stringify([{"ID": "DESC"}])
      },
      // 表格选中数据
      selection: [],
      // 当前编辑数据
      current: null,
      // 是否显示编辑弹窗
      showEdit: false,
      // 是否显示导入弹窗
      showImport: false
    };
  },
  methods: {
    /* 刷新表格 */
    reload() {
      this.where.equalmap = JSON.stringify({"GONGSIMC": this.GONGSIMC,"GONGSILX":this.GONGSILX})
      this.$refs.table.reload({page: 1, where: this.where});
    },
    /* 重置搜索 */
    reset() {
      this.where = {};
      this.reload();
    },
    /* 显示编辑 */
    openEdit(row) {
      this.current = row;
      this.showEdit = true;
    },
    /* 删除 */
    // eslint-disable-next-line no-unused-vars
    remove(row) {
      console.log(row.ID)
      // eslint-disable-next-line no-unused-vars
      var self = this;
      // eslint-disable-next-line no-unused-vars
      var arr = [];
      arr.push(row.ID)
      // eslint-disable-next-line no-unused-vars
      var formData = new FormData();//通过append方法添加数据
      formData.append("table", "TMDB_PMS_GONGSI")
      formData.append("deletearray", JSON.stringify(arr))
      formData.append("deletekey", "ID")

      console.log(formData.get("table"));
      console.log(formData.get("deletearray"));

      console.log(typeof formData.get("deletearray"));

      console.log(formData.get("deletekey"));
      // eslint-disable-next-line no-unused-vars
      post("/TM_deletebatchbydeletekeys_controller", formData).then(res => {

        // eslint-disable-next-line no-empty
        if (res.data.code === 200) {

          self.$message.success('删除成功')
          self.reload()
        } else {
          self.$message.error('删除失败')
          self.reload()
        }

      }).catch(e => {

        this.$message.error(e.message);
      });
    },
    /* 批量删除 */
    async removeBatch() {
      if (!this.selection.length) {
        this.$message.error('请至少选择一条数据')
        return;
      }
      // eslint-disable-next-line no-unused-vars
      const confirmResult = await this.$confirm('确定要删除选中的用户吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      console.log(confirmResult)
      // eslint-disable-next-line no-empty
      if (confirmResult !== 'confirm') {
        this.$message.error('删除失败')
      }
      // eslint-disable-next-line no-unused-vars

      // eslint-disable-next-line no-unused-vars
      var arrs = [];
      //拿到所有选中的数组  要遍历
      for (var i = 0; i < this.selection.length; i++) {
        arrs.push(this.selection[i].ID)  //[i]  意思是    i指向你勾选对象  [i].id  你勾选对象里的id
       }


      var formData = new FormData();//通过append方法添加数据
      formData.append("table", "TMDB_PMS_GONGSI")
      formData.append("deletearray", JSON.stringify(arrs))
      formData.append("deletekey", "ID")

      post("/TM_deletebatchbydeletekeys_controller", formData).then(res => {
        if (res.data.code == 200){
          this.$message.success('删除成功')
          this.reload()
        }else {
          this.$message.error('删除失败')
        }
      })
      .catch(e => {

        this.$message.error(e.message);
      });
    },
    /* 更改状态 */
    editState(row) {
      const loading = this.$loading({lock: true});
      let params = new FormData();
      params.append('state', row.state);
      this.$http.put('/sys/user/state/' + row.userId, params).then(res => {
        loading.close();
        if (res.data.code === 0) {
          this.$message({type: 'success', message: res.data.msg});
        } else {
          row.state = !row.state ? 1 : 0;
          this.$message.error(res.data.msg);
        }
      }).catch(e => {
        loading.close();
        this.$message.error(e.message);
      });
    }
  }
}
</script>

<style scoped>
</style>
