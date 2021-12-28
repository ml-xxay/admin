<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 数据表格 -->
      <ele-pro-table
        :default-sort="{prop: 'ID', order: 'DESC'}"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}"
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
            @click="exportBatch"
            icon="el-icon-upload2"
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
      formLabelWidth: '180px',
      dialogTableVisible: false,
      dialogFormVisible: false,
      // 表格数据接口
      url: 'http://localhost:8881/ziyuanchisj.json',
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
          label: '房产ID(*)',
          showOverflowTooltip: true,
          minWidth: 140
        },
        {
          prop: 'DANWBB',
          label: '所属省级单位',
          showOverflowTooltip: true,
          minWidth: 160
        },
        {
          prop: 'DISGS',
          label: '所属市级单位',
          showOverflowTooltip: true,
          minWidth: 160
        },
        {
          prop: 'XIANJGS',
          label: '所属区县级单位',
          showOverflowTooltip: true,
          minWidth: 190
        },
        {
          prop: 'FANGCDL',
          label: '房产大类',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'FANGCXL',
          label: '房产小类',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'FANGCZH',
          label: '房产证号',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'ZHENGZRMC',
          label: '证载人名称',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'BUDCQZFJ',
          label: '房产证上传',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'FANGCNAME',
          label: '房产名称',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'SWID',
          label: '实物ID编码',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'TUDBH',
          label: '土地ID编码',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'XIANGMCODE',
          label: '项目编码',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'ZICCODE',
          label: '资产编码',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'WBSCODE',
          label: 'WBS编码',
          showOverflowTooltip: true,
          minWidth: 150
        }
        ,
        {
          prop: 'SHENG',
          label: '省',
          showOverflowTooltip: true,
          minWidth: 100
        },
        {
          prop: 'SHI',
          label: '市',
          showOverflowTooltip: true,
          minWidth: 100
        },
        {
          prop: 'XIAN',
          label: '县',
          showOverflowTooltip: true,
          minWidth: 100
        },
        {
          prop: 'ADDRESS',
          label: '地址',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'WAIGTP',
          label: '外观图片',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'JINGD',
          label: '精度',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'WEID',
          label: '纬度',
          showOverflowTooltip: true,
          minWidth: 90
        },
        {
          prop: 'GIS',
          label: 'GIS',
          showOverflowTooltip: true,
          minWidth: 70
        },
        {
          prop: 'TOUYSJ',
          label: '投运时间',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'FANGWSYQK',
          label: '房屋使用情况',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'JIANZMJ',
          label: '建筑面积（单位：m2）',
          showOverflowTooltip: true,
          minWidth: 210
        },
        {
          prop: 'JIEGXX',
          label: '房屋的建筑结构形式',
          showOverflowTooltip: true,
          minWidth: 180
        },
        {
          prop: 'JIANZCS',
          label: '建筑总层数',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'DISCS',
          label: '建筑的地表以上层数',
          showOverflowTooltip: true,
          minWidth: 180
        },
        {
          prop: 'DIXCS',
          label: '建筑的地表以下层数',
          showOverflowTooltip: true,
          minWidth: 180
        },
        {
          prop: 'BIM',
          label: 'BIM/3D',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'YUANZ',
          label: '原值（单位：万元）',
          showOverflowTooltip: true,
          minWidth: 180
        },
        {
          prop: 'SHEJSYNX',
          label: '设计使用年限（单位：月）',
          showOverflowTooltip: true,
          minWidth: 230
        },
        {
          prop: 'ZHEJRQ',
          label: '折旧开始日期',
          showOverflowTooltip: true,
          minWidth: 150
        },
        {
          prop: 'SHENGYSYYF',
          label: '剩余使用月份（单位：月）',
          showOverflowTooltip: true,
          minWidth: 230
        },
        {
          prop: 'BEIZ',
          label: '备注',
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
    /* 导入 */
    exportBatch() { 
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
