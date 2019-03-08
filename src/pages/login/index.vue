<template>
    <div style="padding: 10px 50px 50px 50px">
      <div class="header">
        <svg-icon icon-class="banjiguanli"/>
        <span>班级信息管理服务平台</span>
      </div>
      <div class="container">
        <div class="container-left"></div>
        <div class="container-right">
          <h3 style="margin-left: 30px">用户登录</h3>
          <el-form
            ref="loginForm"
            :model="loginInfo"
            size="mini"
            label-width="80px"
            :rules="loginRules"
            status-icon
          >
            <el-form-item label="账号:" prop="username">
              <el-input v-model="loginInfo.username" name="username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
              <el-input v-model="loginInfo.password" type="password" name="password"></el-input>
            </el-form-item>
            <el-form-item label="身份:" prop="role">
              <el-radio-group v-model="loginInfo.role">
                <el-radio border label="student" >学生</el-radio>
                <el-radio border label="classteacher" >班主任</el-radio>
                <el-radio border label="counselor" >辅导员</el-radio>
                <el-radio border label="admin" >管理员</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button :loading="loading" style="width: 100%" type="primary" size="medium" @click="login('loginForm')">立即登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "index",
        computed:{
          ...mapGetters([
            'role',
            'token'
          ])
        },
        data(){
          const validateUsername=(rule,value,callback)=>{
            if(!value){
              callback(new Error("账户不能为空！"));
            }else {
              callback();
             }
            }
          const validatePassword=(rule,value,callback)=>{
            if(!value){
              callback(new Error("密码不能为空！"));
            }else{
              callback();
            }
          }
          const validateType=(rule,value,callback)=>{
            if(!value){
              callback(new Error("请选择一个身份！"));
            }else{
              callback();
            }
          }
          return {
            loading:false,
            statusIcon:true,
            loginInfo:{
              username:'',
              password:'',
              role:''
            },
            loginRules:{
              username:[{required:true,trigger:'blur',validator:validateUsername}],
              password:[{required:true,trigger:'blur',validator:validatePassword}],
              role:[{required:true,trigger:'blur',validator:validateType}]
            }
          }
        },
        methods:{
          login:function (formName) {
            this.$refs[formName].validate(valid=>{
              if(valid){
                this.loading=true;
                this.$store.dispatch('LoginByRole',this.loginInfo).then((mes)=>{
                      this.$notify({
                        title: '成功',
                        message: mes,
                        type: 'success'
                      });
                  this.$router.push({ path: this.redirect || '/' });
                  },(mes)=>{
                      this.$notify({
                        title: '失败',
                        message: mes,
                        type: 'error'
                      });
                      this.loading=false;
                })
              }else{
                return false;
              }
            })

          },
        }
    }
</script>

<style scoped lang="less">

    .header{
      display: flex;
      align-items: center;
      font-size: 30px;
      letter-spacing: 2px;
      color: #337ab7;
      span{
        margin-left: 5px;
      }
    }
    .container{
      display: flex;
      margin: 20px 0 0 0;
      padding: 10px 10px 10px 10px;
      border: 2px solid #d0d0d0;
      border-radius: 2px;
      &-left{
        width: 60%;
        height: 300px;
        background: url('../../assets/images/login-left.jpg') center center no-repeat;
        background-size: cover;
      }
      &-right{
        width: 40%;
        padding: 0 20px 10px 20px;

      }
    }

</style>
