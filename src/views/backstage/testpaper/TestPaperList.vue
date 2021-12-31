<template>
  <el-card>
    <el-button type="primary" @click="addtp">新增试卷</el-button>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :header-cell-style="{ 'text-align': 'center' }"
      :cell-style="{ 'text-align': 'center' }"
    >
      <el-table-column label="序号" type="index"> </el-table-column>
      <el-table-column prop="name" label="试卷名称"> </el-table-column>
      <el-table-column prop="time" label="时长(分钟)"> </el-table-column>
      <el-table-column prop="classify_sub_name" label="所属科目">
      </el-table-column>
      <el-table-column label="等级">
        <template prop="level" slot-scope="scope">
          <el-rate v-model="scope.row.level" :allow-half="false"></el-rate>
        </template>
      </el-table-column>
      <el-table-column prop="create_user" label="出题人"> </el-table-column>
      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status"></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="testpaperInfo(scope.row.id)">查看</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.pageNum"
      :page-sizes="[5, 7, 10]"
      :page-size="query.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>
<script>
import { getExamList } from "@/network/testpaper";
export default {
  name: "TestPaperList",
  components: {},
  props: {},
  data() {
    return {
      query: {
        pageNum: 1,//页
        limit: 5,//条
      },
      total: 0,
      tableData: [],
    };
  },
  created() {
    this.getExamLists(this.query);
  },
  methods: {
    testpaperInfo(id){
      this.$router.push({ path: "/textpaperinfo", query: { id } });
    },
    // 分页
      handleSizeChange(val) {//条
        this.query.limit = val;
        this.getExamLists(this.query);
      },
      handleCurrentChange(val) {//页
        this.query.pageNum = val;
        this.getExamLists(this.query);
      },
    // 获取试卷数据
    async getExamLists(query) {
      let { total, data, code } = await getExamList(query);
      console.log(data);
      if (code !== 200) return this.$message.error("请求数据失败");
      for (const item of data) {
        if (item.status == 0) {
          item.status = true;
        } else {
          item.status = false;
        }
      }
      this.total = total;
      this.tableData = data;
    },
    // 添加试卷
    addtp() {
      this.$router.push("addtextpaper");
    },
  },
};
</script>
<style scoped>
</style>