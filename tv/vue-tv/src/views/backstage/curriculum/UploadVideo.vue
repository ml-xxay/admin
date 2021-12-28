<template>
  <el-card>
    <el-row :gutter="20">
      <el-upload
        class="upload-demo"
        accept=".mp4, .qlv, .qsv, .ogg, .flv, .avi, .wmv, .rmvb"
        action="http://upload.qiniup.com/"
        :limit="6"
        ref="upload"
        :http-request="handleChange"
        :on-remove="handleRemove"
        :auto-upload="false"
        multiple
      >
        <el-button slot="trigger" size="small" type="primary"
          >选择视屏</el-button
        >
        <el-button
          style="margin-left: 10px"
          size="small"
          type="success"
          @click="submitUpload"
          >上传视屏</el-button
        >
      </el-upload>

      <!-- 表格 -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="序号" type="index" width="100">
        </el-table-column>
        <el-table-column prop="flieName" name="flieName" label="文件名" width="180">
        </el-table-column>
        <el-table-column prop="size" label="大小" width="180">
          <template slot-scope="scope">
            {{ sizeInfo(scope.row.size) }}
          </template>
        </el-table-column>
        <el-table-column prop="filePercent" label="进度">
          <template slot-scope="scope">
            <el-progress
              :text-inside="true"
              :stroke-width="24"
              :percentage="scope.row.filePercent"
              status="success"
            ></el-progress>
          </template>
        </el-table-column>
        <el-table-column prop="videoUrl" label="视屏链接"> </el-table-column>
        <el-table-column prop="address" label="操作">
          <template>
            <el-button type="warning">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-card>
</template>
<script>
import * as qiniu from "qiniu-js";
import { getqiniu } from "@/network/course"; //获取七牛token
export default {
  name: "UploadVideo",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      qiniuToken: null,
      url: "http://r45kz1ucm.hn-bkt.clouddn.com", //这是七牛域名
    };
  },
  created() {},
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    async handleChange(e) {
      console.log(e);
      let video = {
        flieName: "",
        size: 0,
        filePercent: 0,
        videoUrl: "",
      };
      let {file}=e
      let filename = file.name;
      video.flieName = filename;
      video.size = file.size;
      let { qiniuToken } = await getqiniu();
      // let config = {
      //   useCdnDomain: false,
      //   region: qiniu.region.z2,
      // };
      // 实例化上传实例
      let observable = qiniu.upload(file, filename, qiniuToken);
      observable.subscribe({
        next: (result) => {
          // 主要用来展示进度
          console.log(result.total.percent);
          video.filePercent = parseInt(result.total.percent);
        },
        // 上传失败
        error: (errResult) => {
          let { error } = errResult.data;
          this.$message.error(error);
        },
        complete: (result) => {
          console.log(result);
          let { key } = result;
          this.$message.success("上传视频成功！");
          // console.log(this.url + key);
          video.videoUrl = `${this.url}/${key}`;  //拼接
          // console.log(video);
        },
      });
      this.tableData.push(video);
    },
    //   过滤文件大小
    sizeInfo(size) {
      size = parseInt((size / 1024 / 1024) * 1000);
      if (size > 1024) return `${Number(size / 1000).toFixed(2)}MB`;
      return `${size}KB`;
    },
  },
};
</script>
<style scoped>
</style>