<template>
	<el-col :span="24" class="contentBox">
		<el-tabs type="border-card">
			<div class="tab-toolbar" style="margin-bottom:10px">
				<el-form :inline="true" class="demo-form-inline">
					<el-form-item label="公告标题">
						<el-input v-model="queryCondition.title" placeholder=""></el-input>
					</el-form-item>
					<el-form-item label="生效时间">
						<el-date-picker v-model="queryCondition.startTime" type="date" placeholder="选择日期"></el-date-picker>

					</el-form-item>
					<el-form-item label="到">
						<el-date-picker v-model="queryCondition.failureTime" type="date" placeholder="选择日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="公告状态">
						<el-select v-model="queryCondition.notStatus" placeholder="请选择">
							<el-option value="0" label="无效"></el-option>
							<el-option value="1" label="有效"></el-option>
						</el-select>
						<!--   <el-input type='text' v-model="queryCondition.notStatus" style=""></el-input> -->
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="queryers">查询</el-button>
						<el-button type="primary" @click="addMonitor">添加</el-button>
					</el-form-item>
				</el-form>
			</div>
			<el-table :data="tableData" class="table1" :key='tableKey' v-loading.body="listLoading" border fit highlight-current-row
			    style="width: 100%">
				<el-table-column type="index" label="序号" width="80">
					<template slot-scope="scope">
						<span>{{scope.$index+1}}</span>
					</template>
				</el-table-column>
				<el-table-column label="公告标题">
					<template slot-scope="scope">
						<span>{{scope.row.title}}</span>
					</template>
				</el-table-column>
				<el-table-column label="公告状态">
					<template slot-scope="scope">
						<span>{{scope.row.notStatus | notStatusType}}</span>
					</template>
				</el-table-column>
				<el-table-column label="点击次数">
					<template slot-scope="scope">
						<span>{{scope.row.cishu}}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间">
					<template slot-scope="scope">
						<span>{{scope.row.time}}</span>
					</template>
				</el-table-column>
				<el-table-column label="生效时间">
					<template slot-scope="scope">
						<span>{{scope.row.startTime}}</span>
					</template>
				</el-table-column>
				<el-table-column label="失效时间">
					<template slot-scope="scope">
						<span>{{scope.row.failureTime}}</span>
					</template>
				</el-table-column>
				<el-table-column label="发布人">
					<template slot-scope="scope">
						<span>{{scope.row.user}}</span>
					</template>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="250">
					<template slot-scope="scope">
						<el-button type="text" size="small" @click="open1(scope.row)">
							<i class="icon iconfont icon-shenhe"></i>预览
						</el-button>
						<el-button type="text" size="small" v-if="scope.row.notStatus=='1'" @click="open2(scope.row)">
							<i class="icon iconfont icon-shenhe"></i>撤销发布
						</el-button>
						<el-button type="text" size="small" v-if="scope.row.notStatus=='0'" @click="open2(scope.row)">
							<i class="icon iconfont icon-shenhe"></i>发布
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页开始 -->
			<div v-show="!listLoading" align="center">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="query.page" :page-sizes="[10,20,30,50]"
				    :page-size="query.size" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
			</div>
			<!-- 分页结束 -->

			<!--预览 弹框开始-->
			<el-dialog :title="dialogTittle1" :visible.sync="dialogShower">
				<el-form :model="former" status-icon ref="form" :inline="true" class="demo-form-inline" label-width="174px">
					<el-form-item label="公告标题" prop="title" style="width: 100%;">
						<el-input type='text' v-model="former.title" style="width: 200%;"></el-input>
					</el-form-item>
					<el-form-item label="公告状态" prop="notStatus" style="width: 100%;">
						<el-input type='text' v-model="former.notStatus" style="width: 200%;"></el-input>
						<!--<el-select v-model="form.notStatus" placeholder="请选择" style="width: 185%;" class="container-mess">
											<el-option :value="1" :label="有效"></el-option>
											<el-option :value="2" :label="无效"></el-option>
									</el-select>-->
					</el-form-item>
					<el-form-item label="点击次数" prop="clicks" style="width: 100%;">
						<el-input type='text' v-model="former.clicks" style="width: 200%;"></el-input>
					</el-form-item>

					<el-form-item label="创建时间" prop="notCreateTime" style="width: 100%;">
						<el-date-picker v-model="former.notCreateTime" type="date" style="width: 171%;" placeholder="选择日期"></el-date-picker>
						</el-select>
					</el-form-item>
					<!--disabled="disabled"-->
					<el-form-item label="更新时间" prop="updateTime" style="width: 100%; ">
						<el-date-picker v-model="former.updateTime" type="data" style="width: 184%;" placeholder="选择日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="发布人" prop="user" style="width: 100%;">
						<el-input type='text' v-model="former.user" style="width: 200%;"></el-input>
					</el-form-item>
					<el-form-item label=" ">
						<el-button type="primary" @click="">关闭</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<!--预览 弹框结束-->
			<!--新增 弹框表单开始-->
			<el-dialog :title="dialogTittle" :visible.sync="dialogShow">
				<el-form :model="form" status-icon :rules="rules" ref="form" :inline="true" class="demo-form-inline" label-width="174px">
					<el-form-item label="公告标题" prop="title" style="width: 100%;">
						<el-input type='text' v-model="form.title" style="width: 200%;"></el-input>
					</el-form-item>
					<el-form-item label="公告状态" prop="notStatus" style="width: 100%;">
						<!--  <el-select v-model="form.notStatus" placeholder="请选择" style="width: 185%;" class="container-mess">                       <el-option :value="1" :label="有效"></el-option>
                        <el-option :value="0" :label="有效"></el-option>
												<el-option :value="1" :label="无效"></el-option>
                    </el-select>-->
						<el-input type='text' v-model="form.notStatus" style="width: 200%;"></el-input>
					</el-form-item>
					<el-form-item label="生效时间" prop="startTime" style="width: 100%;">
						<el-date-picker v-model="form.startTime" type="date" style="width: 171%;" placeholder="选择日期"></el-date-picker>
						</el-select>
					</el-form-item>
					<!--disabled="disabled"-->
					<el-form-item label="失效时间" prop="failureTime" style="width: 100%;">
						<el-date-picker v-model="form.failureTime" type="date" style="width: 171%;" placeholder="选择日期"></el-date-picker>
					</el-form-item>
					<el-form-item label="发布人" prop="user" style="width: 100%;">
						<el-input type='text' v-model="form.user" style="width: 200%;"></el-input>
					</el-form-item>
					<el-form-item label="公告内容" prop="notContent" style="width: 100%;">
						 <quill-editor style="" v-model="form.notContent" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)" @change="onEditorChange($event)">
												
					<!-- 	<el-input type='text' v-model="form.notContent" style="width: 200%;"></el-input> -->
						</quill-editor>
					</el-form-item>
					<el-form-item label=" ">
						<el-button type="" @click="release('form')">发布</el-button>
						<el-button type="primary" @click="preservation('form')">保存</el-button>
						<el-button type="primary" @click="cancel">返回</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<!--新增 弹框表单结束-->


		</el-tabs>
	</el-col>
</template>
<script>
	import {
	  mapState
	} from 'vuex'
	import {
	  add,
	  obtain,
	  preview,
	  chazhao,
	  toupdate,
	  Newlyadd
	} from '@/api/management/management'
// 	import {
// 	  quillEditor
// 	} from 'vue-quill-editor'
	export default {
	  name: 'management',
	  data() {
	    return {
	      editorOption: {},
	      // 新增弹框
	      form: {
	        title: '', // 公告标题
	        notStatus: '', // 公告状态
	        startTime: '', // 生效时间
	        failureTime: '', // 失效时间
	        userName: '', // 发布人
	        notContent: '' // 公告内容
	      },
	      // 查询
	      queryCondition: {
	        title: '',
	        startTime: '',
	        failureTime: '',
	        notStatus: ''
	      },
	      // 预览弹框
	      former: {
	        title: '', // 公告标题
	        clicks: '', // 点击次数
	        notCreateTime: '', // 创建时间
	        updateTime: '', // 更新时间
	        notContent: '', // 公告内容
	        userName: '', // 发布人
	        notStatus: '' // 公告状态
	      },
	      rules: {
	        title: [{
	          required: true,
	          message: '请写公告标题',
	          trigger: 'blur'
	        }],
	        notStatus: [{
	          required: true,
	          message: '请写公告状态',
	          trigger: 'blur'
	        }],
	        startTime: [{
	          required: true,
	          message: '请写生效时间',
	          trigger: 'blur'
	        }],
	        failureTime: [{
	          required: true,
	          message: '请写失效时间',
	          trigger: 'blur'
	        }]
	      },
	      dialogTittle: '添加',
	      dialogShow: false,
	      // 预览的弹框内容
	      dialogShower: false,
	      dialogTittle1: '公告详情',
	      carType: undefined,
	      applicationType: undefined,
	      time: [],
	      active: 0,
	      showImg: true,
	      activeIndex: '1',
	      activeIndex2: '1',
	      value6: '',
	      // 分页
	      query: {
	        page: 1,
	        size: 10,
	        title: '', // 公告标题
	        notStatus: '', // 公告状态
	        startTime: '', // 生效时间
	        failureTime: '', // 失效时间
	        userName: '', // 发布人
	        clicks: '', // 点击次数
	        notCreateTime: '', // 创建时间
	        updateTime: '' // 更新时间
	      },
	      total: null,
	      listLoading: false,
	      tableKey: 0,
	      // 表单数据开始
	      tableData: []
	    }
	  },
	  // 初始化方法、
	  created() {
	    this.getList()
	    console.log(this.user)
	  },
	  mounted() {

	  },
	  computed: {
	    ...mapState(['user'])
	  },
	  methods: {
	    onEditorBlur() { // 失去焦点事件
	    },
	    onEditorFocus() { // 获得焦点事件
	    },
	    onEditorChange({
	      editor,
	      html,
	      text
	    }) { // 富文本编辑器  文本改变时 设置字段值
	      this.content = html
	    },
	    // 头部查询
	    queryers() {
	      if (this.queryCondition.startTime > this.queryCondition.failureTime) {
	        this.$notify({
	          title: '警告',
	          message: '时间段不符',
	          type: 'warning',
	          duration: 2000
	        })
	      } else {
	        chazhao(this.query.page, this.query.size, this.queryCondition).then(res => {
	          // this.getList()
	          this.tableData = res.data
	        })
	      }
	    },
	    // 预览的弹框内容
	    open1(row) {
	      this.handleCheck(row.id)
	    },
	    // 撤销 发布 按钮  需要传id 和 notStatus状态
	    open2(rowObj) {
	      // console.log(rowId)
	      this.$confirm('确认要撤销该公告吗?', '系统提示', {
	        confirmButtonText: '确定',
	        cancelButtonText: '取消',
	        type: 'warning'
	      }).then(() => {
	        console.log(2323)
	        toupdate(rowObj.id).then(res => {
	          if (res.status) {
	            this.getList()
	            this.$message.success('撤销成功')
	          } else {
	            this.$message.warning(res.msg)
	          }
	        })
	      }).catch(() => {
	        this.$message.error('撤销失败')
	      })
	    },
	    getList() {
	      obtain(this.query).then(res => {
	        // console.log(res)
	        if (res.status) {
	          this.tableData = res.data
	          // console.log(this.tableData)
	          // console.log(this.tableData.Array.username)
	        } else {
	          this.$message.error(res.msg)
	        }
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
	    },
	    // 添加按钮
	    addMonitor(formObj) {
	      this.resetForm()
	      // const set = this.$refs
	      Newlyadd(this.user.userId).then(response => {
	        // console.log(this.form.userName)

	      })
	      this.dialogShow = true
	      this.dialogType = 'add'
	    },
	    // 添加前清空form表单信息
	    resetForm() {
	      this.form = {
	        title: '', // 公告标题
	        notStatus: '', // 公告状态
	        startTime: '', // 生效时间
	        failureTime: '', // 失效时间
	        clicks: '', // 点击次数
	        userName: localStorage.getItem('userName'), // 发布人
	        notContent: '' // 公告内容
	      }
	      // alert(this.form.userName)
	    },
	    // 预览按钮
	    handleCheck(rowId) {
	      this.dialogType1 = '查看'
	      preview(rowId).then(res => {
	        this.former.title = res.data.title // 公告标题
	        this.former.notStatus = res.data.notStatus // 公告状态
	        this.former.clicks = res.data.clicks // 点击次数
	        this.former.notCreateTime = res.data.notCreateTime // 创建时间
	        this.former.updateTime = res.data.updateTime // 更新时间
	        // this.former.user = res.data.user  发布人
	        this.former.userName = res.data.userName // 发布人
	        this.dialogShower = true
	      })
	    },
	    release(formObj) { // 发布按钮
	      const set = this.$refs
	      set[formObj].validate(valid => {
	        if (valid) {
	          this.$delete(this.form, 'isDeleted')
	          console.log(this.form)
	          add(this.form).then(response => {
	            this.dialogShow = false
	            this.getList()
	            this.$notify({
	              title: '成功',
	              message: '保存成功',
	              type: 'success',
	              duration: 2000
	            })
	          })
	        } else {
	          return false
	        }
	      })
	    },
	    preservation(formObj) { // 保存按钮
	      const set = this.$refs
	      set[formObj].validate(valid => {
	        if (valid) {
	          this.$set(this.form, 'isDeleted', 1)
	          console.log(this.form)
	          add(this.form).then(response => {
	            this.dialogShow = false
	            this.getList()
	            this.$notify({
	              title: '成功',
	              message: '保存成功',
	              type: 'success',
	              duration: 2000
	            })
	          })
	        } else {
	          return false
	        }
	      })
	    },
	    cancel() {
	      this.dialogShow = false
	    },
	    close() {
	      this.dialogShower = false
	    }

	  },
	  // 状态判断
	  filters: {
	    notStatusType(status) {
	      switch (status) {
	        case 0:
	          return '无效'
	        case 1:
	          return '有效'
	        default:
	          return '未知'
	      }
	    }
	  }
	}
</script>
<style scoped>
	.contentBox {
		margin-top: 20px;
		padding: 0px 20px;
	}

	.el-select {
		display: inline-block;
		position: relative;
	}
</style>
