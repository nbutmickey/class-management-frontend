<template>
  <div :class="classObj" class="app-wraper">
      <div v-if="sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
      <sidebar class="sidebar-container"></sidebar>
      <div class="main-container">
        <navbar></navbar>
        <maincontent></maincontent>
      </div>
  </div>
</template>

<script>
  import Sidebar from '@/components/SideBar'
  import Navbar from '@/components/NavBar'
  import Maincontent from '@/components/MainContent'

  export default {
        name: "index",
        components:{
          Sidebar,
          Navbar,
          Maincontent
        },
        computed:{
          sidebar(){
            return this.$store.state.app.sidebar;
          },
          classObj() {
            return {
              hideSidebar: !this.sidebar.opened,
              openSidebar: this.sidebar.opened,
              withoutAnimation: this.sidebar.withoutAnimation,
            }
          }
        },
        methods:{
          handleClickOutside(){
            this.$store.dispatch('CloseSidebar',{withoutAnimation:false})
          }
        }
    }
</script>

<style lang="less" scoped>
  .app-wrapper{
    position: relative;
    width: 100%;
    height: 100%;
    .drawer-bg {
      background: #000;
      opacity: 0.3;
      width: 100%;
      top: 0;
      height: 100%;
      position: absolute;
      z-index: 999;
    }
  }

</style>
