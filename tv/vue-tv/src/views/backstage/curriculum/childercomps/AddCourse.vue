<template>
  <el-card>
    <div class="top">
      <span>添加课程</span>
      <el-button type="primary" size="mini" @click="gocourse"
        >返回课程列表</el-button
      >
    </div>
    <el-form
      class="edit"
      :model="addCourse"
      ref="addCourse"
      :rules="rules"
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
          <img :src="addCourse.picture" />
        </div>
        <!-- 按钮 -->
        <el-form-item class="phoe">
          <el-button type="primary" @click="submitForm(addCourse)">保存课程信息</el-button>
          <el-button @click="rest">重置</el-button>
        </el-form-item>
      </div>
      <div class="right">
        <!-- 课程名称 -->
        <el-form-item label="课程名称:" prop="courseName">
          <el-input
            style="width: 90%"
            v-model="addCourse.courseName"
            placeholder="请填写课程名称"
          ></el-input>
        </el-form-item>
        <!-- 课程分类 -->
        <el-form-item label="分类:" prop="classify_name">
          <el-select
            v-model="addCourse.classify_name"
            placeholder="请选择一级分类"
            @change="selectClassify"
          >
            <el-option
              v-for="item in cities"
              :key="item.id"
              :label="item.name"
              :value="item.name"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="addCourse.classify_sub_name"
            placeholder="请选择二级分类"
            style="margin-left: 15px"
            v-if="addCourse.classify_name !== ''"
          >
            <el-option
              v-for="(item, index) in classifySubs"
              :key="index"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 级别 -->
        <div class="form-row">
          <el-form-item label="级别:" prop="level">
            <el-select v-model="addCourse.level" placeholder="请选择课程级别">
              <el-option
                v-for="item in levels"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <!-- 权重 -->
          <el-form-item label="推荐权重:" prop="weight">
            <el-input
              v-model="addCourse.weight"
              placeholder="请输入权重(整数)"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 是否免费与价格 -->
        <div class="price">
          <el-form-item label="是否免费:" prop="free">
            <el-select v-model="addCourse.free" placeholder="请选择是否免费">
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
          <el-form-item label="价格:" prop="price">
            <el-input
              v-model="addCourse.price"
              placeholder="请输入价格"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 讲师 -->
        <el-form-item label="讲师:" prop="userName">
          <el-input
            style="width: 217px"
            placeholder="请填写讲师姓名"
            v-model="addCourse.userName"
          ></el-input>
        </el-form-item>
        <!-- 课程描述 -->
        <el-form-item label="课程描述" prop="brief">
          <el-input
            type="textarea"
            placeholder="请填写课程的描述"
            v-model="addCourse.brief"
          ></el-input>
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>
<script>
import * as qiniu from "qiniu-js";
import { getqiniu } from "@/network/course";
import { getClassify,getClassifyName,addCourse} from "@/network/course";
export default {
  name: "AddCourse",
  components: {},
  props: {},
  data() {
    return {
      addCourse: {
        courseName: "", //课程名称
        classify_name: "", //一级分类
        classify_sub_name: "", //二级分类
        level: 1, //级别
        weight: "", //权重
        free: 0, //免费,
        price: "", //价格
        userName: "", //讲师
        brief: "", //课程描述
        picture:
          "http://i-1.wzsky.net/2020/9/9/W3dtOnN5LnBuZyxyOjEzLGI6MTNd/da64f256-a082-465e-a352-8d01f18473bd.jpg", //封面
      },
      // 校验规则
      rules: {
        courseName: [
          { required: true, message: "请输入课程名称", trigger: "blur" },
        ],
        userName: [{ required: true, message: "请填讲师名", trigger: "blur" }],
        brief: [{ required: true, message: "请输入课程简介", trigger: "blur" }],
        price: [{ required: true, message: "请输入价格", trigger: "blur" }],
        weight: [{ required: true, message: "请输入权重", trigger: "blur" }],
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
      // 一级分类
      cities:[],
      // 二级分类
      classifySubs:[],
      url: "http://r45kz1ucm.hn-bkt.clouddn.com",
    };
  },
  created() {},
  methods: {
    // 提交
   async submitForm(form){
      this.$refs.addCourse.validate(vilid=>{
        if(!vilid) return;
       addCourse(form).then(res=>{
         if(res.code !==200) return this.$message.error("添加课程失败");
         this.$message.success("添加课程成功")
         this.$refs.addCourse.resetFields();
       })
      })
    },
    // 获取一级分类
    async selectClassify() {
      this.addCourse.classify_sub_name = ''
      let {code,data} = await getClassify();
      if (code !== 200) return this.message.error("获取数据失败");
      this.cities = data
      if(this.addCourse.classify_name !== '' && this.addCourse.classify_name !== null){
        // 获取二级
       let{data} = await getClassifyName(this.addCourse.classify_name)
       this.classifySubs = data.classify_name
      }
    },

    // 上传图片
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
          this.$message.success("更换图片成功,点击保存课程信息方可保存！");
          this.addCourse.picture = `${this.url}/${key}`; //拼接
        },
      });
    },
    // 返回上一级
    gocourse() {
      this.$router.back();
    },
    // 重置
    rest(){
      this.$refs.addCourse.resetFields();
    }
  },
  mounted(){
    this.selectClassify()
  }
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
</style>