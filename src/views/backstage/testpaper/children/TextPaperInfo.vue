<template>
  <el-card>
    <div class="top">
      <span>添加课程</span>
      <el-button type="primary" size="mini" @click="gocourse"
        >返回课程列表</el-button
      >
    </div>
    <el-form
      :rules="rules"
      ref="textpaperinfo"
      :model="textpaperinfo"
      label-width="100px"
      class="form"
    >
      <!-- 试卷名称 -->
      <el-form-item label="试卷名称:" prop="name" style="margin-top: 10px">
        <el-input
          style="width: 90%; margin-top: '10px'"
          v-model="textpaperinfo.name"
          placeholder="请填写试卷名称"
        ></el-input>
      </el-form-item>
      <!-- 课程分类 -->
      <el-form-item label="分类:" prop="classify_name">
        <el-select
          v-model="textpaperinfo.classify_name"
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
          v-model="textpaperinfo.classify_sub_name"
          placeholder="请选择二级分类"
          style="margin-left: 15px"
          v-if="textpaperinfo.classify_name !== ''"
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
          <el-select v-model="textpaperinfo.level" placeholder="请选择课程级别">
            <el-option
              v-for="item in levels"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 总分 -->
        <el-form-item label="总分:" prop="weight">
          <el-input v-model="textpaperinfo.score"></el-input>
        </el-form-item>
      </div>
      <!-- 考试时长-->
      <div class="price">
        <el-form-item label="考试时长:" prop="time">
          <el-select v-model="textpaperinfo.time" placeholder="请选择考试时长">
            <el-option
              v-for="item in frees"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 出题老师 -->
        <el-form-item label="出题老师:" prop="create_user">
          <el-input
            v-model="textpaperinfo.create_user"
            placeholder="请填写出题老师"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 考试规则 -->
      <el-form-item label="考试规则" prop="brief">
        <el-input
          type="textarea"
          placeholder="请填写考试规则"
          v-model="textpaperinfo.brief"
        ></el-input>
      </el-form-item>
      <!-- 操作 -->
      <el-form-item>
        <el-button type="primary" @click="modify">修改</el-button>
      </el-form-item>
    </el-form>
    <!-- 添加考试题目 -->
    <el-tabs class="tabs" v-model="activeName">
      <el-tab-pane label="题目信息" name="first">题目信息</el-tab-pane>
      <el-tab-pane label="添加考试题目" name="second">
        <div class="form-row">
          <el-button type="primary" @click="AddTitle">添加题目</el-button>
          <el-button type="success">导入题目</el-button>
        </div>
        <el-form
          :model="addtextpaper"
          label-width="100px"
          class="addform"
          :rules="rules"
          ref="addtextpaper"
        >
          <!-- 题目类型 -->
          <el-form-item label="题目类型:">
            <el-radio-group v-model="addtextpaper.type">
              <el-radio :label="1">单选题</el-radio>
              <el-radio :label="2">多选题</el-radio>
              <el-radio :label="3">判断题</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 题目 -->
          <el-form-item label="题目:" prop="title">
            <el-input
              v-model="addtextpaper.title"
              placeholder="请输入题目"
            ></el-input>
          </el-form-item>
          <!-- 选项a -->
          <el-form-item label="A:" prop="select_a">
            <el-input
              v-model="addtextpaper.select_a"
              placeholder="请填写A项内容"
            ></el-input>
          </el-form-item>
          <!-- 选项b -->
          <el-form-item label="B:" prop="select_b">
            <el-input
              v-model="addtextpaper.select_b"
              placeholder="请填写B项内容"
            ></el-input>
          </el-form-item>
          <!-- 选项c -->
          <el-form-item label="C:" prop="select_c">
            <el-input
              v-model="addtextpaper.select_c"
              placeholder="请填写C项内容"
            ></el-input>
          </el-form-item>
          <!-- 选项d -->
          <el-form-item label="D:" prop="select_d">
            <el-input
              v-model="addtextpaper.select_d"
              placeholder="请填写D项内容"
            ></el-input>
          </el-form-item>
          <!-- 正确答案 -->
          <el-form-item label="正确答案" prop="answer">
            <el-radio-group v-model="addtextpaper.answer">
              <el-radio :label="1">A</el-radio>
              <el-radio :label="2">B</el-radio>
              <el-radio :label="3">C</el-radio>
              <el-radio :label="4">D</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>
<script>
import { getClassify, getClassifyName } from "@/network/course";
import { getExamInfo, editExamInfo, addExamTitle } from "@/network/testpaper";
export default {
  name: "TextPaperInfo",
  components: {},
  props: {},
  data() {
    return {
      id: null,
      textpaperinfo: {},
      // 添加章节
      addtextpaper: {
        exam_id: null,
        type: 1, //要添加的题目类型
        title: "", //题目
        select_a: "", //选项a
        select_b: "", //选项b
        select_c: "", //选项c
        select_d: "", //选项d
        answer: 1, //正确答案默认1  对应lable
        create_user: "",
      },
      frees: [
        { value: 60, label: "60分钟" },
        { value: 120, label: "120分钟" },
      ],
      levels: [
        { value: 1, label: "初级" },
        { value: 2, label: "中级" },
        { value: 3, label: "高级" },
      ],
      rules: {
        name: [{ required: true, message: "请输入试卷名称", trigger: "blur" }],
        create_user: [
          { required: true, message: "请输入出题人", trigger: "blur" },
        ],
        score: [{ required: true, message: "请输入总分", trigger: "blur" }],
        brief: [{ required: true, message: "请输入考试规则", trigger: "blur" }],
        select_a: [
          { required: true, message: "请输入选项A答案", trigger: "blur" },
        ],
        select_b: [
          { required: true, message: "请输入选项B答案", trigger: "blur" },
        ],
        select_c: [
          { required: true, message: "请输入选项C答案", trigger: "blur" },
        ],
        select_d: [
          { required: true, message: "请输入选项C答案", trigger: "blur" },
        ],
        title: [{ required: true, message: "请输入题目", trigger: "blur" }],
      },
      cities: [], //一级
      classifySubs: [],
      activeName: "second",
      classify_name:''
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.addtextpaper.exam_id = this.$route.query.id;
    this.getTextPaperinfo(this.id);

  },
  mounted() {
        this.selectClassify()
  },
  methods: {
    // 根据id获取试卷详情数据
    async getTextPaperinfo(id) {
      let { data, code, msg } = await getExamInfo(id);
      // console.log(data);
      if (code !== 200) return this.$message.error(msg);
      this.textpaperinfo = data;
      this.addtextpaper.create_user = data.create_user;
      // this.classify_name = data.classify_name
    },
    // 修改试卷信息
    modify() {
      this.$refs.textpaperinfo.validate(async (valid) => {
        if (!valid) return;
        let { code } = await editExamInfo(this.textpaperinfo);
        if (code !== 200) return;
        this.$message.success("修改成功");
      });
    },
    // 添加试卷
    AddTitle() {
      console.log("添加题目");
      this.$refs.addtextpaper.validate((vilid) => {
        if (!vilid) return this.$message.error("请填写完试卷信息在保存");
        addExamTitle(this.addtextpaper).then((res) => {
          if (res.code !== 200)
            return this.$message.error("添加课程失败，请重试");
          this.$message.success("添加课程成功");
          // this.$refs.addtextpaper.resetFields();
        });
      });
    },
    // 选择分类，获取分类列表
    async selectClassify() {
      this.textpaperinfo.classify_sub_name = "";
      let { code, data } = await getClassify();
      if (code !== 200) return this.message.error("获取数据失败");
      this.cities = data;
      if (
        this.textpaperinfo.classify_name !== "" &&
        this.textpaperinfo.classify_name !== null &&
        this.textpaperinfo.classify_name !== undefined
      ) {
        // 获取二级
        console.log('执行了吗');
        let { data } = await getClassifyName(this.textpaperinfo.classify_name);
        this.classifySubs = data.classify_name;
      }
    },
    // 返回上一级
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
.form {
  border: 1px solid #ccc;
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
.tabs {
  margin-top: 15px;
}
.addform {
  border: 1px solid #ccc;
  margin-top: 20px;
}
</style>