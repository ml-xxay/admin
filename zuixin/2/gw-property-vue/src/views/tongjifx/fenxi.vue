<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form label-width="77px" class="ele-form-search" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="6" :sm="12">
            <el-form-item label="所属公司:" style="width: 300px">
              <treeselect v-model="GONGSIID" :options="orageList" placeholder="请选择所属公司" :defaultExpandLevel="4"
                :appendToBody="true" :normalizer="normalizer" />
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
      <!-- 数据表格 -->

      <el-table v-if="refresh" ref="table" row-key="ID" border default-expand-all :data="tableData"
        style="width: 100%;margin-top: 0px">
        <el-table-column :label="this.tableheader" header-align="center" label-class-name="headertitle">
          <el-table-column prop="ID" label="标准ID" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGSIFL" label="公司分类" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGSILX" label="公司类型" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGNENGYF" label="功能用房" width="210">
          </el-table-column>

          <el-table-column prop="ZIXIANGYI" label="子项一" width="240">
          </el-table-column>

          <el-table-column prop="ZIXIANGER" label="子项二" width="140">
          </el-table-column>

          <el-table-column prop="ZONGMIANJI" label="总面积 (㎡)" minWidth="120">
          </el-table-column>

          <el-table-column prop="ZHUANGTAI" label="状态" width="100">
          </el-table-column>

          <el-table-column prop="MIANJISHUZHI" label="省公司测算规模需求 (㎡)" minWidth="130">
          </el-table-column>

          <el-table-column prop="GUOWANGBZ" label="国网标准 (㎡)" minWidth="130">
          </el-table-column>
        </el-table-column>
      </el-table>


      <ele-chart v-if="chartrefresh" :option="qushiOption" style="height: 400px;margin-top: 100px" />
    </el-card>

  </div>
</template>

<script>
  import myutils from "@/utils/myutils";
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
        tableData: [],
        tableheader: '',
        refresh: false, //组件刷新
        orageList: [], //所属公司下拉列表
        GONGSIID: null, //所属公司ID
        SHENGONGSISJ: [], //省公司执行标准填报列表
        YONGFANGSJCJ: [], //功能用房填报列表
        GONGSIGUIMOID: "", //公司规模ID
        GONGSILX: '', //公司类型

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
      getData() {
        this.refresh = true;
        this.$util.eachTreeData(this.orageList, (item) => {
          if (item.ID == this.GONGSIID) {
            this.GONGSILX = item.GONGSILX;
            this.GONGSIGUIMOID = item.GONGSIGUIMOID
            this.GONGSIMC = item.GONGSIMC
          }
        }, 'children');

        this.tableheader = this.GONGSIMC + "功能用房分析表";

        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_SHENGONGSISJ",
          equalmap: JSON.stringify({
            "GONGSIID": this.GONGSIID,
            "GONGSIGUIMOID": this.GONGSIGUIMOID
          }), //公司类型ID转换成  x类公司
        }).then(res => {
          this.SHENGONGSISJ = res.data.data; //在省公司执行标准数据表中  查找 选中公司 的数据

          this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
            table: "TMDB_PMS_YONGFANGSJCJ",
            equalmap: JSON.stringify({
              "GONGSIID": this.GONGSIID
            }),
          }).then(res => {
            this.YONGFANGSJCJ = res.data.data; //在功能用房数据表中  查找 选中公司 选中房产后 的数据

            this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
              table: "TMDB_PMS_BIAOZHUN",
              equalmap: JSON.stringify({
                "GONGSILX": myutils.getGONGSILXNAME(this.GONGSILX)
              }), //公司类型ID转换成  x类公司
              orderarray: JSON.stringify([{
                "FUJIID": "ASC"
              }, {
                "XUHAO": "ASC"
              }])
            }).then(res => {
              let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
              this.$util.eachTreeData(result, (item) => {
                item.GUOWANGBZ = myutils.getGUOWANGBZ(item.SHUZHILX, item.ZUIXIAOZHI, item.ZUIDAZHI);
                this.SHENGONGSISJ.forEach((gsitem) => {
                  if (gsitem.BIAOZHUNID == item.ID) //在省公司数据表中 当 标准ID  和 树状图的ID 相同时
                  {
                    item.MIANJISHUZHI = gsitem.MIANJISHUZHI; // 把省公司表的面积数值绑定到 树状图中MIANJISHUZHI字段中
                  }
                })
                this.YONGFANGSJCJ.forEach((yfitem) => {
                  if (yfitem.BIAOZHUNID == item.ID) //在功能用房数据表 当 标准ID  和 树状图的ID 相同时
                  {
                    // 把功能用房数据表的面积数值 累加 绑定到 树状图中ZONGMIANJI字段中
                    item.ZONGMIANJI = parseInt(item.ZONGMIANJI == undefined ? 0 : item.ZONGMIANJI) +
                      parseInt(yfitem.MIANJISHUZHI)
                  }
                })
                if (item.ZONGMIANJI > item.MIANJISHUZHI) {
                  item.ZHUANGTAI = "超出";
                }
              }, 'children');
              this.tableData = result

              this.chartrefresh = true;
            }).catch(e => {
              console.log(e)
            });
          }).catch(e => {
            console.log(e)
          });
        }).catch(e => {
          console.log(e)
        });
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
      /* 下拉树组件格式化数据 */
      normalizer(d) {
        return {
          id: d.ID,
          label: d.GONGSIMC
        };
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
