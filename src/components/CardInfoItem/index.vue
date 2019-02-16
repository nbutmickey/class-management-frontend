<template>
    <el-card v-if="classObj.stuInfo.length!==0">
      <div slot="header" class="clearfix">
        <span>{{ classObj.className }}</span>
      </div>
      <div
        v-for="(item, index) in classObj.stuInfo"
        :key="index"
        style="margin: 5px 0"
      >
        <span>{{ item.stuName }}</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="getDetail(item.Info)"
          >获取详情</el-button
        >
      </div>
    </el-card>
</template>

<script>
export default {
  name: "index",
  props: ["classObj"],
  methods:{
    getDetail:function (item) {
      //console.log(item);
      this.$emit('get-detail',item)
    }
  }
};
</script>

<style scoped></style>
