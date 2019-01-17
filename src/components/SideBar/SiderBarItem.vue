<template>
    <el-menu-item
      :index=item.path
    >
      <svg-icon :icon-class=item.meta.icon></svg-icon>
      <span>{{item.meta.title}}</span>
    </el-menu-item>
</template>

<script>
    import path from 'path'
    export default {
        name: "SiderBarItem",
        props:{
          item:{
            type:Object,
            default:''
          },
          // basePath:{
          //   type:String,
          //   default:''
          // }
        },
        methods:{
          // resolvePath(routePath){
          //   return path.resolve(this.basePath,routePath);
          // }
        }
    }
</script>

<style scoped>

</style>
