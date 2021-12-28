<template>
  <el-card>
    <el-button type="primary" @click="addCourse">添加课程</el-button>
    <el-table
      :data="course"
      align="center"
      border
      style="width: 100%"
      :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }"
    >
      <el-table-column label="序号" type="index" > </el-table-column>
      <el-table-column prop="picture" label="封面" >
        <template slot-scope="scope">
          <img :src="scope.row.picture" alt="" class="showImg" />
        </template>
      </el-table-column>
      <el-table-column prop="courseName" label="课程名称" >
      </el-table-column>
      <el-table-column prop="classify_sub_name" label="所属分类" >
      </el-table-column>
      <el-table-column prop="userName" label="授课讲师" >
      </el-table-column>
      <el-table-column prop="status" label="状态" width="150">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            @change="statusChange(scope.row)"
            active-color="#409eff"
            inactive-color="#dcdfe6"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" round @click="editCourse(scope.row.id)"
            >查看</el-button
          >
          <el-button type="danger" size="mini" round @click="romove(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>
<script>
import { getcourses } from "@/network/course";
export default {
  name: "CourseManagement",
  components: {},
  props: {},
  data() {
    return {
      course: [], //课程
    };
  },
  created() {
    this.getCourse();
  },
  methods: {
    // 获取课程数据
    getCourse() {
      getcourses().then((res) => {
        let { data } = res;
        data.forEach((item) => {
          if (item.status == 1) {
            return (item.status = false);
          } else {
            return (item.status = true);
          }
        });
        if (res.code !== 200) return this.$message.error(res.msg);
        this.course = res.data;
      });
    },
    // 监听状态改变
    statusChange(info) {
      console.log(info);
    },
    // 添加课程
    addCourse() {
      this.$router.push("/addCourse");
    },
    // 查看课程详情
    editCourse(id) {
      this.$router.push({path:"/editcourse",query:{id}});
    },
    // 删除
    romove(id){
      console.log(id);
    }
  },
};
</script>
<style scoped>
.showImg {
  width: 150px;
  height: 84px;
}
</style>