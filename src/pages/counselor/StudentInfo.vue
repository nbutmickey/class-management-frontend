<template>
  <div>
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
    <el-pagination
      style="text-align: center;margin-top: 20px"
      background
      layout="total,prev, pager, next"
      :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<script>
    import tablePagination from '../../components/tablePagination/index';
    import {mapGetters} from 'vuex'
    export default {
        name: "StudentInfo",
        data(){
          return{
            tableData:[],
            pageInfo:{
              currentPage:1,
              total:20,
              pageSize:20
            },
          }
        },
        computed:{
          ...mapGetters(['account'])
        },
        components:{ tablePagination },
        created(){
          this.getAllStuInfo();
        },
        methods:{
          handleButton(val){
            if(val.methods==='studentDetail'){

            }
          },
          handleCurrentChange(val){
            this.pagination.currentPage=val;
          },
          handlePrevClick(val){
            this.pagination.currentPage=val-1;
          },
          handleNextClick(val){
            this.pagination.currentPage=val+1;
          },
          getAllStuInfo(){
            this.$store.dispatch('AllStudentList',{jobId:this.account,pageSize:20,currentPage:1}).then(res=>{
              console.log(res);
              this.tableData=res.content.data;
              this.pageInfo.total=res.content.total;
            })
          }
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
