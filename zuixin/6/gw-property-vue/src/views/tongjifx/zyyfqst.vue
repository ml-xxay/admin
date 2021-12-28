<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form label-width="77px" class="ele-form-search" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="7" :sm="12">
            <el-form-item label="所属公司:" style="width: 370px">
              <treeselect v-model="GONGSIID" :options="orageList" placeholder="请选择所属公司" :defaultExpandLevel="4"
                :appendToBody="true" :normalizer="normalizer"  @select="treeSelect"/>
            </el-form-item>
          </el-col>
          <el-col :md="6" :sm="12">
            <div class="ele-form-actions">
              <el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="reloads">查询
              </el-button>
              <el-button @click="reset">重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <ele-chart v-if="chartrefresh" :option="qushiOption" style="height: 400px;margin-top: 100px" />
    </el-card>

  </div>
</template>

<script>
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import EleChart from 'ele-admin/packages/ele-chart';
  export default {
    name: "fenxi",
    components: {
      Treeselect,
      EleChart
    },
    data() {
      return {
        orageList: [], //所属公司下拉列表
        GONGSIID: null, //所属公司ID
        GONGSIMC:'',  //所属公司名称

        chartrefresh: false,
        qushibiaozhun:'',   //趋势图 省执行标准
        saleroomData: [] // 销售量数据
      }
    },
    inject: ['reload'],
    created() {
      this.getOrageList(); //获取下拉框所属公司列表
    },
    mounted() {
      this.getqushiData(); //趋势图
    },
    methods: {
      /* 刷新表格 */
      reloads() {
        if (this.GONGSIID == '' || this.GONGSIID == null) {
          this.$message('请选择所属公司！');
        } else {
          this.chartrefresh = true;
        }
      },
      /* 重置搜索 */
      reset() {
        this.reload();
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
      /* 获取趋势数据 */
      getqushiData() {
        // 实际项目这里一般请求后台获取数据
        this.saleroomData = [{
            month: '1月',
            value: 816
          },
          {
            month: '2月',
            value: 542
          },
          {
            month: '3月',
            value: 914
          },
          {
            month: '4月',
            value: 781
          },
          {
            month: '5月',
            value: 355
          },
          {
            month: '6月',
            value: 796
          }
        ];
      }
    },
    computed: {
      /* 销售额柱状图配置 */
      qushiOption() {
        return {
          title: {
            text: this.GONGSIMC + "自有用房趋势图",
            x: 'center',
            textStyle: {
                color: '#000',
                fontSize:20
            }
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            show:true,
            right: '20',
            data: ['自有用房面积', '执行标准'],
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
              textStyle: {
                color: '#000',
                fontSize: 15,
              },
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
              textStyle: {
                color: '#000',
                fontSize: 15,
              },
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
              data: [900, 1100, 1300, 1300, 1300, 1800, 1800, 1800]
            },{
              name: '执行标准',
              type: 'line',
              //平滑的折线
              // smooth: true,
              //折线拐点的大小
              symbolSize: 10,
              //折线拐点的类型
              symbol: 'circle',
              color: ['red'],
              data: [1200, 1200, 1200, 1200,1200, 1200, 1200, 1200]
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
