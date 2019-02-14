<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      type="index"
      label="#"
    >
    </el-table-column>
    <el-table-column
      prop="className"
      label="班级"
    >
    </el-table-column>
    <el-table-column
      prop="studentId"
      label="学号"
      >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      >
    </el-table-column>
    <el-table-column
      prop="agree"
      label="贫困等级"
      >
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.degree ==='1' ? 'danger' : 'success'"
          disable-transitions>{{scope.row.degree==='1' ? '非常贫困':'普通贫困'}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="reason"
      label="申请理由"
    >
    </el-table-column>
  </el-table>
</template>

<script>
    export default {
        name: "PoorStudentInfo",
        data(){
          return {
            tableData:[]
          }
        },
        created(){
          this.$store.dispatch('AllPoorList',2007010901).then(res=>{
            console.log(res);
            this.tableData=res.content;
          })
        }
    }
</script>

<style scoped>

</style>
