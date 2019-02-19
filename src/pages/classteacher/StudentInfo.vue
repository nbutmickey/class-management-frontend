<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    >
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="性别">
            <span>{{ props.row.sex }}</span>
          </el-form-item>
          <el-form-item label="政治面貌">
            <span>{{ props.row.partySituation }}</span>
          </el-form-item>
          <el-form-item label="籍贯">
            <span>{{ props.row.birthplace }}</span>
          </el-form-item>
          <el-form-item label="出生日期">
            <span>{{ TimeFormat(props.row.birthday) }}</span>
          </el-form-item>
          <el-form-item label="班级职务">
            <span>{{ props.row.position }}</span>
          </el-form-item>
          <el-form-item label="联系方式">
            <span>{{ props.row.contact }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="学号"
      prop="studentId">
    </el-table-column>
    <el-table-column
      label="姓名"
      prop="name">
    </el-table-column>
  </el-table>
</template>

<script>
  import {formateTime} from "../../utils/formatDate";
  import {mapGetters} from 'vuex';
    export default {
        name: "StudentInfo",
        data(){
          return {
            tableData:[]
          }
        },
        computed:{
          ...mapGetters(['account'])
        },
        created(){
          this.$store.dispatch('AllStuInfoByClass',this.account).then(res=>{
            console.log(res.content);
            this.tableData=res.content;
          })
        },
        methods:{
          TimeFormat:formateTime
        }
    }
</script>

<style scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
