<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="填写学生违纪记录表" name="fillRecord">
      <el-form
        :model="violationRecord"
        size="medium"
        label-width="80px"
        ref="violationRecordForm"
      >
        <el-form-item
          label="学生姓名"
          prop="studentId"
          :rules="{
            required: true,
            message: '请输入学生姓名',
            trigger: 'blur'
          }"
        >
          <el-select v-model="violationRecord.studentId" placeholder="请选择">
            <el-option
              v-for="(item,index) in stuInfoOptions"
              :key="index"
              :label="item.name"
              :value="item.studentId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="违纪时间"
          prop="violationTime"
          :rules="{
            required: true,
            message: '请选择违纪时间',
            trigger: 'blur'
          }"
        >
          <el-date-picker
            type="date"
            v-model="violationRecord.violationTime"
            placeholder="请选择违纪时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="违纪等级"
          prop="violationDegree"
        >
          <el-radio-group v-model="violationRecord.violationDegree">
            <el-radio
              v-for="(item, index) in [1,2]"
              :key="index"
              :label="item"
            >{{ item===1?'普通违纪':'严重违纪' }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="违纪内容"
          prop="violationContent"
          :rules="{
            required: true,
            message: '请输入主要违纪内容',
            trigger: 'changed'
          }"
        >
          <el-input v-model="violationRecord.violationContent" type="textarea" :rows="4"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitTalk('violationRecordForm')"
          >提交学生违纪记录表</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="学生违纪记录表" name="RecordList">
      <el-card v-for="(item,index) in vioRecordList" style="width: 45%;margin:20px 40px 20px 20px;display: inline-block" :key="index">
        <div slot="header" class="clearfix">
          <span>违纪记录表 {{index+1}}</span>
        </div>
        <el-form label-width="20px">
          <el-form-item>
            <label>学生</label>
            <span>{{item.name}}</span>
          </el-form-item>
          <el-form-item>
            <label>违纪时间</label>
            <span>{{TimeFormat(item.violationTime)}}</span>
          </el-form-item>
          <el-form-item>
            <label>违纪等级</label>
            <span>{{item.violationDegree==='1'?'普通违纪':'严重违纪'}}</span>
          </el-form-item>
          <el-form-item>
            <label>违纪内容</label>
            <span>{{item.violationContent}}</span>
          </el-form-item>
        </el-form>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {formateTime} from "../../utils/formatDate";
    export default {
        name: "ViolationRecord",
        data(){
          return {
            activeName:'fillRecord',
            stuInfoOptions:[],
            vioRecordList:[],
            violationRecord:{
              jobId:'',
              studentId:'',
              violationDegree:1,
              violationContent:'',
              violationTime:'',
              classId:''
            }
          }
        },
      created(){
          this.violationRecord.jobId = parseInt(this.account);
          this.$store.dispatch('AllStuInfoByClass',this.account).then(res=>{
          this.stuInfoOptions=res.content;
          this.getVioRecordList();
        })
      },
      computed:{
          ...mapGetters(['account'])
        },
      methods:{
        submitTalk(formName){
          this.violationRecord.classId=this.stuInfoOptions[0].classId;
          //console.log(this.violationRecord);
          this.$refs[formName].validate((valid)=>{
            if(valid){
              this.$store.dispatch('FillViolationRecord',this.violationRecord).then(res=>{
                if(res.status){
                  this.$notify({
                    type: "success",
                    message: "成功"
                  });
                  this.getVioRecordList();
                  this.activeName='RecordList';
                  this.$refs[formName].resetFields();
                }else{
                  this.$notify({
                    type: "danger",
                    message: res.note
                  });
                }
              })
            }else{
              return false;
            }
          })
        },
        getVioRecordList(){
          this.$store.dispatch('GetViolationRecordList',this.account).then(res=>{
            this.vioRecordList=res.content;
          })
        },
        TimeFormat:formateTime
      }
    }
</script>

<style scoped>

</style>
