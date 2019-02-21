<template>
  <div>
  <el-card v-for="(item,index) in awardList" style="width: 45%;margin:20px 40px 20px 20px;display: inline-block" :key="index">
    <div slot="header" class="clearfix">
      <span>{{item.name}}</span>
    </div>
    <el-form label-width="20px">
      <el-form-item>
        <label>获奖名称</label>
        <span>{{item.awardName}}</span>
      </el-form-item>
      <el-form-item>
        <label>获奖时间</label>
        <span>{{TimeFormat(item.awardTime)}}</span>
      </el-form-item>
      <el-form-item>
        <label>颁奖机构</label>
        <span>{{item.awardAgency}}</span>
      </el-form-item>
    </el-form>
  </el-card>
  </div>
</template>

<script>
  import {formateTime} from "../../utils/formatDate";
  import {mapGetters} from 'vuex';
    export default {
        name: "AwardInfo",
        data(){
          return {
            awardList:[]
          }
        },
        computed:{
          ...mapGetters(['account'])
        },
        created(){
          this.$store.dispatch('AwardList',this.account).then(res=>{
            console.log(res.content);
            this.awardList=res.content;
          })
        },
        methods:{
          TimeFormat:formateTime
        }
    }
</script>

<style scoped>

</style>
