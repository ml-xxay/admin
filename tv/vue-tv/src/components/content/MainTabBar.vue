
<template>
  <div>
    <div class="header">
      <!-- logo部分 -->
      <div class="logo">
        <img src="~@/assets/images/logo.png.png" alt="" />
      </div>
      <!-- 导航栏部分 -->
      <div class="nav">
        <ul>
          <li @click="home">首页</li>
          <li @click="gobackstage">后台</li>
          <li @click="goMyInfo">我的信息</li>
        </ul>
      </div>
      <!-- search 搜索框 -->
      <div class="search">
        <input type="text" value="输入关键词" />
        <button></button>
      </div>
      <!-- 用户模块 -->
      <div class="user">
        <img src="../../assets/images/user.png" alt="" />
      </div>
      <div class="out">
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainTabBar",
  components: {},
  methods: {
    //   退出
    logout() {
      window.sessionStorage.removeItem("token");
      this.$router.push("/login");
    },
    home() {
      this.$router.push({ path: "home" });
    },
    gobackstage() {
      this.$router.push({ path: "backstage" });
    },
    goMyInfo() {
      this.$router.push({ path: "myinfo" });
    },
  },
};
</script>

<style scoped>
/* .w {
    width: 1500px;
    height: 100px;
    margin: 0 auto;
  
} */

.header {
  display: flex;
  position: fixed;
  height: 80px;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  background-color: pink;
  margin: 0 auto;
  line-height: 70px;
  z-index: 9;
}

.logo {
  width: 198px;
  height: 42px;
  margin-top: 17px;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

.nav {
  margin-left: 60px;
  line-height: 42px;
}

.nav li {
  float: left;
  margin: 0 15px;
}

.nav ul li {
  display: block;
  height: 42px;
  padding: 0 10px;
  line-height: 50px;
  font-size: 18px;
  color: #050505;
}

.nav ul li:hover {
  border-bottom: 2px solid #00a4ff;
  color: #00a4ff;
}

.search {
  width: 414px;
  height: 42px;
  background-color: skyblue;
  margin-left: 20px;
  margin-top: 17px;
}

.search input {
  float: left;
  width: 345px;
  height: 40px;
  border: 1px solid #00a4ff;
  border-right: 0;
  color: #00a4ff;
  font-size: 14px;
  padding-left: 15px;
}

.search button {
  float: left;
  width: 50px;
  height: 42px;
  background-color: blue;
  border: 0;
  background: url(~@/assets/images/btn.png);
}

.user {
  float: right;
  line-height: 42px;
  margin-right: 30px;
  padding-top: 20px;
  padding-left: 20px;
  font-size: 14px;
  color: #666;
}
</style>
