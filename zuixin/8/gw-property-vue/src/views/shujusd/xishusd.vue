<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 搜索表单 -->
      <el-form label-width="85px" class="ele-form-search" @keyup.enter.native="reload" @submit.native.prevent>
        <el-row :gutter="15">
          <el-col :md="5" :sm="12">
            <el-form-item label="用房类型:" prop="GONGSILX">
              <el-select clearable class="ele-block" v-model="GONGSILX" placeholder="请选择用房类型">
                <el-option label="一类用房" value="2" />
                <el-option label="二类用房" value="3" />
                <el-option label="三类用房 " value="4" />
              </el-select>
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

      <el-table  v-if="refresh" ref="table" row-key="ID" border @cell-click="tableCellClick"
        :cell-class-name="
        ({ row, column, rowIndex, columnIndex }) => ((row.index = rowIndex), (column.index = columnIndex))" :data="tableData" style="width: 100%;margin-top: 0px" :cell-style="{'text-align':'center'}" :header-cell-style="{'text-align':'center'}">

        <el-table-column prop="GONGSILX" label="用房类型" width="130" :formatter="formatterLX">
        </el-table-column>
        <el-table-column prop="GUIMOFL" label="用房规模" width="130">
        </el-table-column>

        <el-table-column prop="DIAODUSCGLYFMJ" label="调度生产管理用房面积" minWidth="110">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.DIAODUSCGLYFMJ" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.DIAODUSCGLYFMJ }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="YUNWEIJXYFMJ" label="运维检修用房面积" minWidth="110">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.YUNWEIJXYFMJ" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.YUNWEIJXYFMJ }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="YINGXIAOYFMJ" label="营销用房面积" minWidth="110">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.YINGXIAOYFMJ" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.YINGXIAOYFMJ }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="DANGANKFMJ" label="档案库房面积" minWidth="130">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.DANGANKFMJ" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.DANGANKFMJ }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ZONGHEGUANLIMJXS" label="综合管理面积系数" minWidth="150">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.ZONGHEGUANLIMJXS" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.ZONGHEGUANLIMJXS }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="SHITANGMJXS" label="食堂面积系数" minWidth="170">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.SHITANGMJXS" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.SHITANGMJXS }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="NIJIANFANGSHU" label="拟建房数" minWidth="110">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.NIJIANFANGSHU" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.NIJIANFANGSHU }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="SHEBEISHEZHIYFMJ" label="设备设施用房面积系数" minWidth="110">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.SHEBEISHEZHIYFMJ" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.SHEBEISHEZHIYFMJ }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="YULIUMJXS" label="预留面积系数" minWidth="130">
          <template slot-scope="scope">
            <span v-if="
              scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.YULIUMJXS" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.YULIUMJXS }}</span>
          </template>
        </el-table-column>

        <!-- 功能用房表字段不显示在页面上  只做数据写入时用 -->
        <el-table-column prop="GESHENGONGSISJSDID" label="系数设定ID" width="30" v-if="false">
        </el-table-column>

      </el-table>
    </el-card>
  </div>
</template>

<script>
  import myutils from "@/utils/myutils";
  export default {
    name: "xishusd",
    data() {
      return {
        tableData: [],
        tableCellClickRowIndex: null, // 点击的单元格行索引
        tableCellClickColumnIndex: null, // 点击的单元格列索引
        //组件刷新
        refresh: true,
        editChanged: false, // 是否修改标识
        sutang: {},
        formsu: {
          //用房规模表的字段
          ID: '',
          GONGSILX: '',
          GUIMOFL: ''
        },
        //用房规模列表
        GONGSIGUIMO: [],
        //系数设定列表
        GESHENGONGSISJSD: [],
        //所属公司ID
        SHEZHIGSID: '',
        //搜索栏的用房类型
        GONGSILX: ''
      };
    },
    inject: ['reload'],
    created() {
      this.getData()
      //设置公司ID 从会话中获取
      sessionStorage.setItem("SHEZHIGSID", "3")
    },
    methods: {
      formatterLX: function(row) {
        return myutils.getGONGSILXNAME(row.GONGSILX)
      },

      getData() {
        var that = this
        that.SHEZHIGSID = sessionStorage.getItem("SHEZHIGSID");

        this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
          table: "TMDB_PMS_GESHENGONGSISJSD"
        }).then(res => {
          this.GESHENGONGSISJSD = res.data.data;
          this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
            table: "TMDB_PMS_GONGSIGUIMO",
            inmap: JSON.stringify({
              "GONGSILX": "2,3,4",
            }),
            equalmap: JSON.stringify({
            //  "SHEZHIGSID": that.SHEZHIGSID,        ---------------------------------------------------------------------
              "GONGSILX": that.GONGSILX,
            }),
            orderarray: JSON.stringify([{
              "GONGSILX": "ASC"
            }, {
              "ID": "ASC"
            }])
          }).then(res => {
            this.GONGSIGUIMO = res.data.data; //在系数设定数据表中  查找 选中用房类型后 的数据
            this.GONGSIGUIMO.forEach((guimoitem) => {
              this.GESHENGONGSISJSD.forEach((sditem) => {
                if (guimoitem.ID == sditem.GONGSIGUIMOID) //在系数设定数据表中 当 规模ID  和 规模表的ID 相同时
                {
                  this.$set(guimoitem,"DIAODUSCGLYFMJ",sditem.DIAODUSCGLYFMJ);
                  this.$set(guimoitem,"YUNWEIJXYFMJ",sditem.YUNWEIJXYFMJ);
                  this.$set(guimoitem,"YINGXIAOYFMJ",sditem.YINGXIAOYFMJ);
                  this.$set(guimoitem,"DANGANKFMJ",sditem.DANGANKFMJ);
                  this.$set(guimoitem,"ZONGHEGUANLIMJXS",sditem.ZONGHEGUANLIMJXS);
                  this.$set(guimoitem,"SHITANGMJXS",sditem.SHITANGMJXS);
                  this.$set(guimoitem,"NIJIANFANGSHU",sditem.NIJIANFANGSHU);
                  this.$set(guimoitem,"SHEBEISHEZHIYFMJ",sditem.SHEBEISHEZHIYFMJ);
                  this.$set(guimoitem,"YULIUMJXS",sditem.YULIUMJXS);

                  guimoitem.GESHENGONGSISJSDID = sditem.ID;
                }
              })
            });
            that.tableData = this.GONGSIGUIMO
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
        console.log(this.formsu)
        this.tableCellClickRowIndex = row.index;
        this.tableCellClickColumnIndex = column.index;
        this.sutang = Object.assign({}, row);
      },
      // 单元格失去焦点
      // eslint-disable-next-line no-unused-vars
      tableCellInputBlur(row, event, column) {
        var self = this
        const loading = this.$messageLoading({message: '数据校对中..'});
        this.tableCellClickRowIndex = null;
        this.tableCellClickColumnIndex = null;
        for (let i in this.formsu) {
          if (this.formsu[i] != this.sutang[i]) {
            this.editChanged = true;
            break;
          } else {
            this.editChanged = false;
			loading.close();
          }
        }
        if (this.editChanged) {
			loading.close();
          let formData = new FormData()
          formData.append('table', 'TMDB_PMS_GESHENGONGSISJSD')
          formData.append('GONGSIGUIMOID', self.formsu.ID != null ? self.formsu.ID : "")
          formData.append('DIAODUSCGLYFMJ', self.formsu.DIAODUSCGLYFMJ != null ? self.formsu.DIAODUSCGLYFMJ : "")
          formData.append('YUNWEIJXYFMJ', self.formsu.YUNWEIJXYFMJ != null ? self.formsu.YUNWEIJXYFMJ : "")
          formData.append('YINGXIAOYFMJ', self.formsu.YINGXIAOYFMJ != null ? self.formsu.YINGXIAOYFMJ : "")
          formData.append('DANGANKFMJ', self.formsu.DANGANKFMJ != null ? self.formsu.DANGANKFMJ : "")
          formData.append('ZONGHEGUANLIMJXS', self.formsu.ZONGHEGUANLIMJXS != null ? self.formsu.ZONGHEGUANLIMJXS : "")
          formData.append('SHITANGMJXS', self.formsu.SHITANGMJXS != null ? self.formsu.SHITANGMJXS : "")
          formData.append('NIJIANFANGSHU', self.formsu.NIJIANFANGSHU != null ? self.formsu.NIJIANFANGSHU : "")
          formData.append('YULIUMJXS', self.formsu.YULIUMJXS != null ? self.formsu.YULIUMJXS : "")
          formData.append('SHEBEISHEZHIYFMJ', self.formsu.SHEBEISHEZHIYFMJ != null ? self.formsu.SHEBEISHEZHIYFMJ : "")

          if (self.formsu.GESHENGONGSISJSDID == "undefined" || self.formsu.GESHENGONGSISJSDID == null) {
            //添加操作
            this.$requestsu.post("/TM_insertone_controller", formData).then(function(response) {
                console.log(response);
                if (response.data.code === 200) {
                  self.$message('系数设定成功');
                  self.getData();  //刷新系数设定表ID 绑定到树状表上
                } else {
                  self.$message('系数设定失败');
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            formData.append('ID', self.formsu.GESHENGONGSISJSDID != null ? self.formsu.GESHENGONGSISJSDID : "")
            //修改操作
            this.$requestsu.post("/TM_updateone_controller", formData).then(function(response) {
                console.log(response);
                if (response.data.code === 200) {
                  self.$message('系数设定成功');
                } else {
                  self.$message('系数设定失败');
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
