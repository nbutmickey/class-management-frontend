<template>
  <el-scrollbar  wrap-class="scrollbar-wrapper" style="height: 100%;">
      <el-menu
        :collapse="isCollapse"
        :default-active="$route.path"
        mode="vertical"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        router
      >
        <sider-bar-item v-for="route in permission_routers[1].children" :key="route.path" :item="route" ></sider-bar-item>
      </el-menu>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import SiderBarItem from './SiderBarItem'
    export default {
        name: "index",
        components:{SiderBarItem},
        computed:{
          ...mapGetters([
            'permission_routers',//指的是静态路由+动态路由
            'sidebar'
          ]),
          isCollapse(){
            return !this.sidebar.opened;
          }
        }
    }
</script>

<style lang="less" scoped >
</style>
