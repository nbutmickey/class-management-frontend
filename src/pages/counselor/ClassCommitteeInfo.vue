<template>
  <div>
    <el-card
      class="box-card"
      style="margin: 20px 10px 0 10px;width: 48%;display: inline-block"
      v-for="(item, index) in 4"
      :key="index"
    >
      <div slot="header" class="clearfix"><span>网络17-2</span></div>
      <div v-for="o in 4" :key="o" class="text item">{{ "列表内容 " + o }}</div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ClassCommitteeInfo",
  created() {
    this.getClassCommitteeInfo();
  },
  methods: {
    getClassCommitteeInfo: function() {
      this.$store.dispatch("ClassCommitList", 2007010901).then(res => {
        console.log(res.content);
      });
    }
  }
};
</script>

<style scoped></style>
