<template>
  <div class="ele-body">
    <el-card shadow="never">
      <PubilceTable :guimoid="this.GONGSIGUIMOID"></PubilceTable>
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
      // 从路由里获取公司规模ID
      GONGSIGUIMOID:"7"
    };
  }
}
</script>

<style scoped>

</style>
