<template>
  <div>
  <div class="box" v-for="(item,index) in booklist">
      <div class="box-left">
        <img :src="item.bookimg" alt="">
      </div>
      <div class="right">
        <div class="a">{{item.bookname}}</div>
        <div  class="b">{{item.bookauthor}}</div>
        <div  class="c" style="color: #ff0001">￥{{item.bookpic}}</div>
        <div  class="d">500条+评论 99%好评</div>
        <div  class="e">{{item.shopname}}  <span style="font-weight: bold;color: black">进店></span></div>
      </div>
  </div>

  </div>
</template>

<script>
export default {
  name: "booklist",
  props:{
    booklist:Array
  }
}
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
}
.box {
  display: flex;
  justify-content: center;
  width: 99%;
  height: 180px;
  margin-top: 1px;
  margin-bottom: 3px;
}
.box-left {
  width: 40%;
  height: 180px;
  border: 1px solid #999999;

}
.right {
  width: 57%;
  height: 180px;

}
.a,.b,.c,.d,.e{
  width: 95%;
  height: 20%;
  line-height: 36px;
  padding-left: 8px;
  color: #475669;
}
.e {
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>