<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="position" label="班级职务">
        <template slot-scope="scope">
          <span v-if="scope.row.position === '暂无职位'">暂无职位</span>
          <el-tag v-else :type="'success'" disable-transitions>{{
            scope.row.position
            }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="studentId" label="学号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleButton(scope.row)"
            >{{
              scope.row.position === "暂无职位" ? "设置职务" : "重置职务"
            }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="选择职务" :visible.sync="dialogVisible" width="30%">
      <div>
        <el-radio-group v-model="classCommittee" @change="isRepeat">
          <el-radio
            v-for="(item, index) in classCommitteeInfo"
            border
            size="mini"
            :key="index"
            :label="item.position"
            >{{ item.position }}</el-radio
          >
        </el-radio-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="setCommittee" :loading="isLoading"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "CommitteeSet",
  computed: {
    ...mapGetters(["account"])
  },
  data() {
    return {
      isLoading: false,
      studentId: "",
      tableData: [],
      dialogVisible: false,
      classCommittee: "",
      classCommitteeInfo: [
        { position: "班长", style: "1" },
        { position: "副班长", style: "2" },
        { position: "团支书", style: "3" },
        { position: "学习委员", style: "4" },
        { position: "纪律委员", style: "5" },
        { position: "生活委员", style: "6" },
        { position: "组织委员", style: "7" },
        { position: "文娱委员", style: "8" },
        { position: "体育委员", style: "9" },
        { position: "治保委员", style: "10" },
        { position: "宣传委员", style: "11" },
        { position: "暂无职位", style: "12" }
      ]
    };
  },
  created() {
    this.$store.dispatch("AllStuInfoByClass", this.account).then(res => {
      //console.log(res.content);
      this.tableData = res.content;
      this.tableData.map(item => {
        if (item.position === "" || item.position === "undefined") {
          item.position = "暂无职位";
        }
      });
      //排序
      this.tableData.sort(function (a,b) {
        if(a.position==='暂无职位'){
          return 1;
        }else {
          return -1;
        }
      })
      //console.log(this.tableData);
    });
  },
  methods: {
    handleButton: function(row) {
      this.classCommittee = row.position;
      this.studentId = row.studentId;
      this.dialogVisible = true;
    },
    setCommittee() {
      this.isLoading = true;
      //提交更改信息
      this.$store.dispatch("SetClassPosition", {
          position: this.classCommittee,
          studentId: this.studentId
        })
        .then(res => {
          //如果请求成功，相关业务逻辑
          if (res.status) {
            this.$notify({
              type: "success",
              message: "设置成功！"
            });
            //为了更新tableData数据并减少http请求，直接重置tableData。
            this.tableData.map(item => {
              if (item.studentId === this.studentId)
                item.position = this.classCommittee;
            });
            //排序
            this.tableData.sort(function (a,b) {
              if(a.position==='暂无职位'){
                return 1;
              }else {
                return -1;
              }
            })
            //如果失败，告知用户失败信息
          } else {
            this.$notify({
              type: "danger",
              message: res.note
            });
          }
          this.isLoading = false;
          this.dialogVisible = false;
        });
    },
    isRepeat: function(check) {
      if (check === "暂无职位") {
        return false;
      } else {
        this.tableData.forEach(item => {
          if (item.position === check) {
            this.$message({
              message: `${item.position}存在重复`,
              duration: 1000
            });
            return true;
          }
        });
        return false;
      }
    }
  }
};
</script>

<style scoped>
.el-radio {
  margin: 5px 0 5px 30px !important;
}
</style>
