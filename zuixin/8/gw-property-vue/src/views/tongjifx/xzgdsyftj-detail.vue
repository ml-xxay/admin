<!-- 详情弹窗 -->
<template>
  <el-dialog title="用房数据填报详情" width="1000px" :visible="visible" :lock-scroll="false" :destroy-on-close="true"
    @update:visible="updateVisible">
    <el-table v-if="refresh" ref="table" row-key="ID" border default-expand-all :data="tableData"
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

        <el-table-column prop="GUOWANGBZ" label="国网标准 (㎡)" minWidth="130">
        </el-table-column>
      </el-table-column>
    </el-table>
    <div slot="footer">
      <el-button @click="updateVisible(false)">关闭
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
  import myutils from "@/utils/myutils";

  export default {
    name: 'xzgdsyftjDetail',
    props: {
      // 弹窗是否打开
      visible: Boolean,
      // 数据
      data: Object
    },
    data() {
      return {
        tableData: [],
        tableheader: '',
        refresh: false, //组件刷新
        orageList: [], //所属公司下拉列表
        GONGSIID: null, //所属公司ID
        YONGFANGSJCJ: [], //功能用房填报列表
        GONGSIGUIMOID: "", //用房规模ID
        GUIMOFL: "", //用房规模ID
        GONGSILX: '', //用房类型
        GONGSIMC: '', //公司名称
      }
    },
    watch: {
      data() {
        if (this.data) { 
          this.getData();
        }
      }
    },
    methods: {
      getData() {
        var that = this;
        that.refresh = true;

        that.GONGSIID = that.data.GONGSIID
        that.GONGSILX = that.data.GONGSILX;
        that.GONGSIGUIMOID = that.data.GONGSIGUIMOID
        that.GUIMOFL = that.data.GUIMOFL
        that.GONGSIMC = that.data.GONGSIMC

        that.tableheader = that.GONGSIMC + "（"+that.GUIMOFL+"）功能用房数据表";

        that.$http.post(that.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_YONGFANGSJCJ",
          equalmap: JSON.stringify({
            "GONGSIID": that.GONGSIID
          })
        }).then(res => {
          that.YONGFANGSJCJ = res.data.data; //在功能用房数据表中  查找 选中公司 选中房产后 的数据

          that.$http.post(that.serviceurl + '/TM_getallinfo_controller', {
            table: "TMDB_PMS_BIAOZHUN",
            equalmap: JSON.stringify({
              "GONGSILX": myutils.getGONGSILXNAME(that.GUIMOFL)
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
              that.YONGFANGSJCJ.forEach((yfitem) => {
                if (yfitem.BIAOZHUNID == item.ID) //在功能用房数据表 当 标准ID  和 树状图的ID 相同时
                {
                  // 把功能用房数据表的面积数值 累加 绑定到 树状图中ZONGMIANJI字段中
                  item.ZONGMIANJI = parseInt(item.ZONGMIANJI == undefined ? 0 : item
                      .ZONGMIANJI) +
                    parseInt(yfitem.MIANJISHUZHI)
                }
              })
            }, 'children');
            that.tableData = result
          }).catch(e => {
            console.log(e)
          });
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
      /* 更新visible */
      updateVisible(value) {
        this.$emit('update:visible', value);
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
