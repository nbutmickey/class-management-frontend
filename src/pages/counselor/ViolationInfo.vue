<template>
  <div>
    <CardInfoItem
      style="width: 46%;margin: 10px 24px;display: inline-block"
      v-for="(item, index) in violationInfo"
      :classObj="item"
      :key="index"
      @get-detail="getDetail"
    ></CardInfoItem>
    <InfoDetail
      :show.sync="show"
      :detail="detailInfo"
      :tableColumn="[
        { prop: 'violationContent', label: '违纪内容' },
        { prop: 'violationTime', label: '违纪时间' },
        { prop: 'violationDegree', label: '违纪等级' }
      ]"
    ></InfoDetail>
  </div>
</template>

<script>
import CardInfoItem from "@/components/CardInfoItem";
import InfoDetail from "@/components/InfoDetail";
export default {
  name: "ViolationInfo",
  data() {
    return {
      violationInfo: [
        {
          className: "网络171",
          stuInfo: [
            {
              stuName: "米奇",
              Info: [
                {
                  violationContent: "1213",
                  violationTime: "123",
                  violationDegree: 2
                }
              ]
            },
            {
              stuName: "梁鑫",
              Info: [
                {
                  violationContent: "1213",
                  violationTime: "123",
                  violationDegree: 2
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
  methods: {
    getDetail: function(item) {
      this.show = true;
      this.detailInfo = item;
    }
  }
};
</script>

<style scoped></style>
