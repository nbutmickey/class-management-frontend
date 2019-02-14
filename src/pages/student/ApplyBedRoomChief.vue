<template>
  <div>
    <el-steps :active="active" align-center finish-status="success" >
      <el-step title="提交申请表"></el-step>
      <el-step title="管理员审核" :status="nowStatus"></el-step>
    </el-steps>
    <div style="width:60%;margin:40px auto 0;padding: 10px 50px 50px 10px;background-color: rgba(103,194,58,.1);border-color: rgba(103,194,58,.2);border-radius: 4px">
      <h2 style="color:#67c23a;margin: 20px auto;text-align: center">寝室长申请书</h2>
      <el-form :model="chiefApplyForm" ref="chiefApplyForm" label-width="100px" size="small">
        <el-form-item label="学号" prop="studentId">
          <el-input v-model="chiefApplyForm.studentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="chiefApplyForm.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="楼号" prop="buildId" >
          <el-input v-model="chiefApplyForm.buildId"></el-input>
        </el-form-item>
        <el-form-item label="寝室号" prop="bedRoomId" >
          <el-input v-model="chiefApplyForm.bedRoomId"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" @click="submitPoorApply">提交申请书</el-button>
        </el-form-item>
      </el-form>
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
          nowStatus:'',
          chiefApplyForm:{
            studentId:'',
            name:'',
            buildId:'',
            bedRoomId:''
          }
        };
      },
      created(){
          this.chiefApplyForm.studentId=this.account;
          this.chiefApplyForm.name=this.username;
          this.applyBedRoomStep();
      },
      computed:{
        ...mapGetters([
          'account',
          'username'
        ])
      },
      methods:{
        submitPoorApply:function () {
            this.$store.dispatch('ApplyBedRoomChief',this.chiefApplyForm).then(res=>{
              if(res.status){
                this.$refs['chiefApplyForm'].resetFields();
                this.applyBedRoomStep();
                this.$message({
                  type:'success',
                  message:res.note
                })
              }else{
                this.$message({
                  type:'warning',
                  message:res.note
                })
              }
            })
      },
      applyBedRoomStep:function () {
        this.$store.dispatch('BedRoomApplyChiefStepById',this.account).then(res=>{
          if(res.status){
            if(res.content===3){
              this.active=res.content;
              this.nowStatus='error';
            }else{
              this.active=res.content;
            }
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
