<template>
  <div>
  <el-steps :active="active" align-center finish-status="success">
    <el-step title="已提交申请表单"></el-step>
    <el-step title="班主任审核通过"></el-step>
    <el-step title="辅导员审核通过"></el-step>
  </el-steps>
    <div style="width:60%;margin:40px auto 0;padding: 10px 50px 50px 10px;background-color: rgba(103,194,58,.1);border-color: rgba(103,194,58,.2);border-radius: 4px">
      <h2 style="color:#67c23a;margin: 20px auto;text-align: center">贫困生申请书</h2>
      <el-form :model="poorApplyForm" ref="poorApplyForm" label-width="100px" size="small">
      <el-form-item label="学号" prop="studentId">
        <el-input v-model="poorApplyForm.studentId" disabled></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="poorApplyForm.name"></el-input>
      </el-form-item>
      <el-form-item label="班级" prop="classId" >
        <el-input v-model="poorApplyForm.classId" disabled></el-input>
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
  </div>
</template>

<script>
    export default {
        name: "ApplyPoor",
        data() {
        return {
          active: 1,
          poorApplyForm:{
            studentId:'',
            name:'',
            degree:'',
            classId:'',
            reason:''
          }
        };
      },
      methods:{
          submitPoorApply:function () {
            this.$store.dispatch('ApplyPoor',this.poorApplyForm).then(res=>{

            })
          }
      }
    }
</script>

<style scoped>

</style>
