<template>
	<el-col :span="24" class="contentBox">
		<el-tabs type="border-card">
			<div style="margin-bottom:10px">
				<el-form :inline="true" :model="form" label-position="right" label-width="100px" style="margin:0 4% 0 0">
					<el-form-item label="企业名称:">
						<el-input v-model="form.companyName" style="width:200px" placeholder="请输入内容"></el-input>
					</el-form-item>
					<el-form-item label="审核状态">
						<el-select v-model="form.statusCode" placeholder="请选择">
							<el-option value="1" label="未审核"></el-option>
							<el-option value="2" label="审核通过"></el-option>
							<el-option value="3" label="驳回"></el-option>
						</el-select>
					</el-form-item>
					<el-button type="primary" style="margin-left:20px" @click="handleFilter">查询</el-button>
				</el-form>
			</div>
			<!-- 列表展示 -->
			<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
				<el-table-column align="center" type="selection" width="50">
				</el-table-column>
				<el-table-column align="center" label="序号" width="70">
					<template slot-scope="scope">
						<span>{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="企业名称" width="160">
					<template slot-scope="scope">
						<span>{{scope.row.companyName}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="联系人电话" width="160">
					<template slot-scope="scope">
						<span>{{scope.row.lyjc_phone}}</span>
					</template>
				</el-table-column>

				<el-table-column align="center" label="法定代表人姓名" width="160">
					<template slot-scope="scope">
						<span>{{scope.row.legalName}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="身份证号码">
					<template slot-scope="scope">
						<span>{{scope.row.Name}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="提交次数">
					<template slot-scope="scope">
						<span>{{scope.row.submitNum}}</span>
					</template>
				</el-table-column>

				<!-- <el-table-column align="center" fixed="right" label="状态" width="300"> -->
				<el-table-column align="right" fixed="right" label="操作" width="270">
					<template slot-scope="scope">
						<!--<el-button v-if="scope.row.statusCode===2" type="success" size="mini">已通过</el-button>
						<el-button v-else-if="scope.row.statusCode===3" type="danger" size="mini">已驳回</el-button>					-->
						<el-button type="primary" size="mini" @click="historical(scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页开始 -->
			<div v-show="!listLoading" class="pagination-container">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.page" :page-sizes="[10,20,30,50]" :page-size="page.size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
			</div>
			<!-- 分页结束 -->
			<!--历史记录-->
			<el-dialog :title="dialogTittle" :visible.sync="dialogShow">
				<el-form :model="former" status-icon ref="form" :inline="true" class="demo-form-inline" label-width="174px">
					<el-form-item label="企业名称 " prop="companyName" style="width: 100%;">
						<el-input type='text' v-model="former.companyName" style="width: 200%;"></el-input>
					</el-form-item>

					<el-form-item label="法定代表人姓名" prop="legalName" style="width: 100%;">
						<el-input type='text' v-model="former.legalName" style="width: 200%;"></el-input>
					</el-form-item>

					<el-form-item label="身份证号码" prop="Name" style="width: 100%;">
						<el-input type='text' v-model="former.Name" style="width: 200%;"></el-input>

					</el-form-item>

					<el-form-item label=" ">
						<el-button type="primary" @click="">关闭</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<!-- 历史记录结束-->
		</el-tabs>
	</el-col>
</template>
<script>
	import {
	  sousu,
	  change
	  //	 changeList,  biangenglist
	} from '@/api/xinxishenh/shenhe'
	import {
	  getUserId
	} from '@/utils/auth'
	export default {
	  name: 'shenhe',
	  data() {
	    return {
	      form: {
	        companyName: '',
	        statusCode: '',
	        state: ''
	      },
	      former: {
	        companyName: '',
	        legalName: '',
	        Name: ''
	      },
	      dialogTittle: '查看',
	      dialogShow: false,

	      status: null,
	      list: [{
	        companyName: '', // 企业名称
	        legalName: '', // 法定代表人姓名
	        idCard: '', // 身份证
	        statusCode: '', // 审核状态
	        createByPeople: '',
	        createTime: '',
	        deleteByPeople: '',
	        deleteTime: '',
	        submitNum: '',
	        lyjc_phone: '',
	        id: ''
	      }],
	      listLoading: false,
	      tableKey: 0,
	      page: {
	        page: 1,
	        size: 10,
	        companyName: '', // 企业名称
	        legalName: '', // 法定代表人姓名
	        idCard: '', // 身份证
	        statusCode: '', // 审核状态
	        submitNum: '',
	        lyjc_phone: '',
	        id: ''
	      },
	      total: null
	    }
	  },
	  created() {
	    this.getList()
	  },
	  methods: {

	    // 审核statusCode
	    handleDetail(row) {

	    },
	    // 搜索
	    handleFilter() {
	      this.getListOption()
	    },
	    // 列表展示
	    getList() {
	      change(this.$route.query.id).then(res => {
	        this.list = res.data
	      })
	    },
	    // 分页==设置每页展示多少条数据
	    handleSizeChange(val) {
	      this.page.size = val
	      this.getList()
	    },
	    // 分页==跳转第几页
	    handleCurrentChange(val) {
	      this.page.page = val
	      this.getList()
	    },
	    // 搜索
	    getListOption() {
	      const id = getUserId()
	      const data = {
	        companyName: this.companyName,
	        statusCode: this.form.statusCode,
	        submitNum: 5
	      }
	      sousu(this.page, id, 0, data).then(res => {
	        this.list = res.data.list
	      })
	    },
	    // 详情
	    historical(row) {
	      this.$router.push({
	        path: '/qyxxsh/xinxishenh-historical',
	        query: {
	          qyCompany: row.id
	        }
	      })
	    }

	  }
	}
</script>
<style scoped>
	.contentBox {
		margin-top: 20px;
		padding: 0px 20px;
	}
</style>