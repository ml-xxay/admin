<template>
  <div class="ele-body">
    <div :class="['ele-pro-table ele-bg-white', {'ele-pro-table-fullscreen': isFullscreen}]"
      :style="{zIndex: fullZIndex}">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form label-width="77px" class="ele-form-search" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="9" :sm="12">
            <el-form-item label="所属公司:" style="width: 370px">
              <treeselect v-model="GONGSIID" :options="orageList" placeholder="请选择所属公司"
                          :appendToBody="true" :normalizer="normalizer" @select="treeSelect"/>
            </el-form-item>
          </el-col>
          <el-col :md="15" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="reloads">查询
              </el-button>
              <el-button @click="reset">重置</el-button>
              <el-button @click="fullscreen">{{fullscreentext}}
              </el-button>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :md="9" :sm="12">
            <el-form-item label="房屋健康状况:" label-width="100px" >
              <el-checkbox style="margin-left: 10px" v-model="ZAIJIAN" @change="zaijianChange">在建</el-checkbox>
              <el-checkbox v-model="NICHAIQIAN">拟拆迁</el-checkbox>
              <el-checkbox v-model="BUSHIYI">不适宜</el-checkbox>
              <el-checkbox v-model="WEIFANG">危房</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :md="15" :sm="12">
            <el-form-item label="在建起止日期:" label-width="100px" v-if="ZAIJIAN">
             <el-date-picker size="mini" clearable style="width:350px !important" v-model="DATERANGE" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="ele-fluid" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="headertitle" v-if="chartrefresh" >{{tableheader}}</div>
      <ele-chart ref="chart1"  v-if="chartrefresh" :option="qushiOption" style="height: 400px;margin-top: 100px"/>
    </el-card>
    </div>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import EleChart from 'ele-admin/packages/ele-chart';
import {
  Loading
} from 'element-ui';
import myutils from "@/utils/myutils";

export default {
  name: "zyyfqst",
  components: {
    Treeselect,
    EleChart
  },
  data() {
    return {
      fullscreentext: "全屏",
      isFullscreen: false,
      fullZIndex: '',

      DATERANGE:'',
      tableheader: '',
      //自有用房趋势图数据
      Trendchart: [],

      ziyoulist: [],
      cesuanlist: [],

      orageList: [], //所属公司下拉列表
      GONGSIID: null, //所属公司ID
      GONGSIMC: '',  //所属公司名称

      chartrefresh: false,
      echartsdata: [], // Echarts数据

      ZAIJIAN: true,
      NICHAIQIAN: true,
      BUSHIYI: true,
      WEIFANG: true,
    }
  },
  inject: ['reload'],
  created() {
    this.GONGSIID = null;
    this.getOrageList(); //获取下拉框所属公司列表
  },
  mounted() {
    var that = this;
    window.onresize = ()=> {
      if(!myutils.checkFull()){
        this.isFullscreen = false;
        this.fullZIndex = "";
        this.fullscreentext = "全屏";
        this.fullscreenheight = "700";
      }
      that.$refs.chart1.resize();  //echarts表格重新渲染
    }
  },
  methods: {
    /* 刷新表格 */
    reloads() {
      if (this.GONGSIID == '' || this.GONGSIID == null) {
        this.$message('请选择所属公司！');
      } else {
        this.getTrendchartInfo()
      }
    },
    /* 重置搜索 */
    reset() {
      this.reload();
    },
		zaijianChange(){
      this.DATERANGE = '';
		},
    /* 下拉树组件格式化数据 */
    normalizer(d) {
      return {
        id: d.ID,
        label: d.GONGSIMC
      };
    },
    treeSelect(node) {
      this.GONGSIMC = node.GONGSIMC
    },
    //获取公司列表下拉树
    getOrageList() {
      this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
        table: "TMDB_PMS_GONGSI",
        inmap: JSON.stringify({
          "GONGSILX": "3,4",
        }),
        orderarray: JSON.stringify([{
          "ID": "ASC"
        }])
      }).then(res => {
        let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
        this.orageList = result
      }).catch(e => {
        console.log(e)
      });
    },
    // 获取趋势图横坐标 年
    getxData(){
      let nowyear =  new Date().getFullYear();
      let yeararr = [nowyear-2,nowyear-1,nowyear,nowyear+1,nowyear+2,nowyear+3,nowyear+4,nowyear+5];
      return yeararr;
    },
      /*根据公司ID获取自有用房趋势图数据*/
      getTrendchartInfo() {
        var self = this
        let loadingInstance = Loading.service({
          fullscreen: false,
          target: '.ele-body'
        });
        
        let formData = new FormData()
        //数据库表名
        formData.append('GONGSIID', JSON.stringify(this.GONGSIID))
        
        formData.append('ZAIJIAN', this.ZAIJIAN == true ? '是' : '否')
        formData.append('NICHAIQIAN', this.NICHAIQIAN == true ? '是' : '否')
        formData.append('BUSHIYI', this.BUSHIYI == true ? '是' : '否')
        formData.append('WEIFANG', this.WEIFANG == true ? '是' : '否')
        
        if(this.DATERANGE !=''&&this.DATERANGE !=null)
        {
          formData.append('startdate', myutils.getFullDate(this.DATERANGE[0]))
          formData.append('enddate', myutils.getFullDate(this.DATERANGE[1]))
        }
        this.$http.post(this.serviceurl + '/TM_model_getsubcompanyhousecalculate_controller_county_Trendchart', formData).then(res => {
          console.log(res);
          let data = res.data.data;
          var mianji = 0;
          data.forEach((item) => {
            item.ZIYONGYFMJ = (mianji + parseInt(item.ZIYONGYFMJ));
            mianji = item.ZIYONGYFMJ;
          })
          self.echartsdata = data;

          self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
            self.tableheader = self.GONGSIMC + "自有用房趋势图"; //头部标题
            self.chartrefresh = true;
            loadingInstance.close();
          });
        }).catch(e => {
          console.log(e)
        });
      },
      fullscreen() {
        this.$util.toggleFullscreen();
        if (this.isFullscreen) {
          this.isFullscreen = false;
          this.fullZIndex = "";
          this.fullscreentext = "全屏";
        } else {
          this.isFullscreen = true;
          this.fullZIndex = "999";
          this.fullscreentext = "退出全屏";
        }
      }
  },
  computed: {
    qushiOption() {
       return {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            show: true,
            right: '20',
            data: ['自有用房面积', '测算规模需求面积'],
            textStyle: { //图例文字的样式
              color: '#000',
              fontSize: 16
            },
          },
          grid: {
            top: '15%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: this.getxData(),
            axisLabel: {
                color: '#000',
                fontSize: 15
            },
            axisTick: {
              show: true //刻度线
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            axisLabel: {
                color: '#000',
                fontSize: 15
            },
          }],
          series: [
            {
              name: '自有用房面积',
              type: 'line',
              //平滑的折线
              // smooth: true,
              //折线拐点的大小
              symbolSize: 10,
              //折线拐点的类型
              symbol: 'circle',
              color: ['orange'],
              data: this.echartsdata.map(d => d.ZIYONGYFMJ)
            }, {
              name: '测算规模需求面积',
              type: 'line',
              //平滑的折线
              // smooth: true,
              //折线拐点的大小
              symbolSize: 10,
              //折线拐点的类型
              symbol: 'circle',
              color: ['red'],
              data: this.echartsdata.map(d => d.CESUANHEJI)
            }
          ]
        };
     }
  },
}
</script>

<style>
.headertitle {
  font-size: 20px;
}
</style>
