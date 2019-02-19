<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="填写检查寝室记录表" name="fillRecord">
      <el-form
        :model="checkInfo"
        size="medium"
        label-width="80px"
        ref="checkInfoForm"
      >
        <el-form-item
          label="学期"
          prop="semester"
          :rules="{
            required: true,
            message: '请选择学期',
            trigger: 'change'
          }"
        >
          <el-select v-model="checkInfo.semester">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="周次"
          prop="week"
          :rules="{
            required: true,
            message: '请选择周次',
            trigger: 'change'
          }"
        >
          <el-select v-model="checkInfo.week">
            <el-option
              v-for="(item, index) in 16"
              :key="index"
              :label="item"
              :value="item"
              >第{{ item }}周</el-option
            >
          </el-select>
        </el-form-item>
        <el-form-item
          label="时间"
          prop="time"
          :rules="{
            required: true,
            message: '请选择下寝室时间',
            trigger: 'blur'
          }"
        >
          <el-date-picker
            type="date"
            value-format="yyyy-MM-dd"
            v-model="checkInfo.time"
            placeholder="请选择下寝室时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item
          label="检查寝室"
          prop="dormitoryNames"
          :rules="{
            required: true,
            message: '请输入检查寝室',
            trigger: 'blur'
          }"
        >
          <el-input v-model="checkInfo.dormitoryNames"></el-input>
        </el-form-item>
        <el-form-item
          label="主要内容"
          prop="mainContent"
          :rules="{
            required: true,
            message: '请输入检查内容',
            trigger: 'blur'
          }"
        >
          <el-input
            v-model="checkInfo.mainContent"
            type="textarea"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCheck('checkInfoForm')"
            >提交寝室检查记录表</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="寝室检查记录表" name="RecordList">
      <el-card v-for="(item,index) in dormitoryRecordList" style="width: 45%;margin:20px 40px 20px 20px;display: inline-block" :key="index">
        <div slot="header" class="clearfix">
          <span>寝室检查记录表 {{index+1}}</span>
        </div>
        <el-form label-width="20px">
          <el-form-item>
            <label>学期</label>
            <span>{{item.semester}}</span>
          </el-form-item>
          <el-form-item>
            <label>周次</label>
            <span>{{item.week}}</span>
          </el-form-item>
          <el-form-item>
            <label>时间</label>
            <span>{{item.time}}</span>
          </el-form-item>
          <el-form-item>
            <label>寝室名单</label>
            <span>{{item.dormitoryNames}}</span>
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
  import {mapGetters} from 'vuex'
export default {
  name: "CheckDormitoryRecord",
  data() {
    return {
      activeName: "fillRecord",
      dormitoryRecordList:[],
      options: [
        "2018-2019 学年第一学期",
        "2018-2019 学年第二学期",
        "2019-2020 学年第一学期",
        "2019-2020 学年第二学期"
      ],
      checkInfo: {
        jobId: "",
        time: "",
        semester: "",
        week: "",
        dormitoryNames: "",
        mainContent: ""
      }
    };
  },
  computed:{
    ...mapGetters(['account'])
  },
  mounted(){
    this.checkInfo.jobId=this.account;
  },
  created(){
    this.getDormitoryRecordList();
  },
  methods: {
    submitCheck(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //console.log(this.checkInfo);
          this.$store.dispatch('ClassDormitoryRecord',this.checkInfo).then(res=>{
            if(res.status){
              this.$notify({
                message: "成功",
                type: "success"
              });
              this.getDormitoryRecordList();
              this.activeName='RecordList';
              this.$refs[formName].resetFields();
            }else{
              this.$notify({
                message: "失败",
                type: "danger"
              });
            }
          })
        } else {
          return false;
        }
      });
    },
    getDormitoryRecordList(){
      this.$store.dispatch('DormitoryInfoList',this.account).then(res=>{
        this.dormitoryRecordList=res.content;
      })
    }
  }
};
</script>

<style scoped></style>
