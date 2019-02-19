<template>
  <table-pagination
    :tableLabel="      [
                          {label:'学号',param:'studentId',other:false},
                          {label:'姓名',param:'name',other:false},
                          {label:'申请级别',param:'degree',other:true},
                          {label:'申请理由',param:'reason',other:false},
                          ]"
    :tableOption="{
                          label:'操作',
                          options:[{label:'同意',type:'primary',icon:'',methods:'approved',width:'200'},
                                   {label:'不同意',type:'danger',icon:'',methods:'notApproved',width:'200'}]
                          }"
    @handleButton="handleButtonForApply"
    :tableData="tableDataForApply"
    :showPage="isShowPageForApply"
  >
  </table-pagination>
</template>

<script>
  import tablePagination from '@/components/tablePagination/index';
  import {mapGetters} from 'vuex'
    export default {
      name: "CheckPoorStudent",
      components:{
        tablePagination
      },
      data(){
        return {
          tableDataForApply:[],
          isShowPageForApply:false
        }
      },
      created(){
        this.$store.dispatch('GetClassPoorCheck',this.account).then((res)=>{
          this.tableDataForApply=res.content;
          this.tableDataForApply.forEach((item)=>{
            item.degree==='1'?item.degree='非常贫困':item.degree='一般贫困';
          })
        })
      },
      computed:{
        ...mapGetters(['account'])
      },
      methods:{
        handleButtonForApply(val){
          let index=val.scope.$index;
          let studentId=val.scope.row.studentId;
          if(val.methods==='approved'){
            this.$store.dispatch('ApprovedPoorByClassTeacher',{studentId:studentId,attitude:true}).then(res=>{
              if(res.status){
                this.$message({
                  message: res.note,
                  type: 'success'
                });
                this.tableDataForApply.splice(index,1);
              }else{
                this.$message({
                  message: res.note,
                  type: 'warning'
                });
              }
            })
          }else{
            this.$store.dispatch('ApprovedPoorByClassTeacher',{studentId:studentId,attitude:false}).then((res)=>{
              if(res.status){
                this.$message({
                  message: res.note,
                  type: 'success'
                });
                this.tableDataForApply.splice(index,1);
              }else{
                this.$message({
                  message: res.note,
                  type: 'warning'
                });
              }
            })
          }
        }
      }
    }
</script>

<style scoped>

</style>
