<template>
	<el-col :span="24" class="contentBox">
		<el-tabs type="border-card">
				<div style="margin-bottom:10px">
					<el-form :inline="true" :model="form" label-position="right" label-width="100px" style="margin:0 4% 0 0" >
						<el-form-item label="名称:">
							<el-input v-model="form.name" style="width:200px;margin-right:20px" placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-form-item label="申请单号:">
							<el-input v-model="form.applyNum" style="width:200px" placeholder="请输入内容"></el-input>
						</el-form-item>
						<el-button type="primary" style="margin-left:20px" @click="handleFilter">查询</el-button>
          </el-form>
				</div>

				<!-- 列表展示 -->
				<el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
					<el-table-column align="center" label="序号">
            <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
					</el-table-column>
					<el-table-column align="center" label="申请单号">
						<template slot-scope="scope">
							<span>
                {{scope.row.applyNum}}
              </span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="申请时间">
						<template slot-scope="scope">
							<span>
                  {{scope.row.singleTime}}
              </span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="名称">
						<template slot-scope="scope">
							<span>
                  {{scope.row.name}}
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
                  <el-button type="success" size="mini" @click="handleAccept(scope.row)">受理</el-button>
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
import { page, pageOption, acceptOption, overruleOption } from '@/api/newApproval/newApplication'
import { mapGetters } from 'vuex'

export default {
  name: 'newApplication',
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  data() {
    return {
      form: {
        // id: "307",
        name: '',
        applyNum: '',
        currentStateCode: '1',
        isRevoke: 0
      },
      list: [],
      listLoading: false,
      page: {
        page: 1,
        size: 10,
        limit: null,
        range: 'all',
        change: 'no'
      },
      total: 0,
      tableKey: 0,
      state: 'no',
      type: 1
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
    handleFilter() {
      this.getListOption()
    },
    // 查看
    handleInfo(row, type) {
      const _this = this
      setTimeout(function() {
        _this.$router.push({
          path: '/newApproval/reportForm?states=查看',
          query: { id: row.id, type: type }
        })
      }, 300)
    },
    // 受理
    handleAccept(row) {
      this.$confirm('确认要受理该收购资格审核申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        acceptOption(row.id).then(response => {
          this.getList()
        })
      })
    },
    // 驳回
    handleOverrule(row) {
      this.$confirm('确认要驳回该收购资格审核申请吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        overruleOption(row.id, this.state).then(response => {
          this.getList()
        })
      })
    },

    getListOption() {
      // this.listLoading = true;
      pageOption(this.page, this.form).then(response => {
        this.list = response.data.content
        // this.total = response.data.totalElements;
        // this.listLoading = false;
      })
    },

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