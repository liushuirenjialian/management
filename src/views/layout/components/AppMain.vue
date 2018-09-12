<template>
  <!-- content begin -->
  <section class="app-main">
    <transition name="fade" mode="out-in">
        <!-- <breadcrumb class="bread"></breadcrumb> -->
     <!--    <iframe id="myFrameId" name="myFrameName" scrolling="no" frameborder="0" style="width:100%;"></iframe> -->
      <router-view></router-view>
     <!--  <router-view>
        
      </router-view> -->
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
