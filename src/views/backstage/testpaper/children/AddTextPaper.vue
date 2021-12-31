<template>
  <el-card>
    <div class="top">
      <span>添加课程</span>
      <el-button type="primary" size="mini" @click="gocourse"
        >返回课程列表</el-button
      >
    </div>
    <el-form :rules="rules" ref="addtextpaper" :model="addtextpaper" label-width="100px">
      <!-- 试卷名称 -->
      <el-form-item label="试卷名称:" prop="name">
        <el-input
          style="width: 90%"
          v-model="addtextpaper.name"
          placeholder="请填写试卷名称"
        ></el-input>
      </el-form-item>
      <!-- 课程分类 -->
      <el-form-item label="分类:" prop="classify_name">
        <el-select
          v-model="addtextpaper.classify_name"
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
          v-model="addtextpaper.classify_sub_name"
          placeholder="请选择二级分类"
          style="margin-left: 15px"
          v-if="addtextpaper.classify_name !== ''"
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
          <el-select v-model="addtextpaper.level" placeholder="请选择课程级别">
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
        <el-form-item label="总分:" prop="weight">
          <el-input v-model="addtextpaper.score"></el-input>
        </el-form-item>
      </div>
      <!-- 考试时长-->
      <div class="price">
        <el-form-item label="考试时长:" prop="time">
          <el-select v-model="addtextpaper.time" placeholder="请选择考试时长">
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
        <el-form-item label="出题老师:" prop="create_user">
          <el-input
            v-model="addtextpaper.create_user"
            placeholder="请填写出题老师"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 考试规则 -->
      <el-form-item label="考试规则" prop="brief">
        <el-input
          type="textarea"
          placeholder="请填写考试规则"
          v-model="addtextpaper.brief"
        ></el-input>
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="success" @click="submitForm">保存添加</el-button>
        <el-button type="primary" plain>重置</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
import { getClassify, getClassifyName } from "@/network/course";
import {addExam} from '@/network/testpaper'
export default {
  name: "AddTextPaper",
  components: {},
  props: {},
  data() {
    return {
      addtextpaper: {
        name: "", //试卷名称
        classify_name: "", //一级分类名
        classify_sub_name: "", //二级分类
        create_user: "", //出题人
        score: 100, //成绩
        level: 1, //级别
        time: "", //考试时间,
        brief: "", //考试规则
      },
      rules: {
        name: [{ required: true, message: "请输入试卷名称", trigger: "blur" }],
        create_user: [
          { required: true, message: "请输入出题人", trigger: "blur" },
        ],
        score: [{ required: true, message: "请输入总分", trigger: "blur" }],
        brief: [{ required: true, message: "请输入考试规则", trigger: "blur" }],
      },
      // 一级分类
      cities: [],
      // 二级分类
      classifySubs: [],
      frees: [
        { value: 60, label: "60分钟" },
        { value: 120, label: "120分钟" },
      ],
      levels: [
        { value: 1, label: "初级" },
        { value: 2, label: "中级" },
        { value: 3, label: "高级" },
      ],
    };
  },
  created() {
    this.selectClassify();
  },
  methods: {
    submitForm(){
      this.$refs.addtextpaper.validate((valid)=>{
        if(!valid) return this.$message.error("请填写完试卷信息在保存!");
        addExam(this.addtextpaper).then((res)=>{
          console.log(res);
          if(res.code !==200) return this.$message.error("添加试卷失败,可能是试卷名同样")
          this.$message.success("添加试卷成功")
        })
      })
    },
    // 获取一级分类
    async selectClassify() {
      this.addtextpaper.classify_sub_name = "";
      let { code, data } = await getClassify();
      if (code !== 200) return this.message.error("获取数据失败");
      this.cities = data;
      console.log(data);
      if (
        this.addtextpaper.classify_name !== "" &&
        this.addtextpaper.classify_name !== null
      ) {
        // 获取二级
        let { data } = await getClassifyName(this.addtextpaper.classify_name);
        this.classifySubs = data.classify_name;
      }
    },
    gocourse() {
      this.$router.back();
    },
  },
};
</script>
<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  align-items: center;
  line-height: 50px;
  padding-left: 15px;
  width: 99%;
  height: 50px;
  border-bottom: 1px solid #ccc;
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