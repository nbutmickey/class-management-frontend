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
      awardInfo: [
        {
          className: "网络172",
          stuInfo: [
            {
              stuName: "梁鑫",
              Info: [
                { awardName: "123", awardTime: 213, awardAgency: "esf" },
                { awardName: "123", awardTime: 213, awardAgency: "esf" }
              ]
            },
            {
              stuName: "史仲炜",
              Info: [
                { awardName: "123", awardTime: 213, awardAgency: "教育部" },
                {
                  awardName: "123",
                  awardTime: 213,
                  awardAgency: "浙江省教育厅"
                }
              ]
            },
            {
              stuName: "米妮",
              Info: [
                { awardName: "123", awardTime: 213, awardAgency: "教育部" },
                {
                  awardName: "123",
                  awardTime: 213,
                  awardAgency: "浙江省教育厅"
                }
              ]
            }
          ]
        },
        {
          className: "网络174",
          stuInfo: [
            {
              stuName: "梁鑫",
              Info: [
                { awardName: "123", awardTime: 213, awardAgency: "esf" },
                { awardName: "123", awardTime: 213, awardAgency: "esf" }
              ]
            },
            {
              stuName: "史仲炜",
              Info: [
                { awardName: "123", awardTime: 213, awardAgency: "教育部" },
                {
                  awardName: "123",
                  awardTime: 213,
                  awardAgency: "浙江省教育厅"
                }
              ]
            },
            {
              stuName: "米妮",
              Info: [
                { awardName: "123", awardTime: 213, awardAgency: "教育部" },
                {
                  awardName: "123",
                  awardTime: 213,
                  awardAgency: "浙江省教育厅"
                }
              ]
            }
          ]
        }
      ],
      show: false,
      detailInfo: {}
    };
  },
  components: {
    CardInfoItem,
    InfoDetail
  },
  created(){
    this.$store.dispatch('AllStuAwardList',2007010901).then(res=>{
      console.log(res);
    })
  },
  methods: {
    getDetail: function(item) {
      this.show = true;
      this.detailInfo = item;
    }
  }
};
</script>

<style scoped></style>
