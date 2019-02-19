<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="填写学生谈话记录表" name="fillRecord">
      <el-form
        :model="talkRecord"
        size="medium"
        label-width="80px"
        ref="talkRecordForm"
      >
        <el-form-item
          label="学生姓名"
          prop="studentName"
          :rules="{
            required: true,
            message: '请输入学生姓名',
            trigger: 'blur'
          }"
        >
          <el-input v-model="talkRecord.studentName"></el-input>
        </el-form-item>
        <el-form-item
          label="谈话时间"
          prop="talkTime"
          :rules="{
            required: true,
            message: '请选择谈话时间',
            trigger: 'blur'
          }"
        >
          <el-date-picker
            type="date"
            v-model="talkRecord.talkTime"
            placeholder="请选择谈话时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="主要问题"
          prop="mainProblem"
          :rules="{
            required: true,
            message: '请输入主要问题',
            trigger: 'blur'
          }"
        >
          <el-input v-model="talkRecord.mainProblem"></el-input>
        </el-form-item>
        <el-form-item
          label="问题归类"
          prop="type"
        >
          <el-checkbox-group v-model="talkRecord.types" :min="1" :max="3">
            <el-checkbox
              v-for="(item, index) in problemTypes"
              :key="index"
              :label="item.typeName"
              >{{ item.typeName }}</el-checkbox
            >
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="谈话次数">
          <el-input-number
            v-model="talkRecord.times"
            :min="0"
            :max="5"
            style="width: 10%"
          ></el-input-number
          ><span style="margin-left: 20px">次</span>
        </el-form-item>
        <el-form-item
          label="辅导意见"
          prop="kpOfCounseling"
          :rules="{
            required: true,
            message: '请输入辅导意见',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="talkRecord.kpOfCounseling"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitTalk('talkRecordForm')"
            >提交学生谈话记录表</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="学生谈话记录表" name="RecordList">
      <el-card v-for="(item,index) in talkRecordList" style="width: 45%;margin:20px 40px 20px 20px;display: inline-block" :key="index">
        <div slot="header" class="clearfix">
          <span>谈话记录表 {{index+1}}</span>
        </div>
        <el-form label-width="20px">
          <el-form-item>
            <label>学生</label>
            <span>{{item.studentName}}</span>
          </el-form-item>
          <el-form-item>
            <label>谈话时间</label>
            <span>{{TimeFormat(item.talkTime)}}</span>
          </el-form-item>
          <el-form-item>
            <label>谈话次数</label>
            <span>{{item.times}}</span>
          </el-form-item>
          <el-form-item>
            <label>问题归类</label>
            <span>{{item.types}}</span>
          </el-form-item>
          <el-form-item>
            <label>主要问题</label>
            <span>{{item.mainProblem}}</span>
          </el-form-item>
          <el-form-item>
            <label>辅导意见</label>
            <span>{{item.kpOfCounseling}}</span>
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
  name: "StuTalkRecord",
  data() {
    return {
      activeName: "fillRecord",
      talkRecordList:[],
      problemTypes: [
        { typeId: 1, typeName: "人际交往矛盾" },
        { typeId: 2, typeName: "考试焦虑" },
        { typeId: 3, typeName: "挫折" },
        { typeId: 4, typeName: "升学择业" },
        { typeId: 5, typeName: "强迫" },
        { typeId: 6, typeName: "学习压力" },
        { typeId: 7, typeName: "个性缺陷" },
        { typeId: 8, typeName: "休闲消费" },
        { typeId: 9, typeName: "恋爱问题" },
        { typeId: 11, typeName: "情绪问题" },
        { typeId: 10, typeName: "危机" },
        { typeId: 12, typeName: "其他" }
      ],
      talkRecord: {
        jobId: "",
        studentName: "",
        talkTime: "",
        mainProblem: "",
        types: [],
        times: "",
        kpOfCounseling: ""
      }
    };
  },
  created(){
    this.getTalkRecordList()
  },
  computed:{
    ...mapGetters(['account'])
  },
  mounted(){
    this.talkRecord.jobId=this.account;
  },
  methods: {
    getTalkRecordList(){
      this.$store.dispatch('StuTalkInfoList',this.account).then(res=>{
        console.log(res);
        this.talkRecordList=res.content;
      })
    },
    submitTalk(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.talkRecord.types.join(',');
          this.$store.dispatch('StudentTalkRecord',this.talkRecord).then(res=>{
            if(res.status){
              this.$notify({
                type: "success",
                message: "成功"
              });
              this.getTalkRecordList();
              this.activeName='RecordList';
              this.$refs[formName].resetFields();
            }else{
              this.$notify({
                type: "danger",
                message: res.note
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    TimeFormat:formateTime
  }
};
</script>

<style scoped>
.el-checkbox {
  margin-left: 0 !important;
  margin-right: 30px !important;
}
</style>
