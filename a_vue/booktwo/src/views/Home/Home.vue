<template>
  <div class="box">
<!--    头部开始-->
    <div class="box-1">
      <div class="left">
        <i class="el-icon-reading"></i>
      </div>
      <div class="center">
        <el-input class="center-1" size="small" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="right">
        <i class="el-icon-user"></i>
      </div>
    </div>
<!--    头部结束-->
<!--    轮播图开始-->
    <div class="box-carousel">
      <div class="block">
        <el-carousel indicator-position="none" trigger="click" height="200px">
          <el-carousel-item  v-for="(item,index) in castList" :key="index">
            <img :src="item.bookimg" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
<!--轮播图结束-->
<!--    为你推荐开始-->
    <div class="recommend">
      <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1110388008,2180119915&fm=26&gp=0.jpg" alt="">
    </div>
<!--    为你推荐结束-->
<!--主题内容开始-->
    <div class="subject">
        <booksubject :booksubject="castList"></booksubject>
    </div>
<!--主题内容结束-->
<!--    占位符-->
    <div style="height: 45px"></div>
</div>
</template>

<script>
import booksubject from "../components/booksubject/booksubject";


export default {
  components:{booksubject},
  name: "Home",
  data() {
    return {
      input: '',
      castList:[]
    }
  },
  created() {
    var self = this
    $.ajax({
      //请求地址  getRecommendList
      url: 'http://127.0.0.1:1208/getBookList',
      type: 'get',
      //请求参数
      data: {},
      // success成功回调
      success: function (data) {
        console.log(data)
        //data指向就是json   data.data就是json里的data数据
        self.castList = data.data
      },
      //error错误回调
      error: function () {
        console.log('erro')
      }
    })
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.box {
  width: 100%;
  height: 100%;
  /*background-color: pink;*/
}

.box-1 {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
  background-color: #d9d9d9;
}

.left {
  width: 10%;
  height: 40px;
}

.center {
  width: 80%;
  height: 30px;
  margin-top: -2px;
  /*background-color: pink;*/
}
/*.center-1 {*/
/*  margin-top: 0;*/
/*}*/

.right {
  width: 10%;
  height: 40px;

}
/*轮播图开始*/

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/*轮播图结束*/
/*为你推荐开始*/
.recommend {
  width: 100%;
  height: 60px;
  background-color: #009eef;
}
/*为你推荐结束*/
/*主题内容开始*/
  .subject {
    width: 100%;
    height: auto;
  }

/*主题内容结束*/
</style>