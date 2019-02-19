<template>
  <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      prop="studentId"
      label="学号"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="degree"
      label="贫困等级"
      :filters="[{ text: '特别贫困', value: '1' }, { text: '普通贫困', value: '2' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.degree === '1' ? 'danger' : 'success'"
          disable-transitions>{{scope.row.degree==='1'?'特别贫困':'普通贫困'}}</el-tag>
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
  import {mapGetters} from 'vuex';
    export default {
        name: "PoorStudentInfo",
        data(){
          return {
              tableData:[]
          }
        },
        computed:{
          ...mapGetters(['account'])
        },
        created(){
          this.$store.dispatch('PoorInfoByClass',this.account).then(res=>{
            //console.log(res);
            this.tableData=res.content;
          })
        },
        methods:{
          filterTag:function (value,row) {
            return value===row.degree;
          }
        }
    }
</script>

<style scoped>

</style>
