<template>
  <div class="box">
    <div class="box-bd" v-for="item in courselist" :key="item.id"  @click="gocourseInfo(item.id)">
      <div class="picture"><img :src="item.picture" alt="" /></div>
      <p class="course-name">{{ item.brief }}</p>
      <div class="info">
        <span>{{ level(item.level) }}</span> <span>$:{{ item.price }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "courses",
  components: {},
  props: {
    courselist: {
      type: Array,
    },
  },
  data() {
    return {};
  },
  created() {},
  methods: {
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
    gocourseInfo(id){
      this.$router.push({path:'CourseInfo',query:{id}})
    }
  },
  computed: {},
};
</script>
<style scoped>
.box {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 1200px;
  margin-top: 10px;
  background-color: #fff;
}
.box-bd {
  width: 280px;
  height: 270px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(100, 100, 100, 0.2);
}
.box-bd:last-child{
  margin-right: auto;
}
.picture {
  width: 280px;
  height: 160px;
}
.picture img {
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  height: 100%;
  color: or;
}
.info {
  display: flex;
  height: 30px;
  padding: 0 10px;
  font-size: 14px;
  line-height: 30px;
}
.info span:nth-child(2) {
  color: red;
  margin-left: 5px;
}
.course-name{
 color: orange;
 font-size:14px;
 margin:10px;
 padding: 0;
 height: 58px;
}
</style>