<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"></hamburger>
    <breadcrumb></breadcrumb>
    <div class="right-menu">
    <el-dropdown class="personal-info-container" trigger="hover">
      <div class="personal-info-wrapper">
        <span>{{username}}</span>
        <i class="el-icon-caret-bottom"></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item><svg-icon icon-class="role"/> {{roleName}}</el-dropdown-item>
        <el-dropdown-item><svg-icon icon-class="username"/> {{account}}</el-dropdown-item>
        <el-dropdown-item><svg-icon icon-class="logout" style="font-size: 20px"/><span @click="logOut">退出登录</span></el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
  import {mapGetters} from 'vuex'
  import hamburger from '../Hamburger'
  import breadcrumb from '../Breadcrumb'
  export default {
        name: "index",
        components:{hamburger,breadcrumb},
        data(){
          return {
            roleName:''
          }
        },
        created(){
          if(this.role[0]==='admin'){
            this.roleName="管理员";
          }else if(this.role[0]==='student'){
            this.roleName="学生";
          }else if(this.role[0]==='counselor'){
            this.roleName="辅导员";
          }else if(this.role[0]==='classteacher'){
            this.roleName="班主任";
          }
        },
        computed:{
          ...mapGetters([
            'sidebar',
            'account',
            'username',
            'role'
          ])
        },
        methods:{
          toggleSideBar(){
            this.$store.dispatch('ToggleSidebar');
          },
          logOut(){
            this.$store.dispatch('FedLogOut').then(()=>{
              this.$router.push({path:'/login'});
              console.log("logout");
              location.reload();
              //为了重新实例化vue-router对象，避免bug
            })
          }
        }
    }
</script>

<style scoped lang="less">
  .navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container{
      line-height: 58px;
      height: 50px;
      float: left;
      padding: 0 10px;
    }
    .right-menu {
      display: inline-block;
      float: right;
    }
  }
</style>
