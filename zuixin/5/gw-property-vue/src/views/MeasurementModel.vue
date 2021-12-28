<template>
  <div>
    <div style="text-align: center;margin-top: 20px">
      <h2>电网小型基建规划测算模型（县市区）</h2>
    </div>
    <el-table
      :header-cell-style="{textAlign: 'center'}"
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;margin-top: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        align="center"
        prop="date"
        label="单位名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="单位等级"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        align="center"
        prop="address"
        width="180"
        label="单位规模">
      </el-table-column>
      <el-table-column label="用房规模（业务类）">
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="调度通信用房面积">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="运维检修用房面积">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="营销服务用房面积">
        </el-table-column>
      </el-table-column>

      <el-table-column label="综合管理">
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="经营、管理、技术人员数量">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="面积">
        </el-table-column>
      </el-table-column>

      <el-table-column
        align="center"
        prop="address"
        width="180"
        label="档案库房面积">
      </el-table-column>

      <el-table-column label="食堂">
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="单位总人数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="面积">
        </el-table-column>
      </el-table-column>

      <el-table-column label="设备设施用房">
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="拟建用房栋数">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="面积">
        </el-table-column>
      </el-table-column>

      <el-table-column
        align="center"
        prop="address"
        width="180"
        label="预留发展用房面积（5%增加人）">
      </el-table-column>

      <el-table-column
        align="center"
        prop="address"
        width="180"
        label="测算规模需求合计">
      </el-table-column>

      <el-table-column label="现用房情况">
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="自有用房面积">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="楼栋数">
        </el-table-column>

        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="承租用房面积">
        </el-table-column>
      </el-table-column>

      <el-table-column label="存在问题情况">
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="危房面积">
        </el-table-column>
        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="拟规划拆迁面积">
        </el-table-column>

        <el-table-column
          align="center"
          prop="address"
          width="180"
          label="其它原因不适宜使用面积">
        </el-table-column>
      </el-table-column>

      <el-table-column
        align="center"
        prop="address"
        width="180"
        label="总面积缺口">
      </el-table-column>

      <el-table-column
        align="center"
        prop="address"
        width="180"
        label="自有用房面积缺口">
      </el-table-column>

      <el-table-column
        align="center"
        prop="address"
        width="180"
        label="总面积紧缺率">
      </el-table-column>

      <el-table-column
        align="center"
        prop="address"
        width="180"
        label="自有面积紧缺率">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "MeasurementModel",
  data() {
    return {
      tableData: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        children: [{
          id: 31,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          id: 32,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }]
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData1: [{
        id: 1,
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        id: 2,
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        id: 3,
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄',
        hasChildren: true
      }, {
        id: 4,
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    load(tree, treeNode, resolve) {
      setTimeout(() => {
        resolve([
          {
            id: 31,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            id: 32,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }
        ])
      }, 1000)
    }
  }
}
</script>

<style scoped>

</style>
