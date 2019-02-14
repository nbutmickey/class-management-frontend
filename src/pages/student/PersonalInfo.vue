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
        <el-button @click="confirmButton" style="float: right;" type="primary" icon="el-icon-upload2">提交修改</el-button>
      </div>
      <el-row :gutter="20" style="margin: 5px 0">
        <el-col :span="12"><div class="grid-content bg-purple">学号：<span>{{personInfo.studentId}}</span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">姓名：<span>{{personInfo.name}}</span></div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 5px 0">
        <el-col :span="12"><div class="grid-content bg-purple">性别：<span>{{personInfo.sex}}</span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">班级职务：<span>{{personInfo.position}}</span></div></el-col></el-row>
      <el-row :gutter="20" style="margin: 5px 0">
        <el-col :span="12"><div class="grid-content bg-purple">学院：<span>{{personInfo.collegeName}}</span></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">班级：<span>{{personInfo.className}}</span></div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 5px 0">
        <el-col :span="12"><div class="grid-content bg-purple">楼号：<el-input size="mini" style="width: 30%"   v-model="personInfo.buildId"></el-input></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">寝室号：<el-input size="mini" style="width: 30%"  v-model="personInfo.bedRoomId"></el-input></div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 5px 0">
        <el-col :span="12"><div class="grid-content bg-purple">籍贯：<el-input size="mini" style="width: 30%"   v-model="personInfo.birthplace"></el-input></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">出生日期：<el-input size="mini" type="date" value-format="yyyy-MM-dd" style="width: 30%"  v-model="personInfo.birthday"></el-input></div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 5px 0">
        <el-col :span="12"><div class="grid-content bg-purple">联系方式：<el-input size="mini" style="width: 30%" v-model="personInfo.contact" ></el-input></div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple">政治面貌：<el-select size="mini" v-model="personInfo.partySituation">
          <el-option
            v-for="item in partySituationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select></div></el-col>
      </el-row>
      <el-row :gutter="20" style="margin: 5px 0">
        <el-col :span="24"><div class="grid-content bg-purple">其他信息：<el-input size="mini" style="width: 30%"  v-model="personInfo.other"></el-input></div></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import cityOptions from '../../utils/cityOptions'
  import partySituationOptions from '../../utils/partySituationOptions'
  import {mapGetters} from 'vuex'
    export default {
        name: "PersonalInfo",
        computed:{
          ...mapGetters([
          'account',
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
            console.log(this.personInfo);
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
          },
          getStudentInfo:function () {
            this.$store.dispatch('GetPersonalInfo',this.account).then((res)=>{
                this.personInfo=res.content;
            })
          }
        }
    }
</script>

<style scoped>

</style>
