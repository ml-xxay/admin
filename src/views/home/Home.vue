<template>
  <div class="home">
    <!-- 内容开始 -->
    <div class="banner">
      <div class="w">
        <div class="subnav">
          <ul>
            <li>
              <a href="#">前端开发<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">后端开发<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">移动开发<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">人工只能<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">商业预测<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">云计算&大数据<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">运维&从测试<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">UI设计<span>&gt;</span></a>
            </li>
            <li>
              <a href="#">产品<span>&gt;</span></a>
            </li>
          </ul>
        </div>
        <div class="lunnbo">
          <div class="block">
            <el-carousel height="421px">
              <el-carousel-item v-for="item in courselist" :key="item.id">
                <img :src="item.picture" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>
    <!-- 主题内容开始 -->
    <div class="centent">
      <div class="boutique-content">精品内容</div>
      <courses :courselist="courselist"></courses>
    </div>
  </div>
</template>
<script>
import Courses from "@/components/common/courses/Courses";
import { getcourses } from "@/network/course";
export default {
  name: "Home",
  components: {
    Courses,
  },
  props: {},
  data() {
    return {
      courselist: [],
    };
  },
  created() {
    this.getcourses();
  },
  methods: {
    getcourses() {
      getcourses().then((res) => {
        this.courselist = res.data;
        console.log(res);
      });
    },
  },
};
</script>
<style scoped>
.home {
  position: relative;
  height: 100%;
  margin-top: 80px;
}

.banner {
  height: 421px;
  width: 100%;
  background-color: #c9c9c9;
}
li {
  list-style: none;
  z-index: 98;
}
.banner .w {
  display: flex;
  justify-content: center;
  height: 421px;
  width: 1200px;
  margin: 0 auto;
  /* background-color: pink; */
  /* background: url(~assets/images/banner2.png) no-repeat top center; */
}
.lunnbo {
  width: 1000px;
  height: 421px;

  background-color: #c6e2ff;
}
.block {
  width: 1000px;
  height: 421px;

}
.block img{
  width: 100%;
  height: 100%;
}
.subnav {
  width: 200px;
  height: 421px;
  background-color: tomato;
  background: rgba(0, 0, 0, 0.3);
}

.subnav ul li {
  height: 45px;
  line-height: 45px;
}

.subnav ul li a {
  font-size: 14px;
  color: #fff;
}

.subnav ul li a:hover {
  color: #00a4ff;
}

.subnav ul li a span {
  float: right;
  padding-left: 20px;
}
.centent {
  width: 1200px;
  height: 50px;
  margin: 0 auto;
}
.boutique-content {
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  border-bottom: 1px solid #eee;
}
</style>