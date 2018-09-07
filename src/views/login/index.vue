<template>
	<div class="login-container">
		<div class="login-box">
			<div class="title">登录</div>
			<el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
				
				<el-form-item prop="name">
					<el-input name="name" autoComplete="on" type="text" v-model="loginForm.name"  placeholder="账户"></el-input>
				</el-form-item>
				<el-form-item prop="password">
					<el-input name="password" autoComplete="on" type="password"  v-model="loginForm.password" placeholder="密码"></el-input>
				</el-form-item>
				<el-form-item prop="" class="">
					<el-row :gutter="20">
						<el-col :span="13">
							<el-form-item prop="code">
								<el-input name="text" type="text"  v-model="loginForm.code" autoComplete="on" placeholder="请输入验证码"></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="11">
							<el-form-item >
								<div class="">
									<img src=""/>
								</div>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form-item>
				<el-form-item>
					<el-button 
							style="width:100%;margin-top:3%;background-image: linear-gradient(90deg,#ffca21 0%,#ff9911 50%,#ff6700 100%);box-shadow: 0px 3px 5px 0px ;rgba(0, 0, 0, 0.15);" 
							:loading="loading" @click.native.prevent="handleLogin">
						登录
					</el-button>
					<el-button  
							style="width:100%;margin-top:9%;margin-left:0;background-image: linear-gradient(90deg,#ffffff 100%);box-shadow: 0px 3px 5px 0px ;rgba(0, 0, 0, 0.15);border: solid 1px #cccccc;" 
							:loading="loading" @click.native.prevent="handleLogin">
						注册
					</el-button>
				</el-form-item>
			</el-form>
		</div>
		<div class="logo">
			<span>陕西省粮食局企业管理平台</span>
		</div>
		<div class="footer">
			建议使用Chrome浏览器获得最佳体验<br/>
			电话：029-88302744 传真：029-88303533<br/>
			版权所有：陕西省粮食局
		</div>
	</div>
</template>

<script>
	export default {
	  components: {},
	  name: 'login',
	  data() {
	    const validatePass = (rule, value, callback) => {
	      if (value.length < 5) {
	        callback(new Error('密码不能小于5位'))
	      } else {
	        callback()
	      }
	    }
    return {
	      loginForm: {
	        name: null,
	        password: null,
	        code: null
	      },
	      loginRules: {
	        name: [{
	          required: true,
	          message: '账户不能为空',
	          trigger: 'blur'
	        },
	        {
	          min: 3,
	          max: 20,
	          message: '长度在 3 到 20 个字符',
	          trigger: 'blur'
	        }
	        ],
	        password: [{
	          required: true,
	          trigger: 'blur',
	          validator: validatePass
	        }]
	      },
	      loading: false,
	      showDialog: false
	    }
	  },
	  methods: {
	    handleLogin() {
	      this.$refs.loginForm.validate(valid => {
	        if (valid) {
	          this.loading = true
	          // this.loginForm.password = Base.encode(this.loginForm.password);
	          this.$store.dispatch('Login', this.loginForm).then(() => {
	            this.loading = false
	            this.$router.push({
	              path: '/'
	            })
	            this.showDialog = true
	          }).catch(() => {
	            this.loading = false
	          })
        } else {
	          console.log('error submit!!')
	          return false
	        }
	      })
	    }
	  },
	  created() {},
	  destroyed() {}
	}
</script>

<style rel="stylesheet/scss" lang="scss">
	@import "src/styles/mixin.scss";
	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 5px;
	}
	.login-container {
		@include relative;
		width:100%;
		min-width: 1200px;
		height:100%;
		min-height: 700px;
		background: url(../../assets/login_images/bg02.jpg) no-repeat 80% 80%;
		background-size: 100%;
		background-color: #2d3a4b;
		input:-webkit-autofill {
			-webkit-box-shadow: 0 0 0 1000px #fff inset !important;
			/*-webkit-text-fill-color: #ccc !important;*/
		}
		input {
			background: transparent;
			border: 1px solid #ccc !important;
			-webkit-appearance: none;
			border-radius: 5;
			padding: 12px 5px 12px 15px;
			color: #000;
			width: 100%;
			height: 40px;
		}
		.el-input {
			display: inline-block;
			height: 7%;
			width: 100%;
		}
		.svg-container {
			padding: 6px 5px 6px 15px;
			color: #889aa4;
		}
		.title {
			/*font-size: 26px;
			color: #555;
			margin: 0 auto 20px;
			text-align: left;
			font-weight: normal;*/
			height: 20%;
			background-color: #FFF;
			background: url(../../assets/login_images/login-2.png) no-repeat 0 0;
			background-size: 20%;
			font-size: 24px;
			padding: 10% 0 3% 15%
		}
		.login-form {
			/*width: 450px;*/
			/*padding: 0 45px 0 45px;*/
			height: 80%;
			padding: 4% 10% 25%;
			background-color: #FFF;
            background: url(../../assets/login_images/login-1.png) no-repeat 100% 100%;
            background-size: 60%;
			
		} 
		.el-form-item {
			border-radius: 5px;
			color: #454545;
		}
		.forget-pwd {
			color: #fff;
		}
	}
	.logo:before{
		content: '';
		position: absolute;
		top: 26px;
		left:20px;
		width: 73px;
		height: 84px;
		background: url(../../assets/login_images/guohui.png) center center no-repeat;
		background-size: 110%;
		
	}
	.logo{
		position: absolute;
		top: 0;
		padding-top:28px;
		padding-left: 38px;
		width: 462px;
		height: 152px;
		text-align: right;
		line-height: 84px;
		font-size: 30px;
		color: #fff;
	}
	.login-box{
		/*z-index: 9999;
		position: absolute;
		left: 56%;
		padding: 120px 55px;
		border-radius: 10px;
		border: solid 0px #ffffff;
		margin: 8% auto 0;*/
		height: 72%;
		background-color: #FFF;
		padding: 0px;
		overflow: hidden;
		border-radius: 10px;
		/*background-size: cover;
		overflow: hidden;*/
		bottom: 14%;
		position: absolute;
		right: 10%;
		top: 14%;
		width: 27%;
	}
	.footer{
		position: absolute;
		text-align: center;
		left: 0;
		right: 0;
		color: #fff;
		bottom: 10px;
	}
</style>