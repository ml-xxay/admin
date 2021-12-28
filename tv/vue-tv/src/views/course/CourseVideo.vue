<template>
  <div class="father" ref="father">
    <div class="permission">
      <div class="fon">{{ sections.name }}</div>
      <div class="content">
        <div class="left-content">
          <div class="player" ref="player"></div>
        </div>
        <div class="right">
          <el-tree
            default-expand-all
            :data="courseSection"
            :props="defaultProps"
            @node-click="handleNodeClick"
          ></el-tree>
        </div>
      </div>
      <!-- <div class="discuss">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="评论" name="first">评论</el-tab-pane>
        <el-tab-pane label="问答" name="second">问答</el-tab-pane>
      </el-tabs>
    </div> -->
    </div>
  </div>
</template>

<script>
// 课程播放

import Player from "xgplayer";
import { mapGetters } from "vuex";
export default {
  name: "CourseVideo",
  data() {
    return {
      list: [],
      intervalId: "",
      player: null,
      courseSection: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      lastTime: null, //第一次
      currentTime: null, //当前点击的时间
      timeOut: 0.2 * 60, //设置超时时间： 1分钟
      timer: null,
      time: 0,
    };
  },
  activated() {
    console.log("进来了"); //用箭头函数也是一样可以监听的   我知道  我要讲的是下面
    document.onmouseover = () => {
      if (this.timer !== null) {
        clearInterval(this.timer);
        this.time = 0;
        this.init();
        console.log(this.time + "---------");
      }
    };
    this.init();
    //  var maxTime = 60*0.1; // seconds
    //     var time = maxTime;
    //     var _this = this
    //     document.addEventListener('mousemove', function() {
    //       console.log(11);
    //         time = maxTime; // reset
    //         setInterval(intervalId)
    //     });
    //     var intervalId = setInterval(function() {
    //         time--;
    //         if (time <= 0) {
    //             ShowInvalidLoginMessage();
    //             clearInterval(intervalId);
    //         }
    //     }, 1000)
    //     function ShowInvalidLoginMessage() {
    //       // console.log(11);
    //          _this.player.pause();
    //     }
  },
  deactivated() {
    clearInterval(this.timer);
    this.timer = null;
    console.log("我离开了");
  },
  mounted() {
    this.initPlayer();
    this.courseSection = JSON.parse(this.sections.courseList);
    // this.lastTime = new Date().getTime(); //网页第一次打开时，记录当前时间
    // console.log(this.lastTime);
  },
  methods: {
    init() {
      let that = this;
      this.timer = setInterval(() => {
        this.time++;
        console.log(this.time);
        if (this.time >= this.timeOut) {
          //也一样
          that.player.pause();
          console.log(that);
          return clearInterval(this.timer);
        }
      }, 1000);
    },
    // isDoc(){
    //   this.currentTime = new Date().getTime();
    // },
    //  timer: function (){
    //     this.currentTime = new Date().getTime(); //记录这次点击的时间
    //     console.log(this.currentTime);
    //     if (this.currentTime - this.lastTime > this.timeOut) {
    //       console.log(111);
    //       this.player.pause();
    //       // clearInterval(timer)
    //     }
    //     // else {
    //     //   this.lastTime = new Date().getTime(); //如果在10分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
    //     // }
    //   }
    //  ,
    handleNodeClick(data) {
      console.log(data);
      this.player.src = data.video_url;
    },
    initPlayer() {
      this.player = new Player({
        el: this.$refs.player,
        url: this.sections.video_url,
        autoplay: true, //自动播放
        fluid: true, //流式布局
        // loop: true, //循环播放
        playNext: {
          // urlList: [
          //   "https://st.wssqxt.com/pcImg-20191125211214.mp4",
          //   "http://vjs.zencdn.net/v/oceans.mp4",
          //   "http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4",
          // ],
        },
        videoInit: true,
        download: true,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        defaultPlaybackRate: 1.0, //初始速度
        rotateFullscreen: true, //移动端横屏
      });
    },
  },
  computed: {
    ...mapGetters(["sections"]),
  },
};
</script>

<style scoped>
.father {
  width: 100%;
  height: 100%;
}
.permission {
  width: 1200px;
  height: 100%;
  margin: 80px auto;
}
.fon {
  font-size: 20px;
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.content {
  display: flex;
  width: 100%;
}
.left-content {
  width: 740px;
  height: 398px;
  padding: 0;
  border: 1px solid black;
  box-shadow: 1px 1px #bbb;
}
.right {
  width: 460px;
  margin-left: 60px;
  height: 100%;
  background: #ebebeb;
}
.el-tree {
  background: #ebebeb;
}
.player {
  height: 450px;
}
.discuss {
  width: 700px;
}
</style>