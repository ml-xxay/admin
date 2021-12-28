<template>
  <div class="ele-body">
    <el-card shadow="never">
		<!-- 搜索表单 -->
		<el-form label-width="85px" class="ele-form-search" @submit.native.prevent>
			<el-row :gutter="15">
				<el-col :md="5" :sm="12">
					<el-form-item label="用房类型">
						<el-select clearable v-model="selGONGSILX" placeholder="请选择用房类型">
							<el-option label="一类用房" value="一类用房" />
							<el-option label="二类用房" value="二类用房" />
							<el-option label="三类用房" value="三类用房" />
							<el-option label="乡镇供电所A类" value="A类" />
							<el-option label="乡镇供电所B类" value="B类" />
							<el-option label="乡镇供电所C类" value="C类" />
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

      <el-table  v-if="refresh" ref="table" row-key="ID"
        border @cell-click="tableCellClick" :row-class-name="tableRowClassName" :cell-class-name="
      ({ row, column, rowIndex, columnIndex }) => (
        (row.index = rowIndex), (column.index = columnIndex)
      )
    " :data="tableData" style="width: 100%;margin-top: 0px">

        <el-table-column prop="ID" label="ID" width="110" align="left">
        </el-table-column>

        <el-table-column prop="FUJIID" label="父级ID" width="90">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.FUJIID" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.FUJIID }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="XUHAO" label="序号" width="90">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.XUHAO" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.XUHAO }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="GONGSIFL" label="用房分类" width="110">

          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.GONGSIFL" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.GONGSIFL }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="GONGSILX" label="用房类型" width="110">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.GONGSILX" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.GONGSILX }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="GONGNENGYF" label="房产大类" minWidth="170">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.GONGNENGYF" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.GONGNENGYF }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ZIXIANGYI" label="房产小类" minWidth="170">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.ZIXIANGYI" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.ZIXIANGYI }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ZIXIANGER" label="使用功能" minWidth="130">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.ZIXIANGER" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.ZIXIANGER }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="SHIFOUSJXFGSYWFB" width="95" label="是否省检修（分）用房运维分部">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.SHIFOUSJXFGSYWFB" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.SHIFOUSJXFGSYWFB }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="SHUZHILX" label="数值类型" width="80">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.SHUZHILX" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.SHUZHILX }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ZUIXIAOZHI" label="区间最小值" width="100">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.ZUIXIAOZHI" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.ZUIXIAOZHI }}</span>
          </template>
        </el-table-column>

        <el-table-column prop="ZUIDAZHI" width="90" label="最大值/区间最大值">
          <template slot-scope="scope">
            <span v-if="
            scope.row.index === tableCellClickRowIndex && scope.column.index === tableCellClickColumnIndex ">
              <el-input v-model="scope.row.ZUIDAZHI" @blur="tableCellInputBlur" size="mini" v-focus />
            </span>
            <span v-else>{{ scope.row.ZUIDAZHI }}</span>
          </template>
        </el-table-column>
      </el-table>

    </el-card>

  </div>
</template>

<script>
  export default {
    name: "biaozhunsd",
    data() {
      return {
        tableData: [],
        tableCellClickRowIndex: null, // 点击的单元格行索引
        tableCellClickColumnIndex: null, // 点击的单元格列索引
        selection: [],
        //组件刷新
        refresh: true,
        //公用对象
        sutang: {},
        editChanged: false,  // 是否修改标识
        formsu: {
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
          ZUIDAZHI: '',
        },
        equalmap:"{}",
				selGONGSILX: ""
      };
    },

    created() {
      this.getData();
    },

    methods: {
      getData(){
          var self = this
          var pramsdata = new FormData();
          pramsdata.append("table", "TMDB_PMS_BIAOZHUN")
          this.$http.post(this.serviceurl + '/TM_getallinfo_controller', {
            table: "TMDB_PMS_BIAOZHUN",
            equalmap:self.equalmap,
            orderarray: JSON.stringify([{"FUJIID": "ASC"},{"XUHAO":"ASC"}])
          }).then(res => {
            let result = this.$util.toTreeData(res.data.data, 'ID', 'FUJIID', 'children');
            self.tableData = result
          }).catch(e => {
            console.log(e)
          });
      },
			/* 刷新表格 */
			reloads() {
        let selobj = JSON.parse(this.equalmap);
				this.equalmap = JSON.stringify(Object.assign({}, selobj, {"GONGSILX": this.selGONGSILX }))
        this.getData();
			},
			/* 重置搜索 */
			reset() {
				this.where = {};
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
        var self = this
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
        if(this.editChanged)
        {
          //修改操作
          // eslint-disable-next-line no-unused-vars
          let formData = new FormData()
          //数据库表名
          formData.append('table', 'TMDB_PMS_BIAOZHUN')
          formData.append('ID', this.formsu.ID!=null?this.formsu.ID:"")
          formData.append('GONGSIFL', this.formsu.GONGSIFL!=null?this.formsu.GONGSIFL:"")
          formData.append('GONGSILX', this.formsu.GONGSILX!=null?this.formsu.GONGSILX:"")
          formData.append('FUJIID', this.formsu.FUJIID!=null?this.formsu.FUJIID:"")
          formData.append('XUHAO', this.formsu.XUHAO!=null?this.formsu.XUHAO:"")
          formData.append('GONGNENGYF', this.formsu.GONGNENGYF!=null?this.formsu.GONGNENGYF:"")
          formData.append('ZIXIANGYI', this.formsu.ZIXIANGYI!=null?this.formsu.ZIXIANGYI:"")
          formData.append('ZIXIANGER', this.formsu.ZIXIANGER!=null?this.formsu.ZIXIANGER:"")
          formData.append('SHIFOUSJXFGSYWFB', this.formsu.SHIFOUSJXFGSYWFB!=null?this.formsu.SHIFOUSJXFGSYWFB:"")
          formData.append('SHUZHILX', this.formsu.SHUZHILX!=null?this.formsu.SHUZHILX:"")
          formData.append('ZUIXIAOZHI', this.formsu.ZUIXIAOZHI!=null?this.formsu.ZUIXIAOZHI:"")
          formData.append('ZUIDAZHI', this.formsu.ZUIDAZHI!=null?this.formsu.ZUIDAZHI:"")

          this.$requestsu.post("/TM_updateone_controller", formData).then(function(response) {
              console.log(response);
              if (response.data.code === 200) {
                self.$message('修改国网标准数据成功');
              } else {
                self.$message('修改国网标准数据失败');
              }
            })
            .catch(function(error) {
              console.log(error);
            });
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

<style>
</style>
