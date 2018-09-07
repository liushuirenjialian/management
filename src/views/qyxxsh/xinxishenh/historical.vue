<template>
	<el-card class="contentBox">
		<el-row :gutter="100">
			<el-form :model="ruleForm2" status-icon :rules="ruleForm2" ref="ruleForm2" label-width="140px" class="demo-ruleForm">
				<el-col :span="12">
					<el-form-item label="企业名称：">
						<el-input v-model="ruleForm2.companyName" disabled auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="法人证件类型：">
						<el-select v-model="ruleForm2.cardType" placeholder="请选择" disabled>
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="法人证件号码：">
						<el-input type="" v-model="ruleForm2.cardTypeValue" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="单位证件：">
						<div v-for="(item,index) in ruleForm2.files">
							<label>
								<span style="width: calc(100% - 88px);display:inline-block;overflow:hidden;text-overflow:ellipsis; white-space:nowrap">{{item.originalName}}</span>
							</label>
							<label>
								<a class="uploadBtn" style="margin-left: 8px;display:inline-block;vertical-align:top ;"  @click="downHandle(item.path)" >下载文件</a>								
							</label>
						</div>
					</el-form-item>
					<el-form-item label="邮箱：" prop="email">
						<el-input type="" v-model="ruleForm2.email" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="法人登录账号：" prop="username">
						<el-input type="" v-model="ruleForm2.username" auto-complete="off" disabled></el-input>
					</el-form-item>
					<el-form-item label="手机号：" prop="phone ">
						<el-input type="" v-model="ruleForm2.phone" auto-complete="off" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="法定代表人姓名：" prop="legalName ">
						<el-input type="" v-model="ruleForm2.legalName" disabled auto-complete="off"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码：" prop="idCard">
						<el-input v-model.number="ruleForm2.idCard" disabled></el-input>
					</el-form-item>
					<el-form-item label="业务勾选：">
						<el-checkbox-group v-model="ruleForm2.menus" disabled>
							<el-checkbox label="首页" name="menu"></el-checkbox>
							<el-checkbox label="价格监测" name="menu"></el-checkbox>
							<el-checkbox label="资格申报" name="menu"></el-checkbox>
							<el-checkbox label="任务填报" name="menu"></el-checkbox>
							<el-checkbox label="日常信息" name="menu"></el-checkbox>
							<el-checkbox label="基本信息" name="menu"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>
					<el-form-item label="企业经度：" prop="lon">
						<el-input v-model.number="ruleForm2.lon" disabled></el-input>
					</el-form-item>
					<el-form-item label="企业纬度：" prop="lat">
						<div style="width:100%;text-align: justify;">
							<el-input v-model.number="ruleForm2.lat" style="width: 50%;" disabled></el-input>
							<!-- <a href="http://www.gpsspg.com/maps.htm" target="_blank" style="">
									<el-button type="primary" style="width: 40%;" size="medium">获取经纬度</el-button>
								</a> -->
						</div>
					</el-form-item>
					<el-form-item label="审核单位：" prop="submitDepartment">
						<el-input placeholder="请输入内容" v-model="ruleForm2.submitDepartment" class="input-with-select" disabled>
							<el-button slot="append" icon="el-icon-search"></el-button>
						</el-input>
					</el-form-item>
				</el-col>
				<el-col :span="24" style="text-align: center;">
					<el-button type="primary" @click="$router.back(-1)">返回</el-button>

				</el-col>
			</el-form>
		</el-row>
	</el-card>
</template>

<script>
	import {
	  biangenglist
	} from '@/api/xinxishenh/shenhe'

	export default {
	  data() {
	    return {
	      imgUrl: '', // 文件上传
	      userImg: '',
	      ruleForm2: {},
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
	      biangenglist(this.$route.query.qyCompany).then(res => {
	        this.ruleForm2 = res.data
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