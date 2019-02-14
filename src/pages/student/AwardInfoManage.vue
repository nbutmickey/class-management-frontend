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
        <div style="padding: 5px 0">获奖名称：<el-input size="mini" style="width: 68%"  v-model="addItem.awardName" placeholder="请输入获奖名称"></el-input></div>
        <div style="padding: 5px 0">获奖日期：<el-date-picker size="mini" type="date" value-format="yyyy-MM-dd" v-model="addItem.awardTime" placeholder="选择日期"></el-date-picker></div>
      <div style="padding: 5px 0">颁奖单位：<el-input size="mini" style="width: 68%" v-model="addItem.awardAgency" placeholder="请输入颁奖单位" clearable></el-input></div>
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
            this.$store.dispatch('InsertAwarInfo',this.addItem).then(res=>{
              if(res.status)
              {
                this.getAwardInfo();
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
