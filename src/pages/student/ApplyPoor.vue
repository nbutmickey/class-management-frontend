<template>
  <div>
  <el-steps :active="active" align-center :process-status="process" finish-status="success">
    <el-step title="提交申请表"></el-step>
    <el-step title="班主任审核"></el-step>
    <el-step title="辅导员审核"></el-step>
  </el-steps>
    <div style="width:60%;margin:40px auto 0;padding: 10px 50px 50px 10px;background-color: rgba(103,194,58,.1);border-color: rgba(103,194,58,.2);border-radius: 4px">
      <div v-if="this.showTips===0">
      <h2 style="color:#67c23a;margin: 20px auto;text-align: center">贫困生申请书</h2>
      <el-form :model="poorApplyForm" ref="poorApplyForm" label-width="100px" size="small">
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="poorApplyForm.studentId" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="poorApplyForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="贫困等级" prop="degree">
      <el-radio-group v-model="poorApplyForm.degree" size="mini">
        <el-radio label="1" border>普通贫困</el-radio>
        <el-radio label="2" border>十分贫困</el-radio>
      </el-radio-group>
      </el-form-item>
      <el-form-item label="申请理由" prop="reason">
        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="申请理由(不少于300字)" v-model="poorApplyForm.reason">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="submitPoorApply">提交申请书</el-button>
      </el-form-item>
    </el-form>
      </div>
      <div v-if="this.showTips===1" style="text-align: center">
        <h1>您已提交申请书，请耐心等待辅导员和班主任审批！</h1>
      </div>
      <div v-else-if="this.showTips===3" style="text-align: center">
        <h1>恭喜你的贫困生申请已通过！</h1>
      </div>
      <div v-else-if="this.showTips===-2" style="text-align: center">
        <h1>很抱歉...班主任未通过你的申请，请下学期继续申请！</h1>
      </div>
      <div v-else-if="this.showTips===-3" style="text-align: center">
        <h1>很抱歉...辅导员未通过你的申请，请下学期继续申请！</h1>
      </div>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: "ApplyPoor",
        data() {
        return {
          active: 0,
          process:'finish',
          showTips:0,
          poorApplyForm:{
            studentId:'',
            name:'',
            degree:'1',
            classId:'',
            reason:''
          }
        };
      },
      computed:{
        ...mapGetters(['stuInfo','account'])
      },
      created(){
        this.poorApplyForm.studentId=this.stuInfo.studentId;
        this.poorApplyForm.classId=this.stuInfo.classId;
        this.poorApplyForm.name=this.stuInfo.name;
        this.applyPoorStep();
      },
      methods:{
          submitPoorApply:function () {
            this.$store.dispatch('ApplyPoor',this.poorApplyForm).then(res=>{
                if(res.status){
                  this.$message({
                    type:'success',
                    message:res.note
                  })
                }else{
                  this.$message({
                    type:'danger',
                    message:res.note
                  })
                }
            })
          },
          applyPoorStep:function () {
            this.$store.dispatch('PoorApplyStepById',this.account).then(res=>{
              if(res.status){
                if(res.content===-2){
                  this.active=1;
                  this.process='error';
                  this.showTips=res.content;
                }else if(res.content===-3){
                  this.active=2;
                  this.process='error';
                  this.showTips=res.content;
                }else{
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
