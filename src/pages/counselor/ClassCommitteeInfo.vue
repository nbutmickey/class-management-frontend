<template>
  <div>
    <el-table
      :data="classPositionInfo"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="班长">
              <span>{{ props.row.monitor }}</span>
            </el-form-item>
            <el-form-item label="团支书">
              <span>{{ props.row.communistParty }}</span>
            </el-form-item>
            <el-form-item label="副班长">
              <span>{{ props.row.associateMonitor }}</span>
            </el-form-item>
            <el-form-item label="学习委员">
              <span>{{ props.row.study }}</span>
            </el-form-item>
            <el-form-item label="生活委员">
              <span>{{ props.row.life }}</span>
            </el-form-item>
            <el-form-item label="纪律委员">
              <span>{{ props.row.discipline }}</span>
            </el-form-item>
            <el-form-item label="宣传委员">
              <span>{{ props.row.propaganda }}</span>
            </el-form-item>
            <el-form-item label="体育委员">
              <span>{{ props.row.sport }}</span>
            </el-form-item>
            <el-form-item label="组织委员">
              <span>{{ props.row.organize }}</span>
            </el-form-item>
            <el-form-item label="治保委员">
              <span>{{ props.row.security }}</span>
            </el-form-item>
          </el-form>
        </template>
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
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
export default {
  name: "ClassCommitteeInfo",
  data(){
    return {
      classPositionInfo:[]
    }
  },
  created() {
    this.getClassCommitteeInfo();
  },
  computed:{
    ...mapGetters(['account'])
  },
  methods: {
    getClassCommitteeInfo: function() {
      this.$store.dispatch("ClassCommitList", this.account).then(res => {
        //console.log(res.content);
        this.classPositionInfo=res.content;
      });
    }
  }
};
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
