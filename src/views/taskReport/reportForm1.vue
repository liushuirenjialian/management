<template>
	<div class="app-container">
		<div>
			<el-card class="box-card"> <iframe id="BI" width=100% name="BI" :src='this.iframeurl'></iframe> </el-card>
		</div>
	</div>
</template>
<script>
	// import $ from 'jquery'
	import { mapGetters } from 'vuex'
	// import { reportform, getDetail } from '@/api/taskReport/index'
	// import Cookies from 'js-cookie'
	export default {
	  name: 'userMaintain',
	  computed: { ...mapGetters(['name', 'roles'])
	  },
	  data() {
	    return {
	      url: {
	        command: 'querytosigntasks',
	        rshid: 'workflow-querytosigntasks'
	      },
	      uId: '',
	      iframeurl: '',
	      username: '',
	      baseURLirpturi: '',
	      pass: ''

	    }
	  },
	  created() {
	    // this.loginInfo()
	  },
	  mounted() {
	    const oIframe = document.getElementById('BI')
	    const deviceHeight = document.documentElement.clientHeight - 200
	    oIframe.style.height = deviceHeight + 'px'
	    // this.allLogin()
	  },
	  methods: {
    //	    loginInfo() {
    //	      this.uId = Cookies.get('id')
    //	      getDetail(this.uId).then(res => {
    //	        this.baseURLirpturi = res.data.irpturi
    //	        this.username = res.data.username
    //	        this.pass = res.data.password
    //	      })
    //	      //this.allLogin()
    //	      const _this = this
    //	      setTimeout(function() {
    //	        reportform(_this.uId, _this.url).then(res => {
    //	          _this.iframeurl = res.data
    //	        })
    //	      }, 300)
    //	    },
    //	    allLogin() {
    //	      const _this = this
    //	      setTimeout(function() {
    //	        $.ajax({
    //	          url: _this.baseURLirpturi + '/oemlogin.do?id=' + _this.username + '&pw=' + _this.pass + '&forcelogin=true',
    //	          dataType: 'jsonp',
    //	          jsonp: 'function_name_index',
    //	          jsonpCallback: 'function_name',
    //	          success: function(data) {
    //	            alert(data.msg)
    //	          }
    //	        })
    //	      }, 100)
    //	    }
	  }
	}
</script>
<style scoped="scoped">

</style>