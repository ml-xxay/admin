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
          <el-col :md="7" :sm="12" >
            <el-form-item label="所属公司:" style="width: 380px">
              <treeselect
                v-model="where.GONGSILX"
                :options="orageList"
                placeholder="请选择所属公司"
                :defaultExpandLevel="2"
                :normalizer="normalizer"/>
            </el-form-item>
          </el-col>
          <el-col :md="5" :sm="12">
            <el-form-item label="用户权限">
              <el-select
                clearable
                class="ele-block"
                v-model="where.YONGHUQUANXIAN"
                placeholder="请选择用户权限">
                <el-option label="超级管理员" value="1"/>
                <el-option label=" 国网用户" value="2"/>
                <el-option label="省级用户 " value="3"/>
                <el-option label="市级用户" value="4"/>
                <el-option label="县级用户" value="5"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="5" :sm="12">
            <el-form-item label="用户账号">
              <el-input
                clearable
                v-model="where.ZHANGHAO"
                placeholder="请输入用户账号"/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12" >
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
        :header-cell-style="{textAlign: 'center'}"
        :cell-style="{ textAlign: 'center' }"
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
            title="确定要删除此条记录吗？"
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
      :GONGSILIST_jb="GONGSILIST"
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
import myutils from "@/utils/myutils";
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

export default {
  name: "renyuangl",
  components: {UserImport, UserEdit, Treeselect},
  data() {
    return {
      sutang: '',
      orageList: [],
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
          showOverflowTooltip: true,
          minWidth: 110,
          show: false
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
          minWidth: 80,
          show: false
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
          show: false
        },
        /* {
           prop: 'QUANXIANNAME',
           label: '用户权限',
           showOverflowTooltip: true,
           minWidth: 110
         },*/
        {
          prop: 'YONGHUQUANXIAN',
          label: '用户权限',
          showOverflowTooltip: true,
          minWidth: 110,
          //处理数据
          formatter: (row) => {
            return myutils.getQUANXIAN(row.YONGHUQUANXIAN)
          },
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
        orderarray: JSON.stringify([{"ID": "DESC"}]),
        //二次查询
        secondsearch: JSON.stringify(
          [
            {
              //当前表的  公司ID
              "condition": "GONGSIID",
              //去哪一张表查询（公司表）
              "targettable": "TMDB_PMS_GONGSI",
              //查询表的字段名称
              "targetcolumn": "GONGSIMC",
              //查询表的字段名称赋值给当前value值
              "returnname": "COMPANYNAME"
            },
            {
              //当前表的  公司ID
              "condition": "YONGHUQUANXIAN",
              //去哪一张表查询（公司表）
              "targettable": "TMDB_PMS_GONGSI",
              //查询表的字段名称
              "targetcolumn": "GONGSIMC",
              //查询表的字段名称赋值给当前value值
              "returnname": "QUANXIANNAME"
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
      start_yes: '可用',
      start_no: '不可用',
      //传值公司列表
      GONGSILIST: [],
      //公司列表
      GONGSILISTs: []
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
        this.orageList = result 
      }).catch(e => {
        console.log(e)
      });
    }, 

    /* 刷新表格 */
    reloads() {

      this.where.likemap = JSON.stringify({
        "ZHANGHAO": this.where.ZHANGHAO,
      })

      this.where.equalmap = JSON.stringify({
        "YONGHUQUANXIAN": this.where.YONGHUQUANXIAN,
        "GONGSIID": this.where.GONGSILX
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

        var dellist = []

        for (var i = 0; i < this.selection.length; i++) {
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
  },
  created() {
    var self = this

    this.getOrageList();

    //获取全部公司列表
    // eslint-disable-next-line no-unused-vars
    let formDatas = new FormData()
    //数据库表名
    formDatas.append('table', 'TMDB_PMS_GONGSI')
    this.$requestsu.post("/TM_getallinfo_controller", formDatas).then(function (response) {
      self.GONGSILISTs = response.data.data
    })
      .catch(function (error) {
        console.log(error);
      });
  }

}
</script>

<style scoped>

</style>
