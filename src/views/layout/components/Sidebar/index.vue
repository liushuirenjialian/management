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
      <sidebar-item :routes="routerList" v-on:childByVal="childByVal">
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
// import { getSiderBarInfo } from '@/api/login'
import Bus from '../bus.js'
import Cookies from 'js-cookie'

// import  getToken from '@/utils/auth'
export default {
  data() {
    return {
      routerList: [],
      statuIfram: 0
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
      console.log(`从nav传来的数据是：${e}`)
      console.log(self.message)
      var menuid = Cookies.get('id')
      console.log('菜单id:' + menuid)

      var munuLi = JSON.parse(sessionStorage.getItem('MenuList'))
      for (var i = munuLi.length - 1; i >= 0; i--) {
        var index = munuLi[i]
        if (index.id === idN) {
          // alert('suc')
          // var n = index.id
          var result = munuLi[i].children
          // 每次点击时候，路由定位到/
          this.$router.push({
            path: '/'
          })
          console.log(result)
          this.routerList = result
          return true
        }
      }
      // munuLi.forEach(function(){
      // })
      console.log('侧边栏成功渲染')

      // self.getSiderBar(idN, menuid)
    })
  },
  methods: {
    childByVal: function(childValue) { // childValue就是子组件传过来的值
      this.statuIfram = childValue
    }
    // 每次点击去 拿到meunu ，遍历加入标识
    // getSiderBar(idN, menuid) {
    //   getSiderBarInfo(idN, menuid).then(response => {
    //     let sel = this;
    //     var dataLis = response.data[0];
    //     // if(dataLis.children == false){
    //     //    console.log('无数组');
    //     // }else{
    //     //   sel.ay =  dataLis.children[0];
    //     //    if(dataLis.path.slice(0,4) == "http"){
    //     //     // alert('1')
    //     //     sel.$set(sel.ay,'keyI',0);
    //     //      this.routerList = dataLis.children;

    //     // }
    //      nn dataLis.children;

    //     // this.routerList = dataLis[0].children
    //   }).catch(function (error) {//加上catch
    //       console.log(error);
    //     })
    // }
  }
}
</script>
