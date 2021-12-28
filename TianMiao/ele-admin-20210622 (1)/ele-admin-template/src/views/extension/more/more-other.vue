<template>
  <div>
    <el-card shadow="never" header="省市区级联选择">
      <div class="ele-cell" style="padding-top: 15px;">
        <div style="margin: 0 15px 15px 0;">
          <el-cascader
            clearable
            v-model="city"
            placeholder="请选择省市区"
            :options="regions.cityData"
            popper-class="ele-pop-wrap-higher"/>
        </div>
        <div style="margin: 0 15px 15px 0;">
          <el-cascader
            clearable
            v-model="provinceCity"
            placeholder="请选择省市"
            :options="regions.provinceCityData"
            popper-class="ele-pop-wrap-higher"/>
        </div>
        <div style="margin: 0 15px 15px 0;">
          <el-cascader
            clearable
            v-model="province"
            placeholder="请选择省"
            :options="regions.provinceData"
            popper-class="ele-pop-wrap-higher"/>
        </div>
      </div>
    </el-card>
    <el-card shadow="never" header="数字动画">
      <h1 style="padding-left: 10px;">
        <vue-count-up
          :delay="0"
          :endVal="countUpVal"
          :options="countUpOptions"
          @ready="onCountUpReady"/>
      </h1>
      <div style="margin-top: 15px;">
        <el-button size="mini" @click="startCountUp">重新开始</el-button>
        <el-button size="mini" @click="updateCountUp">更新数字</el-button>
      </div>
    </el-card>
    <el-card shadow="never" header="二维码">
      <div style="margin-bottom: 15px;max-width: 160px;">
        <el-input v-model="text" size="mini"/>
      </div>
      <div style="padding-left: 5px;">
        <vue-qr :text="text" :size="100" :margin="0"/>
      </div>
    </el-card>
    <el-card shadow="never" header="空视图">
      <el-row>
        <el-col :md="8" style="padding: 22px 0;">
          <ele-empty></ele-empty>
        </el-col>
        <el-col :md="8" style="padding: 22px 0;">
          <ele-empty>
            <i slot="icon" class="el-icon-_retrieve-solid"></i>
          </ele-empty>
        </el-col>
        <el-col :md="8">
          <ele-empty text="哎呀~怎么还没有数据呀~">
            <div style="margin-top: 20px;">
              <el-button size="mini">添加数据</el-button>
              <el-button type="primary" size="mini">重新加载</el-button>
            </div>
          </ele-empty>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import regions from 'ele-admin/packages/regions';
import VueCountUp from 'vue-countup-v2';
import VueQr from 'vue-qr';

export default {
  name: 'MoreOther',
  components: {VueCountUp, VueQr},
  data() {
    return {
      // 省市区数据
      regions: regions,
      // 选中的省市区
      city: [],
      // 选中的省市
      provinceCity: [],
      // 选中的省
      province: [],
      // countUp值
      countUpVal: 6317,
      // countUp配置
      countUpOptions: {
        useEasing: true,
        useGrouping: true,
        separator: ',',
        decimal: '.',
        prefix: '',
        suffix: ''
      },
      // countUp实例
      countUpIns: null,
      // 二维码内容
      text: 'https://eleadmin.com'
    };
  },
  methods: {
    /* countUp渲染完成 */
    onCountUpReady(instance) {
      this.countUpIns = instance;
    },
    /* countUp重新开始 */
    startCountUp() {
      if (!this.countUpIns) {
        return;
      }
      this.countUpIns.reset();
      this.countUpIns.start();
    },
    /* countUp更新 */
    updateCountUp() {
      if (!this.countUpIns) {
        return;
      }
      this.countUpIns.update(1000 + Math.round(Math.random() * 9000));
    }
  }
}
</script>

<style scoped>
</style>
