<template>
  <div class="content-wrapper">
    <div class="content-main">
      <div class="tab-toolbar">
        <!-- 查询 -->
        <el-form :inline="true">
          <el-form-item label="标题">
            <el-input placeholder="" v-model="monitortitle"> </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryBtn">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- 列表展示 -->
      <el-table :data="tableData" :key='tableKey' v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
        <el-table-column align="center" label="序号" width='70'>
          <template slot-scope="scope"> <span>{{scope.$index+1}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="标题">
          <template slot-scope="scope"><span>{{scope.row.title}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="品种" width='120'>
          <template slot-scope="scope"><span>{{scope.row.cropName}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="状态" width='100'>
          <template slot-scope="scope">
            <span>{{scope.row.auditStatus}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="填报人" width='100'>
          <template slot-scope="scope"><span>{{scope.row.monitorName}}</span></template>
        </el-table-column>
        <el-table-column align="center" label="操作" width='180'>
          <template slot-scope="scope">
            <el-button size="mini" type="primary" v-if="scope.row.auditStatus=='待审核'" @click="passBtn(scope.row.id)">通过</el-button>
            <el-button size="mini" type="warning" v-if="scope.row.auditStatus=='待审核'" @click="noPassBtn(scope.row.id)">驳回</el-button>
            <el-tag v-if="scope.row.auditStatus!='待审核'" type="success">已处理</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页开始 -->
      <div v-show="!listLoading" align="center">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page" :page-sizes="[10,20,30,50]" :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
      </div>
      <!-- 分页结束 -->
    </div>
  </div>
</template>
<script>
  import { findAll, pass, noPass, condition } from '@/api/priceweekly/weeklyAudit'
  export default {
    name: 'priceweekly',
    data() {
      return {
        monitortitle: '',
        query: {
          page: 1,
          size: 10,
          title: '' // 标题
        },
        total: null,
        listLoading: false,
        tableKey: 0,
        // 表单数据开始
        tableData: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      // 列表显示
      getList() {
        findAll(this.query.page, this.query.size).then(res => {
          this.tableData = res.data.content
        })
      },
      // 查询按钮
      queryBtn() {
        condition(this.query.page, this.query.size, this.monitortitle).then(res => {
          this.tableData = res.data.content
        })
      },
      // 通过按钮
      passBtn(rowId) {
        pass(rowId).then(res => {
          this.getList()
        })
      },
      // 不通过按钮
      noPassBtn(rowId) {
        noPass(rowId).then(res => {
          this.getList()
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
      }
    }
  }
</script>
<style>
  .content-main {
    padding: 15px;
  }
</style>