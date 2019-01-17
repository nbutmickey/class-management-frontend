<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <a @click.prevent="handleClick(item)">{{item.meta.title}}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
  import pathToRegep from 'path-to-regexp'
    export default {
        name: "index",
        data() {
          return {
            levelList: null
          }
        },
        watch:{
          //路由一旦变化，更新路由
          $route(){
            this.getBreadcrumb();
          }
        },
        created(){
          //页面一加载就更新路由
          this.getBreadcrumb();
        },
        methods:{
          getBreadcrumb(){
            let matched=this.$route.matched.filter((item)=>{
              if(item.name){
                return true;
              }
            })
           // const first=matched[0];
            this.levelList=matched;
          },
          pathCompile(path){
              const {params} = this.$route;
              let toPath = pathToRegep.compile(path);
              return toPath(params);
          },
          handleClick(item){
            const {redirect,path}=item;
            if(redirect){
              this.$router.push(redirect);
              return;
            }
            this.$router.push(this.pathCompile(path));
          }
        }
    }
</script>

<style scoped lang="less">
  .app-breadcrumb.el-breadcrumb{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
  }
</style>
