<template>
  <div>
    <CardInfoItem
      style="width: 46%;margin: 10px 24px;display: inline-block"
      v-for="(item, index) in awardInfo"
      :classObj="item"
      :key="index"
      @get-detail="getDetail"
    ></CardInfoItem>
    <InfoDetail
      :show.sync="show"
      :detail="detailInfo"
      :tableColumn="[
        { prop: 'awardName', label: '获奖名称' },
        { prop: 'awardTime', label: '获奖时间' },
        { prop: 'awardAgency', label: '颁奖单位' }
      ]"
    ></InfoDetail>
  </div>
</template>

<script>
import CardInfoItem from "@/components/CardInfoItem";
import InfoDetail from "@/components/InfoDetail";
export default {
  name: "AwardInfo",
  data() {
    return {
      awardInfo: [],
      show: false,
      detailInfo: []
    };
  },
  components: {
    CardInfoItem,
    InfoDetail
  },
  created(){
    this.$store.dispatch('AllStuAwardList',2007010901).then(res=>{
      //console.log(res);
      this.awardInfo=res.content;
    })
  },
  methods: {
    getDetail: function(item) {
      this.show = true;
      //console.log(item);
      this.detailInfo = item;
    }
  }
};
</script>

<style scoped></style>
