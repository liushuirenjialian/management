<template>
	<el-col :span="24" class="contentBox">
		<el-tabs type="border-card">
				<div style="margin-bottom:10px">
					<el-form :inline="true" label-position="right" label-width="100px" style="margin:0 4% 0 0" >
						<el-form-item label="企业名称:">
							<el-input v-model="form.name" style="width:200px;margin-right:20px" placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="许可证编号:">
							<el-input v-model="form.licenseCode" style="width:200px" placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-button type="primary" style="margin-left:20px" @click="handleFilter2">查询</el-button>
          </el-form>
				</div>

				<!-- 列表展示 -->
				<el-table :key='tableKey' :data="list" height="400px" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
					<el-table-column align="center" label="序号">
            <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
					</el-table-column>
					<el-table-column align="center" label="企业名称">
						<template slot-scope="scope">
							<span>
									{{scope.row.name}}
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="许可证编号">
						<template slot-scope="scope">
							<span>
									{{scope.row.licenseCode}}
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="报送机关">
						<template slot-scope="scope">
							<span>
									{{scope.row.reportingAgency}}
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="申请日期">
						<template slot-scope="scope">
							<span>
									{{scope.row.date}}
							</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="状态">
						<template slot-scope="scope">
							<span>
									{{scope.row.currentState}}
							</span>
						</template>
					</el-table-column>
                    <el-table-column align="center" label="操作">
						<template slot-scope="scope">
              <el-button type="info" size="mini" @click="handleInfo(scope.row,type)">查看</el-button>
							<el-button type="success" size="mini" @click="handleCheck(scope.row)">审批</el-button>
              <el-button type="warning" size="mini" @click="handleOverrule(scope.row)">驳回</el-button>
						</template>
					</el-table-column>
				</el-table>

				<!-- 分页开始 -->
				<div v-show="!listLoading" class="pagination-container">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.page" :page-sizes="[10,20,30,50]" :page-size="page.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
				</div>
				<!-- 分页结束 -->
		</el-tabs>
	</el-col>
</template>

<script>
import { mapGetters } from 'vuex'
import { page, pageOption, checkOption, overruleOption } from '@/api/changeApproval/changeRequest'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  data() {
    return {
      form: {
        // id: "307",
        name: '',
        applyNum: '',
        currentStateCode: '4',
        licenseCode: '',
        isRevoke: 0
      },
      list: [],
      listLoading: false,
      page: {
        page: 1,
        size: 10,
        limit: null,
        range: 'all',
        change: 'yes'
      },
      total: 0,
      tableKey: 0,
      state1: 'yes',
      state2: 'no',
      type: '6'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 列表展示

    getList() {
      // this.listLoading = true;
      page(this.page, this.form).then(response => {
        this.list = response.data.content
        // this.treeData = response.data.treeData;
        this.total = response.data.totalElements
        // this.listLoading = false;
      })
    },

    // 搜索
    handleFilter2() {
      this.getListOption()
    },

    getListOption() {
      // this.listLoading = true;
      pageOption(this.page, this.form).then(response => {
        this.list = response.data.content
        // this.total = response.data.totalElements;
        // this.listLoading = false;
      })
    },
    // 查看
    handleInfo(row, type) {
      const _this = this
      setTimeout(function() {
        _this.$router.push({
          path: '/changeApproval/reportForm?states=查看',
          query: { id: row.id, type: type }
        })
      }, 300)
    },

    // 驳回
    handleOverrule(row) {
      this.$confirm('确认要驳回该收购资格审核申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        overruleOption(row.id, this.state2).then(response => {
          this.getList()
        })
      })
    },

    // 审批
    handleCheck(row) {
      this.$confirm('确认要审核通过该收购资格审核申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        checkOption(row.id, this.state1).then(response => {
          this.getList()
        })
      })
    },
    // 审批
    // handleCheck(row) {
    //   checkOption(row.id, this.state1).then(response => {
    //     this.getList()
    //   })
    // },

    // 分页==设置每页展示多少条数据
    handleSizeChange(val) {
      this.page.size = val
      this.page.limit = val
      this.getList()
    },
    // 分页==跳转第几页
    handleCurrentChange(val) {
      this.page.page = val
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