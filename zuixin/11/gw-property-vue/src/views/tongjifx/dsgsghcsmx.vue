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
                            :normalizer="normalizer"/>
              </el-form-item>
            </el-col>
            <el-col :md="15" :sm="12">
              <div class="ele-form-actions">
                <el-button type="primary" icon="el-icon-search" class="ele-btn-icon" @click="reloads">查询
                </el-button>
                <el-button @click="reset">重置</el-button>
                <el-button @click="exportBas">导出
                </el-button>
                <el-button @click="fullscreen">{{ fullscreentext }}
                </el-button>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="15">
            <el-col :md="9" :sm="12">
              <el-form-item label="房屋健康状况:" label-width="100px">
                <el-checkbox style="margin-left: 10px" v-model="ZAIJIAN" @change="zaijianChange">在建</el-checkbox>
                <el-checkbox v-model="NICHAIQIAN">拟拆迁</el-checkbox>
                <el-checkbox v-model="BUSHIYI">不适宜</el-checkbox>
                <el-checkbox v-model="WEIFANG">危房</el-checkbox>
              </el-form-item>
            </el-col>
            <el-col :md="15" :sm="12">
              <el-form-item label="在建年份:" v-if="ZAIJIAN">
                <el-date-picker
                  v-model="DATERANGE"
                  type="year"
                  placeholder="选择年">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div class="headertitle" v-if="refresh">{{ tableheader }}</div>
        <!-- 数据表格 -->
        <el-table ref="table" v-if="refresh" :indent="5" :height="fullscreenheight"
                  :header-cell-style="{textAlign: 'center'}" :data="tableData" border row-key="c" default-expand-all
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
          <el-table-column align="left" prop="c" label="公司名称" sortable min-width="180px" fixed="left">
          </el-table-column>
          <el-table-column align="center" prop="b" min-width="65" label="用房规模">
          </el-table-column>
          <el-table-column label="“调度通信+运维检修+营销服务”用房规模（业务类）">
            <el-table-column align="center" prop="d" min-width="75" label="调度通信用房面积">
            </el-table-column>
            <el-table-column align="center" prop="ab" min-width="75" label="运维检修用房面积">
            </el-table-column>
            <el-table-column align="center" prop="ac" min-width="75" label="营销服务用房面积">
            </el-table-column>
          </el-table-column>

          <el-table-column label="综合管理">
            <el-table-column align="center" prop="e" min-width="55" label="经营、管理、技术人员数量(人)">
            </el-table-column>
            <el-table-column align="center" prop="f" min-width="75" label="面积">
            </el-table-column>
          </el-table-column>

          <el-table-column align="center" prop="g" min-width="55" label="档案库房面积">
          </el-table-column>

          <el-table-column label="食堂">
            <el-table-column align="center" prop="h" min-width="55" label="单位总人数(人)">
            </el-table-column>
            <el-table-column align="center" prop="i" min-width="75" label="面积">
            </el-table-column>
          </el-table-column>

          <el-table-column label="设备设施用房">
            <el-table-column align="center" prop="j" min-width="55" label="拟建用房栋数(栋)">
            </el-table-column>
            <el-table-column align="center" prop="k" min-width="75" label="面积">
            </el-table-column>
          </el-table-column>

          <el-table-column align="center" prop="m" min-width="75" label="预留发展用房面积（5%增加人">
          </el-table-column>

          <el-table-column align="center" prop="n" min-width="80" label="测算规模需求合计">
          </el-table-column>

          <el-table-column label="现用房情况">
            <el-table-column align="center" prop="o" min-width="75" label="自有用房面积">
            </el-table-column>
            <el-table-column align="center" prop="p" min-width="50" label="楼栋数(栋)">
            </el-table-column>

            <el-table-column align="center" prop="q" min-width="75" label="承租用房面积">
            </el-table-column>
          </el-table-column>

          <el-table-column label="存在问题情况">
            <el-table-column align="center" width="220" v-if="this.WENTISHOW">
            </el-table-column>
            <el-table-column align="center" prop="r" min-width="75" label="危房面积" v-if="this.WEIFANGSHOW">
            </el-table-column>
            <el-table-column align="center" prop="s" min-width="75" label="拟规划拆迁面积" v-if="this.NICHAIQIANSHOW">
            </el-table-column>
            <el-table-column align="center" prop="t" min-width="75" label="其它原因不适宜使用面积" v-if="this.BUSHIYISHOW">
            </el-table-column>
          </el-table-column>

          <el-table-column align="center" prop="u" min-width="90" label="总面积缺口">
          </el-table-column>

          <el-table-column align="center" prop="v" min-width="90" label="自有用房面积缺口">
          </el-table-column>

          <el-table-column align="center" prop="z" min-width="80" label="总面积紧缺率">
          </el-table-column>

          <el-table-column align="center" prop="aa" min-width="80" label="自有面积紧缺率">
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>
</template>

<script>
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import {
  Loading
} from 'element-ui';
import XLSX from 'xlsx';
import jsexcel from "@/utils/js-excel";
import myutils from "@/utils/myutils";

export default {
  inject: ['reload'],
  name: "dsgsghcsmx",
  components: {
    Treeselect
  },
  data() {
    return {
      fullscreentext: "全屏",
      isFullscreen: false,
      fullZIndex: '',
      fullscreenheight: '670',

      time_start: '',
      time_end: '',
      DATERANGE: '',
      tableheader: '',
      tableData: [],
      GONGSIID: '',
      orageList: [],
      GONGSIMC: '',
      refresh: false,
      ZAIJIAN: true,
      NICHAIQIAN: true,
      BUSHIYI: true,
      WEIFANG: true,
      ZAIJIANSHOW: true, //在建列显示隐藏
      NICHAIQIANSHOW: true, //拟拆迁列显示隐藏
      WEIFANGSHOW: true, //危房列显示隐藏
    }
  },
  mounted() {
    window.onresize = () => {
      if (!myutils.checkFull()) {
        this.isFullscreen = false;
        this.fullZIndex = "";
        this.fullscreentext = "全屏";
        this.fullscreenheight = "670";
      }
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
    //查询
    reloads() {
      if (this.GONGSIID == '' || this.GONGSIID == null) {
        this.$message('请选择所属公司！');
      } else {
        this.ZAIJIANSHOW = this.ZAIJIAN;
        this.WEIFANGSHOW = this.WEIFANG;
        this.NICHAIQIANSHOW = this.NICHAIQIAN;
        this.BUSHIYISHOW = this.BUSHIYI;
        if (this.WEIFANG == false && this.NICHAIQIAN == false && this.BUSHIYI == false) {
          this.WENTISHOW = true;
        } else {
          this.WENTISHOW = false;
        }

        if (this.DATERANGE == '' || this.DATERANGE == null) {
          this.getData();
        } else {
          var d = this.DATERANGE;
          //组装数据
          var time_start = d.getFullYear() + "-01" + "-01";
          var time_end = d.getFullYear() + "-12" + "-31";

          this.time_start = time_start;
          this.time_end = time_end;
          this.getData();
        }
      }
    },
    /* 重置搜索 */
    reset() {
      this.reload();
    },
    zaijianChange() {
      this.DATERANGE = '';
    },
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
        console.log(result);
        this.orageList = result
      }).catch(e => {
        console.log(e)
      });
    },

//获取测算模型
    getData() {
      var self = this
      //数据表格显示   refresh为true  默认为fals
      self.refresh = true
      let loadingInstance = Loading.service({
        fullscreen: false,
        target: '.ele-body'
      });
      //根据公司ID获取公司信息

      this.$util.eachTreeData(this.orageList, (item) => {
        if (item.ID == this.GONGSIID) {
          this.GONGSILX = item.GONGSILX;
          this.GONGSIGUIMOID = item.GONGSIGUIMOID
          this.GONGSIMC = item.GONGSIMC
        }
      }, 'children');
      this.tableheader = this.GONGSIMC + "小型基建规划测算模型"; //头部标题
      //根据公司id查询公司名称
      let formDatas = new FormData()
      formDatas.append('table', 'TMDB_PMS_GONGSI')
      formDatas.append('equalmap', JSON.stringify({
        "ID": this.GONGSIID
      }))
      this.$requestsu.post("/TM_getallinfo_controller", formDatas).then(function (response) {
        self.GONGSIMC = response.data.data[0].GONGSIMC
      })

      //根据公司Id获取测算模型     获取所有数据 保存到tableData里面
      let formData = new FormData()
      //数据库表名
      formData.append('GONGSIID', JSON.stringify(this.GONGSIID))

      formData.append('ZAIJIAN', this.ZAIJIAN == true ? '是' : '否')
      formData.append('NICHAIQIAN', this.NICHAIQIAN == true ? '是' : '否')
      formData.append('BUSHIYI', this.BUSHIYI == true ? '是' : '否')
      formData.append('WEIFANG', this.WEIFANG == true ? '是' : '否')

      if (this.DATERANGE != '' && this.DATERANGE != null) {
        formData.append('startdate', this.time_start)
        formData.append('enddate', this.time_end)
      }

      this.$requestsu.post("/TM_model_getsubcompanyhousecalculate_controller_county", formData).then(function (
        response) {
        self.tableData = response.data.data
        self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
          loadingInstance.close();
          self.$refs.table.doLayout()
        });
      })
        .catch(function (error) {
          console.log(error);
        });
    },

    /* 导出excel */
    exportBas() {
      // eslint-disable-next-line no-unused-vars
      const self = this
      let array = [
        ['公司名称', '用房规模', '“调度通信+运维检修+营销服务”用房规模（业务类）', null, null, '综合管理', null, '档案库房面积（平方米）', '食堂', null, '设备设施用房',
          null, '预留发展用房面积（5%增加人）（平方米）', '测算规模需求合计（平方米）', '现用房情况', null, null, '存在问题情况', null, null, '总面积缺口（平方米）',
          '自由用房面积缺口（平方米）', '总面积紧缺率', '自有面积紧缺率'
        ],
        [null, null, '调度通信用房面积（平方米）', '运维检修用房面积（平方米）', '营销服务用房面积（平方米）',
          '经营、管理、技术人员数量', '面积', null, '单位总人数（人）', '面积（平方米）', '拟建用房栋数（栋）',
          '面积（平方米）', null, null, '自有用房面积（平方米）', '楼栋数（栋）', '承租用房面积（平凡米）', '危房面积（平方米）', '拟规划拆迁面积（平方米）',
          '其他原因不适宜使用面积（平方米）', null, null, null, null
        ]
      ];
      self.$util.eachTreeData(self.tableData, (d) => {
        array.push([d.c, d.b, d.d, d.ab, d.ac,
          d.e, d.f, d.g, d.h, d.i, d.j, d.k, d.m, d.n, d.o,
          d.p, d.q, d.r, d.s, d.t, d.u, d.v, d.z, d.aa
        ]);
      }, 'children');
      let sheet = XLSX.utils.aoa_to_sheet(array);
      sheet['!merges'] = [{
        s: {
          r: 0,
          c: 0
        },
        e: {
          r: 1,
          c: 0
        }
      }, {
        s: {
          r: 0,
          c: 1
        },
        e: {
          r: 1,
          c: 1
        }
      }, {
        s: {
          r: 0,
          c: 2
        },
        e: {
          r: 0,
          c: 4
        }
      }, {
        s: {
          r: 0,
          c: 5
        },
        e: {
          r: 0,
          c: 6
        }
      }, {
        s: {
          r: 0,
          c: 7
        },
        e: {
          r: 1,
          c: 7
        }
      }, {
        s: {
          r: 0,
          c: 8
        },
        e: {
          r: 0,
          c: 9
        }
      }, {
        s: {
          r: 0,
          c: 10
        },
        e: {
          r: 0,
          c: 11
        }
      }, {
        s: {
          r: 0,
          c: 12
        },
        e: {
          r: 1,
          c: 12
        }
      }, {
        s: {
          r: 0,
          c: 13
        },
        e: {
          r: 1,
          c: 13
        }
      }, {
        s: {
          r: 0,
          c: 14
        },
        e: {
          r: 0,
          c: 16
        }
      }, {
        s: {
          r: 0,
          c: 17
        },
        e: {
          r: 0,
          c: 19
        }
      }, {
        s: {
          r: 0,
          c: 20
        },
        e: {
          r: 1,
          c: 20
        }
      }, {
        s: {
          r: 0,
          c: 21
        },
        e: {
          r: 1,
          c: 21
        }
      }, {
        s: {
          r: 0,
          c: 22
        },
        e: {
          r: 1,
          c: 22
        }
      }, {
        s: {
          r: 0,
          c: 23
        },
        e: {
          r: 1,
          c: 23
        }
      }];

      //获取行列数
      var range = XLSX.utils.decode_range(sheet['!ref']);
      var ncols = range.e.c - range.s.c + 1,
        nrows = range.e.r - range.s.r + 1;
      sheet["!cols"] = []; //单元格列宽
      sheet["!rows"] = []; //单元格行高
      for (var j = 1; j < nrows + 1; j++) {
        sheet["!rows"].push({
          hpx: 25
        });
      }
      for (var i = 1; i < ncols + 1; i++) {
        sheet["!cols"].push({ //设置列宽
          wpx: 170
        });
        for (var k = 1; k < nrows + 1; k++) {
          var curr = jsexcel.getColumnNameByIndex(i - 1) + k;
          if (sheet[curr] != undefined) {
            sheet[curr].s = {
              font: {
                name: '宋体',
                sz: 11,
                bold: false,
                color: {
                  rgb: "000"
                },
              },
              alignment: {
                horizontal: "center",
                vertical: "center",
                wrapText: true,
              },
              border: {
                top: {
                  style: "thin",
                },
                bottom: {
                  style: "thin",
                },
                left: {
                  style: "thin",
                },
                right: {
                  style: "thin",
                },
              }
            }
          }
        }
      }
      var blob = jsexcel.sheet2blob(sheet); //转为blob
      var fileName = "公司规划测算模型表.xlsx";
      jsexcel.saveAs(blob, fileName);
    },
    fullscreen() {
      this.$util.toggleFullscreen();
      if (this.isFullscreen) {
        this.isFullscreen = false;
        this.fullZIndex = "";
        this.fullscreentext = "全屏";
        this.fullscreenheight = "670";
      } else {
        this.isFullscreen = true;
        this.fullZIndex = "999";
        this.fullscreentext = "退出全屏";
        this.fullscreenheight = "900";
      }
    },
    closeScreenFull() {
      console.log(1)
    }
  },
  created() {
    this.GONGSIID = null;
    this.getOrageList();
  }
}
</script>

<style>
.el-checkbox {
  font-size: 20px;
}

.el-checkbox__input.is-checked + .el-checkbox__label {
  color: black;
}

.el-checkbox__label {
  font-size: 15px;
}

.el-table th > .cell {
  padding: 0;
}

.el-table--border th:first-child .cell,
.el-table--border td:first-child .cell {
  padding-left: 0;
}
</style>
