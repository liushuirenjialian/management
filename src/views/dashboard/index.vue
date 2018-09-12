<template>
	<div class="dashboard-container">
		<iframe id="myFrameId" name="myFrameName" scrolling="no" frameborder="0" style="width:100%;"></iframe>
		<div style="display:none">
			<!-- <el-form id="form111" action="http://192.168.80.132:7007/login/VerifyLogin.jsp" method="post" target="_blank">
				<el-input type=t ext name="loginid" v-model="this.form.name"></el-input>
				<el-input type=t ext name="userpassword" v-model="this.form.passWord"></el-input>
				<el-input type=t ext name="logintype" value="1"></el-input>
			</el-form> -->
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	// import { getInfoById } from '@/api/login'
// import Cookies from 'js-cookie'
	export default {
	  name: 'dashboard',
	  computed: {
	    ...mapGetters([
	      'name',
	      'roles'
	    ])
	  },
	  data() {
	    return {
	      form: {
	        name: '',
	        passWord: '',
	        logintype: '1'
	      },
	      userId: ''
	    }
	  },
	  created() {
	    // this.OA();
	  },
	  mounted() {
	    const oIframe = document.getElementById('myFrameId')
    const deviceHeight = document.documentElement.scrollHeight
	    oIframe.style.height = deviceHeight + 'px'
  },
	  methods: {
	    // 表单提交
	    // formFn() {
	    // 	document.getElementById("form111").submit();
	    // },
	    // //OA登陆
	    // OA() {
	    // 	this.userId = Cookies.get('id')
	    // 	getInfoById(this.userId).then(response => {
	    // 		this.form.name = response.data.username; // 账户
	    // 		this.form.passWord = response.data.password; // 密码
	    // 	});
	    // },
	  }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dashboard-container {
		height: 100%;
		/*background: url(../../assets/login_images/timg.jpg) no-repeat center center;*/
		background-size: cover;
	}
</style>
