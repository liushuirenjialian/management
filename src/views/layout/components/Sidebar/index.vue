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
      <!-- {{message}} -->
      <sidebar-item :routes="routerList"></sidebar-item>
    </div>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import { constantRouterMap2 } from '@/router/index'
import { updataPassword, getById, putObj, provinceInfo,getSiderBarInfo } from '@/api/login'
import Bus from '../bus.js'

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
    //  routes() {
    //    return this.$router.options.routes
    //  },
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
  mounted(){
        let self = this;
        Bus.$on('msg', (e) => {
        self.message = e
        var idN = e; 
        alert(`传来的数据是：${e}`);
        console.log(self.message);
        self.getSiderBar(idN);
       })
  },
  methods: {
      getSiderBar(id){
        debugger
        getSiderBarInfo(id).then(response =>{
          
         let ddd  = response.data;
        this.routerList = ddd[0].children;
        // sessionStorage.setItem('siderDatass',JSON.stringify(this.routerList)) JSON.parse
        // alert(this.routerList)
      })
    }
  },
  created() {

    // debugger 这个地方拿到sessionStorae去生产sidebar
    // let list = sessionStorage.getItem('siderData');
    // this.routerList   = JSON.parse(list);
    // alert('aaa'+this.routerList)
  	// this.routerList = this.$router.options.routes
  },

  Update() {
    // let list = sessionStorage.getItem('siderData');
    // this.routerList   = JSON.parse(list);
    // alert('aaa'+this.routerList)
    // console.log(this.routerList)
  	// this.routerList = sessionStorage.getItem('siderData');
  }
}
</script>
