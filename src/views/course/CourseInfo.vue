<template>
  <el-card class="card">
    <!-- 头部 -->
    <div class="top">
      <div class="top-o">{{couresInfo.brief}}</div>
      <div class="top-t">
        <div style="margin-left: -50px"><el-button type="primary">加入订单</el-button></div>
        <div class="c">上次学到</div>
        <div class="c">学习人数</div>
        <div class="c">难度级别:{{level(couresInfo.level)}}</div>
        <div class="c" style="border-right: none">课程时长</div>
        <div style="font-size: 30px"><i class="el-icon-star-off"></i></div>
      </div>
      <div class="top-s">简介:Cloud Backup的基本功能和主要架构</div>
        <!-- 选项卡 -->
    <el-tabs v-model="active" @tab-click="handleClick">
      <el-tab-pane label="章节" name="first">
        <!-- 第一章 -->
        <el-tree
        default-expand-all
          :data="courseList"
          :props="defaultProps"
          @node-click="handleNodeClick"
        ></el-tree>
      </el-tab-pane>
      <el-tab-pane label="评论" name="second">评论</el-tab-pane>
      <el-tab-pane label="问答" name="third">问答</el-tab-pane>
    </el-tabs>
    </div>
  
  </el-card>
</template>

<script>
// 课程目录
import { getCourseInfo } from "@/network/course";
export default {
  name: "CourseInfo",
  components: {},
  data() {
    return {
      id: "",
      percentage: "",
      customColor: "",
      active: "first",
      activeName: "1",
      courseList: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      couresInfo:{}
    };
  },
  created() {
    // 1 拿到传过来的id  发送网络请求  渲染详情页
    this.id = this.$route.query.id;
    // console.log(this.id);
    this.getCourseInfo(this.id);
  },
  methods: {
    // 获取目录数据
    getCourseInfo(id) {
      getCourseInfo(id).then((res) => {
        console.log(res);
        let { courseSection,couresInfo } = res.data;
        this.couresInfo = couresInfo
        this.courseList = this.tree(courseSection, 0);
      });
    },
    level(level) {
      if (level === 1) {
        return "初级";
      }
      if (level === 2) {
        return "中级";
      }
      if (level === 3) {
        return "高级";
      }
    },
    // 递归
    tree(data, parentId) {
      let tree = [];
      if (data !== null && data !== undefined) {
        data.forEach((item) => {
          if (item.parent_id === parentId) {
            tree.push(item);
            console.log(item);
            this.directoryTreeChildren(data, item, item.id);
          }
        });
        return tree;
      }
    },
    directoryTreeChildren(data, parentItem, parentId) {
      parentItem.children = parentItem.children ? parentItem.children : [];
      data.forEach((item) => {
        if (item.parent_id === parentId) {
          parentItem.children.push(item);
          this.directoryTreeChildren(data, item, item.id);
        }
      });
      return parentItem.children;
    },
    handleClick(tab, event) {
      console.log(tab, event); 
    },
    handleNodeClick(data) {
      data.courseList = JSON.stringify(this.courseList);
      console.log(data);
      this.$store.commit("ADDSECTION", data);
      this.$router.push({ path: "/coursevideo", query: { name: data.name } });
    },
    // ship() {
    //   this.$router.push("/wodeship");
    //   this.$store.dispatch("setData", this.kecheng);
    // },
  },
};
</script>

<style scoped>
.ele-body {
  width: 100%;
  height: 100%;
}
.el-tabs {
  font-size: 30px;
}
.card {
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 100%;
  background-color: #FCFCFC;
}
.el-tree{
  font-size: 40px;
  padding: 10px;
  background: #EBEBEB;
}

.top {
  width: 800px;
  height: 250px;
  margin: auto;
  /* background-color: blue; */
}
.top-o {
  height: 60px;
  line-height: 60px;
  font-size: 30px;
  font-weight: 700;
  color: black;
  /* background-color: pink; */
}
.top-t {
  display: flex;
  justify-content: center;
  height: 55px;
  line-height: 55px;
  margin-top: 15px;
  /* background-color: pink; */
}
.c {
  width: 150px;
  text-align: center;
  border-right: 1px solid #eee;
  /* background-color: purple; */
}
.top-s {
  height: 55px;
  line-height: 55px;
  font-size: 20px;
  margin-top: 20px;
}
.kecheng {
  width: 100%;
  height: 100%;
  line-height: 50px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  border-bottom: 1px solid #8a8a8a;
}
.el-tabs {
  width: 800px;
  /* margin-left: 150px; */
}
.el-collapse {
  width: 800px;
  /* margin-left: 150px; */
}
.canent {
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  width: 100%;
}
.canent div {
  margin: 15px;
  width: 350px;
  height: 300px;
  text-align: center;
  line-height: 300px;
  /* background-color: pink; */
  border: 1px solid red;
}
.el-icon-video-play {
  font-size: 60px;
}
.y {
  display: flex;
  padding: 20px 0;
}
.y:hover {
  background-color: #eee;
  color: blue;
}
.el-steps {
  margin-right: 15px;
}

.z::before {
  position: relative;
  right: 5px;
  content: "---";
}
</style>
