<template>
  <div>
    <el-card class="box-card activity-item"  style="width: 30%;display: inline-block;margin: 15px 20px" v-for="(item,index) in activity" :key="index">
      <div slot="header" class="clearfix">
        <span><i class="el-icon-location-outline"></i> {{item.activityTopic}}</span>
      </div>
      <div style="padding: 5px 0">活动日期：{{item.activityTime}}</div>
      <div style="padding: 5px 0">活动地点：{{item.activityAddr}}</div>
      <div style="padding: 5px 0">活动内容：{{item.activityContent}}</div>
    </el-card>
    <el-card class="box-card award-item"  style="width: 30%;display: inline-block;margin: 15px 20px" >
      <div slot="header" class="clearfix">
        <el-button type="text" icon="el-icon-plus" @click="showAddItem='true'">添加新项目</el-button>
        <el-button style="float: right" type="text" icon="el-icon-upload2" v-if="showAddItem" @click="submitItem">提交新项目</el-button>
      </div>
      <div v-if="showAddItem">
        <el-form :model="addItem" label-width="80px" size="mini" ref="addForm">
          <el-form-item label="活动主题" prop="activityTopic" :rules="{required:true,message:'活动主题不能为空',trigger:'blur'}">
            <el-input style="width: 87%" v-model="addItem.activityTopic" placeholder="请输入活动主题" clearable ></el-input>
          </el-form-item>
          <el-form-item label="活动日期" prop="activityTime" :rules="{required:true,message:'日期不能为空',trigger:'blur'}">
            <el-date-picker  type="date" v-model="addItem.activityTime" value-format="yyyy-MM-dd" placeholder="选择日期" clearable></el-date-picker>
          </el-form-item>
          <el-form-item label="活动地点" prop="activityAddr" :rules="{required:true,message:'活动地点不能为空',trigger:'blur'}">
            <el-input style="width: 87%" v-model="addItem.activityAddr" placeholder="请输入活动地点" clearable></el-input>
          </el-form-item>
          <el-form-item label="活动内容" prop="activityContent" :rules="{required:true,message:'活动内容不能为空',trigger:'blur'}">
            <el-input type="textarea"  style="width: 87%" v-model="addItem.activityContent" placeholder="请输入活动内容"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "ActivityInfoManage",
        data(){
          return {
            showAddItem:false,
            activity:[],
            addItem:{
              studentId:'',
              activityTopic:'',
              activityTime:'',
              activityContent:'',
              activityAddr:''
            }
          }
        },
        created(){
          this.getActivityInfo();
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
                this.$store.dispatch('InsertActivityInfo',this.addItem).then((res)=>{
                  if(res.status){
                    this.getActivityInfo();
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
          getActivityInfo:function () {
            this.$store.dispatch('singleStuActivityInfo',this.account).then(res=>{
              this.activity=res.content;
            })
          }
        }
    }
</script>

<style scoped>
  .activity-item{
    position: relative;
    top:-30px;
    opacity: 0;
    animation: down 0.8s 0.8s linear;
    animation-fill-mode: both;
  }
</style>
