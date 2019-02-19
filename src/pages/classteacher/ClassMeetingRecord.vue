<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="填写班会记录" name="fillRecord">
      <el-form
        :model="meetingInfo"
        size="medium"
        label-width="80px"
        ref="meetingInfoForm"
      >
        <el-form-item
          label="班会主题"
          prop="theme"
          :rules="{
            required: true,
            message: '请选择班会主题',
            trigger: 'change'
          }"
        >
          <el-input v-model="meetingInfo.theme"></el-input>
        </el-form-item>
        <el-form-item
          label="时间"
          prop="time"
          :rules="{
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }"
        >
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            v-model="meetingInfo.time"
            placeholder="请选择班会时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="地点"
          prop="addr"
          :rules="{
            required: true,
            message: '请输入班会地址',
            trigger: 'blur'
          }"
        >
          <el-input v-model="meetingInfo.addr"></el-input>
        </el-form-item>
        <el-form-item
          label="参与人数"
        >
          <el-input-number
            v-model="meetingInfo.participateNumber"
            :min="1"
            :max="50"
            style="width: 10%"
          ></el-input-number
          ><span style="margin-left: 20px">人</span>
        </el-form-item>
        <el-form-item
          label="主要内容"
          prop="mainContent"
          :rules="{
            required: true,
            message: '主要内容不为空',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="meetingInfo.mainContent"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitMeeting('meetingInfoForm')"
            >提交班会记录表</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="班会记录表" name="RecordList">
      <el-card v-for="(item,index) in classMeetingRecordList" style="width: 45%;margin:20px 40px 20px 20px;display: inline-block" :key="index">
        <div slot="header" class="clearfix">
          <span>班会记录表 {{index+1}}</span>
        </div>
        <el-form label-width="20px">
          <el-form-item>
            <label>班会主题</label>
            <span>{{item.theme}}</span>
          </el-form-item>
          <el-form-item>
            <label>班会时间</label>
            <span>{{TimeFormat(item.time)}}</span>
          </el-form-item>
          <el-form-item>
            <label>班会地址</label>
            <span>{{item.addr}}</span>
          </el-form-item>
          <el-form-item>
            <label>参与人数</label>
            <span>{{item.participateNumber}}</span>
          </el-form-item>
          <el-form-item>
            <label>主要内容</label>
            <span>{{item.mainContent}}</span>
          </el-form-item>
        </el-form>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import {formateTime} from "../../utils/formatDate";
  import {mapGetters} from 'vuex'
export default {
  name: "ClassMeetingRecord",
  data() {
    return {
      activeName: "fillRecord",
      classMeetingRecordList:[],
      meetingInfo: {
        jobId: "",
        theme: "",
        participateNumber: "",
        mainContent: "",
        addr: "",
        time: ""
      }
    };
  },
  computed:{
    ...mapGetters(['account'])
  },
  mounted(){
    this.meetingInfo.jobId=this.account;
  },
  created(){
    this.getClassMeetingRecordList();
  },
  methods: {
    submitMeeting(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
         this.$store.dispatch('ClassmeetingInfo',this.meetingInfo).then(res=>{
           if(res.status){
             this.$notify({
               type:'success',
               message:'提交成功'
             })
             this.getClassMeetingRecordList();
             this.activeName='RecordList';
             this.$refs[formName].resetFields();
           }else {
             this.$notify({
               type:'danger',
               message:res.note
             })
           }
         })
        } else {
          return false;
        }
      });
    },
    getClassMeetingRecordList(){
      this.$store.dispatch('ClassMeetingInfoList',this.account).then(res=>{
        this.classMeetingRecordList=res.content
      })
    },
    TimeFormat:formateTime
  }
};
</script>

<style scoped></style>
