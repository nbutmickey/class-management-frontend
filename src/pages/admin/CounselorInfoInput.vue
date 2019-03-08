<template>
    <div class="counselor-info-container">
      <div class="counselor-info">
        <el-tabs tab-position="left" >
          <el-tab-pane label="手动录入">
            <el-form ref="counselorform" :model="counselorInfoInput" label-width="90px" size="mini" :rules="counselorInfoRules">
              <el-form-item label="工号:" prop="jobId">
                <el-input v-model="counselorInfoInput.jobId" placeholder="请输入工号"></el-input>
              </el-form-item>
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="counselorInfoInput.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="所属学院:" prop="collegeId">
                <el-select v-model="counselorInfoInput.collegeId" placeholder="请选择学院" @change="getclassinfo">
                  <el-option
                    v-for="item in collegeOptions"
                    :key="item.collegeId"
                    :label="item.collegeName"
                    :value="item.collegeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="管理班级:" prop="classId">
                <el-select v-model="counselorInfoInput.classId" multiple placeholder="请选择班级">
                  <el-option
                    v-for="item in classOptions"
                    :key="item.classId"
                    :label="item.className"
                    :value="item.classId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="submitcounselorinfo('counselorform')">提交信息</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="Excel批量导入">
            <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload"/>
            <h4 style="text-align: center;">以下是需要上传的表格数据</h4>
            <el-table :data="tableData" background style="width: 100%;margin-top: 20px">
              <el-table-column v-for="item in tableHeader" :prop="item" :label="item" :key="item"></el-table-column>
            </el-table>
            <el-button @click="submitexcelcouninfo" style="width: 100%;margin-top: 20px" type="primary">上传数据<i class="el-icon-upload el-icon--right"></i></el-button>
          </el-tab-pane>
          <el-tab-pane label="辅导员信息">

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
          this.$store.dispatch('CheckRepeat',{value:value,type:'counselor'}).then((res)=>{
            if(res.status){
              callback();
            }else{
              callback(new Error(res.note));
            }
          })
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
          counselorInfoInput:{
            jobId:'',
            name:'',
            collegeId:'',
            classId:[]
          },
          counselorInfoRules:{
            jobId:[{required:true,trigger:'blur',validator:validateJobId2},{required:true,trigger:'blur',validator:validateJobId}],
            name:[{required:true,trigger:'blur',message:'姓名不能为空'}],
            collegeId:[{required:true,trigger:'changed',message:'学院不能为空'}],
            classId:[{required:true,trigger:'changed',message:'班级不能为空'}]
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
            this.classOptions=res.content;
          })
        },
        getcollegeinfo:function () {
          this.$store.dispatch('GetCollegeInfo').then((res)=>{
            this.collegeOptions=res.content;
          })
        },
        submitcounselorinfo:function(formName){
          //console.log(this.counselorInfoInput);
          this.$refs[formName].validate(valid=>{
          if(valid){
            this.$store.dispatch('SubmitInfo',{info:this.counselorInfoInput,type:'counselor'}).then((res)=>{
              if(res.status){
                this.$message.success(res.note);
                this.$refs['counselorform'].resetFields();
              }else{
                this.$message.error(res.note);
              }
            })
          } else{
            return false;
          }
          })

        },
        submitexcelcouninfo:function () {
          let counselorInfo={
            multipleInfo:[],
          };
          counselorInfo.multipleInfo=this.tableData.map(function (item) {
            return {jobId:item.jobId,name:item.name,collegeId:item.collegeId,classList:item.classList.split('/')}
          });

          this.$store.dispatch('SubmitExcelInfo',{info:counselorInfo.multipleInfo,type:'counselor'}).then(res=>{
            if(res.status){
              this.$message({
                message:res.note,
                type:'success'
              })
              this.tableData=[];
              this.tableHeader=[];
            }else{
              this.$message({
                message:res.note,
                type:'error'
              })
            }
          })
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

