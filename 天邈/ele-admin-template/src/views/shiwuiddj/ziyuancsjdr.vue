<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 数据表格 -->
      <ele-pro-table
        ref="table"
        :where="where"
        :datasource="url"
        :columns="columns"
        :selection.sync="selection">
        <!-- 表头工具栏 -->
        <template slot="toolbar">
          <el-button
            @click="dialogFormVisible = true"
            type="primary"
            icon="el-icon-upload2"
            class="ele-btn-icon"
            size="small">数据源
          </el-button>

          <el-button
            @click="removeBatch"
            type="danger"
            icon="el-icon-bottom"
            class="ele-btn-icon"
            size="small">导入
          </el-button>


          <el-dialog title="资源池数据导入" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="请输入资源池地址" :label-width="formLabelWidth">
                <el-input v-model="form.url" autocomplete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false" v-on:click="lookuel">确 定</el-button>
            </div>
          </el-dialog>
        </template>

      </ele-pro-table>
    </el-card>

  </div>
</template>

<script>

export default {
  name: "ziyuancsjdr",
  data() {
    return {
      form: {
        url: ''
      },
      formLabelWidth: '120px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 表格数据接口
      url: 'http://localhost:8081/ziyuanchisj.json',
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
          prop: 'FANGCHANID',
          label: '房产ID(*)',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
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
          minWidth: 80
        },
        {
          prop: 'GONGSIGUIMOID',
          label: '公司规模ID',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 110
        },
        {
          prop: 'SHIFOUSJXFGSYWFB',
          label: '是否省检修（分）公司运维分部',
          sortable: 'custom',
          showOverflowTooltip: true,
          minWidth: 150
        }
      ],
      // 表格搜索条件
      where: {},
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
    /*数据导入*/
    lookuel() {
      console.log(this.form.url);
    },
    /* 刷新表格 */
    reload() {
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
      /* const loading = this.$loading({lock: true});
       this.$http.delete('/sys/user/' + row.userId).then(res => {
         loading.close();
         if (res.data.code === 0) {
           this.$message.success(res.data.msg);
           this.reload();
         } else {
           this.$message.error(res.data.msg);
         }
       }).catch(e => {
         loading.close();
         this.$message.error(e.message);
       });*/

      console.log(row.YONGHUID);
    },
    /* 批量删除 */
    removeBatch() {
      if (!this.selection.length) {
        this.$message.error('请至少选择一条数据')
        return;
      }
      this.$confirm('确定要删除选中的用户吗?', '提示', {
        type: 'warning'
      }).then(() => {
        const loading = this.$loading({lock: true});
        this.$http.delete('/sys/user/batch', {
          data: this.selection.map(d => d.userId)
        }).then(res => {
          loading.close();
          if (res.data.code === 0) {
            this.$message({type: 'success', message: res.data.msg});
            this.reload();
          } else {
            this.$message.error(res.data.msg);
          }
        }).catch(e => {
          loading.close();
          this.$message.error(e.message);
        });
      }).catch(() => {
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
  },

}
</script>

<style scoped>

</style>
