<template>
<div style="position:relative">
  <div class="apply">
    <el-card class="box-card">
      <el-row>
        <el-col :sapn="24">
          <div class="title">
            <h2>陕西省粮食收购资格审核申请表</h2>
            <span class="main-top-right">
						  <font color="blue">状态：{{ruleForm.state}}</font>
						  <font color="blue">申请编号：{{ruleForm.applyNum}}</font>
						</span>
            <span class="main-top-left">主体经营</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col style="padding:20px">
          <el-form :model="ruleForm" label-position="right" ref="ruleForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="企业名称：" prop="name">
              <el-input v-model="ruleForm.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="企业地址：" prop="address">
              <el-input v-model="ruleForm.address" :disabled="true"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="企业类型：" prop="type">
                  <el-input v-model="ruleForm.type" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="报送机关：" prop="sendTo">
                  <el-input  v-model="ruleForm.sendTo" :disabled="true" ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="法定代表人：" prop="representative">
                  <el-input v-model="ruleForm.representative" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="法人身份证号：" prop="reIdCard">
                  <el-input v-model="ruleForm.reIdCard" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="法人联系电话：" prop="rePhone">
                  <el-input v-model="ruleForm.rePhone" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="邮政编码：" prop="postal">
                  <el-input v-model="ruleForm.postal" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="联系人：" prop="contact">
                  <el-input v-model="ruleForm.contact" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人身份证号码：" prop="coIdCard">
                  <el-input v-model="ruleForm.coIdCard" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="联系人电话：" prop="coPhone">
                  <el-input v-model="ruleForm.coPhone" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="营业执照发证机关：" prop="certificate">
                  <el-input v-model="ruleForm.certificate" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="营业执照注册号：" prop="certificateCode">
                  <el-input v-model="ruleForm.certificateCode" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="企业名称预先核准通知书号码：" label-width="220px" prop="noticeNum">
                  <el-input v-model="ruleForm.noticeNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="conditions">
                  <el-form-item label="申请条件">
                  </el-form-item>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="注册资金：" prop="registerMoney">
                  <el-input v-model="ruleForm.registerMoney" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="筹措自有资金（万元）：" label-width="180px" prop="ownMoney">
                  <el-input v-model="ruleForm.ownMoney" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="自有仓储设施类型：">
                  <el-input v-model="ruleForm.declareInfoVO.ownStorageType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效仓容量：">
                  <el-input v-model="ruleForm.declareInfoVO.ownStorageVolume" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="自有仓储设施地址：">
              <el-input v-model="ruleForm.declareInfoVO.ownStorageAddress" :disabled="true"></el-input>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item label="租赁仓储设施类型：">
                  <el-input v-model="ruleForm.declareInfoVO.leaseStorageType" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="有效仓容量：">
                  <el-input v-model="ruleForm.declareInfoVO.leaseStorageVolume" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="租赁仓储设施地址：">
              <el-input v-model="ruleForm.declareInfoVO.leaseStorageAddress" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="检化验设备目录：">
              <el-input v-model="ruleForm.declareInfoVO.jhsbml" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="计量工具目录：">
              <el-input v-model="ruleForm.declareInfoVO.jlgjml" :disabled="true"></el-input>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="初级以上质检人员：">
                  <el-input v-model="ruleForm.declareInfoVO.checkPerson" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="保管人员人数：">
                  <el-input v-model="ruleForm.declareInfoVO.chargeNum" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="年粮食收购量：">
              <el-input v-model="ruleForm.declareInfoVO.planAcquisition" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="备注：">
              <el-input type="textarea" v-model="ruleForm.declareInfoVO.context" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="附件下载：">
              <p class="fileBox" v-for="(item,index) in ruleForm.declareFiles" :key='index'>
                <a class="fileName" :href="item.path"  target="_blank">{{item.originalName}}</a>
                <!-- <a class="deleteFileBtn" @click="deleteFileBtn(index)">×</a> -->
              </p>
            </el-form-item>
            <!-- <el-form-item label="">
              <p class="fileBox" v-for="(item,index) in ruleForm.declareFiles" :key='index'>
                <span class="fileName">{{item.originalName}}</span>
                <a class="deleteFileBtn" @click="deleteFileBtn(index)">×</a>
              </p>
            </el-form-item> -->
            <el-form-item label="">
              <div class="Instructions">
                <span>扫描文件上传要求及样本：</span><br/>
                <span>1、粮食收购资格申请报告（加盖公章）扫描件<a href="#">（样本下载）</a></span><br/>
                <span>2、粮食收购资格审核申请表（加盖公章）扫描件<a href="#">（样本下载）</a></span><br/>
                <span>3、企业法人营业执照复扫描件</span><br />
                <span>4、企业法人组织机构代码证扫描件</span><br />
                <span>5、企业法定代表人身份证扫描件</span><br />
                <span>6、企业出资验资报告书扫描件</span><br />
                <span>7、企业储粮仓房产权证明或租赁合同扫描件</span><br />
                <span>8、检化验设施设备清单扫描件</span><br />
                <span>9、质检员和保管员资格证书扫描件及劳动合同扫描件。</span><br />
              </div>
            </el-form-item>
            <!-- <el-row>
              <el-col :span="24">
                <div class="box-pd">
                  <el-button type="primary" @click="saveBtn('ruleForm')">保存</el-button>
                  <el-button type="primary" @click="submitBtn('ruleForm')">提交</el-button>
                  <el-button @click="resetBtn()">重置</el-button>
                </div>
              </el-col>
            </el-row> -->
          </el-form>
        </el-col>
      </el-row>
    </el-card>
  </div>
  <div class="action" style="position:absolute;top:30px;right:30px">
          <el-button type="info" @click="overrule" size="mini" icon="el-icon-back" round></el-button>
  </div>
</div>  
</template>

<script>
import {
  getObj
} from '@/api/newApproval/newApplication'
export default {
  data() {
    return {
      reportId: '',
      type: '',
      ruleForm: {
        applyNum: '', // 申请编号
        declareFiles: [], // 上传的文件
        state: '', // 状态
        name: '', // 企业名称
        address: '', // 企业地址
        type: '', // 企业类型
        sendTo: '', // 报送机关
        representative: '', // 法定代表人
        reIdCard: '', // 法人身份证号
        rePhone: '', // 联系人电话
        postal: '', // 邮政编码
        contact: '', // 联系人
        coIdCard: '', // 联系人身份证号码
        coPhone: '', // 联系人电话
        certificate: '', // 营业执照发证机关
        certificateCode: '', // 营业执照注册号
        noticeNum: '', // 企业名称预先核准通知书号码
        registerMoney: '', // 注册资金
        ownMoney: '', // 筹措自有资金
        declareInfoVO: {
          ownStorageType: '', // 自有仓储设施类型
          ownStorageVolume: '', // 有效仓容量
          ownStorageAddress: '', // 自有仓储设施地址
          leaseStorageType: '', // 租赁仓储设施类型
          leaseStorageVolume: '', // 租赁有效仓容量
          leaseStorageAddress: '', // 租赁仓储设施地址
          jhsbml: '', // 检化验设备目录
          jlgjml: '', // 计量工具目录
          checkPerson: '', // 初级以上质检人员
          chargeNum: '', // 保管人员人数
          planAcquisition: '', // 年粮食收购量
          context: '' // 备注
        }
      }
    }
  },
  // watch: {
  //   filterText(val) { // 树形结构
  //     this.$refs.tree2.filter(val)
  //   }
  // },
  created() {
    const _this = this
    setTimeout(function() {
      _this.reportId = _this.$route.query.id
      _this.type = _this.$route.query.type
    }, 300)
  },
  mounted() {
    const _this = this
    setTimeout(function() {
      getObj(_this.reportId).then(res => {
        if (res.data.declareInfoVO == null) {
          res.data.declareInfoVO = _this.ruleForm.declareInfoVO
        }
        _this.ruleForm = res.data
      })
    }, 300)
  },
  methods: {
    overrule() {
      if (this.type === 1) {
        this.$router.push({
          path: '/newApproval/newApplication'
        })
      } else if (this.type === 2) {
        this.$router.push({
          path: '/newApproval/accepted'
        })
      } else if (this.type === 3) {
        this.$router.push({
          path: '/newApproval/passed'
        })
      } else if (this.type === 4) {
        this.$router.push({
          path: '/newApproval/noPassed'
        })
      } else if (this.type === 5) {
        this.$router.push({
          path: '/newApproval/revoked'
        })
      } else if (this.type === 6) {
        this.$router.push({
          path: '/changeApproval/changeRequest'
        })
      } else if (this.type === 7) {
        this.$router.push({
          path: '/changeApproval/dismissed'
        })
      } else {
        this.$router.push({
          path: '/changeApproval/changed'
        })
      }
    }

    // 如果是编辑，获取申请信息详情
    // getInfo() {
    //   if (this.$route.query.state === 'edit') {
    //     applyInfo(this.$route.query.id).then(res => {
    //       this.ruleForm = res.data
    //     })
    //   }
    // },
    // 获取当前时间作为申请编号
    // setApplyCode() {
    //   const nowTime = new Date()
    //   const nowYear = nowTime.getFullYear().toString()
    //   const nowMonth = nowTime.getMonth() + 1
    //   const nowDay = nowTime.getDate()
    //   const nowHour = nowTime.getHours()
    //   const nowMinutes = nowTime.getMinutes()
    //   const nowSeconds = nowTime.getSeconds()
    //   this.ruleForm.applyNum = 'SQDH' + nowYear + nowMonth + nowDay + nowHour + nowMinutes + nowSeconds
    // },
    // 获取报送机关的树形结构
    // getTree() {
    //   getTreeData().then(res => {
    //     this.dataTree = res.data
    //   })
    // },
    // 树形结构
    // filterNode(value, data) {
    //   if (!value) return true
    //   return data.label.indexOf(value) !== -1
    // },
    // 树形传输选中内容
    // handleNodeClick(data) {
    //   this.ruleForm.sendTo = data.orgName
    // },
    // 上传文件
    // onUpload(e) {
    //   const file = e.target.files[0]
    //   //      this.form.img=file.name;
    //   const param = new FormData() // 创建FormData对象
    //   param.append('file', file, file.name) // 通过append向form对象添加数据
    //   param.append('chunk', '0') // 添加form表单中其他数据
    //   // console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去
    //   const config = {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   } // 添加请求头
    //   axios.post(`/declare/upFile?certificateCode=` + this.ruleForm.certificateCode, param, config)
    //     .then(res => {
    //       const newFileObj = {
    //         originalName: file.name,
    //         path: res.data.data
    //       }
    //       if (this.ruleForm.declareFiles.length < 9) {
    //         this.ruleForm.declareFiles.push(newFileObj)
    //       } else {
    //         this.$notify.error({
    //           title: '错误',
    //           message: '扫描文件已全部上传，请删除需要替换的后再上传'
    //         })
    //       }
    //     })
    // },
    // 删除文件
    // deleteFileBtn(i) {
    //   this.ruleForm.declareFiles.splice(i, 1)
    // },
    // 保存
    // saveBtn(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     this.isCodeAvailable(this.ruleForm.postal) // 验证有效邮政编码
    //     this.isPhoneAvailable(this.ruleForm.rePhone) // 验证有效手机号
    //     this.isPhoneAvailable(this.ruleForm.coPhone) // 验证有效手机号
    //     this.isIdCardAvailable(this.ruleForm.coIdCard) // 验证有效身份证号
    //     this.isIdCardAvailable(this.ruleForm.reIdCard) // 验证有效身份证号
    //     if (valid && this.phoneAvailable && this.codeAvailable && this.IdCardAvailable) {
    //       saveApply(this.ruleForm).then(res => {
    //         if (res.infoCode === 200) {
    //           this.$router.push({
    //             path: '/example/table'
    //           })
    //         }
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // 提交
    // submitBtn(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     this.isCodeAvailable(this.ruleForm.postal) // 验证有效邮政编码
    //     this.isPhoneAvailable(this.ruleForm.rePhone) // 验证有效手机号
    //     this.isPhoneAvailable(this.ruleForm.coPhone) // 验证有效手机号
    //     this.isIdCardAvailable(this.ruleForm.coIdCard) // 验证有效身份证号
    //     this.isIdCardAvailable(this.ruleForm.reIdCard) // 验证有效身份证号
    //     if (valid && this.phoneAvailable && this.codeAvailable && this.IdCardAvailable) {
    //       submitApply(this.ruleForm).then(res => {
    //         if (res.infoCode === 200) {
    //           this.$router.push({
    //             path: '/example/table'
    //           })
    //         }
    //       })
    //     } else {
    //       console.log('error submit!!')
    //       return false
    //     }
    //   })
    // },
    // 重置，清空form表单
    // resetForm() {
    //   this.$refs['ruleForm'].resetFields()
    // },
    // 验证有效手机号
    // isPhoneAvailable(phoneNum) {
    //   const myreg = /^[1][3,4,5,7,8][0-9]{9}$/
    //   if (!myreg.test(phoneNum)) {
    //     this.$notify({
    //       title: '警告',
    //       message: '无效手机号',
    //       type: 'warning',
    //       duration: 2000
    //     })
    //     this.phoneAvailable = false
    //   } else {
    //     this.phoneAvailable = true
    //   }
    // },
    // 验证有效邮政编码
    // isCodeAvailable(codeNum) {
    //   const myreg = /^[0-9]{6}$/
    //   if (!myreg.test(codeNum)) {
    //     this.$notify({
    //       title: '警告',
    //       message: '无效邮政编码',
    //       type: 'warning',
    //       duration: 2000
    //     })
    //     this.codeAvailable = false
    //   } else {
    //     this.codeAvailable = true
    //   }
    // },
    // 验证有效身份证号
    // isIdCardAvailable(coIdCardNum) {
    //   const myreg = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))((\d{4})|(\d{3}[Xx]))$/
    //   if (!myreg.test(coIdCardNum)) {
    //     this.$notify({
    //       title: '警告',
    //       message: '无效身份证号码',
    //       type: 'warning',
    //       duration: 2000
    //     })
    //     this.IdCardAvailable = false
    //   } else {
    //     this.IdCardAvailable = true
    //   }
    // }
  }
}
</script>

<style scoped="scoped">
.el-select {
  width: 100%;
}

.apply {
  display: block;
  padding: 20px;
  width: 100%;
  height: 80%;
}

.apply .title {
  padding-top: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
  margin-bottom: 30px;
}

.apply .title h2 {
  padding-bottom: 10px;
  margin: 0;
}

.apply .main-top-left {
  padding: 10px 16px;
  text-align: justify;
  display: block;
}

.apply .main-top-right {
  padding: 0 16px;
  display: block;
  text-align: left;
}

.apply .main-top-right font:nth-of-type(1),
.apply .main-top-right font:nth-of-type(2) {
  padding-left: 80%;
}

.apply .main-top-right font {
  display: block;
  padding: 2px 0;
  font-size: 14px;
}

.conditions {
  height: 35px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ccc;
}

.Instructions {
  padding: 10px;
  border: 1px solid #ccc;
  line-height: 20px;
  font-size: 14px;
}

.Instructions a {
  color: #1482f0;
}

.box-pd {
  padding-top: 20px;
  text-align: center;
}
/*文件上传样式*/

.file {
  display: none;
}

.uploadBtn {
  padding: 7px 9px;
  cursor: pointer;
  font-weight: normal;
  font-size: 12px;
  border-radius: 4px;
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}

.fileBox {
  margin: 5px 0px;
  background-color: #f0f9eb;
  padding: 0px 10px;
}

.fileBox .deleteFileBtn {
  float: right;
  font-size: 30px;
}

.fileBox .deleteFileBtn:hover {
  color: #f56c6c;
}
</style>