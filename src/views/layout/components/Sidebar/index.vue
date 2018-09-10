<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
    <div class="on">
      <keep-alive>
      <sidebar-item :routes="routerList">
      </sidebar-item>
    </keep-alive>
    </div>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
// import { constantRouterMap2 } from '@/router/index'
import { getSiderBarInfo } from '@/api/login'
import Bus from '../bus.js'
import Cookies from 'js-cookie'

// import  getToken from '@/utils/auth'
export default {
  data() {
    return {
      routerList: []
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  // watch:{
  // 	routes() {
  //     this.routerList=this.$router.options.routes
  //     alert(routerList)
  //  }
  // },
  created() {
    const self = this
    Bus.$on('msg', (e) => {
      self.message = e
      var idN = e
      console.log(`传来的数据是：${e}`)
      console.log(self.message)
      var menuid = Cookies.get('id')
      console.log('菜单id:' + menuid)

      self.getSiderBar(idN, menuid)
    })
  },
  methods: {
    getSiderBar(idN, menuid) {
      getSiderBarInfo(idN, menuid).then(response => {
        const ddd = response.data
        this.routerList = ddd[0].children
      })
    }
  }
}
</script>
