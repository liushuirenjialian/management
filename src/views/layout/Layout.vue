<template>
  <!-- <div style="width:100%"> -->
    <div class="app-wrapper" :class="classObj">
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
      <div class="navbar" style="width:100%; height:60px;"><navbar :routes="routes"></navbar></div>
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <breadcrumb class="bread"></breadcrumb>
<!--         <iframe id="myFrameId" name="myFrameName" scrolling="no" frameborder="0" style="width:100%;border:1px solid red;"></iframe> -->
         
        <app-main></app-main>
      </div>
    </div>
  <!-- </div> -->


</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import Breadcrumb from '@/components/Breadcrumb'
import { findSiderMenuById } from '@/api/login'
import Cookies from 'js-cookie'
export default {
  name: 'layout',
  components: {
    Sidebar,
    Navbar,
    AppMain,
    Breadcrumb

  },
  mixins: [ResizeMixin],
  computed: {
    ...mapGetters(['sidebar', 'navbar', 'formDatas']),
    routes() {
      return this.formDatas
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  created() {
    console.log(this.formDatas)
    // uerids
  },
  mounted() {
    // const oIframe = document.getElementById('myFrameId')
    // const deviceHeight = document.documentElement.scrollHeight
    // oIframe.style.height = deviceHeight + 'px'
    // id
    var userId = Cookies.get('id')
    console.log(userId)
    this.findSiderMenus(userId)
  },
  methods: {
    findSiderMenus(userId) {
      findSiderMenuById(userId).then(response => {
        var dataLis = response.data
        const ddd = JSON.stringify(dataLis)
        sessionStorage.setItem('MenuList', ddd)
        console.log('siderbarMuNU一次请求成功')
      }).catch(function(error) {
        console.log(error)
      })
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.app-wrapper {
  @include clearfix;
  position:absolute;
  overflow: hidden;
  top: 0;
  height: 100%;
  width: 100%;
  margin:0 auto;
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}
.main-container {
  /*background-color: rgb(228, 232, 238);*/
  height: 100%;
}
.bread{
  background-color: #e4e8ee;
  width:100%; height:40px;
  line-height:40px;
  position: absolute;
  top:60px;
}
</style>
