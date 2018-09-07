<template>
	<el-col :span="24" class="contentBox">
        
        <div style="margin-bottom:10px">
          <el-form :model="form" :inline="true" :label-position="labelPosition" :rules="rules" ref="form" label-width="150px" class="form">
                  <el-form-item label="企业名称：" prop="name">
                    <el-input v-model="form.name" style="width:200px"  placeholder="请输入内容"></el-input>
                  </el-form-item>
                  <el-form-item label="开始时间:" prop="name">
                    <el-date-picker v-model="form.date1"   type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
                  <el-form-item label="结束时间:" prop="name">
                    <el-date-picker v-model="form.date2"   type="date" placeholder="选择日期"></el-date-picker>
                  </el-form-item>
          </el-form>
          <el-form :model="form" :inline="true" :label-position="labelPosition" :rules="rules" ref="form" label-width="150px" class="form">    
                  <el-form-item label="所属区域:" prop="name">
                    <el-input placeholder="请输入内容" style="width:200px" v-model="form.submitting"  class="input-with-select" disabled>
                        <el-button slot="append" icon="el-icon-search" @click="centerDialogVisible = true"></el-button>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="许可证编号:" prop="name">
                    <el-input v-model="form.numbering" style="width:200px" placeholder="请输入内容"></el-input>
                  </el-form-item>
                  <el-form-item label="企业类型:" prop="name">
                    <el-select v-model="form.type" filterable  placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                    </el-select>
                  </el-form-item>
          </el-form>
          <el-col :span="24" style="margin-bottom:10px">
              <el-button class="filter-item" size="mini" type="primary" style="margin-right:50px;margin-left:40%" icon="search" @click="handleFilter">查询</el-button>
              <el-button class="filter-item" size="mini" type="success" icon="search" @click="handleFilter1">导出</el-button>
          </el-col>

        </div>

        <!-- 列表展示 -->
        <el-table :key='tableKey' :data="formList" height='350px' v-loading.body="listLoading" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="序号">
                <template slot-scope="scope"><span>{{scope.$index+1}}</span></template>
            </el-table-column>
            <el-table-column align="center" label="经营者名称">
                <template slot-scope="scope">
                    <span>
                    {{scope.row.name}}
                </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="经营者类型">
                <template slot-scope="scope">
                    <span>
                    {{scope.row.type}}
                </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="法人代表">
                <template slot-scope="scope">
                    <span>
                    {{scope.row.representative}}
                </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="工商登记机关">
                <template slot-scope="scope">
                    <span>
                    {{scope.row.registrationAuthority}}
                </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="收购许可发证机关">
                <template slot-scope="scope">
                    <span>
                    {{scope.row.issuingAuthority}}
                </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="发证时间">
                <template slot-scope="scope">
                    <span>
                    {{scope.row.createTime}}
                </span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="许可证编号">
                <template slot-scope="scope">
                    <span>
                    {{scope.row.applyNum}}
                </span>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页开始 -->
        <div v-show="!listLoading" class="pagination-container">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.page" :page-sizes="[10,20,30,50]" :page-size="page.limit" layout="total, sizes, prev, pager, next, jumper" :total="total"> </el-pagination>
        </div>
        <!-- 分页结束 -->

        <!-- 所属区域下拉弹框开始 -->
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
          <span>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText">
            </el-input>
            <el-tree
              class="filter-tree"
              :data="dataTree"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              ref="tree2"
              @node-click="handleNodeClick">
            </el-tree>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
		    </el-dialog>
        <!-- 所属区域下拉弹框结束 -->

        <!-- 详情展示弹窗开始 -->
        <el-dialog title="许可证信息变更" :visible.sync="infoDialogVisible"  center>
          		<el-card class="box-card">
                <el-row>
                  <el-col style="padding:20px">
                    <el-form :model="info" :rules="rules" ref="info" label-width="150px" class="demo-form">
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="经营者名称：" prop="name">
                            <el-input v-model="info.name"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="经营者类型：" prop="name">
                            <el-select v-model="info.type" filterable  placeholder="请选择">
                                  <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                  </el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="企业地址：" prop="address">
                            <el-input v-model="info.address"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="营业执照发证机构：" prop="certificate">
                            <el-input v-model="info.certificate"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="法人代表：" prop="representative">
                            <el-input v-model="info.representative"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="许可证编号：" prop="applyNum">
                            <el-input v-model="info.applyNum"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="发证机关：" prop="certificate">
                            <el-input placeholder="请输入内容" style="width:200px" v-model="info.certificate"  class="input-with-select" disabled>
                                <el-button slot="append" icon="el-icon-search" @click="centerDialogVisible = true"></el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      
                      <el-row :gutter="20">
                        <el-col :span="12">
                          <el-form-item label="发证时间：" prop="createTime">
                                <el-date-picker v-model="info.createTime" type="date" placeholder="选择日期"></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="24">
                          <el-form-item label="备注" prop="desc">
                            <el-input type="textarea" v-model="info.desc"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col :span="24">
                          <div class="box-pd">
                            <el-button @click="resetForm('info')">保存</el-button>
                            <el-button type="primary" @click="submitForm('info')">提交</el-button>
                            <el-button @click="resetForm('info')">重置</el-button>
                          </div>
                        </el-col>
                      </el-row> -->
                    </el-form>
                  </el-col>
                  <el-col>
                     <el-button >提交</el-button>
                     <el-button type="primary" >取消</el-button>
                  </el-col>
                </el-row>
              </el-card>
		    </el-dialog>
        <!-- 详情展示弹窗结束 -->

        <!-- 发证机关下拉弹框开始 -->
        <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
          <span>
            <el-input
              placeholder="输入关键字进行过滤"
              v-model="filterText2">
            </el-input>
            <el-tree
              class="filter-tree"
              :data="dataTree2"
              :props="defaultProps2"
              default-expand-all
              :filter-node-method="filterNode2"
              ref="tree2"
              @node-click="handleNodeClick2">
            </el-tree>
          </span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="centerDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
          </span>
		    </el-dialog>
        <!-- 发证机关下拉弹框结束 -->


	</el-col>
</template>

<script>
import { mapGetters } from 'vuex'
import { page, pageOption } from '@/api/license/information'
export default {
  name: 'dashboard',
  computed: {
    ...mapGetters(['name', 'roles'])
  },
  data() {
    return {
      // 所属区域树形结构开始
      filterText: '',
      dataTree: [
        {
          // 属性数据
          id: 1,
          label: '陕西省',
          children: [
            {
              id: 11,
              label: '西安市',
              children: [
                {
                  id: 111,
                  label: '蓝田县'
                },
                {
                  id: 112,
                  label: '长安区'
                }
              ]
            },
            {
              id: 12,
              label: '西安市',
              children: [
                {
                  id: 121,
                  label: '蓝田县'
                },
                {
                  id: 122,
                  label: '长安区'
                }
              ]
            },
            {
              id: 13,
              label: '西安市',
              children: [
                {
                  id: 131,
                  label: '蓝田县'
                },
                {
                  id: 132,
                  label: '长安区'
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 所属区域树形结构结束

      // 发证机关树形结构开始
      filterText2: '',
      dataTree2: [
        {
          // 属性数据
          id: 1,
          label: '陕西省粮食局',
          children: [
            {
              id: 11,
              label: '西安市粮食局',
              children: [
                {
                  id: 111,
                  label: '蓝田县粮食局'
                },
                {
                  id: 112,
                  label: '长安区粮食局'
                }
              ]
            },
            {
              id: 12,
              label: '西安市粮食局',
              children: [
                {
                  id: 121,
                  label: '蓝田县粮食局'
                },
                {
                  id: 122,
                  label: '长安区粮食局'
                }
              ]
            },
            {
              id: 13,
              label: '西安市粮食局',
              children: [
                {
                  id: 131,
                  label: '蓝田县粮食局'
                },
                {
                  id: 132,
                  label: '长安区粮食局'
                }
              ]
            }
          ]
        }
      ],
      defaultProps2: {
        children: 'children',
        label: 'label'
      },
      // 发证机关树形结构结束

      centerDialogVisible: false, // 遮罩层弹框

      infoDialogVisible: false, // 详情展示弹窗
      // 表单数据开始
      // 表单数据结束
      form: {
        name: '', // 企业名称
        beginTime: '', // 开始时间
        endTime: '', // 结束时间
        area: '', // 所属区域
        applyNum: '', // 许可证编号
        type: '' // 企业类型
      },
      info: {
        name: '', // 经营者名称
        type: '', // 经营者类型
        address: '', // 地址
        certificate: '', // 营业执照发证机构
        representative: '', // 法人代表
        applyNum: '', // 许可证编号
        issuingAuthority: '', // 发证机关
        issuingTime: '', // 发证时间
        remarks: '' // 备注
      },
      formList: [],
      listLoading: false,
      page: {
        page: 1,
        size: 10,
        range: '0',
        limit: null
      },
      tableKey: 0,

      options: [{
        value: '选项1',
        label: '法人或其他经济组织'
      }, {
        value: '选项2',
        label: '个体工商户'
      }, {
        value: '选项3',
        label: '外资'
      }],
      value8: '',

      id: ''

    }
  },
  created() {
    this.getList()
  },
  watch: {
    filterText(val) {
      // 树形结构
      this.$refs.tree2.filter(val)
    }
  },
  methods: {
    // 列表展示

    getList() {
      // this.listLoading = true;
      page(this.page, this.form).then(response => {
        this.formList = response.data.content
        // this.treeData = response.data.treeData;
        // this.total = response.data.totalElements;
        // this.listLoading = false;
      })
    },

    // 搜索
    handleFilter() {
      this.getListOption()
    },

    getListOption() {
      // this.listLoading = true;
      pageOption(this.page, this.form).then(response => {
        // this.info = response.data.list;
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
    },

    // 所属区域树形结构
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick(data) {
      // 树形传输选中内容
      this.form.submitting = data.label
      console.log(data.label)
    },

    // 发证机关树形结构
    filterNode2(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    handleNodeClick2(data) {
      // 树形传输选中内容
      this.info.issuingAuthority = data.label
      console.log(data.label)
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