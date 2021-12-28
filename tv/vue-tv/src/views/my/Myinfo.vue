<template>
  <div class="my">
    <div class="left">
      <div class="left-top">
        <div class="left-centent">1</div>
        <div style="text-align: center; line-height: 90px">zhangyu</div>
      </div>
      <div class="left-btom">
        <div class="subnav">
          <ul>
            <li>主页<span>&gt;</span></li>
            <li>我的课程<span>&gt;</span></li>
            <li>我的订单<span>&gt;</span></li>
            <li>个人信息<span>&gt;</span></li>
            <li>修改密码<span>&gt;</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="right-info">个人信息</div>
      <div class="right-t">
        <img src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F4k%2Fs%2F02%2F2109242332225H9-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642577649&t=88d929d7aa31bc3fe6c2d79add8413ff" alt="">
      </div>
      <div class="right-s">
        <el-button size="mini" type="primary">更换头像</el-button>
      </div>
      <div class="right-f">
        <div
          style="width: 135px; background-color: #f3f5f7; text-align: center"
        >
          昵称
        </div>
        <div
          style="
            width: 260px;
            border-bottom: 1px solid #b5b5b5;
            padding-left: 10px;
          "
        >
          zhangyu
        </div>
        <div
          style="width: 135px; background-color: #f3f5f7; text-align: center"
        >
          余额
        </div>
        <div style="width: 60px; padding-left: 10px">12</div>
      </div>
      <div class="right-five">
        <div
          style="width: 135px; background-color: #f3f5f7; text-align: center"
        >
          姓名
        </div>
        <div
          style="
            width: 400px;
            border-bottom: 1px solid #b5b5b5;
            padding-left: 10px;
          "
        >
          zhangyu
        </div>
      </div>
      <div class="r-s">
         <div
          style="width: 135px; background-color: #f3f5f7; text-align: center"
        >
          性别
        </div>
        <el-select v-model="form.region" placeholder="性别">
          <el-option label="男" value="shanghai"></el-option>
          <el-option label="女" value="beijing"></el-option>
        </el-select>
      </div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>10</div>
      <div>11</div>
    </div>
  </div>
</template>
<script>
// 我的
export default {
  name: "Myinfo",
  components: {},
  props: {},
  data() {
    return {
      form: {
        region: "",
      },
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
.my {
  position: relative;
  margin-top: 80px;
  width: 100%;
  height: 100%;
  background-color: #eee;
  display: flex;
  justify-content: center;
  padding-top: 25px;
}
li {
  list-style: none;
}
.left {
  width: 260px;
  height: 600px;
}
.left-top {
  position: relative;
  width: 100%;
  height: 220px;
  background-color: #fff;
}
.left-centent {
  width: 80px;
  height: 80px;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  line-height: 80px;
  background-color: #cd2626;
  border-radius: 50% 50%;
}
.left-btom {
  width: 100%;
  height: 380px;
}
.subnav {
  width: 100%;
  height: 380px;
  /* background-color: pink; */
  background: rgba(0, 0, 0, 0.3);
}

.subnav ul li {
  height: 50px;
  line-height: 50px;
}

.subnav ul li {
  font-size: 16px;
  color: #fff;
}

.subnav ul li:hover {
  color: #00a4ff;
  background-color: #87cefa;
}
.subnav ul li span {
  float: right;
}

.right {
  width: 1000px;
  height: 700px;
  /* background-color: coral; */
  margin-left: 50px;
}
.right-info {
  height: 50px;
  line-height: 50px;
  /* background-color: cadetblue; */
  border-bottom: 1px solid #b5b5b5;
}
.right-t {
  width: 84px;
  height: 84px;
  background-color: blue;
}
.right-t img {
  width: 100%;
  height: 100%;
}
.right-s {
  height: 35px;
  padding: 5px 0;
}
.right-f {
  display: flex;
  height: 35px;
  line-height: 35px;
  margin: 10px 0;
  font-size: 15px;
  /* background-color: cadetblue; */
}
.right-five {
  display: flex;
  height: 35px;
  line-height: 35px;
  /* background-color: cadetblue; */
}
.r-s {
  display: flex;
   margin: 10px 0;
    height: 35px;
  line-height: 35px;
}
</style>