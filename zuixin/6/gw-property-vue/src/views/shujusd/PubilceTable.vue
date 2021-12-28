<template>
	<div>
      <el-table  v-if="refresh" ref="table" row-key="ID" border @cell-click="tableCellClick" default-expand-all :row-class-name="tableRowClassName"
        :cell-class-name="
        ({ row, column, rowIndex, columnIndex }) => (
          (row.index = rowIndex), (column.index = columnIndex)
        )
      " :data="tableData" style="width: 100%;margin-top: 0px">

        <el-table-column :label="this.tableheader" header-align="center">
            <el-table-column prop="ID" label="标准ID" width="110" v-if="false">
            </el-table-column>

            <el-table-column prop="FUJIID" label="父级ID" width="90" v-if="false">
            </el-table-column>

            <el-table-column prop="XUHAO" label="序号" width="90" v-if="false">
            </el-table-column>

            <el-table-column prop="GONGSIFL" label="用房分类" width="110" v-if="false">
            </el-table-column>

            <el-table-column prop="GONGSILX" label="用房类型" width="110" v-if="false">
            </el-table-column>

            <el-table-column prop="GONGNENGYF" label="房产大类" width="250">
            </el-table-column>

            <el-table-column prop="ZIXIANGYI" label="房产小类" width="250">
            </el-table-column>

            <el-table-column prop="ZIXIANGER" label="使用功能" width="250">
            </el-table-column>

            <el-table-column prop="MIANJISHUZHI" label="面积数值" minWidth="130">
              <template slot-scope="scope">
                <span v-if="
                  scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
                  <el-input v-model="scope.row.MIANJISHUZHI" @blur="tableCellInputBlur" size="mini" v-focus />
                </span>
                <span v-else>{{ scope.row.MIANJISHUZHI }}</span>
              </template>
            </el-table-column>

          <!-- 省公司数据执行标准表字段不显示在页面上  只做数据写入时用 -->
          <el-table-column prop="SHENGONGSISJID" label="执行ID" width="30" v-if="false">
          </el-table-column>
        </el-table-column>
      </el-table>
	</div>
</template>

<script>
	import myutils from "@/utils/myutils";
  export default {
    name: "PubilceTable",
		props: {
			guimoid: String,
			gongsilx: String,
      tableheader:String     //表头
		},
    data() {
      return {
        tableData: [],
        tableCellClickRowIndex: null, // 点击的单元格行索引
        tableCellClickColumnIndex: null, // 点击的单元格列索引
        editChanged: false, // 是否修改标识
        refresh: true,   //组件刷新
        sutang: {},
        formsu: {
          //国网标准表的字段
          ID: '',
          GONGSIFL: '',
          GONGSILX: '',
          FUJIID: '',
          XUHAO: '',
          GONGNENGYF: '',
          ZIXIANGYI: '',
          ZIXIANGER: '',
          SHIFOUSJXFGSYWFB: '',
          SHUZHILX: '',
          ZUIXIAOZHI: '',
          ZUIDAZHI: ''
        },

        SHENGONGSISJ: [], //省公司执行标准填报列表
        GONGSIID:"",     //设置公司ID
        GONGSIGUIMOID:"",    //用房规模ID
        GONGSILX:""    //用房类型ID
      };
    },
    inject: ['reload'],
    created() {
      let that = this
      that.GONGSIGUIMOID = that.guimoid;
      that.$http.post(that.serviceurl + '/TM_getallinfo_controller', {
        table: "TMDB_PMS_GONGSIGUIMO",
        equalmap: JSON.stringify({"ID": that.GONGSIGUIMOID}),
      }).then(res => {
          that.GONGSILX = res.data.data[0].GONGSILX;
          //设置公司ID 从会话中获取
          sessionStorage.setItem("GONGSIID","2")
          that.GONGSIID = sessionStorage.getItem("GONGSIID");
          that.getData()
      }).catch(e => {
        console.log(e)
      });
    },
    methods: {
      getData() {
        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_SHENGONGSISJ",
          equalmap: JSON.stringify({"GONGSIID": this.GONGSIID,"GONGSIGUIMOID":this.GONGSIGUIMOID}),    //用房类型ID转换成  x类用房
        }).then(res => {
          this.SHENGONGSISJ = res.data.data;     //在省公司执行标准数据表中  查找 选中公司 选中房产后 的数据

          this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
            table: "TMDB_PMS_BIAOZHUN",
            equalmap: JSON.stringify({"GONGSILX": myutils.getGONGSILXNAME(this.GONGSILX)}),    //用房类型ID转换成  x类用房
            orderarray: JSON.stringify([{
              "FUJIID": "ASC"
            }, {
              "XUHAO": "ASC"
            }])
          }).then(res => {
            let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
            this.$util.eachTreeData(result, (item) => {
              this.SHENGONGSISJ.forEach((gsitem) => {
                if(gsitem.BIAOZHUNID == item.ID)       //在省公司数据表中 当 标准ID  和 树状图的ID 相同时
                {
                  item.MIANJISHUZHI = gsitem.MIANJISHUZHI;   // 把省公司表的面积数值绑定到 树状图中MIANJISHUZHI字段中
                  item.SHENGONGSISJID = gsitem.ID;   // 把省公司表的ID绑定到 树状图中SHENGONGSISJID字段中
                }
              })
            }, 'children');
            this.tableData = result
          }).catch(e => {
            console.log(e)
          });
        }).catch(e => {
          console.log(e)
        });
      },
      /* 获取表格数据 */
      reloads() {
          this.getData();
      },
      /* 重置搜索 */
      reset() {
        this.reload();
      },
      //进入单元格
      // eslint-disable-next-line no-unused-vars
      tableCellClick(row, column, cell, event) {
        this.formsu = row
        this.tableCellClickRowIndex = row.index;
        this.tableCellClickColumnIndex = column.index;
        this.sutang = Object.assign({}, row);
      },
      // 单元格失去焦点
      // eslint-disable-next-line no-unused-vars
      tableCellInputBlur(row, event, column) {
        let self = this
        this.tableCellClickRowIndex = null;
        this.tableCellClickColumnIndex = null;
        for (let i in this.formsu) {
          if (this.formsu[i] != this.sutang[i]) {
            this.editChanged = true;
            break;
          } else {
            this.editChanged = false;
          }
        }
        if (this.editChanged) {
          let formData = new FormData()
          formData.append('table', 'TMDB_PMS_SHENGONGSISJ')
          formData.append('GONGSIID', self.GONGSIID!=null?self.GONGSIID:"")
          formData.append('GONGSIGUIMOID', self.GONGSIGUIMOID!=null?self.GONGSIGUIMOID:"")
          formData.append('BIAOZHUNID', self.formsu.ID!=null?self.formsu.ID:"")
          formData.append('MIANJISHUZHI', self.formsu.MIANJISHUZHI!=null?self.formsu.MIANJISHUZHI:"")

          if(self.formsu.SHENGONGSISJID =="undefined" || self.formsu.SHENGONGSISJID ==null)
          {
            //添加操作
            this.$requestsu.post("/TM_insertone_controller", formData).then(function(response) {
              console.log(response);
              if (response.data.code === 200) {
                self.$message('执行标准数据填报成功');
                self.getData();               //刷新执行标准表ID 绑定到树状表上
              } else {
                self.$message('执行标准数据填报失败');
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          }
          else
          {
            formData.append('ID', self.formsu.SHENGONGSISJID!=null?self.formsu.SHENGONGSISJID:"")
            //修改操作
            this.$requestsu.post("/TM_updateone_controller", formData).then(function(response) {
              console.log(response);
              if (response.data.code === 200) {
                self.$message('执行标准数据填报成功');
              } else {
                self.$message('执行标准数据填报失败');
              }
            })
            .catch(function(error) {
              console.log(error);
            });
          }
        }
      },
      tableRowClassName({row}){
        if(row.FUJIID === 0){
          return 'warning-row';
        }
      }
    }
  }
</script>

<style scoped>

</style>
