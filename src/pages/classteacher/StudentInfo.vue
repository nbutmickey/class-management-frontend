<template>
  <el-table
    :data="tableData"
    style="width: 100%">
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
            <span>{{ props.row.birthday }}</span>
          </el-form-item>
          <el-form-item label="楼号">
            <span>{{ props.row.buildId }}</span>
          </el-form-item>
          <el-form-item label="寝室号">
            <span>{{ props.row.bedRoomId }}</span>
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
    <el-table-column
      label="学院"
      prop="collegeName">
    </el-table-column>
    <el-table-column
      label="班级"
      prop="className">
    </el-table-column>
  </el-table>
</template>

<script>
  import tablePagination from '../../components/tablePagination/index'
    export default {
        name: "StudentInfo",
        data(){
          return {
            tableData:[]
          }
        },
        components:{
          tablePagination
        },
        created(){
          this.$store.dispatch('')
        }
    }
</script>

<style scoped>

</style>
