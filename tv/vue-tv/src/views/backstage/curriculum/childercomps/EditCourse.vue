<template>
  <el-card>
    <!-- 课程信息 -->
    <div class="top">
      <span>查看课程</span>
      <el-button type="primary" size="mini" @click="gocourse"
        >返回课程列表</el-button
      >
    </div>
    <el-form
      class="edit"
      :model="courseInfo"
      ref="CourseInfo"
      label-width="100px"
    >
      <div class="left">
        <el-form-item label="更改封面" style="margin: 15px 0">
          <el-upload
            class="upload-demo"
            action="http://upload.qiniup.com/"
            :http-request="handlePreview"
            accept=".png, .jpg, .gif"
            :limit="1"
            :show-file-list="false"
          >
            <el-button type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <!-- 图片 -->
        <div class="showImg">
          <img :src="courseInfo.picture" />
        </div>
        <!-- 按钮 -->
        <el-form-item class="phoe">
          <el-button type="primary" @click="modify">修改基本信息</el-button>
        </el-form-item>
      </div>
      <div class="right">
        <!-- 课程名称 -->
        <el-form-item label="课程名称:" prop="courseName">
          <el-input
            style="width: 90%"
            v-model="courseInfo.courseName"
            placeholder="请输入课程名称"
          ></el-input>
        </el-form-item>
        <!-- 课程分类 -->
        <el-form-item label="分类:" prop="classify_name">
          <el-input
            v-model="courseInfo.classify_name"
            placeholder="请选择一级分类"
            style="width: 217px"
            disabled
          ></el-input>
          <el-input
            v-model="courseInfo.classify_sub_name"
            placeholder="请选择二级分类"
            style="width: 217px; margin-left: 20px"
            disabled
          ></el-input>
        </el-form-item>
        <!-- 级别 -->
        <div class="form-row">
          <el-form-item label="级别:" prop="level">
            <el-select
              v-model="courseInfo.level"
              placeholder="请选择课程级别"
              disabled
            >
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="推荐权重:" prop="weight">
            <el-input
              v-model="courseInfo.weight"
              placeholder="请输入权重(整数)"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 是否免费与价格 -->
        <div class="price">
          <el-form-item label="是否免费:" prop="free">
            <el-select v-model="courseInfo.free" placeholder="请选择是否免费">
              <el-option
                v-for="item in frees"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 价格 -->
          <el-form-item label="价格:">
            <el-input v-model="courseInfo.price"></el-input>
          </el-form-item>
        </div>
        <!-- 讲师 -->
        <el-form-item label="讲师:">
          <el-input
            style="width: 217px"
            v-model="courseInfo.userName"
          ></el-input>
        </el-form-item>
        <!-- 课程描述 -->
        <el-form-item label="课程描述">
          <el-input type="textarea" v-model="courseInfo.brief"></el-input>
        </el-form-item>
      </div>
    </el-form>
    <!-- 章节 -->
    <el-tabs v-model="activeName">
      <!-- 章节信息 -->
      <el-tab-pane label="章节信息" name="first">
        <el-form
          ref="information"
          label-width="80px"
          class="information"
          v-for="item in courseSection"
          :model="item"
          :key="item.id"
        >
          <!-- 章 -->
          <el-form-item label="章名称:">
            <el-input
              v-model="item.name"
              placeholder="请输入章名称"
              style="width: 300px; margin-right: 15px"
            ></el-input>
            <el-button type="danger">删除章</el-button>
            <el-button type="primary" @click="chapter(item)">修改章</el-button>
          </el-form-item>
          <!-- 节 -->
          <div class="form-row" v-for="citem in item.children" :key="citem.id">
            <el-form-item label="节信息:">
              <el-input
                placeholder="请输入节名称"
                style="width: 200px"
                v-model="citem.name"
              ></el-input>
            </el-form-item>
            <el-form-item label="视屏地址:">
              <el-input
                placeholder="请输入视屏地址"
                style="width: 200px"
                v-model="citem.video_url"
              ></el-input>
            </el-form-item>
            <el-form-item label="时长:">
              <el-input
                placeholder="请输入时长"
                style="width: 200px"
                v-model="citem.time"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="15px">
              <el-button type="warning">删除节</el-button>
              <el-button type="primary" @click="chapter(citem)"
                >修改节</el-button
              >
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
      <!-- 添加章节 -->
      <el-tab-pane label="添加章节" name="second">
        <div class="addfrist">
          <el-button type="success" @click="addCourseinfo(addCourse)">保存章节</el-button>
          <el-button type="warning">导入章节</el-button>
        </div>
        <el-form
        :model="addCourse"
         :rules="rules"
         label-width="100px"
         ref="addCourse"
         class="information">
          <el-form-item label="章名称" prop="section_name">
            <div class="form-row">
              <el-input
              v-model="addCourse.section_name"
                placeholder="请输入章名称"
                style="width: 300px; margin-right: 15px"
              ></el-input>
              <el-button type="warning">删除章</el-button>
            </div>
          </el-form-item>
           <div class="form-row">
            <el-form-item label="节信息:" prop="node_name">
              <el-input
              v-model="addCourse.node_name"
                placeholder="请输入节名称"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="15px" prop="video_url">
              <el-input
              v-model="addCourse.video_url"
                placeholder="请输入视屏地址"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="15px" prop="time">
              <el-input
               v-model="addCourse.time"
                placeholder="请输入时长"
                style="width: 200px"
              ></el-input>
            </el-form-item>
            <el-form-item label-width="15px">
              <el-button type="warning">删除节</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import * as qiniu from "qiniu-js";
import {
  getqiniu,
  etidCourse,
  getCourseInfo,
  editSection,
  addCourseSection
} from "@/network/course";
export default {
  name: "EditCourse",
  components: {},
  props: {},
  data() {
    return {
      id: null,
      courseInfo: {}, // 课程信息
      url: "http://r45kz1ucm.hn-bkt.clouddn.com",
      activeName: "first",
      courseSection: [], //章节信息
      // 添加章--节
      addCourse:{
        course_id:null,
        parent_id:0,
        section_name:'',//章节名称
        node_name:'',//节名称
        video_url:'',
        time:''
      },
      frees: [
        { value: 0, label: "免费" },
        { value: 1, label: "收费" },
      ],
      levels: [
        { value: 1, label: "初级" },
        { value: 2, label: "中级" },
        { value: 3, label: "高级" },
      ],
        rules: {
        section_name: [
          { required: true, message: "请输入章名称", trigger: "blur" },
        ],
        node_name: [
          { required: true, message: "请输入节名称", trigger: "blur" },
        ],
        video_url: [
          { required: true, message: "请输入视频链接", trigger: "blur" },
        ],
        time: [{ required: true, message: "请输入视频时长", trigger: "blur" }],
      },
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.addCourse.course_id = this.$route.query.id;
    console.log(this.addCourse.course_id);
    this.getEditCourseInfo(this.id);
  },
  methods: {
    // 修改基本信息
    modify() {
      // 拿到表单引用对象
      this.$refs.CourseInfo.validate((valid) => {
        if (!valid) return;
        etidCourse(this.courseInfo).then((res) => {
          console.log(res);
          if (res.code !== 200) return this.$message.error("修改信息失败");
          this.$message.success("修改信息成功");
        });
      });
    },
    // 修改章修改节
    chapter(item) {
      let { course_id, id, parent_id, name, video_url, time } = item;
      editSection({ course_id, id, parent_id, name, video_url, time }).then(
        (res) => {
          console.log(res);
          if (res.code !== 200) return this.$message.error("修改参数失败");
          this.$message.success("修改成功呦");
        }
      );
    },
    // 添加章--节
    addCourseinfo(){
      this.$refs.addCourse.validate((valid)=>{
        if(!valid) return this.$message.error("请先将课程信息填写完毕在进行添加!");
        addCourseSection(this.addCourse).then((res)=>{
          if(res.code !==200) return this.$message.error("添加失败");
          this.$message.success("添加成功");
          this.$refs.addCourse.resetFields();//重置
        })
      })
    },
    //上传图片
    async handlePreview(e) {
      let { file } = e;
      let filename = file.name;
      let { qiniuToken } = await getqiniu();
      let observable = qiniu.upload(file, filename, qiniuToken);
      observable.subscribe({
        // 上传失败
        error: (errResult) => {
          // 失败报错信息
          let { error } = errResult.data;
          this.$message.error(error);
        },
        complete: (result) => {
          let { key } = result;
          this.$message.success("更换图片成功,点击修改基本信息方可保存！");
          this.courseInfo.picture = `${this.url}/${key}`; //拼接
        },
      });
    },
    // 根据传来的id  获取课程查看详情数据
    getEditCourseInfo(id) {
      getCourseInfo(id).then((res) => {
        console.log(res);
        if (res.code !== 200) return this.$message.error("获取数据失败");
        this.courseInfo = res.data.couresInfo;
        this.courseSection = this.tree(res.data.courseSection, 0);
      });
    },
    tree(data, parentid) {
      let tree = [];
      if (data !== null && data !== undefined) {
        data.forEach((item) => {
          if (item.parent_id === parentid) {
            tree.push(item); //这个item为父级
            this.treeChildren(data, item, item.id); //这个item为父级  item.id是父级的id
          }
        });
        return tree;
      }
    },
    treeChildren(data, fitem, id) {
      //这个fitem为父级
      fitem.children = fitem.children ? fitem.children : [];
      data.forEach((item) => {
        //这个item为所有项
        if (item.parent_id === id) {
          //这个id为传过来的父级id
          fitem.children.push(item);
          this.treeChildren(data, item, item.id); //这个item是parent_id=父级id的所有子项
          //这个item.id是所有子项的id
          //再走一次这个方法事为了看子项里面还有没有子项
        }
      });
      return fitem.children;
    },
    // 返回上一级
    gocourse() {
      this.$router.back();
    },
  },
};
</script>
<style lang="less" scoped>
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 50px;
  padding-left: 15px;
  width: 99%;
  height: 50px;
}
.edit {
  display: flex;
  height: 460px;
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #cccccc;
}
.left {
  width: 420px;
  padding-left: 15px;
}
.showImg {
  width: 420px;
  height: 235px;
}
.showImg img {
  width: 100%;
  height: 100%;
  border: 1px solid #cccccc;
}
.phoe {
  text-align: center;
  margin-top: 40px;
  margin-left: -100px;
}
.right {
  flex: 1;
  padding: 15px 0 0 20px;
}
.form-row {
  display: flex;
}
.price {
  display: flex;
}
.information {
  border: 1px solid #ccc;
  border-left: 5px solid #ccc;
  padding: 15px 0;
}
.addfrist {
  display: flex;
  margin-bottom: 20px;
}
</style>