<template>
	<div class="dashboard-container">
		<!--<div class="dashboard-text">name:{{name}}</div>
    <div class="dashboard-text">roles:<span v-for='role in roles' :key='role'>{{role}}</span></div>-->
	</div>
</template>

<script>
	import $ from 'jquery'
	import { mapGetters } from 'vuex'
	import { getDetail } from '@/api/taskReport/index'
	import Cookies from 'js-cookie'
	export default {
	  name: 'dashboard',
	  data() {
	    return {
	      uId: null,
	      iframeurl: null,
	      username: null,
	      baseURLirpturi: null,
	      pass: null

	    }
	  },
	  computed: {
	    ...mapGetters([
	      'name',
	      'roles'
	    ])
	  },
	  created() {
	    this.loginInfo()
	  },
	  methods: {
	    loginInfo() {
	      this.uId = Cookies.get('id')
	      getDetail(this.uId).then(res => {
	        this.baseURLirpturi = res.data.irpturi
	        this.username = res.data.username
	        this.pass = res.data.password
	        alert(this.username)
	      })
	      this.allLogin()
	    },
	    allLogin() {
	      const _this = this
	      setTimeout(function() {
	        alert(_this.username)
	        $.ajax({
	          url: _this.baseURLirpturi + '/oemlogin.do?id=' + _this.username + '&pw=' + _this.pass + '&forcelogin=true',
	          dataType: 'jsonp',
	          jsonp: 'function_name_index',
	          jsonpCallback: 'function_name',
	          success: function(data) {
	          }
	        })
	      }, 300)
	    }
	  }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.dashboard-container {
		height: 100%;
		background: url(../../assets/main-bg.jpg) no-repeat center center;
		background-size: cover;
	}
	/*.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}*/
</style>