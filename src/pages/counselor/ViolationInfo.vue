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
import {mapGetters} from 'vuex';
export default {
  name: "ViolationInfo",
  data() {
    return {
      violationInfo: [],
      show: false,
      detailInfo: []
    };
  },
  computed:{
    ...mapGetters(['account'])
  },
  created(){
    this.$store.dispatch('AllStuVioList',this.account).then(res=>{
      this.violationInfo=res.content;
    })
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
