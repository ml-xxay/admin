<template>
	<div>
		<!-- 搜索表单 -->
		<el-form v-if="tablekind==1" label-width="85px" class="ele-form-search" @submit.native.prevent>
			<el-row :gutter="15">
				<el-col :md="5" :sm="12">
					<el-form-item label="用房类型">
						<el-select clearable v-model="selGONGSILX" placeholder="请选择用房类型">
							<el-option label="一类用房" value="一类用房" />
							<el-option label="二类用房" value="二类用房" />
							<el-option label="三类用房" value="三类用房" />
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
		<!-- 数据表格 -->
		<ele-pro-table  ref="table" method="POST" :needPage="false" :where="where" :datasource="url"
			row-key="ID" default-expand-all :parse-data="parseData" :columns="columns" :selection.sync="selection"  :row-class-name="tableRowClassName" 
			:cell-style="{'text-align':'left'}">

		</ele-pro-table>
	</div>
</template>

<script>
	import myutils from "@/utils/myutils";
	export default {
		name: "gongnengtable",
		props: {
			suurl: String,
			suwhere: Object,
			tablekind: String, // 1 显示查询栏 -1 不显示查询栏
			columnsshow: Boolean, // show 显示用房类型 用房分类 false不显示
      tableheader:String     //表头
		},
		data() {
			return {
				// 表格数据接口
				url: this.suurl,
				// 表格列配置
				columns:
        [{
         label: this.tableheader,
         align: 'center', 
         children:[{
						prop: 'ID',
						label: 'ID',
						width: 110,
						show: false
					},
					{
						prop: 'FUJIID',
						label: '父级ID',
						width: 90,
						show: false
					},
					{
						prop: 'XUHAO',
						label: '序号',
						width: 90,
						show: false
					},
					{
						prop: 'GONGSIFL',
						label: '用房分类',
						width: 140,
						show: false
					},
					{
						prop: 'GONGSILX',
						label: '用房类型',
						width: 140,
						show: this.columnsshow
					},
					{
						prop: 'GONGNENGYF',
						label: '房产大类',
						showOverflowTooltip: true,
						width: 250,
					},
					{
						prop: 'ZIXIANGYI',
						label: '房产小类',
						showOverflowTooltip: true,
						width: 220,
					},
					{
						prop: 'ZIXIANGER',
						label: '使用功能',
						showOverflowTooltip: true,
						width: 220,
					},
					{
						prop: 'GUOWANGBZ',
						label: '国网标准 (㎡)',
						showOverflowTooltip: true
					},
					{
						prop: 'SHIFOUSJXFGSYWFB',
						label: '是否省检修（分）公司运维分部',
						width: 140
					},
					{
						prop: 'SHUZHILX',
						label: '数值类型',
						width: 80,
						show: false
					},
					{
						prop: 'ZUIXIAOZHI',
						label: '区间最小值',
						width: 100,
						show: false
					},
					{
						prop: 'ZUIDAZHI',
						label: '最大值/区间最大值',
						width: 90,
						show: false
					}
				],
        }],
				// 表格搜索条件
				where: this.suwhere,
				parseData: (res) => {
					res.data = this.$util.toTreeData(res.data, 'ID', 'FUJIID', 'children');
					this.$util.eachTreeData(res.data, (item) => {
						item.GUOWANGBZ = myutils.getGUOWANGBZ(item.SHUZHILX, item.ZUIXIAOZHI, item.ZUIDAZHI);

					}, 'children');
					return res;
				},
				// 表格选中数据
				selection: [],
				// 当前编辑数据
				current: null,
				// 是否显示编辑弹窗
				showEdit: false,
				// 是否显示导入弹窗
				showImport: false,
				selGONGSILX: ""
			}
		},
		inject: ['reload'],
		methods: {
			/* 刷新表格 */
			reloads() {
        let selobj = JSON.parse(this.where.equalmap);
				this.where.equalmap = JSON.stringify(Object.assign({}, selobj, {"GONGSILX": this.selGONGSILX }))
        this.$refs.table.reload({
					page: 1,
					where: this.where
				});
			},
			/* 重置搜索 */
			reset() {
				this.where = {};
				this.reload();
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
