<template>
  <el-row>
    <el-col :span="8" class="treeBox">
      <div class="treeContent">
        <p class="treeTitle">监测点结构</p>
        <el-input placeholder="请输入关键字过滤" v-model="sidebarTreeInput" style="padding:20px 20px 0px;"></el-input>
        <el-tree :data="sidebarTree" :props="sidebarTreeProps" :filter-node-method="filterNode" ref="sidebarTree" @node-click="pointDetail"></el-tree>
      </div>
    </el-col>
    <el-col :span="16" class="contentBox">
      <el-tabs type="border-card">
        <el-tab-pane label="监测点列表">
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item label="监测点名称">
              <el-input v-model="monitorName" placeholder="监测点名称" @keyup.enter.native="query"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="query">查询</el-button>
              <el-button type="primary" @click="addMonitor">添加监测点</el-button>
            </el-form-item>
          </el-form>
          <el-table :key='tableKey' :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" width="70" label="序号">
              <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="300" label="监测点名称">
              <template slot-scope="scope"><span class="pointName" @click="handleCheck(scope.row.id)">{{scope.row.name}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="100" label="等级">
              <template slot-scope="scope"><span>{{scope.row.rank}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="100" label="监测人">
              <template slot-scope="scope"><span>{{scope.row.userName}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="150" label="联系方式">
              <template slot-scope="scope"><span>{{scope.row.tell}}</span></template>
            </el-table-column>
            <el-table-column align="center" width="150" label="是否启用">
              <template slot-scope="scope">
                <el-tag :type="scope.row.isUsed == 1 ? 'warning' : 'success'" disable-transitions>{{scope.row.isUsed == 1 ? '否' : '是'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" width="200" label="操作" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" type="primary" @click="handleEdit(scope.row.id)">编辑</el-button>
                <el-button size="small" type="success" @click="handleDel(scope.row.id)">删除</el-button>
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
      <el-form :model="form" status-icon :rules="rules" ref="form" :inline="true" class="demo-form-inline" label-width="150px">
        <el-form-item label="上级监测点" prop="parentName" style="width: 100%;">
          <el-input type='text' v-model="form.parentName" style="width: 200%;" v-on:focus="checkPoint"></el-input>
        </el-form-item>
        <el-form-item label="监测点名称" prop="name" style="width: 100%;">
          <el-input type='text' v-model="form.name" style="width: 200%;"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio v-model="form.isUsed" label="0">是</el-radio>
          <el-radio v-model="form.isUsed" label="1">否</el-radio>
        </el-form-item>
        <el-form-item label="排序" prop="sort" style="width: 100%;">
          <el-input type='text' v-model="form.sort" style="width: 200%;"></el-input>
        </el-form-item>
        <el-form-item label="等级" style="width: 100%;">
          <el-select v-model="form.rank" disabled placeholder="请选择" style="width: 185%;">
            <el-option v-for="item in levelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" ">
          <el-button v-if="dialogType=='edit'" type="primary" @click="determineEdit('form')">确 定</el-button>
          <el-button v-if="dialogType=='add'" type="primary" @click="determineAdd('form')">确 定</el-button>
          <el-button v-if="dialogType!='check'" @click="cancel()">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--上级监测点-->
    <el-dialog :visible.sync="dialogPoint">
      <el-input placeholder="请输入关键字过滤" v-model="pointInput" style="margin-bottom:30px;"></el-input>
      <el-tree class="dialogTreeBox" :data="pointTree" :props="pointTreeProps" default-expand-all :filter-node-method="filterNode" ref="point" @node-click="checkPointName"></el-tree>
      <div class="dialogBtnBox">
        <el-button @click="determinePoint()" type="primary">确 定</el-button>
        <el-button @click="cancelPoint()">取 消</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { treeList, tableList, pointList, add, update, remove } from '@/api/monitoring/pointMaintain'
  export default {
    name: 'pointMaintain',
    data() {
      return {
        monitorName: '',
        levelList: [{
          id: 1,
          name: '省级'
        }, {
          id: 2,
          name: '市级'
        }, {
          id: 3,
          name: '地区级'
        }, {
          id: 4,
          name: '地区级以下'
        }],
        // 左侧树形结构
        sidebarTreeInput: '',
        sidebarTree: [],
        sidebarTreeProps: {
          children: 'childMonitors',
          label: 'name'
        },
        // 表单数据开始
        list: [],
        // 添加，编辑，查看==弹框
        dialogShow: false,
        dialogType: '',
        dialogTittle: {
          edit: '编辑',
          check: '查看',
          add: '添加'
        },
        // 选择监测点弹框
        dialogPoint: false,
        pointInput: '',
        checkedPoint: '',
        checkedPointId: '',
        checkedRank: '',
        pointTree: [],
        pointTreeProps: {
          children: 'childMonitors',
          label: 'name'
        },
        // form表单内容
        form: {
          parentName: '', // 上级监测点
          parentId: '', // 上级监测点id
          name: '', // 监测点名称
          sort: '', // 等级
          rank: '', // 排序
          isUsed: ''
        },
        rules: {
          parentName: [{
            required: true,
            message: '请选择上级监测点',
            trigger: 'click'
          }],
          name: [{
            required: true,
            message: '请输入监测点名称',
            trigger: 'blur'
          }],
          sort: [{
            required: true,
            message: '请输入监测点排序',
            trigger: 'blur'
          }]
        },
        // 查询分页
        queryList: {
          page: 1,
          size: 10
        },
        total: null,
        listLoading: false,
        tableKey: 0
      }
    },
    computed: {
      ...mapGetters(['name', 'roles'])
    },
    created() {
      this.queryTree()
    },
    methods: {
      // 左侧树形 + 弹框内的上级测试点树形
      queryTree() {
        treeList().then(res => {
          //	      	this.sidebarTree=[];
          //	      	this.sidebarTree.push(res.data[0])
          this.sidebarTree = res.data
          this.pointTree = res.data
        })
      },
      // 点击左侧监测点树形结构触发事件
      pointDetail(data, Node) {
        pointList(data.id).then(res => {
          this.list = []
          this.list.push(res.data)
        })
      },
      // 查询按钮
      query() {
        tableList(this.queryList.page, this.queryList.size, this.monitorName).then(res => {
          this.list = res.data.content
        })
      },
      // 添加按钮
      addMonitor() {
        this.resetForm()
        this.dialogShow = true
        this.dialogType = 'add'
      },
      // 编辑按钮
      handleEdit(rowId) {
        this.dialogShow = true
        this.dialogType = 'edit'
        pointList(rowId).then(res => {
          this.form.id = res.data.id
          this.form.parentName = res.data.parentName
          this.form.name = res.data.name
          this.form.sort = res.data.sort
          this.form.rank = res.data.rank
          this.form.isUsed = res.data.isUsed.toString()
        })
      },
      // 查看按钮
      handleCheck(rowId) {
        this.dialogShow = true
        this.dialogType = 'check'
        pointList(rowId).then(res => {
          this.form.parentName = res.data.parentName
          this.form.name = res.data.name
          this.form.sort = res.data.sort
          this.form.rank = res.data.rank
          this.form.isUsed = res.data.isUsed.toString()
        })
      },
      // 删除按钮
      handleDel(rowId) {
        remove(rowId).then(res => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          this.queryTree()
        })
      },
      // 【一级弹框】
      cancel() { // 取消按钮
        this.dialogShow = false
      },
      determineAdd(formObj) { // 添加的确定按钮
        const set = this.$refs
        set[formObj].validate(valid => {
          if (valid) {
            add(this.form).then(response => {
              this.dialogShow = false
              this.$notify({
                title: '成功',
                message: '数据录入成功',
                type: 'success',
                duration: 2000
              })
              this.queryTree()
            })
          } else {
            return false
          }
        })
      },
      determineEdit(formObj) { // 编辑的确定按钮
        const set = this.$refs
        set[formObj].validate(valid => {
          if (valid) {
            update(this.form).then(response => {
              this.dialogShow = false
              this.$notify({
                title: '成功',
                message: '数据录入成功',
                type: 'success',
                duration: 2000
              })
              this.queryTree()
            })
          } else {
            return false
          }
        })
      },
      checkPoint() {
        this.dialogPoint = true
      },
      // 二级弹框【选择监测点】
      checkPointName(data) {
        console.log(data)
        console.log(data.id + '---' + data.name)
        this.checkedPoint = data.name
        this.checkedPointId = data.id
        this.checkedRank = data.rank
      },
      cancelPoint() {
        this.dialogPoint = false
      },
      determinePoint() {
        this.form.parentName = this.checkedPoint
        this.form.parentId = this.checkedPointId
        if (this.checkedRank >= 3) {
          this.form.rank = 4
        } else {
          this.form.rank = this.checkedRank + 1
        }
        this.dialogPoint = false
      },
      // 添加前清空form表单信息
      resetForm() {
        this.form = {
          parentName: '', // 上级监测点
          parentId: '', // 上级监测点id
          name: '', // 监测点名称
          sort: '', // 等级
          rank: '', // 排序
          isUsed: '0'
        }
      },
      // 分页==跳转第几页
      handleCurrentChange(val) {
        this.queryList.page = val
        this.getList()
      },
      // 分页==设置每页展示多少条数据
      handleSizeChange(val) {
        this.queryList.size = val
        this.getList()
      },
      // 弹框内树形结构上方输入框过滤
      filterNode(value, data) {
        if (!value) return true
        return data.name.indexOf(value) !== -1
      }
    },
    watch: {
      pointInput(val) {
        this.$refs.point.filter(val)
      },
      sidebarTreeInput(val) {
        this.$refs.sidebarTree.filter(val)
      }
    }
  }
</script>

<style scoped="scoped">
  .pointName {
    color: #409EFF;
    cursor: pointer;
  }
  
  .contentBox {
    margin-top: 20px;
    padding: 0px 20px;
  }
  
  .treeBox {
    height: 100%;
    background-color: #FFFFFF;
    padding: 20px 0px 20px 20px;
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
    line-height: 40px;
    margin: 0px;
  }
  
  .treeBox .el-tree {
    padding: 20px;
  }
  
  .dialogTreeBox {
    height: 300px;
    overflow: auto;
  }
  
  .dialogBtnBox {
    text-align: center;
  }
</style>