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
        <div style="padding: 5px 0">活动主题：<el-input size="mini"   style="width: 68%" v-model="addItem.activityTopic" placeholder="请输入活动主题" ></el-input></div>
        <div style="padding: 5px 0">活动日期：<el-date-picker size="mini" type="date" v-model="addItem.activityTime" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker></div>
        <div style="padding: 5px 0">活动地点：<el-input size="mini" style="width: 68%" v-model="addItem.activityAddr" placeholder="请输入活动地点" clearable></el-input></div>
        <div style="padding: 5px 0">活动内容：<el-input size="mini" type="textarea"  style="width: 68%" v-model="addItem.activityContent" placeholder="请输入活动内容" ></el-input></div>
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
            this.$store.dispatch('InsertActivityInfo',this.addItem).then((res)=>{
              if(res.status){
                this.getActivityInfo();
                this.$message({
                  type:'success',
                  message:res.note
                })
                this.showAddItem=false;
              }else{
                this.$message({
                  type:'warning',
                  message:res.note
                })
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
