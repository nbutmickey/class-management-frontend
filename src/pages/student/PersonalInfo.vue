<template>
  <div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-size: 20px;font-weight: bold">个人信息</span>
      <el-button @click="showEditCard=true" style="float: right;" type="warning" icon="el-icon-edit">修改信息</el-button>
    </div>
    <el-row :gutter="20" style="margin: 5px 0">
      <el-col :span="12"><div class="grid-content bg-purple">学号:<span>{{personInfo.studentId}}</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">姓名:<span>{{personInfo.name}}</span></div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 5px 0">
      <el-col :span="12"><div class="grid-content bg-purple">性别:<span>{{personInfo.sex}}</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">政治面貌:<span>{{personInfo.partySituation}}</span></div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 5px 0">
      <el-col :span="12"><div class="grid-content bg-purple">学院:<span>{{personInfo.collegeName}}</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">班级:<span>{{personInfo.className}}</span></div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 5px 0">
      <el-col :span="12"><div class="grid-content bg-purple">籍贯:<span>{{personInfo.birthplace}}</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">出生日期:<span>{{personInfo.birthday}}</span></div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 5px 0">
      <el-col :span="12"><div class="grid-content bg-purple">联系方式:<span>{{personInfo.contact}}</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">班级职务:<span>{{personInfo.position}}</span></div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 5px 0">
      <el-col :span="12"><div class="grid-content bg-purple">寝室楼号:<span>{{personInfo.buildId}}</span></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple">寝室号:<span>{{personInfo.bedRoomId}}</span></div></el-col>
    </el-row>
    <el-row :gutter="20" style="margin: 5px 0">
      <el-col :span="24"><div class="grid-content bg-purple">其他信息:<span>{{personInfo.other}}</span></div></el-col>
    </el-row>
  </el-card>
    <el-card class="box-card" v-if="showEditCard" style="color: red;margin-top: 15px">
      <div slot="header" class="clearfix">
        <span style="font-size: 20px;font-weight: bold">个人信息修改</span>
        <el-button @click="confirmButton" style="float: right;" type="danger" icon="el-icon-upload2">提交修改</el-button>
        <el-button @click="showEditCard=false" style="float: right;margin-right: 5px" type="primary" icon="el-icon-circle-close-outline">取消修改</el-button>
      </div>
      <el-form :model="stuInfo" label-width="140px" ref="personInfoForm" size="mini" inline>
        <el-form-item label="学号">
          <el-input v-model="stuInfo.studentId" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="stuInfo.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="stuInfo.sex" disabled></el-input>
        </el-form-item>
        <el-form-item label="班级职务">
        <el-input v-model="stuInfo.position" disabled></el-input>
      </el-form-item>
        <el-form-item label="学院">
          <el-input v-model="stuInfo.collegeName" disabled></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-input v-model="stuInfo.className" disabled></el-input>
        </el-form-item>
        <el-form-item label="楼号">
          <el-input v-model="stuInfo.buildId" disabled></el-input>
        </el-form-item>
        <el-form-item label="寝室号">
          <el-input v-model="stuInfo.bedRoomId" disabled></el-input>
        </el-form-item>
        <el-form-item label="籍贯" prop="birthplace" :rules="{required:true,message:'籍贯不能为空',trigger:'changed'}">
          <el-input v-model="stuInfo.birthplace" clearable></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday" :rules="{required:true,message:'出生日期不能为空',trigger:'changed'}">
          <el-date-picker v-model="stuInfo.birthday" type="date" value-format="yyyy-MM-dd" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="联系方式" prop="contact" :rules="{required:true,message:'联系方式不能为空',trigger:'changed'}">
          <el-input v-model="stuInfo.contact" clearable></el-input>
        </el-form-item>
        <el-form-item label="政治面貌" prop="partySituation" :rules="{required:true,message:'政治面貌不能为空',trigger:'changed'}">
          <el-select v-model="stuInfo.partySituation" clearable>
            <el-option
              v-for="item in partySituationOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="其他信息" prop="other" :rules="{required:true,message:'其他信息不能为空',trigger:'changed'}">
          <el-input v-model="stuInfo.other" clearable></el-input>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  //import cityOptions from '../../utils/cityOptions'
  import partySituationOptions from '../../utils/partySituationOptions'
  import {mapGetters} from 'vuex';
  import {mapMutations} from 'vuex';
    export default {
        name: "PersonalInfo",
        computed:{
          ...mapGetters([
            'account',
            'stuInfo'
        ])
        },
        mounted(){
          this.partySituationOptions=partySituationOptions;
        },
        data(){
          return {
            showEditCard:false,
            personInfo:'',
          }
        },
        created(){
          this.getStudentInfo();
        },
        methods:{
          confirmButton:function () {
            //console.log(this.personInfo);
            this.$refs['personInfoForm'].validate(valid=>{
              if(valid){
                this.$store.dispatch('CompleteStudentInfo',this.personInfo).then(res=>{
                  if(res.status){
                    this.getStudentInfo();
                    this.showEditCard=false;
                    this.$message({
                      type:'success',
                      message:res.note
                    })
                  }else{
                    this.$message({
                      type:'danger',
                      message:res.note
                    })
                  }
                })
              }else{
                return false;
              }
            })
          },
          getStudentInfo:function () {
            this.$store.dispatch('GetPersonalInfo',this.account).then((res)=>{
                console.log(res.content);
                this.personInfo=res.content;
                this.setStuInfo(Object.assign({},this.personInfo));
            })
          },
          ...mapMutations({
            setStuInfo:'SET_STU_INFO'
          })
        },
    }
</script>

<style scoped>

</style>
