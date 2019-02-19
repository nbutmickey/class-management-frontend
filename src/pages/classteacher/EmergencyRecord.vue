<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="填写突发事件记录表" name="fillRecord">
      <el-form
        :model="emergencyInfo"
        size="medium"
        label-width="80px"
        ref="emergencyInfoForm"
      >
        <el-form-item
          label="事件名称"
          prop="eventName"
          :rules="{
            required: true,
            message: '请输入事件名称',
            trigger: 'blur'
          }"
        >
          <el-input v-model="emergencyInfo.eventName"></el-input>
        </el-form-item>
        <el-form-item
          label="事发时间"
          prop="time"
          :rules="{
            required: true,
            message: '请输入事发时间',
            trigger: 'blur'
          }"
        >
          <el-date-picker
            type="date"
            v-model="emergencyInfo.time"
            placeholder="请选择事发时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="事发地点"
          prop="addr"
          :rules="{
            required: true,
            message: '请输入事发地点',
            trigger: 'blur'
          }"
        >
          <el-input v-model="emergencyInfo.addr"></el-input>
        </el-form-item>
        <el-form-item
          label="参与学生"
          prop="studentNames"
          :rules="{
            required: true,
            message: '请输入参与学生',
            trigger: 'blur'
          }"
        >
          <el-input v-model="emergencyInfo.studentNames"></el-input>
        </el-form-item>
        <el-form-item
          label="具体情况"
          prop="mainContent"
          :rules="{
            required: true,
            message: '请输入具体情况',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="emergencyInfo.mainContent"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否解决">
          <el-radio-group v-model="emergencyInfo.result">
            <el-radio label="未解决">未解决</el-radio>
            <el-radio label="已解决">已解决</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="解决方案"
          v-if="emergencyInfo.result === '已解决'"
          prop="solve"
          :rules="{
            required: true,
            message: '请输入解决方案',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="emergencyInfo.solve"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitEmergency('emergencyInfoForm')"
            >提交紧急情况记录表</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="突发事件记录表" name="RecordList">
      <el-card v-for="(item,index) in emergencyRecordList" style="width: 45%;margin:20px 40px 20px 20px;display: inline-block" :key="index">
        <div slot="header" class="clearfix">
          <span>突发事件记录表 {{index+1}}</span>
        </div>
        <el-form label-width="20px">
          <el-form-item>
            <label>事件名称</label>
            <span>{{item.eventName}}</span>
          </el-form-item>
          <el-form-item>
            <label>发生时间</label>
            <span>{{TimeFormat(item.time)}}</span>
          </el-form-item>
          <el-form-item>
            <label>涉事地点</label>
            <span>{{item.addr}}</span>
          </el-form-item>
          <el-form-item>
            <label>涉事学生</label>
            <span>{{item.studentNames}}</span>
          </el-form-item>
          <el-form-item>
          <label>主要内容</label>
          <span>{{item.mainContent}}</span>
        </el-form-item>
          <el-form-item>
            <label>是否解决</label>
            <span>{{item.result}}</span>
          </el-form-item>
          <el-form-item>
            <label>解决方案</label>
            <span>{{item.solve}}</span>
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
  name: "EmergencyRecord",
  data() {
    return {
      activeName: "fillRecord",
      emergencyRecordList:[],
      emergencyInfo: {
        jobId: "",
        eventName: "",
        time: "",
        addr: "",
        mainContent: "",
        studentNames: "",
        solve: "",
        result: "未解决"
      }
    };
  },
  computed:{
    ...mapGetters(['account'])
  },
  mounted(){
    this.emergencyInfo.jobId=this.account;
  },
  created(){
    this.getEmergencyRecordList();
  },
  methods: {
    submitEmergency(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$store.dispatch('EmergencyInfo',this.emergencyInfo).then(res=>{
            if(res.status){
              this.$notify({
                message: "成功",
                type: "success"
              });
              this.getEmergencyRecordList();
              this.activeName='RecordList';
              this.$refs[formName].resetFields();
            }else{
              this.$notify({
                message: res.note,
                type: "danger"
              });
            }
          })

        } else {
          return false;
        }
      });
    },
    getEmergencyRecordList(){
      this.$store.dispatch('EmergencyInfoList',this.account).then(res=>{
        this.emergencyRecordList=res.content;
      })
    },
    TimeFormat:formateTime
  }
};
</script>

<style scoped></style>
