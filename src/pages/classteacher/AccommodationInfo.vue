<template>
  <el-table
    :data="tableData"
    style="width: 100%"
    :default-sort = "{prop: 'buildId', order: 'ascending'}">
    <el-table-column
      prop="buildId"
      label="楼号"
      sortable
    >
      <template slot-scope="scope">
        <el-tag
          :type="'warning'"
          disable-transitions>{{scope.row.buildId}}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      prop="bedRoomId"
      label="寝室号"
      >
      <template slot-scope="scope">
        <el-tag
          :type="'primary'"
          disable-transitions>{{scope.row.bedRoomId}}</el-tag>
      </template>
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
      prop="bedRoomChief"
      label="备注"
      >
      <template slot-scope="scope">
        <el-tag
          v-if="scope.row.bedRoomChief === 1"
          :type="'success'"
          disable-transitions>寝室长</el-tag>
        <span v-else>无</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {mapGetters} from 'vuex';
    export default {
        name: "AccommodationInfo",
        data(){
          return {
            tableData:[]
          }
        },
        computed:{
          ...mapGetters(['account'])
        },
        created(){
          this.$store.dispatch('ClassDormitoryInfo',this.account).then(res=>{
            //console.log(res);
            this.tableData=res.content;
          })
        }
    }
</script>

<style scoped>

</style>
