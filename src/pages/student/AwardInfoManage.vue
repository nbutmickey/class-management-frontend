<template>
  <div>
    <el-card class="box-card award-item"  style="width: 30%;display: inline-block;margin: 15px 20px" v-for="(item,index) in awardInfo" :key="index">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-star-on"></i> {{item.awardName}}</span>
      </div>
      <div style="padding: 5px 0">获奖日期：{{item.awardTime}}</div>
      <div style="padding: 5px 0">颁奖单位：{{item.awardAgency}}</div>
    </el-card>
    <el-card class="box-card award-item"  style="width: 30%;display: inline-block;margin: 15px 20px" >
      <div slot="header" class="clearfix">
        <el-button type="text" icon="el-icon-plus" @click="showAddItem='true'">添加新项目</el-button>
        <el-button style="float: right" type="text" icon="el-icon-upload2" v-if="showAddItem" @click="submitItem">提交新项目</el-button>
      </div>
      <div v-if="showAddItem">
        <el-form :model="addItem" label-width="80px" size="mini" ref="addForm">
          <el-form-item label="获奖名称" prop="awardName" :rules="{required:true,message:'获奖名称不能为空',trigger:'blur'}">
            <el-input style="width: 87%" v-model="addItem.activityTopic" placeholder="请输入获奖名称" clearable ></el-input>
          </el-form-item>
          <el-form-item label="获奖日期" prop="awardTime" :rules="{required:true,message:'日期不能为空',trigger:'blur'}">
            <el-date-picker  type="date" v-model="addItem.awardTime" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="颁奖单位" prop="awardAgency" :rules="{required:true,message:'获奖单位不能为空',trigger:'blur'}">
            <el-input style="width: 87%" v-model="addItem.awardAgency" placeholder="请输入获奖单位" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "AwardInfoManage",
        data(){
          return {
            showAddItem:false,
            awardInfo:[],
            addItem:{
              studentId:'',
              awardName:'',
              awardTime:'',
              awardAgency:''
            }
          }
        },
        created(){
          this.getAwardInfo();
        },
        computed:{
        ...mapGetters([
          'account',
        ])
      },
        methods:{
          submitItem:function(){
            this.addItem.studentId=this.account;
            this.$refs['addForm'].validate(valid=>{
              if(valid){
                this.$store.dispatch('InsertAwarInfo',this.addItem).then(res=>{
                  if(res.status)
                  {
                    this.getAwardInfo();
                    this.$message({
                      type:'success',
                      message:res.note
                    })
                    this.$refs['addForm'].resetFields();
                    this.showAddItem=false;
                  }else{
                    this.$message({
                      type:'warning',
                      message:res.note
                    })
                  }
                })
              }else{
                return false;
              }
            })
          },
          getAwardInfo:function () {
            this.$store.dispatch('SingleStuAwardInfo',this.account).then(res=>{
              this.awardInfo=res.content;
            })
          }
        }
    }
</script>

<style scoped>
  .award-item{
    position: relative;
    top:-30px;
    opacity: 0;
    animation: down 0.8s 0.8s linear;
    animation-fill-mode: both;
  }
</style>
