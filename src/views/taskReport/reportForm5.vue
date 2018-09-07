<template>
  <div class="app-container">
    <div>
      <el-card class="box-card"> <iframe id="BI" width=100% name="BI" :src='this.iframeurl'></iframe> </el-card>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { reportform } from '@/api/taskReport/index'
  import Cookies from 'js-cookie'
  export default {
    name: 'userMaintain',
    computed: { ...mapGetters(['name', 'roles'])
    },
    data() {
      return {
        url: {
          command: 'querytostartworkflows',
          rshid: 'workflow-querytostartworkflows'
        },
        uId: '',
        iframeurl: ''

      }
    },
    created() {
      this.loginInfo()
    },
    mounted() {
      const oIframe = document.getElementById('BI')
      const deviceHeight = document.documentElement.clientHeight - 200
      oIframe.style.height = deviceHeight + 'px'
    },
    methods: {
      loginInfo() {
        this.uId = Cookies.get('id')
        reportform(this.uId, this.url).then(res => {
          this.iframeurl = res.data
        })
      }
    }
  }
</script>
<style scoped="scoped">

</style>