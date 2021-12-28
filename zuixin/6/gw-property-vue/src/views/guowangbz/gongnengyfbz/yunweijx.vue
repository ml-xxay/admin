<template>
  <div class="ele-body">
    <el-card shadow="never">
      <PubilceTable :suurl="url" :suwhere="where" tablekind="1" :columnsshow="true" tableheader="国网标准 —— 运维检修用房"></PubilceTable>
    </el-card>

  </div>
</template>

<script>

import PubilceTable from "@/views/guowangbz/PubilceTable";

export default {
  name: "yunweijx",
  components: {
    PubilceTable
  },
  data() {
    return {
      // 表格数据接口
      url: this.serviceurl + '/TM_getallinfo_controller',
      // 表格搜索条件
      where: {
        table: "TMDB_PMS_BIAOZHUN",
        paging: false,
        orderarray: JSON.stringify([{"FUJIID": "ASC"},{"XUHAO":"ASC"}]),
        equalmap: JSON.stringify({"GONGNENGYF": "运维检修生产用房","GONGSIFL": "公司用房"})
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
  }

}
</script>

<style scoped>

</style>
