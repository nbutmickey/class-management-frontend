<template>
  <div>
    <el-steps :active="active" align-center finish-status="success" :process-status="process">
      <el-step title="提交申请表"></el-step>
      <el-step title="管理员审核"></el-step>
    </el-steps>
    <div style="width:60%;margin:40px auto 0;padding: 10px 50px 50px 10px;background-color: rgba(103,194,58,.1);border-color: rgba(103,194,58,.2);border-radius: 4px">
      <div v-if="this.showTips===0">
      <h2 style="color:#67c23a;margin: 20px auto;text-align: center">寝室长申请书</h2>
      <el-form :model="chiefApplyForm" ref="chiefApplyForm" label-width="100px" size="small">
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="chiefApplyForm.studentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="chiefApplyForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="楼号" prop="buildId" >
          <el-input v-model="chiefApplyForm.buildId" disabled></el-input>
        </el-form-item>
        <el-form-item label="寝室号" prop="bedRoomId" >
          <el-input v-model="chiefApplyForm.bedRoomId" disabled></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submitChiefApply">提交申请书</el-button>
        </el-form-item>
      </el-form>
    </div>
      <div v-if="this.showTips===1" style="text-align: center">
        <h1>您已提交申请书，请耐心等待管理员处理！</h1>
      </div>
      <div v-if="this.showTips===2" style="text-align: center">
        <h1>恭喜你已经称为寝室长！</h1>
      </div>
      <div v-if="this.showTips===3" style="text-align: center">
        <h1>很抱歉...管理员未通过你的申请！</h1>
        <el-button type="primary" @click="repeatChiefApply">再次发起申请</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
    export default {
        name: "ApplyBedRoomChief",
        data() {
        return {
          active: 0,
          process:'finish',
          showTips:0,
          repeatApply:false,
          chiefApplyForm:{
            studentId:'',
            name:'',
            buildId:'',
            bedRoomId:'',
            repeat:false
          }
        };
      },
      created(){
          this.chiefApplyForm.studentId=this.stuInfo.studentId;
          this.chiefApplyForm.name=this.stuInfo.name;
          this.chiefApplyForm.buildId=this.stuInfo.buildId;
          this.chiefApplyForm.bedRoomId=this.stuInfo.bedRoomId;
          this.applyBedRoomStep();
      },
      computed:{
        ...mapGetters([
          'account',
          'username',
          'stuInfo'
        ])
      },
      methods:{
        submitChiefApply:function () {
          if(this.repeatApply){
            this.chiefApplyForm.repeat=true;
          }
            this.$store.dispatch('ApplyBedRoomChief',this.chiefApplyForm).then(res=>{
              if(res.status){
                //this.$refs['chiefApplyForm'].resetFields();
                this.applyBedRoomStep();
                this.$message({
                  type:'success',
                  message:res.note
                })
                this.active=1;
              }else{
                this.$message({
                  type:'warning',
                  message:res.note
                })
              }
            })
      },
        repeatChiefApply:function(){
          this.repeatApply=true;
          this.active=0;
          this.showTips=0;
          this.process='process';
        },
      applyBedRoomStep:function () {
        this.$store.dispatch('BedRoomApplyChiefStepById',this.account).then(res=>{
          if(res.status){
            if(res.content===3){
              this.active=1;
              this.showTips=res.content;
              this.process='error';
            }else{
              this.active=res.content;
              this.showTips=res.content;
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
