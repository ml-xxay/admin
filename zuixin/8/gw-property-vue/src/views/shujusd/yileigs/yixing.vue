<template>
  <div class="ele-body">
    <el-card shadow="never">
      <PubilceTable :guimoid="this.GONGSIGUIMOID" tableheader="执行标准 —— 一类用房Ⅰ型"></PubilceTable>
    </el-card>
  </div>
</template>


<script>

import PubilceTable from "@/views/shujusd/PubilceTable";


export default {
  name: "yixing",
  components: {
    PubilceTable
  },
  data() {
    return {
      // 从路由里获取用房规模ID
      GONGSIGUIMOID:"1"
    };
  }
}
</script>

<style scoped>

</style>
