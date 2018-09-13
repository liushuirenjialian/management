<template>
  <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden" >
         <router-link v-if="item.children.length==0&&item.urlType=='router'" :key="item.path" :to="item.url">
        <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
           <i :class="'icon iconfont'+' '+item.meta.icon"></i>
          <span v-if="item.meta.title" slot="title" :rou="item.urlType">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>
         <a v-if="item.children.length==0&&item.urlType=='http'" :htt="item.urlType" :href="item.path" target="myFrameName" :key="item.index" @click="childFn">
          <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
            <i :class="'icon iconfont'+' '+item.meta.icon"></i>
            <span v-if="item.meta.title" slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </a>
        <el-submenu v-else :index="item.name||item.path" :key="item.index">
          <template slot="title">
            <i :class="'icon iconfont'+' '+item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
          
          <template v-for="child in item.children" v-if="!child.hidden">
            <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.index"></sidebar-item>
            <!-- changed 9/14  -->
             <router-link v-else-if="child.urlType=='router'" :to="child.path" :key="child.name">
            <el-menu-item :index="item.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title" :rous="item.urlType">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link> 
             <a v-else-if="child.urlType=='http'" :href="child.path" target="myFrameName" :key="child.name" :htts="child.urlType" @click="childFn">
              <el-menu-item :index="child.path">
                <i :class="'icon iconfont'+' '+item.meta.icon"></i>
                <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
              </el-menu-item>
            </a>
          </template>
        </el-submenu>
      </template>


      <!-- 保留 -->
   <!--    http://localhost:9528/#/dashboard#guojia/#/ceshi?ssoToken=eyJ0eXBlIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJ1ZGVwUGlkIjoiMjEiLCJ1aWQiOiIzNTUiLCJ1ZGVwSWQiOiI2MiIsInVuYW1lIjoiZGVtb3Rlc3QiLCJ1ZGVwTmFtZSI6IuS6keWNl-ecgeecgeeyrumjn-WxgCIsInJhbmdlIjoiMCIsImV4cCI6MTUzNjY3MTY5NCwidWlwIjoiMTkyLjE2OC44MC4yMzAiLCJpYXQiOjE1MzY2NjgwOTR9.JzlL7dxP6LL0g3hFBfU84GqQSJ0hE2jx1om4TAj6StA -->

   
    <!-- <template  v-for="item in routes" v-if="!item.hidden&&item.children"> -->
    <!-- <div v-for="item in routes" v-if="item.children[0].urlType=='http'"> -->
  <!--     <template v-for="item in routes" v-if="!item.hidden&&item.children&&item.children[0].urlType=='http'" >
        <a v-if="item.children.length==0" :href="item.path" target="myFrameName" :key="item.index">
          <el-menu-item :index="item.path" :class="{'submenu-title-noDropdown':!isNest}">
            <i :class="'icon iconfont'+' '+item.meta.icon"></i>
            <span v-if="item.meta.title" slot="title">{{item.meta.title}}</span>
          </el-menu-item>
        </a>
        <el-submenu v-else :index="item.name||item.path" :key="item.index">
          <template slot="title">
            <i :class="'icon iconfont'+' '+item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
          <template v-for="child in item.children" v-if="!child.hidden">
            <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.index"></sidebar-item>
            <a v-else :href="child.path" target="myFrameName" :key="child.name">
              <el-menu-item :index="child.path">
                <i :class="'icon iconfont'+' '+item.meta.icon"></i>
                <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
              </el-menu-item>
            </a>
          </template>
        </el-submenu>
      </template> -->
    <!-- </div> -->
    <!-- <div v-else> -->
<!--       <template v-for="item in routes" v-if="!item.hidden&&item.children&&item.children[0].urlType=='router'">

      <router-link v-if="!item.children[0].children&&!item.alwaysShow" :to="item.path+'/'+item.children[0].path"
        :key="item.children[0].name">
        <el-menu-item :index="item.path+'/'+item.children[0].path" :class="{'submenu-title-noDropdown':!isNest}" >
          <svg-icon v-if="item.children[0].meta&&item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>
          <span v-if="item.children[0].meta&&item.children[0].meta.title" slot="title"></span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name||item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title" slot="title"></span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>

          <router-link v-else :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title" slot="title"></span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template> -->
    <!-- </div> -->
  </div>
</template>
<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // items:
    }
  },
  created() {
    for (let i = 0; i < this.routes.length; i++) {
      if (this.routes[i].children.length === 0) {
        this.routes[i].alwaysShow = false
      }
    }
  },
  methods: {
    childFn() {
      this.$router.push({
        path: '/'
      })
      // alert('111');
    },
    hasKey(item) {
      console.log(item)
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    }
  }
}

</script>
