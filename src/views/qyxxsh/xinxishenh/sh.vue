<style type="text/css">
	.chgName .el-form-item__label {
		color: red !important;
	}
	.explain{
		font-size: 12px;
		color: red;
		height: 25px;
		line-height: 25px;
	}
	.iptBox{
		width: 100%;
	}

</style>
<template>
	<el-card class="contentBox">
		<el-row>
			<el-col :span="20" class="explain">
				*标红为基本信息变更项
			</el-col>
		</el-row>
		<el-row :gutter="100">
			<el-form :model="ruleForm2" status-icon :rules="ruleForm2" ref="ruleForm2" label-width="140px" class="demo-ruleForm">
				<el-col :span="12">
					<el-form-item label="企业名称：">
						<el-input v-model="ruleForm2.companyName" disabled auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item v-if="" label="企业名称：" class="chgName">
						<el-input v-model="changeForm.name" disabled auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="法人证件类型：">
						<el-select v-model="ruleForm2.cardType" placeholder="请选择" class="iptBox"  disabled>
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="法人证件类型：" class="chgName " v-if="changeForm.cardType!==null ? true:false ">
						<el-select v-model="changeForm.cardType" class="iptBox" placeholder="请选择" disabled>
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="法人证件号码：">
						<el-input type="" v-model="ruleForm2.cardTypeValue" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="法人证件号码：" class="chgName">
						<el-input type="" v-model="changeForm.number" disabled auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="单位证件：">
						<div v-for="(item,index) in ruleForm2.files">
							<label>
								<span style="width: calc(100% - 88px);display:inline-block;overflow:hidden;text-overflow:ellipsis;  white-space:nowrap">{{item.originalName}}</span>
							</label>
							<label>
								<a class="uploadBtn" style="margin-left: 8px;display:inline-block;vertical-align:top ;"  @click="downHandle(item.path)" >下载文件</a>								
							</label>
						</div>
					</el-form-item>
					<el-form-item label="单位证件：" class="chgName">
						<div v-for="(item,index) in ruleForm2.files">
							<label>
								<span style="width: calc(100% - 88px);display:inline-block;overflow:hidden;text-overflow:ellipsis;  white-space:nowrap">{{item.originalName}}</span>
							</label>
							<label>
								<a class="uploadBtn" style="margin-left: 8px;display:inline-block;vertical-align:top ;"  @click="downHandle(item.path)" >下载文件</a>								
							</label>
						</div>
					</el-form-item>
					<el-form-item label="邮箱：" prop="email">
						<el-input type="" v-model="ruleForm2.email" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="邮箱：" prop="email" class="chgName">
						<el-input type="" v-model="changeForm.mailbox " auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="法人登录账号：" prop="username">
						<el-input type="" v-model="ruleForm2.username" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="法人登录账号：" prop="username" class="chgName">
						<el-input type="" v-model="changeForm.usernumber" auto-complete="off" disabled></el-input>
					</el-form-item>

					<el-form-item label="手机号：" prop="phone ">
						<el-input type="" v-model="ruleForm2.phone" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="手机号：" prop="phone " class="chgName">
						<el-input type="" v-model="changeForm.phonenumber" auto-complete="off" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="法定代表人姓名：" prop="legalName">
						<el-input type="" v-model="ruleForm2.legalName" disabled auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="法定代表人姓名：" prop="legalName" class="chgName">
						<el-input type="" v-model="changeForm.legalname" disabled auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：" prop="idCard">
						<el-input v-model.number="ruleForm2.idCard" disabled></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：" prop="idCard" class="chgName">
						<el-input v-model.number="changeForm.cards" disabled></el-input>
					</el-form-item>				
					<el-form-item label="企业经度：" prop="lon">
						<el-input v-model.number="ruleForm2.lon" disabled  ></el-input>
					</el-form-item>
					<el-form-item label="企业经度：" prop="lon" class="chgName"  >
						<el-input v-model.number="changeForm.loners" disabled ></el-input>
					</el-form-item>
					<el-form-item label="企业纬度：" prop="lat"  >
						<div style="width:100%;text-align: justify;">
							<el-input v-model.number="ruleForm2.lat" disabled></el-input>
						</div>
					</el-form-item>
					<el-form-item label="企业纬度：" prop="lat" class="chgName" >
						<div style="width:100%;text-align: justify;">
							<el-input v-model.number="changeForm.lats" disabled></el-input>
						</div>
					</el-form-item>
					<el-form-item label="审核单位：" prop="submitDepartment">
						<el-input placeholder="请输入内容" v-model="ruleForm2.submitDepartment" class="input-with-select" disabled>
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-form-item>
					<el-form-item label="审核单位：" prop="submitDepartment" class="chgName">
						<el-input placeholder="请输入内容" v-model="changeForm.submitions" class="input-with-select" disabled>
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" style="text-align: center;">
					<el-button @click="adopt(2)">通过</el-button>
					<el-button type="primary" @click="adopt(3)">驳回</el-button>
					<el-button type="primary" @click="$router.back(-1)">返回</el-button>
					<!--<el-button type="primary" @click="$router.push('/qyxxsh/index')" v-if="$route.query.states!=='详情'">返回</el-button>-->
				</el-col>
			</el-form>
		</el-row>
	</el-card>
</template>
<script>
	import {
	  updata,
	  see,
	  downloadlist
	} from '@/api/xinxishenh/shenhe'

	export default {
	  data() {
	    return {
	      imgUrl: '', // 文件上传
	      userImg: '',
	      ruleForm2: {},
	      changeForm: {
	        name: '123',
	        cardType: '3212222',
	        number: '444',
	        mailbox: 'chenxiny@163.com',
	        usernumber: '6768',
	        phonenumber: '15510236404',
	        legalname: '传你',
	        cards: '信心',
	        menuers: '31113',
	        loners: '33',
	        lats: '777',
	        submitions: '方案'
	      },
	      menusIndex: '',
	      value: '0',
	      options: [],
	      statusCode: '',
	      status: 2,
	      state: true,
	      num: 0
	    }
	  },
	  created() {
	    this.handleDetail()
	  },
	  mounted() {},
	  methods: {
	    handleDetail() {
	      see(this.$route.query.id).then(response => {
	        if (response.status) {
	          this.ruleForm2 = response.data
	        } else {
	          this.$message.error(response.msg)
	        }
	      })
	    },
	    // 2审核通过   3驳回
	    adopt(status) {
	      updata(status, this.$route.query.id).then(res => {
	        this.$router.back(-1)
	      })
	    },
	    // 下载文件
	    downHandle(imgPath) {
	      downloadlist(imgPath).then(res => {
	        console.log(res)
	      })
	    }
	  }

	}
</script>
<style scoped>
	.contentBox {
		margin-top: 20px;
		padding: 0px 20px;
	}
</style>