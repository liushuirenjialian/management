    <template>
        <el-col :span="24" class="lowerHair">
            <div class="sumMoney" style="border-left:1px solid #ccc;padding:20px;">
            <h3>基础信息</h3>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="承储库点:">
                <el-input :disabled="true" value="楚雄市粮食储备库"></el-input>
              </el-form-item>
              <el-form-item label="仓房名称:">
                <el-input :disabled="true" value="1号仓房"></el-input>
              </el-form-item>
              <el-form-item label="货位名称:">
                <el-input :disabled="true" value="1号货位"></el-input>
              </el-form-item>
              <el-form-item label="粮油品种:">
                <el-input :disabled="true" value="小麦"></el-input>
              </el-form-item>
              <el-form-item label="明细品种:">
                <el-select :disabled="true" value="精麦">

                </el-select>
              </el-form-item>
              <el-form-item label="数量:">
                <el-input :disabled="true" value="74500000"></el-input>
              </el-form-item>
              <el-form-item label="入仓日期:">
                <el-input :disabled="true" value="20180909"></el-input>
              </el-form-item>
              <el-form-item label="收获年度:">
                <el-input :disabled="true" value="20180605"></el-input>
              </el-form-item>
              <el-form-item label="产地:">
                <el-input :disabled="true" value="楚雄市"></el-input>
              </el-form-item>
              <el-form-item label="保管员:">
                <el-input :disabled="true" value="张琦"></el-input>
              </el-form-item>
            </el-form>
            </div>
            <div class="sumMoney " style="border-left:1px solid #ccc;padding:20px;" label="right">
            <h3>检验信息</h3>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="扦样日期:">
                <el-input :disabled="true" value="20180901"></el-input>
              </el-form-item>
              <el-form-item label="扦样人:">
                <el-input :disabled="true" value="马强"></el-input>
              </el-form-item>
              <el-form-item label="检验日期:">
                <el-input :disabled="true" value="20180903"></el-input>
              </el-form-item>
              <el-form-item label="检验人:">
                <el-input :disabled="true" value="李宁"></el-input>
              </el-form-item>
              <el-form-item label="报告出具日期:">
                <el-input :disabled="true" value="20180904"></el-input>
              </el-form-item>
              <el-form-item label="检验结果:">
                <el-input :disabled="true" value="符合标准"></el-input>
              </el-form-item>
              <el-form-item label="检验机构:">
                <el-input :disabled="true" value="云南省粮油质量检测中心"></el-input>
              </el-form-item>
              <el-form-item label="检验标准依据:">
                <el-input :disabled="true" value="国家XXX标准"></el-input>
              </el-form-item>
            </el-form>
            </div>
            <div class="grid-content bg-purple-light" style="border-left:1px solid #ccc;padding:20px;">
              <h3>检测信息</h3>
              <el-table
                :data="listData"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="检测项"
                  style="width: 50%">
                </el-table-column>
                <el-table-column
                  label="检测值"
                  style="width: 50%">
                  <template slot-scope="scope">
                        <el-input :disabled="true" value="0"></el-input>
                    </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="sumMoney" style="border-left:1px solid #ccc;padding:20px;">
            <el-form :inline="true" :model="formInline" class="demo-form-inline" style="text-align:left;">
              <el-form-item class='formItems' label="等级:">
                <el-input :disabled="true" value="一等"></el-input>
              </el-form-item>
              <el-form-item class='formItems' label="是否虫粮:">
                <el-input :disabled="true" value="无"></el-input>
              </el-form-item>
            </el-form>
            </div>
            <div class="grid-content bg-purple-light" style="border-left:1px solid #ccc;padding:20px;">
              <h3>备注</h3>
              <p>上述信息为本次轮换入口检测基本信息，相关第三方检测报告，请查看附件。</p>
            </div>
            <div class="grid-content bg-purple-light" style="border-left:1px solid #ccc;padding:20px;">
              <h3>附件</h3>
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
            <div style="padding:20px; justify-content: flex-end;display: flex;">
                <el-button type="primary">下发</el-button>
                <el-button style="margin-left:80px;">取消</el-button>
              </div>
            </div>
            </div>
        </el-col>
    </template>

    <script>
        export default {
          name: 'lowerHair',
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
              listData: [
                {
                  name: '水分（%）'
                },
                {
                  name: '容量（g/L）'
                },
                {
                  name: '杂质（%）'
                },
                {
                  name: '不完整粒（%）'
                }, {
                  name: '生霉粒（%）'
                },
                {
                  name: '色泽气味（%）'
                },
                {
                  name: '容量'
                },
                {
                  name: '请选择'
                }
              ],
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
        .el-table th{
          text-align:center;
        }
        .el-table td{
          text-align:center;
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
          text-aligin:center;
        }
        .el-table td{
          text-aligin:center;
        }
        .sumMoney .el-form--inline .el-form-item__label{
          width:130px;
        }
    </style>