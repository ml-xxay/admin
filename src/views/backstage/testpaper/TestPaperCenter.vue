<template>
  <div>
    <text-paper-core :TextCoreList="TextCoreList" />
  </div>
</template>
<script>
import { getExamList } from "@/network/testpaper";
import TextPaperCore from "@/components/content/textPaper/TextPaperCore";
export default {
  name: "TestPaperCenter",
  components: {
    TextPaperCore,
  },
  props: {},
  data() {
    return {
      TextCoreList: [], //试卷数据
      query: {
        pageNum: 1, //页
        limit: 9, //条
      },
      total: 0,
    };
  },
  created() {
    this.getExamLists(this.query);
  },
  methods: {
    // 获取试卷数据
    async getExamLists(query) {
      let { total, data, code } = await getExamList(query);
      console.log(data);
      if (code !== 200) return this.$message.error("请求数据失败");
      for (const item of data) {
        if (item.status == 0) {
          item.status = true;
        } else {
          item.status = false;
        }
      }
      this.total = total;
      this.TextCoreList = data;
    },
  },
};
</script>
<style scoped>
</style>