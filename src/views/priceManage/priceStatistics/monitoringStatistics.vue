<template>
  <el-row>
    <el-col :span="24" class="contentBox">
      <el-tabs type="border-card"> <iframe :src="Isrc" width="100%" style="min-height: 500px!important;"></iframe>
        <!--<el-tab-pane label="各监测点统计表">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item label="品种">
							<el-select v-model="queryCondition.Id" placeholder="请选择">
								<el-option label="全部" value=""></el-option>
								<el-option v-for="item in varietyOptions" :key="item.index" :label="item.cropName" :value="item.id"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="query">查询</el-button>
							<el-button type="success" @click="exportExcel">导出到Excel</el-button>
						</el-form-item>
					</el-form>
					<el-table :data="list" style="width:100%">
						<el-table-column align="center" width="100" label="序号">
							<template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
						</el-table-column>
						<el-table-column align="center" width="100" label="地区">
							<template slot-scope="scope"><span>{{scope.row.cityName}}</span></template>
						</el-table-column>
						<el-table-column align="center" width="300" label="地区">
							<template slot-scope="scope"><span>{{scope.row.monitorName}}</span></template>
						</el-table-column>
						<el-table-column label="小麦" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.小麦.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.小麦.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="稻谷" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.稻谷.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.稻谷.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="玉米" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.玉米.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.玉米.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="大豆" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.大豆.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.大豆.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="油菜籽" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.油菜籽.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.油菜籽.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="特一粉" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.特一粉.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.特一粉.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="标一晚籼米" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.标一晚籼米.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.标一晚籼米.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="标一粳米" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.标一粳米.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.标一粳米.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="四级菜籽油" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.四级菜籽油.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.四级菜籽油.sell}}</span></template>
							</el-table-column>
						</el-table-column>
						<el-table-column label="四级豆油" align="center">
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.四级豆油.buy}}</span></template>
							</el-table-column>
							<el-table-column label="收购价格" align="center">
								<template slot-scope="scope"><span>{{scope.row.四级豆油.sell}}</span></template>
							</el-table-column>
						</el-table-column>
					</el-table>
					<div v-show="!listLoading" class="pagination-container">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryList.page" :page-sizes="[10,20,30,50]" :page-size="queryList.size" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
					</div>
				</el-tab-pane>--></el-tabs>
    </el-col>
  </el-row>
</template>
<script>
  import { mapGetters } from 'vuex'
  import Cookies from 'js-cookie'
  import { getI, getIid } from '@/api/priceStatistics/monitoringStatistics'
  //	import { findAll, findCondition, exportTable, findVariety } from '@/api/priceStatistics/monitoringStatistics'
  export default {
    purchasePrice: 'dashboard',
    computed: { ...mapGetters(['purchasePrice', 'roles'])
    },
    data() {
      return {
        constIcode: 'jgjc-wodebaojia',
        Iid: null,
        uId: null,
        Isrc: ''
        // 品种选择数据开始
        //      varietyOptions: [],
        //      queryCondition: {
        //        Id: ''
        //      },
        // 品种选择数据结束
        // 表单数据开始
        //      list: [], // 表单数据结束
        //      listLoading: false,
        //      queryList: {
        //        page: 1,
        //        size: 10
        //      },
        //      total: null,
        //      tableKey: 0
      }
    },
    mounted() {},
    created() {
      this.uId = Cookies.get('userId')
      this.getIidFn(this.constIcode)
      //    this.getList()
      //    this.getVariety()
    },
    methods: {
      getIidFn(Icode) {
        getIid(Icode).then(res => {
          this.Iid = res.data.irptId
          this.getIbiao()
        })
      },
      getIbiao() {
        getI(this.uId, this.Iid).then(res => {
          this.Isrc = res.data
        })
      }
      // 获取所有列表
      //    getList() {
      //      findAll(this.queryList.page, this.queryList.size).then(res => {
      //        this.list = res.data
      //      })
      //    }, // 条件查询列表
      //    query() {
      //      findCondition(this.queryList.page, this.queryList.size, this.queryCondition.Id).then(res => {
      //        this.list = res.data
      //      })
      //    }, // 获取品种
      //    getVariety() {
      //      findVariety().then(res => {
      //        this.varietyOptions = res.data
      //      })
      //    }, // 导出Excel表格
      //    exportExcel() {
      //      exportTable().then(res => {})
      //    }, // 分页==设置每页展示多少条数据
      //    handleSizeChange(val) {
      //      this.queryList.size = val
      //      this.getList()
      //    }, // 分页==跳转第几页
      //    handleCurrentChange(val) {
      //      this.queryList.page = val
      //      this.getList()
      //    }
    }
  }
</script>
<style>
  .contentBox {
    margin-top: 20px;
    padding: 0px 20px;
  }
</style>