<template>
  <div class="box">
    <div
      class="box-bd"
      v-for="item in courselist"
      :key="item.id"
      @click="gocourseInfo(item.id)"
    >
      <div class="picture"><img :src="item.picture" alt="" /></div>
      <p class="course-name">{{ item.brief }}</p>

      <div class="info">
        <span>难度:{{ level(item.level) }}</span>
      </div>
      <div class="price">$:{{ item.price }}</div>
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
    gocourseInfo(id) {
      this.$router.push({ path: "CourseInfo", query: { id } });
    },
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
  position: relative;
  width: 280px;
  height: 270px;
  margin: 10px;
  border-radius: 10px;
  box-shadow: 1px 1px 10px rgba(100, 100, 100, 0.2);
  transition: all 0.5s;
}
.box-bd:hover {
  top: -7px;
}
.box-bd:last-child {
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
  height: 15px;
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 15px;
  color: #9199a1;
}
.info span:nth-child(2) {
  color: red;
  margin-left: 5px;
}
.course-name {
  margin: 0;
  color: #545c63;
  font-size: 14px;
  padding: 5px 0 5px 8px;
  height: 40px;
}
.price{
  height: 20px;
  color: red;
  padding-left: 8px;
}
</style>