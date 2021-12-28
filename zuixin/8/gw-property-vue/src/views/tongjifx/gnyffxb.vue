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
              <treeselect v-model="GONGSIID" :options="orageList" placeholder="请选择所属公司" :defaultExpandLevel="1"
                :appendToBody="true" :normalizer="normalizer" />
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
            <el-form-item label="房产属性:" label-width="100px" >
              <el-checkbox style="margin-left: 10px" v-model="ZIYOU" :disabled="true">自有</el-checkbox>
              <el-checkbox v-model="CHENGZU">承租</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :md="9" :sm="12">
            <el-form-item label="房屋健康状况:" label-width="100px" >
              <el-checkbox style="margin-left: 10px" v-model="ZAIJIAN" @change="zaijianChange">在建</el-checkbox>
              <el-checkbox v-model="NICHAIQIAN">拟拆迁</el-checkbox>
              <el-checkbox v-model="BUSHIYI">不适宜</el-checkbox>
              <el-checkbox v-model="WEIFANG">危房</el-checkbox>
            </el-form-item>
          </el-col>
          <el-col :md="10" :sm="12">
            <el-form-item label="在建起止日期:" label-width="100px" v-if="ZAIJIAN">
             <el-date-picker size="mini" clearable style="width:350px !important" v-model="DATERANGE" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" class="ele-fluid" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!-- 数据表格 -->

      <el-table v-if="refresh" ref="table" row-key="ID" border default-expand-all :data="tableData"  :height="fullscreenheight"
        style="width: 100%;margin-top: 0px" :row-class-name="tableRowClassName">
        <el-table-column :label="this.tableheader" header-align="center" label-class-name="headertitle">
          <el-table-column prop="ID" label="标准ID" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGSIFL" label="用房分类" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGSILX" label="用房类型" width="110" v-if="false">
          </el-table-column>

          <el-table-column prop="GONGNENGYF" label="房产大类" width="210">
          </el-table-column>

          <el-table-column prop="ZIXIANGYI" label="房产小类" width="240">
          </el-table-column>

          <el-table-column prop="ZIXIANGER" label="使用功能" width="140">
          </el-table-column>

          <el-table-column prop="ZONGMIANJI" label="总面积 (㎡)" minWidth="120">
          </el-table-column>

          <el-table-column prop="ZHUANGTAI" label="状态" width="100">
            <template slot-scope="scope" v-if="scope.row.ZHUANGTAI === '超出'">
              <el-tag :type="scope.row.ZHUANGTAI === '超出' ? 'danger' : ''" disable-transitions>{{scope.row.ZHUANGTAI}}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column prop="MIANJISHUZHI" label="省公司测算规模需求 (㎡)" minWidth="130">
          </el-table-column>

          <el-table-column prop="GUOWANGBZ" label="国网标准 (㎡)" minWidth="130">
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-card>
    </div>
  </div>
</template>

<script>
  import myutils from "@/utils/myutils";
  import Treeselect from '@riophae/vue-treeselect'
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'

  export default {
    name: "gnyffxb",
    components: {
      Treeselect
    },
    data() {
      return {
        fullscreentext: "全屏",
        isFullscreen: false,
        fullZIndex: '',
        fullscreenheight: "760",

        DATERANGE:'',
        tableData: [],
        tableheader: '',
        refresh: false, //组件刷新
        orageList: [], //所属公司下拉列表
        GONGSIID: null, //所属公司ID
        SHENGONGSISJ: [], //省公司执行标准填报列表
        YONGFANGSJCJ: [], //功能用房填报列表
        GONGSIGUIMOID: "", //用房规模ID
        GONGSILX: '', //用房类型
        GONGSIMC:'', //公司名称
        SHEZHIGONGSIID: '', //执行标准设置公司ID
        FANGCHANIDLIST: '0', //房产IDlist
        ZAIJIAN: true,
        NICHAIQIAN: true,
        BUSHIYI: true,
        WEIFANG: true,
        ZIYOU: true,
        CHENGZU: true,
      }
    },
    inject: ['reload'],
    created() {
      this.getOrageList(); //获取下拉框所属公司列表
      //设置公司ID 从会话中获取
      sessionStorage.setItem("SHEZHIGONGSIID", "3")
      this.SHEZHIGONGSIID = sessionStorage.getItem("SHEZHIGONGSIID");
    },
    mounted() {
      window.onresize = ()=> {
        if(!myutils.checkFull()){
          this.isFullscreen = false;
          this.fullZIndex = "";
          this.fullscreentext = "全屏";
          this.fullscreenheight = "760";
        }
      }
    },
    methods: {
      getData() {
        var that = this;
        that.FANGCHANIDLIST = "0"
        that.refresh = true;
        that.$util.eachTreeData(that.orageList, (item) => {
          if (item.ID == that.GONGSIID) {
            that.GONGSILX = item.GONGSILX;
            that.GONGSIGUIMOID = item.GONGSIGUIMOID
            that.GONGSIMC = item.GONGSIMC
          }
        }, 'children');

        that.tableheader = that.GONGSIMC + "功能用房分析表";

        that.$http.post(that.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_SHENGONGSISJ",
          equalmap: JSON.stringify({
            "GONGSIID": that.SHEZHIGONGSIID,
            "GONGSIGUIMOID": that.GONGSIGUIMOID
          }), //用房类型ID转换成  x类用房
        }).then(res => {
          that.SHENGONGSISJ = res.data.data; //在省公司执行标准数据表中  查找 选中公司 的数据

          that.$http.post(that.serviceurl + '/TM_getallinfo_controller', {
            table: "TMDB_PMS_FANGCHAN",
            equalmap: JSON.stringify({
              "GONGSIID": that.GONGSIID
            }),
          }).then(res => {
            that.FANGCHANLIST = res.data.data;
            console.log(that.DATERANGE)
            for(let i=0;i<that.FANGCHANLIST.length;i++){
              var tourudate = new Date(that.FANGCHANLIST[i].TOURUSHIYONGSJ);
              if (that.ZAIJIAN == true && that.FANGCHANLIST[i].ZAIJIAN == "是") {
                if(that.DATERANGE ==''||that.DATERANGE ==null)
                {
                  that.FANGCHANIDLIST += ',' + that.FANGCHANLIST[i].ID;
                }
                else if(that.DATERANGE !=''&& tourudate > that.DATERANGE[0] && tourudate< that.DATERANGE[1].setDate(that.DATERANGE[1].getDate()+1))
                {
                  that.FANGCHANIDLIST += ',' + that.FANGCHANLIST[i].ID;
                }
                continue;
              } else if (that.NICHAIQIAN == true && that.FANGCHANLIST[i].NICHAIQIAN == "是") {
                that.FANGCHANIDLIST += ',' + that.FANGCHANLIST[i].ID;
                continue;
              } else if (that.WEIFANG == true && that.FANGCHANLIST[i].WEIFANG == "是") {
                that.FANGCHANIDLIST += ',' + that.FANGCHANLIST[i].ID;
                continue;
              } else if (that.BUSHIYI == true && that.FANGCHANLIST[i].BUSHIYI == "是") {
                that.FANGCHANIDLIST += ',' + that.FANGCHANLIST[i].ID;
                continue;
              } else if (that.CHENGZU == true && that.FANGCHANLIST[i].FANGCHANSX == "2") {
                that.FANGCHANIDLIST += ',' + that.FANGCHANLIST[i].ID;
                continue;
              } else if (that.FANGCHANLIST[i].ZAIJIAN != "是" &&that.FANGCHANLIST[i].NICHAIQIAN != "是" && that.FANGCHANLIST[i].WEIFANG != "是" && that.FANGCHANLIST[i].BUSHIYI != "是" && that.FANGCHANLIST[i]
                .FANGCHANSX != "2") {
                that.FANGCHANIDLIST += ',' + that.FANGCHANLIST[i].ID;
                continue;
              }
            }
            that.$http.post(that.serviceurl + '/TM_getallinfo_controller', {
              table: "TMDB_PMS_YONGFANGSJCJ",
              equalmap: JSON.stringify({
                "GONGSIID": that.GONGSIID
              }),
              inmap: JSON.stringify({
                "FANGCHANID": that.FANGCHANIDLIST,
              })
            }).then(res => {
              that.YONGFANGSJCJ = res.data.data; //在功能用房数据表中  查找 选中公司 选中房产后 的数据

              that.$http.post(that.serviceurl + '/TM_getallinfo_controller', {
                table: "TMDB_PMS_BIAOZHUN",
                equalmap: JSON.stringify({
                  "GONGSILX": myutils.getGONGSILXNAME(that.GONGSILX)
                }), //用房类型ID转换成  x类用房
                orderarray: JSON.stringify([{
                  "FUJIID": "ASC"
                }, {
                  "XUHAO": "ASC"
                }])
              }).then(res => {
                let result = that.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
                that.$util.eachTreeData(result, (item) => {
                  item.GUOWANGBZ = myutils.getGUOWANGBZ(item.SHUZHILX, item.ZUIXIAOZHI, item
                    .ZUIDAZHI);
                  that.SHENGONGSISJ.forEach((gsitem) => {
                    if (gsitem.BIAOZHUNID == item.ID) //在省公司数据表中 当 标准ID  和 树状图的ID 相同时
                    {
                      item.MIANJISHUZHI = gsitem
                        .MIANJISHUZHI; // 把省公司表的面积数值绑定到 树状图中MIANJISHUZHI字段中
                    }
                  })
                  that.YONGFANGSJCJ.forEach((yfitem) => {
                    if (yfitem.BIAOZHUNID == item.ID) //在功能用房数据表 当 标准ID  和 树状图的ID 相同时
                    {
                      // 把功能用房数据表的面积数值 累加 绑定到 树状图中ZONGMIANJI字段中
                      item.ZONGMIANJI = parseInt(item.ZONGMIANJI == undefined ? 0 : item
                          .ZONGMIANJI) +
                        parseInt(yfitem.MIANJISHUZHI)
                    }
                  })
                  item.MIANJISHUZHI = item.MIANJISHUZHI == undefined ? 0 : item.MIANJISHUZHI
                  if (item.ZONGMIANJI > item.MIANJISHUZHI) {
                    item.ZHUANGTAI = "超出";
                  }
                }, 'children');
                that.tableData = result
              }).catch(e => {
                console.log(e)
              });
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
      //获取公司列表下拉树
      getOrageList() {
        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_GONGSI",
          inmap: JSON.stringify({
            "GONGSILX": "2,3,4",
          }),
        }).then(res => {
          let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
          this.orageList = result
        }).catch(e => {
          console.log(e)
        });
      },
      tableRowClassName({
        row
      }) {
        if (row.FUJIID === 0) {
          return 'warning-row';
        }
      },
      fullscreen() {
        this.$util.toggleFullscreen();
        if (this.isFullscreen) {
          this.isFullscreen = false;
          this.fullZIndex = "";
          this.fullscreentext = "全屏";
          this.fullscreenheight = "760";
        } else {
          this.isFullscreen = true;
          this.fullZIndex = "999";
          this.fullscreentext = "退出全屏";
          this.fullscreenheight = "900";
        }
      }
    }
  }
</script>

<style>
  .headertitle {
    font-size: 20px;
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
