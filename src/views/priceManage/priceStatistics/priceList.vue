<template>
  <el-row>
    <el-col :span="24" class="contentBox">
      <el-tabs type="border-card">
        <el-tab-pane label="各监测统计列表">
          <el-form :inline="true" class="demo-form-inline">
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
            <el-table-column align="center" width="70" label="序号">
              <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="300" label="监测点">
              <template slot-scope="scope"><span>{{scope.row.monitorName}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="100" label="品种">
              <template slot-scope="scope"><span>{{scope.row.cropName}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="100" label="等级">
              <template slot-scope="scope"><span>{{scope.row.cropRank}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="160" label="开始价格时间">
              <template slot-scope="scope"><span>{{scope.row.priceStartTemp}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="160" label="结束价格时间">
              <template slot-scope="scope"><span>{{scope.row.priceEndTemp}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="160" label="收购价(批发价)平均值">
              <template slot-scope="scope"><span>{{scope.row.priceBuy}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="160" label="出库价(零售价)平均值">
              <template slot-scope="scope"><span>{{scope.row.priceSell}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="100" label="信息状态">
              <template slot-scope="scope"><span>{{scope.row.infoStatus}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="120" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button size="small" type="success" @click="handleDetail(scope.row.id)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页开始 -->
          <div v-show="!listLoading" class="pagination-container">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="queryList.page" :page-sizes="[10,20,30,50]" :page-size="queryList.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
          </div>
          <!-- 分页结束 -->
        </el-tab-pane>
      </el-tabs>
    </el-col>
    <el-dialog :title="dialogTittle" :visible.sync="dialogShow">
      <el-form :model="form" status-icon class="demo-form-inline" label-width="100px">
        <el-form-item label="品种" style="width: 90%;">
          <el-input type='text' v-model="form.cropName"></el-input>
        </el-form-item>
        <el-form-item label="监测点名称" style="width: 90%;">
          <el-input type='text' v-model="form.monitorName"></el-input>
        </el-form-item>
        <el-form-item label="等级" style="width: 90%;">
          <el-input type='text' v-model="form.cropRank"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" style="width: 90%;">
          <el-input type='text' v-model="form.priceStart"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" style="width: 90%;">
          <el-input type='text' v-model="form.priceEnd"></el-input>
        </el-form-item>
        <el-form-item label="收购价" style="width: 90%;">
          <el-input type='text' v-model="form.priceBuy"></el-input>
        </el-form-item>
        <el-form-item label="出库价" style="width: 90%;">
          <el-input type='text' v-model="form.priceSell"></el-input>
        </el-form-item>
        <el-form-item label=" ">
          <el-button type="primary" @click="cancel()">返 回</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { findAll, conditionFind, findVariety, check } from '@/api/priceStatistics/priceList'
  export default {
    name: 'dashboard',
    computed: {
      ...mapGetters(['name', 'roles'])
    },
    data() {
      return {
        // 品种选择数据开始
        varietyOptions: [],
        queryCondition: {
          cropId: '',
          startDate: '',
          endDate: ''
        },
        // 表单数据开始
        list: [],
        // 表单数据结束
        listLoading: false,
        form: {
          monitorName: '',
          cropName: '',
          cropRank: '',
          priceBuy: '',
          priceSell: '',
          priceStart: '',
          priceEnd: ''
        },
        dialogTittle: '详情',
        dialogShow: false,
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
      handleDetail(rowId) {
        check(rowId).then(res => {
          this.dialogShow = true
          this.form.monitorName = res.data.monitorName
          this.form.cropName = res.data.cropName
          this.form.cropRank = res.data.cropRank
          this.form.priceBuy = res.data.priceBuy
          this.form.priceSell = res.data.priceSell
          this.form.priceStart = res.data.priceStart
          this.form.priceEnd = res.data.priceEnd
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