<template>
  <div class="stu-info-container">
    <div class="stu-info">
      <el-tabs tab-position="left" >
        <el-tab-pane label="手动录入">
            <el-form ref="stuform" :model="stuInfoInput" label-width="80px" size="mini" :rules="stuInfoRules">
                <el-form-item label="学号:" prop="studentId">
                  <el-input v-model="stuInfoInput.studentId" placeholder="请输入学号"></el-input>
                </el-form-item>
              <el-form-item label="姓名:" prop="name">
                <el-input v-model="stuInfoInput.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="性别:" prop="sex">
                <el-radio-group v-model="stuInfoInput.sex" size="medium">
                  <el-radio  label="男"></el-radio>
                  <el-radio  label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="学院:" prop="collegeId">
                <el-select v-model="stuInfoInput.collegeId" placeholder="请选择学院" @change="getclassinfo">
                  <el-option
                    v-for="item in collegeOptions"
                    :key="item.collegeId"
                    :label="item.collegeName"
                    :value="item.collegeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级:" prop="classId">
                <el-select v-model="stuInfoInput.classId" placeholder="请选择班级">
                  <el-option
                    v-for="item in classOptions"
                    :key="item.classId"
                    :label="item.className"
                    :value="item.classId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="籍贯:" prop="birthplace">
                <el-cascader
                  placeholder="请选择籍贯"
                  v-model="birthplace"
                  :options="cityOptions"
                  :props="props"
                  change-on-select
                ></el-cascader>
              </el-form-item>
              <el-form-item label="出生日期:" prop="birthday">
              <el-date-picker
                v-model="stuInfoInput.birthday"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="请选择出生日期">
              </el-date-picker>
            </el-form-item>
              <el-form-item label="政治面貌:" prop="partySituation">
                <el-select v-model="stuInfoInput.partySituation" placeholder="请选择政治面貌">
                  <el-option
                    v-for="item in partySituationOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="班级职务:" prop="position">
                <el-select v-model="stuInfoInput.position" placeholder="请选择班级职务">
                  <el-option
                    v-for="item in classPositionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联系方式:" prop="contact">
                <el-input v-model="stuInfoInput.contact" placeholder="请输入联系方式"></el-input>
              </el-form-item>
              <el-form-item label="其他补充:" prop="other">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4}"
                  placeholder="请输入内容"
                  v-model="stuInfoInput.other">
                </el-input>
              </el-form-item>
              <el-form-item size="large">
                <el-button type="primary" @click="submitstuinfo">提交信息</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="Excel批量导入">
            <upload-excel :on-success="handleSuccess" :before-upload="beforeUpload"/>
            <h4 style="text-align: center;">以下是需要上传的表格数据</h4>
            <el-table :data="tableData" background  style="width: 100%;margin-top: 20px">
              <el-table-column v-for="item in tableHeader" :prop="item" :label="item" :key="item"></el-table-column>
            </el-table>
            <el-button @click="submitexcelstuinfo" style="width: 100%;margin-top: 20px" type="primary">上传数据<i class="el-icon-upload el-icon--right"></i></el-button>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import cityOptions from '../../utils/cityOptions'
  import classPositionOptions from '../../utils/classPositionOptions'
  import uploadExcel from '../../components/UploadExcel'
  import partySituationOptions from '../../utils/partySituationOptions'
    export default {
        name: "StuInfoInput",
        components:{uploadExcel},
        mounted(){
          this.cityOptions=cityOptions;
          this.classPositionOptions=classPositionOptions;
          this.partySituationOptions=partySituationOptions;
        },
        data(){
          const validateStudentId=(rule,value,callback)=>{
            this.$store.dispatch('CheckRepeat',{value:value,type:'student'}).then((res)=>{
                  if(res.status){
                       callback();
                  }else{
                    callback(new Error(res.note));
                  }
            })
            }
            const validateStudentId2=(rule,value,callback)=>{
                if(!Number.parseInt(value)){
                  callback(new Error("学生学号必须为数字"));
                }else if(value.length!=10){
                  callback(new Error("学生学号必须为10位"));
                }else{
                  callback();
                }
            }
          return {
            closeable:false,
            tableData:[],
            tableHeader:[],
            //班级职务
            classPositionOptions:[],
            //政治面貌
            partySituationOptions:[],
            //城市选择器级联选项
            props:{
              value: 'name',
              label:'name',
              children: 'cities'
            },
            //城市选择器
            cityOptions:[],
            //班级选择器
            classOptions:[],
            //学院选择器
            collegeOptions:[],
            birthplace:[],
            stuInfoRules:{
              studentId:[{required:true,trigger:'blur',validator:validateStudentId2},{required:true,trigger:'blur',validator:validateStudentId}]
            },
            stuInfoInput:{
              studentId:'',
              name:'',
              sex:'',
              collegeId:'',
              classId:'',
              birthplace:'',
              birthday:'',
              partySituation:'',
              contact:'',
              position:'',
              other:'',
            }
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
          //上传学生信息
          submitstuinfo:function () {
            this.stuInfoInput.birthplace=this.birthplace.join('');
            this.$store.dispatch('SubmitInfo',{info:this.stuInfoInput,type:'student'}).then((res)=>{
              if(res.status){
                this.$message.success(res.note);
                this.$refs['stuform'].resetFields();
                this.birthplace=[];
              }else{
                this.$message.error(res.note);
              }
            })
          },
          //批量上传学生信息
          submitexcelstuinfo:function(){
              //对表格中的数据进行合法性验证。验证通过才可以上传。
              // for(let i=0;i<this.tableData.length;i++){
              //
              // }
              //表格数据正确
              let stuInfo={
                multipleInfo:[],
              };
              stuInfo.multipleInfo=this.tableData;
              console.log(stuInfo.multipleInfo);
              this.$store.dispatch('SubmitExcelInfo',{info:stuInfo.multipleInfo,type:'student'}).then(res=>{
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
  .stu-info-container {
    display: flex;
  }
  .stu-info{
    width: 100%;
  }
</style>
