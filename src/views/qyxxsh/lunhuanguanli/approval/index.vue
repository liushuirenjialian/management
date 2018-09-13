    <template>
        <el-col :span="24" class="approval">
            <div class="grid-content bg-purple-light" style="border-left:1px solid #ccc;padding:20px;">
            <h3>基本信息</h3>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="库级名称:">
                <el-input :disabled="true" value="楚雄市粮食储备有限公司"></el-input>
              </el-form-item>
              <el-form-item label="计划编号:">
                <el-input :disabled="true" value="201808080001"></el-input>
              </el-form-item>
              <el-form-item label="计划名称:">
                <el-input :disabled="true" value="计划名称"></el-input>
              </el-form-item>
              <el-form-item label="计划文号:">
                <el-input :disabled="true" value="CLLH-00001"></el-input>
              </el-form-item>
              <el-form-item label="计划类型:">
                <el-select :disabled="true" value="转换计划">

                </el-select>
              </el-form-item>
              <el-form-item label="申请人为:">
                <el-input :disabled="true" value="名称"></el-input>
              </el-form-item>
              <el-form-item label="申请部门:">
                <el-input :disabled="true" value="保管"></el-input>
              </el-form-item>
              <el-form-item label="创建日期:">
                <el-input :disabled="true" value="yyyy/mm/dd"></el-input>
              </el-form-item>
            </el-form>
            </div>
            <Tables/>

            <div class="grid-content bg-purple-light" style="border-left:1px solid #ccc;padding:20px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item class='formItems' label="计划轮换总数量（公斤）:">
                <el-input :disabled="true" value="173000000"></el-input>
              </el-form-item>
              <el-form-item class='formItems' label="预计销售总金额（元）:">
                <el-input :disabled="true" value="568000000"></el-input>
              </el-form-item>
              <el-form-item class='formItems' label="省级确认总数量（公斤）:">
                <el-input :disabled="true" value="172800000"></el-input>
              </el-form-item>
            </el-form>
            </div>
            <div class="grid-content bg-purple-light" style="border-left:1px solid #ccc;padding:20px;">
            <h3>附件列表</h3>
            <el-table
              :data="list"
              style="width: 100%">
              <el-table-column
                prop="date"
                label="序号"
                width='100'>
              </el-table-column>
              <el-table-column
                prop="name"
                label="文件名称"
                style="width: 50%">
              </el-table-column>
              <el-table-column
                prop="address"
                label="操作"
                style="width: 50%">
              </el-table-column>
            </el-table>
          </div>
            <div class="grid-content bg-purple-light" style="border-left:1px solid #ccc;padding:20px;">
              <h3>库级备注</h3>
              <p>因天气变化，温差变化比较大，请省局领导尽快审批。</p>
            </div>
            <div class="grid-content bg-purple-light" style="border-left:1px solid #ccc;padding:20px;">
            <div style="padding:20px; justify-content: flex-end;display: flex;">
              <el-button type="primary">审批通过</el-button>
              <el-button style="margin-left:80px;">取消</el-button>
            </div>
            </div>

        </el-col>
    </template>

    <script>
        import Tables from '../lowerHair/Subitem/table.vue'
        export default {
          name: 'approval',
          data() {
            return {
              activeName2: 'first',
              formInline: {
                user: '',
                region: ''
              },
              list: [{
                date: '1',
                name: '《2018年云南小麦轮换计划详细内容》',
                address: '下载'
              }, {
                date: '2',
                name: '《2018粮食局下发轮换计划文件》',
                address: '下载'
              }],
              fileList: [{ name: '', url: '' }]
            }
  },
          methods: {
            handleClick(tab, event) {
              console.log(tab, event)
    },
            handleRemove(file, fileList) {
              console.log(file, fileList)
    },
            handlePreview(file) {
              console.log(file)
    }
          },
          components: {
            Tables
          }
        }

    </script>
    <style>
        *{
            padding:0;
            margin:0;
            list-style:none;
        }
        .title{
            margin:10px 30px;
        }
        .el-tabs__nav{
            width: 100%;
        }
        .el-tabs__nav>.el-tabs__item{
            padding: 0 80px;
            height:80px;
            line-height:80px;
        }
        .el-tabs__header{
            margin:0;
        }
        .homePage{
            width:100%;
        }
        h3{
            margin-bottom:20px;
        }
        .el-form-item__content,.el-select{
            width:250px;
        }
        .demo-form-inline{
            width:100%;
            display:flex;
            flex-wrap:wrap;
        }
        .el-form-item{
            width:32%;
        }
        .formItems{
          width:48%;
        }
        .el-select{
            width:100%;
        }
        .el-textarea__inner{
          line-height:2;
        }
        .el-table th{
          text-aligin:right;
        }
        .el-table td{
          text-aligin:center;
        }

    </style>