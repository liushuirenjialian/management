<template>
	<el-col :span="24" class="contentBox">
		<el-tabs type="border-card">
			<el-tab-pane label="有效报价统计列表">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="监测点名称">
						<el-select v-model="queryCondition.monitorId" placeholder="请选择">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="item in monitorOptions" :key="item.index" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="品种">
						<el-select v-model="queryCondition.cropId" placeholder="请选择">
							<el-option label="全部" value=""></el-option>
							<el-option v-for="item in varietyOptions" :key="item.index" :label="item.cropName" :value="item.id"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<span class="demonstration">时间段</span>
						<el-date-picker v-model="queryCondition.startDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd"></el-date-picker>
						至
						<el-date-picker v-model="queryCondition.endDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyyMMdd"></el-date-picker>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="query">查询</el-button>
					</el-form-item>
				</el-form>

				<!-- 列表展示 -->
				<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
					<el-table-column align="center" label="序号">
						<template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
					</el-table-column>
					<el-table-column align="center" label="监测点名称">
						<template slot-scope="scope"><span>{{scope.row.monitorName}}</span></template>
					</el-table-column>
					<el-table-column align="center" label="品种">
						<template slot-scope="scope"><span>{{scope.row.cropName}}</span></template>
					</el-table-column>
					<el-table-column align="center" label="有效报价数量">
						<template slot-scope="scope"><span>{{scope.row.priceCount}}</span></template>
					</el-table-column>
					<el-table-column align="center" label="有效评论数量">
						<template slot-scope="scope"><span>{{scope.row.priceCount}}</span></template>
					</el-table-column>
				</el-table>
				<!-- 分页开始 -->
				<div v-show="!listLoading" class="pagination-container">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryList.page" :page-sizes="[10,20,30,50]" :page-size="queryList.size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
				</div>
				<!-- 分页结束 -->
			</el-tab-pane>
		</el-tabs>
	</el-col>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { findAll, conditionFind, findVariety, findMonitor } from '@/api/priceStatistics/validQuote'
	export default {
	  name: 'dashboard',
	  computed: {
	    ...mapGetters(['name', 'roles'])
	  },
	  data() {
	    return {
	      // 品种选择数据开始
	      monitorOptions: [],
	      varietyOptions: [],
	      queryCondition: {
	        cropId: '',
	        monitorId: '',
	        startDate: '',
	        endDate: ''
	      },
	      // 表单数据开始
	      list: [],
	      listLoading: false,
	      // 查询分页
	      queryList: {
	        page: 1,
	        size: 10
	      },
	      total: null,
	      tableKey: 0
	    }
	  },
	  mounted() {

	  },
	  created() {
	    this.getList()
	    this.getVariety()
	    this.getMonitor()
	  },
	  methods: {
	    // 查询按钮
	    getList() {
	      findAll(this.queryList.page, this.queryList.size).then(res => {
	        this.list = res.data
	      })
	    },
	    // 查询按钮
	    query() {
	      if (this.queryCondition.startDate > this.queryCondition.endDate) {
	        this.$notify({
	          title: '警告',
	          message: '时间段不符',
	          type: 'warning',
	          duration: 2000
	        })
	      } else {
	        conditionFind(this.queryList.page, this.queryList.size, this.queryCondition).then(res => {
	          this.list = res.data
	        })
	      }
	    },
	    // 获取品种
	    getVariety() {
	      findVariety().then(res => {
	        this.varietyOptions = res.data
	      })
	    },
	    // 获取监测点
	    getMonitor() {
	      findMonitor().then(res => {
	        this.monitorOptions = res.data
	      })
	    },
	    // 分页==设置每页展示多少条数据
	    handleSizeChange(val) {
	      this.queryList.size = val
	      this.getList()
	    },
	    // 分页==跳转第几页
	    handleCurrentChange(val) {
	      this.queryList.page = val
	      this.getList()
	    }
	  }
	}
</script>

<style>
	.contentBox {
		margin-top: 20px;
		padding: 0px 20px;
	}
</style>