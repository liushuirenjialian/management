<template>
  <div class="menu-wrapper" >

    <!-- <template  v-for="item in routes" v-if="!item.hidden&&item.children"> -->
    <template  v-for="item in routes" v-if="!item.hidden&&item.children">
      <a v-if="item.children.length==0" :href="item.path" target="myFrameName" :key="item.path">
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
        <template v-for="child in item.children"  v-if="!child.hidden">
          <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>
          <a v-else :href="child.path" target="myFrameName" :key="child.name">
            <el-menu-item :index="child.path">
                <i :class="'icon iconfont'+' '+item.meta.icon"></i>
                <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
            </el-menu-item>
          </a>
        </template>
      </el-submenu>
    </template>
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