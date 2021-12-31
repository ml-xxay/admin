<template>
  <div class="core">
    <div class="box" v-for="item in TextCoreList" :key="item.id">
      <div class="top">{{item.name}}</div>
      <div class="centent">
        <div class="centent-top"><img src="~@/assets/images/exam.svg" alt=""></div>
        <div class="centent-bom">{{ item.time }}分钟
        </div>
      </div>
      <div class="bottom"><el-rate
          v-model="item.level"
          disabled
          show-score
          score-template=""
          :max="3"
          :allow-half="false"
        >
        </el-rate></div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TextPaperCore",
  components: {},
  props: {
    TextCoreList: { type: Array },
  },
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>
<style lang="less" scoped>
.core {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
 
  .box {
    width: 30%;
    height: 200px;
    margin-bottom: 20px;
    margin-right: 20px;
    background-color: #fff;
    text-align: center;
     box-shadow: 5px 5px 5px  #ccc;
     cursor:pointer;
    .top,.bottom{
      height: 40px;
      line-height: 40px;
    }
    .centent {
      height: 100px;
      .centent-top{
        height: 70px;
        line-height: 70px;
      }
      .centent-bom{
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>