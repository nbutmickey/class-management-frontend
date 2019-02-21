<template>
  <div>
    <transition name="fade-transform" mode="out-in" v-if="showForm">
      <el-form
        ref="schemeForm"
        :model="scheme"
        label-width="80px"
        size="medium"
      >
        <el-form-item
          label="选择学期"
          prop="semester"
          :rules="{
            required: true, message: '请选择学期', trigger: 'change'
          }"
        >
          <el-select v-model="scheme.semester" :disabled="isDisabled">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="工作内容"
        prop="content"
        :rules="{required:true,message:'工作计划不能为空',trigger:'blur'}"
        >
          <el-input
            type="textarea"
            v-model="scheme.content"
            :rows="4"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="isLoading" @click="submitScheme('schemeForm')"
            >提交工作计划</el-button
          >
        </el-form-item>
      </el-form>
    </transition>

    <!--工作计划展示界面-->
    <transition name="fade-transform" mode="out-in" v-else>
      <div style="width: 80%;margin: 0 auto">
        <div class="schemeDisplay">
          <h1 class="schemeDisplay-header">{{ schemeInfo.semester }}</h1>
          <div class="schemeDisplay-body">
            <h3>-- 详细内容 --</h3>
            <p
              class="schemeDisplay-body-content"
              v-html="schemeInfo.content"
            ></p>
          </div>
        </div>
        <el-button
          type="warning"
          style="width: 100%;margin-top: 20px"
          @click="updateScheme"
          >修改工作计划</el-button
        >
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  name: "WorkPlanSet",
  computed: {
    ...mapGetters(["account", "schemeInfo"])
  },
  data() {
    return {
      showForm: true,
      isLoading:false,
      isDisabled:false,
      options: [
        "2018-2019 学年第一学期",
        "2018-2019 学年第二学期",
        "2019-2020 学年第一学期",
        "2019-2020 学年第二学期"
      ],
      scheme: {
        jobId: "",
        semester: "",
        content: "",
        update:false
      }
    };
  },
  methods: {
    ...mapMutations({
      setScheme: "SET_SCHEME"
    }),
    submitScheme: function(formName) {
      //验证表单
      this.$refs[formName].validate(valid => {
        if (valid) {
          //this.isLoading=true;
          this.scheme.jobId = this.account;
          this.schemeInfo.jobId = this.scheme.jobId;
          this.schemeInfo.semester = this.scheme.semester;
          //利用正则表达式将文本框中的换行符替换成html中的<br/>标签以便存入数据库和最后展示
          this.schemeInfo.content = this.scheme.content
            .replace(/\r\n/g, "<br/>")
            .replace(/\n/g, "<br/>")
            .replace(/\s/g, " ");
          //向后端发起请求存储工作计划
          this.schemeInfo.update=this.scheme.update;
          this.$store.dispatch('ClassTeacherScheme',this.schemeInfo).then(res=>{
            if(res.status){
              this.$message({
                type:'success',
                message:'成功!'
              })
              //将工作计划存入store中，以便展示的时候使用
              this.setScheme(this.schemeInfo);
              this.showForm = false;
              //清空表单
              this.$refs[formName].resetFields();
            }else{
              this.$message({
                type:'danger',
                message:'失败!'
              })
            }
          })
        } else {
          return false;
        }
      });
    },
    updateScheme: function() {
      //let fields = this.$refs['schemeForm'].fields;
      //console.log(fields);
      this.showForm = true;
      this.scheme.update=true;
      this.isDisabled=true;
      this.scheme.semester=this.schemeInfo.semester;
      this.scheme.content=this.schemeInfo.content.replace("<br/>",'\r\n').replace("<br/>",'\n').replace("<br/>",'\s');
    }
  }
};
</script>

<style scoped lang="less">
.schemeDisplay {
  border: 1px darkgray dotted;
  .schemeDisplay-header {
    margin: 0;
    padding: 10px 0;
    text-align: center;
    border-bottom: 1px darkgray dotted;
  }
  .schemeDisplay-body {
    width: 100%;
    margin: 0 auto;
    h3 {
      margin: 0;
      background-color: #42b983;
      border-bottom: 1px darkgray dotted;
      padding: 10px 0;
      text-align: center;
    }
    .schemeDisplay-body-content {
      padding: 10px 50px;
    }
  }
}
</style>
