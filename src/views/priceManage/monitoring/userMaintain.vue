<template>
	<el-row>
		<el-col :span="8" class="treeBox">
			<div class="treeContent">
				<p class="treeTitle">监测点人员结构</p>
				<el-input placeholder="请输入关键字过滤" v-model="sidebarTreeInput" style="padding:20px 20px 0px;"></el-input>
				<el-tree :data="sidebarTree" node-key="id" :props="sidebarTreeProps" :filter-node-method="filterNode" ref="sidebarTree" @node-click="pointDetail"></el-tree>
			</div>
		</el-col>
		<el-col :span="16" class="contentBox">
			<el-tabs type="border-card">
				<el-tab-pane label="监测点人员列表">
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item label="姓名">
							<el-input v-model="monitorName" placeholder="姓名" @keyup.enter.native="query"></el-input>
						</el-form-item>
						<el-form-item>
							<el-button type="primary" @click="query">查询</el-button>
						</el-form-item>
					</el-form>
					<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
						<el-table-column align="center" width="70" label="序号">
							<template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
						</el-table-column>
						<el-table-column align="center" width="300" label="公司名称">
							<template slot-scope="scope"><span>{{scope.row.monitor}}</span></template>
						</el-table-column>
						<el-table-column align="center" width="200" label="监测点类型">
							<template slot-scope="scope"><span>{{scope.row.monitorType}}</span></template>
						</el-table-column>
						<el-table-column align="center" width="200" label="监测人">
							<template slot-scope="scope"><span>{{scope.row.jcname}}</span></template>
						</el-table-column>
						<el-table-column align="center" width="150" label="联系方式">
							<template slot-scope="scope"><span>{{scope.row.jcphone}}</span></template>
						</el-table-column>
						<el-table-column align="center" width="130" label="操作" fixed="right">
							<template slot-scope="scope">
								<el-button size="small" type="success" @click="handleCheck(scope.row)">查看</el-button>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页开始 -->
					<div v-show="!listLoading" align="center">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryList.page" :page-sizes="[10,20,30,50]" :page-size="queryList.size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
					</div>
					<!-- 分页结束 -->
				</el-tab-pane>
			</el-tabs>
		</el-col>
		<el-dialog :title="dialogTittle[dialogType]" :visible.sync="dialogShow">
			<el-form :inline="true" class="demo-form-inline" label-width="150px">
				<!--<el-form-item label="监测点" style="width: 100%;">
					<el-input type='text' readOnly v-model='form.point' style="width: 200%;"></el-input>
				</el-form-item>-->
				<el-form-item label="公司名称" style="width: 100%;">
          <el-input type='text' readOnly v-model='form.monitor' style="width: 200%;"></el-input>
        </el-form-item>
				<el-form-item label="监测点类型" style="width: 100%;">
					<el-input type='text' readOnly v-model='form.monitorType' style="width: 200%;"></el-input>
				</el-form-item>
				<el-form-item label="监测人" style="width: 100%;">
					<el-input type='text' readOnly v-model='form.jcname' style="width: 200%;"></el-input>
				</el-form-item>
				<el-form-item label="联系方式" style="width: 100%;">
					<el-input type='text' readOnly v-model='form.jcphone' style="width: 200%;"></el-input>
				</el-form-item>
				<el-form-item label=" ">
					<el-button @click="callBack()">关 闭</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</el-row>
</template>

<script>
	import { mapGetters } from 'vuex'
	import { treeList, pointList, tableList, detail } from '@/api/monitoring/userMaintain'
	export default {
	  name: 'userMaintain',
	  computed: {
	    ...mapGetters(['name', 'roles'])
	  },
	  data() {
	    return {
	      sidebarTreeInput: '',
	      monitorName: '',
	      sidebarTree: [],
	      sidebarTreeProps: {
	        children: 'childMonitors',
	        label: 'name'
	      },
	      // 表单数据开始
	      list: [],
	      dialogShow: false,
	      dialogType: '',
	      dialogTittle: {
	        edit: '编辑',
	        check: '查看',
	        add: '添加'
	      },
	      form: {
	        monitor: '',
	        monitorType: '',
	        jcname: '',
	        jcphone: ''
	      },
	      queryList: {
	        page: 1,
	        size: 10
	      },
	      total: null,
	      listLoading: false,
	      tableKey: 0
	    }
	  },
	  created() {
	    this.queryTree()
	  },
	  methods: {
	    // 左侧树形
	    queryTree() {
	      treeList().then(res => {
	        this.sidebarTree = res.data
	      })
	    },
	    // 点击左侧监测点树形结构触发事件
	    pointDetail(data, Node) {
	      pointList(this.queryList.page, this.queryList.size, data.id).then(res => {
	        this.list = res.data.result
        this.total = res.data.totalElements
      })
	    },
	    // 查询按钮
	    query() {
	      tableList(this.queryList.page, this.queryList.size, this.monitorName).then(res => {
	        this.list = res.data.result
      })
	    },
	    // 查看按钮
	    handleCheck(rowObj) {
	      this.dialogShow = true
	      this.dialogType = 'check'
	      detail(rowObj.jcname, rowObj.jcphone).then(res => {
	        this.form.monitorType = res.data.monitorType
	        this.form.monitor = res.data.monitor
	        this.form.jcname = res.data.jcname
	        this.form.jcphone = res.data.jcphone
	      })
	    },
	    // 弹框里面的返回按钮
	    callBack() {
	      this.dialogShow = false
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
	    },
	    // 弹框内树形结构上方输入框过滤
	    filterNode(value, data) {
	      if (!value) return true
	      return data.name.indexOf(value) !== -1
	    }
	  },
	  watch: {
	    sidebarTreeInput(val) {
	      this.$refs.sidebarTree.filter(val)
	    }
	  }
	}
</script>

<style scoped="scoped">
	.contentBox {
		margin-top: 20px;
		padding-right: 20px;
	}
	
	.treeBox {
		height: 100%;
		background-color: #FFFFFF;
		padding: 20px;
	}
	
	.treeBox .treeContent {
		border: 1px solid #DCDFE6;
		min-height: 500px;
		box-shadow: 0px 0px 5px #DCDFE6;
	}
	
	.treeBox .treeTitle {
		background-color: #F5F7FA;
		color: #409EFF;
		font-size: 14px;
		text-align: center;
		line-height: 35px;
		margin: 0px;
	}
	
	.treeBox .el-tree {
		padding: 20px;
	}
</style>