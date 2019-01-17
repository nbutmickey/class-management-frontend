<template>
    <div class="counselor-info-container">
      <div class="counselor-info">
        <el-tabs tab-position="left" >
          <el-tab-pane label="手动录入">
            <el-form ref="teacherform" :model="teacherInfoInput" label-width="80px" size="mini" :rules="teacherInfoRules">
              <el-form-item label="工号:" prop="jobId">
                <el-input v-model="teacherInfoInput.jobId" placeholder="请输入工号"></el-input>
              </el-form-item>
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="teacherInfoInput.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="密码:" prop="pwd">
                <el-input v-model="teacherInfoInput.pwd"  placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item label="所属学院:" prop="collegeId">
                <el-select v-model="teacherInfoInput.collegeId" placeholder="请选择学院" @change="getclassinfo">
                  <el-option
                    v-for="item in collegeOptions"
                    :key="item.collegeId"
                    :label="item.collegeName"
                    :value="item.collegeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="管理班级:" prop="classId">
                <el-select v-model="teacherInfoInput.classId" multiple placeholder="请选择班级">
                  <el-option
                    v-for="item in classOptions"
                    :key="item.classId"
                    :label="item.className"
                    :value="item.classId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="submitstuinfo">提交信息</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Excel批量导入">
            <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload"/>
            <h4 style="text-align: center;">以下是需要上传的表格数据</h4>
            <el-table :data="tableData" border highlight-current-row style="width: 100%;margin-top: 20px">
              <el-table-column v-for="item in tableHeader" :prop="item" :label="item" :key="item"></el-table-column>
            </el-table>
            <el-button @click="submitexcelstuinfo" style="width: 100%;margin-top: 20px" type="primary">上传数据<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-tab-pane>
        </el-tabs>
      </div>

    </div>
  </template>

  <script>
    import uploadExcel from '../../components/UploadExcel'
    export default {
      name: "ClassTeacherInfoInput",
      components:{uploadExcel},
      data(){
        const validateJobId=(rule,value,callback)=>{
          // this.$store.dispatch('CheckRepeatStudent',value).then((res)=>{
          //   if(res.success){
          //     callback();
          //   }else{
          //     callback(new Error(res.message));
          //   }
          // })
        }
        const validateJobId2=(rule,value,callback)=>{
          if(!Number.parseInt(value)){
            callback(new Error("教工号必须为数字"));
          }else if(value.length!=10){
            callback(new Error("教工号必须为10位"));
          }else{
            callback();
          }
        }
        return {
          teacherInfoInput:{
            jobId:'',
            name:'',
            pwd:'',
            collegeId:'',
            classId:''
          },
          teacherInfoRules:{
            jobId:[{required:true,trigger:'blur',validator:validateJobId2},{required:true,trigger:'blur',validator:validateJobId}]
          },
          classOptions:[],
          collegeOptions:[],
          tableData:[],
          tableHeader:[]
        }
      },
      created(){
        this.getcollegeinfo();
      },
      methods:{
        getclassinfo:function (collegeId) {
          this.$store.dispatch('GetClassInfo',collegeId).then((res)=>{
            this.classOptions=res.data;
          })
        },
        getcollegeinfo:function () {
          this.$store.dispatch('GetCollegeInfo').then((res)=>{
            this.collegeOptions=res.data;
          })
        },
        submitstuinfo:function(){

        },
        submitexcelstuinfo:function () {

        },
        beforeUpload(file){
          const isLt1M=file.size/1024/1024<1;
          if(isLt1M){
            return true;
          }
          this.$message({
            message:'上传的文件不能大于1MB',
            type:'warning'
          })
          return false;
        },
        handleSuccess({results,header}){
          this.tableData=results;
          this.tableHeader=header;
        }
      }
    }
  </script>

  <style scoped lang="less">
    .teacher-info-container {
      display: flex;
    }
    .teacher-info{
      width: 100%;
    }
  </style>

