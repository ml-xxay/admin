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
              <treeselect v-model="GONGSIID" :options="orageList" placeholder="请选择所属公司" :appendToBody="true"
                :normalizer="normalizer" />
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
          <el-col :md="5" :sm="12">
            <el-form-item label="房屋健康状况:" label-width="100px" >
              <el-checkbox style="margin-left: 10px" v-model="ZAIJIAN" @change="zaijianChange">在建</el-checkbox>
              <el-checkbox v-model="NICHAIQIAN" v-if="false">拟拆迁</el-checkbox>
              <el-checkbox v-model="BUSHIYI" v-if="false">不适宜</el-checkbox>
              <el-checkbox v-model="WEIFANG" v-if="false">危房</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :md="19" :sm="12">
            <el-form-item label="在建起止日期:" label-width="100px" v-if="ZAIJIAN">
             <el-date-picker size="mini" clearable style="width:350px !important" v-model="DATERANGE" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="ele-fluid" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="headertitle" v-if="chartrefresh" >{{tableheader}}</div>
      <ele-chart ref="chart1" v-if="chartrefresh" :option="qushiOption" style="height: 425px;margin-top: 20px" />

      <div class="headertitle" v-if="chartrefresh"  style="margin-top: 50px;">{{lvtableheader}}</div>
      <ele-chart ref="chart2" v-if="chartrefresh" :option="lvqushiOption" style="height: 425px;margin-top: 20px" />
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
    inject: ['reload'],
    name: "xjgsmjjql",
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
        lvtableheader: '',
        tableData: [],
        GONGSIID: '',
        orageList: [],
        GONGSIMC: '',
        ZAIJIAN: true,
        NICHAIQIAN: true,
        BUSHIYI: true,
        WEIFANG: true,

        chartrefresh: false,
        echartsdata: [], // 面积缺口数据
        lvechartsdata: [] // 面积紧缺率数据
      }
    },
    created() {
      this.GONGSIID = null;
      this.getOrageList();
    },
    mounted() {
      window.onresize = ()=> {
        if(!myutils.checkFull()){
          this.isFullscreen = false;
          this.fullZIndex = "";
          this.fullscreentext = "全屏";
        }
        this.$refs.chart1.resize();  //echarts表格重新渲染
        this.$refs.chart2.resize();  //echarts表格重新渲染
      }
    },
    methods: {
      /* 下拉树组件格式化数据 */
      normalizer(d) {
        return {
          id: d.ID,
          label: d.GONGSIMC
        };
      },
      /* 刷新表格 */
      reloads() {
        if (this.GONGSIID == '' || this.GONGSIID == null) {
          this.$message('请选择所属公司！');
        } else {
          this.getData();
        }
      },
      /* 重置搜索 */
      reset() {
        this.reload();
      },
      zaijianChange(){
        this.DATERANGE = '';
      },
      getOrageList() {
        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_GONGSI",
          inmap: JSON.stringify({
            "GONGSILX": "2",
          }),
          equalmap: JSON.stringify({
            "ID": 3
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
      getData() {
        var self = this
        let loadingInstance = Loading.service({
          fullscreen: false,
          target: '.ele-body'
        });

        //根据公司Id   获取所有数据
        let formData = new FormData()
        //数据库表名
        formData.append('GONGSIID', JSON.stringify(this.GONGSIID))

        formData.append('ZAIJIAN', this.ZAIJIAN == true ? '是' : '否')
        formData.append('NICHAIQIAN', this.NICHAIQIAN == true ? '是' : '否')
        formData.append('BUSHIYI', this.BUSHIYI == true ? '是' : '否')
        formData.append('WEIFANG', this.WEIFANG == true ? '是' : '否')

        if(this.DATERANGE !=''&&this.DATERANGE != null)
        {
          formData.append('startdate', myutils.getFullDate(this.DATERANGE[0]))
          formData.append('enddate', myutils.getFullDate(this.DATERANGE[1]))
        }
        this.$requestsu.post("/TM_model_city_getsubcompanyhousecalculate_controller_county", formData).then(
            function(response) {
              console.log(response);
              let data = response.data.data;
              let lvdata = response.data.data;

              self.echartsdata = data.sort(self.compare('u'));
              let lvresult = lvdata.filter(function (item)
                {
                    item.z = item.z.replace("%",'')
                    item.aa = item.aa.replace("%",'')
                    return item
                });
                self.lvechartsdata = lvresult.sort(self.compare('z'))
              self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                self.tableheader = "县级公司面积缺口"; //头部标题
                self.lvtableheader = "县级公司面积紧缺率"; //头部标题
                self.chartrefresh = true;
                loadingInstance.close();
              });

            })
          .catch(function(error) {
            console.log(error);
          });
      },
      compare(key) {
        return function(a, b) {
          var val1 = a[key];
          var val2 = b[key];
          return val2 - val1;
        }
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
      /* 面积缺口折线图配置 */
      qushiOption() {
        return {
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['总面积缺口', '自有用房面积缺口'],
            textStyle: { //图例文字的样式
              color: '#000',
              fontSize: 16
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: this.echartsdata.map(d => d.ad),
            interval: 0, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
            axisLabel: {
              color: '#000',
              fontSize: 15
            },
            axisTick: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }

            },
          }],
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            splitLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              color: '#000',
              fontSize: 15
            },
          }],
          series: [{
              name: '总面积缺口',
              type: 'line',
              //平滑的折线
              // smooth: true,
              //折线拐点的大小
              symbolSize: 10,
              //折线拐点的类型
              symbol: 'circle',
              color: ['red'],
              data: this.echartsdata.map(d => d.u),
            },
            {
              name: '自有用房面积缺口',
              type: 'line',
              //平滑的折线
              // smooth: true,
              //折线拐点的大小
              symbolSize: 10,
              //折线拐点的类型
              symbol: 'circle',
              color: ['orange'],
              data: this.echartsdata.map(d => d.v),
            }
          ],
					dataZoom: [{
							type: 'slider',
							show: true,
							start: 0,
							end: 10,
							filterMode: "empty",
							textStyle: false,
							handleSize: 0, //滑动条的 左右2个滑动条的大小

						},
						{
							type: 'inside',
							show: true,
							zoomOnMouseWheel: false,
							moveOnMouseMove: true,
							moveOnMouseWheel: true,
						},
					]
        };
      },

      /* 紧缺率折线图配置 */
      lvqushiOption() {
        return {
          tooltip: {
            trigger: 'axis',
          //  formatter:'{b}<br />{a0}: {c0}%<br />{a1}: {c1}%',
            formatter: function (params) {
              let str = params[0].name + "<br />";
              params.forEach((item) => {
                str +=
                  '<div style="width:220px;"><span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:'+item.color+'"></span>' + item.seriesName + "<span style='float:right;font-weight:blod'>" + item.data + "%</span><br /></div>";
              });
              return str;
            }
          },
          legend: {
            data: ['总面积紧缺率', '自有用房面积紧缺率'],
            textStyle: { //图例文字的样式
              color: '#000',
              fontSize: 16
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: true,
            data: this.lvechartsdata.map(i => i.ad),
            interval: 0, //0：表示全部显示不间隔；auto:表示自动根据刻度个数和宽度自动设置间隔个数
            axisLabel: {
              color: '#000',
              fontSize: 15
            },
            axisTick: {
              show: true
            },
            axisLine: {
              lineStyle: {
                color: '#000'
              }

            },
          }],
          yAxis: [{
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#000'
              }
            },
            splitLine: {
              show: true
            },
            axisTick: {
              show: true
            },
            axisLabel: {
              color: '#000',
              fontSize: 15,
              formatter: '{value} %'
            },
          }],
          series: [{
              name: '总面积紧缺率',
              type: 'line',
              //平滑的折线
              // smooth: true,
              //折线拐点的大小
              symbolSize: 10,
              //折线拐点的类型
              symbol: 'circle',
              color: ['red'],
              data: this.lvechartsdata.map(i => i.z),
            },
            {
              name: '自有用房面积紧缺率',
              type: 'line',
              //平滑的折线
              // smooth: true,
              //折线拐点的大小
              symbolSize: 10,
              //折线拐点的类型
              symbol: 'circle',
              color: ['orange'],
              data: this.lvechartsdata.map(i => i.aa),
            }
          ],
					dataZoom: [{
							type: 'slider',
							show: true,
							start: 0,
							end: 10,
							filterMode: "empty",
							textStyle: false,
							handleSize: 0, //滑动条的 左右2个滑动条的大小

						},
						{
							type: 'inside',
							show: true,
							zoomOnMouseWheel: false,
							moveOnMouseMove: true,
							moveOnMouseWheel: true,
						},
					]
        };
      }
    }
  }
</script>

<style>
  .headertitle {
    text-align: center;
    font-size: 23px;
    padding: 10px 0px 20px 0px;
    font-weight: bold;
  }

  .el-checkbox {
    font-size: 20px;
  }

  .el-checkbox__input.is-checked+.el-checkbox__label {
    color: black;
  }

  .el-checkbox__label {
    font-size: 15px;
  }
</style>
