<template>
  <div class="box">
    <div class="login_box">
      <!--      头像区域-->
      <div class="avater_box">
        <img src="~@/assets/logo.png" alt="">
      </div>
      <!--      表单区域-->
      <el-form ref="ref" :rules="rules" :model="loginForm" class="login_form">
        <!--        用户名-->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <!--        密码-->
        <el-form-item prop="password">
          <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-unlock"></el-input>
        </el-form-item>
        <!--        登录-->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="rest">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {login} from '@/network/login'
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      //这是上面的from表单绑定的晓燕规则，来自框架
      rules: {
        // username: [
        //   {required: true, message: '请输入活动名称', trigger: 'blur'},
        //   {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        // ],
        // password:[
        //   {required: true, message: '请输入登录密码', trigger: 'blur'},
        //   {min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur'}
        // ]
      }

    }
  },
  methods:{
    //点击重置按钮,重置表单
    rest:function () {
        //refs是this指向的其中一个对象  ref是对象里的实例  点击重置
        this.$refs.ref.resetFields();
    },
  login() {
      this.$refs.ref.validate(async valid =>{
        if (!valid) return;
        login(this.loginForm).then((res)=>{
          let { data,code } = res;
          console.log(res);
          if (code !==200) return     this.$message.error("登陆失败");
          this.$message.success("登陆成功");
          // 第一步   登陆成功之后存个token  因为其他页面发请求的时候要携带token
         this.$store.dispatch("SETTOKEN", data.token);
        this.$router.push('/home')
        })
      
      
      });
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  position: relative;
  z-index: 99;
  height: 100vh;
  background-color: #2b4b6b;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  //绝对定位
  position: absolute;
  left: 50%;
  top: 50%;
  //位移   横轴  纵轴个移动50%  盒子自身的50%
  transform: translate(-50%, -50%);

  .avater_box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;

    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }

  .login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;

  }
}
</style>