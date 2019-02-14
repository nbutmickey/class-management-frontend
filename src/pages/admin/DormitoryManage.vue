<template>
  <div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="宿舍管理" name="first">
      <table-pagination
      :tableLabel="[ {label:'校区',param:'addr'},
      {label:'楼号',param:'build'},
      {label:'寝室号',param:'bedRoomId'},
      {label:'卫生情况',param:'hygieneSituation'}]"
      :tableOption="{
      label:'操作',
      options:[{label:'详细信息',type:'info',icon:'el-icon-info',methods:'bedRoomDetail'}]
      }"
      :tableData="tableData"
      :pageInfo="pageInfo"
      @handleButton="handleButton"
      @handleCurrentChange="handleCurrentChange"
      @handlePrevClick="handlePrevClick"
      @handleNextClick="handleNextClick"
      :showPage="isShowPage"
      >
      </table-pagination>
    </el-tab-pane>
    <el-tab-pane label="寝室长申请管理" name="second">
        <table-pagination
          :tableLabel="[  {label:'学号',param:'studentId'},
                          {label:'姓名',param:'name'},
                          {label:'楼号',param:'buildId'},
                          {label:'寝室号',param:'bedRoomId'},
                          {label:'申请日期',param:'applydate'}]"
          :tableOption="{
                          label:'操作',
                          options:[{label:'同意',type:'primary',icon:'',methods:'approved',width:'200'},
                                   {label:'不同意',type:'danger',icon:'',methods:'notApproved',width:'200'}]
                          }"
          @handleButton="handleButtonForApply"
          :tableData="tableDataForApply"
          :showPage="isShowPageForApply"
        >
        </table-pagination>
    </el-tab-pane>
  </el-tabs>
    <!--详情页组件-->
  <detail-dialog
    :bedRoomDetail="bedRoomDetail"
    :show.sync="show"
    :tableLabel="[ {label:'学号',param:'studentId'},
                   {label:'姓名',param:'name'},
                   {label:'班级',param:'className'},
                          ]"
    :tableOption="{label:'操作',
                          options:[{label:'异动寝室',type:'primary',icon:'',methods:'changeBedRoom',width:'200'},
                                   ]}"
    @handleChangeButton="handleChangeButton"
  ></detail-dialog>
  </div>
</template>

<script>
    import tablePagination from '../../components/tablePagination/index'
    import detailDialog from '../../components/detailDialog/index'
    export default {
        name: "DormitoryManage",
        data(){
          return {
            isShowPage:true,
            isShowPageForApply:false,
            show:false,
            activeName: 'first',
            tableData:[],
            tableDataForApply:[],
            bedRoomDetail:{},
            pageInfo:{
              currentPage:1,
              total:0,
              pageSize:10
            },
          }
        },
        components:{ tablePagination,detailDialog },
        created(){
          this.getbuildlist(this.pageInfo.currentPage,this.pageInfo.pageSize);
          this.getbedroomchiefList();
          },
        methods: {
          // handleChangeButton(val){
          //
          // },
          handleButtonForApply(val){
            let index=val.scope.$index;
            let studentId=val.scope.row.studentId;
            console.log(studentId);
            if(val.methods==='approved'){
              this.$store.dispatch('CheckBedRoomChief',{studentId:studentId,attitude:true}).then((res)=>{
                if(res.status){
                  this.$message({
                    message: res.note,
                    type: 'success'
                  });
                  this.tableDataForApply.splice(index,1);
                }else{
                  this.$message({
                    message: res.note,
                    type: 'warning'
                  });
                }
              })
            }else{
              this.$store.dispatch('CheckBedRoomChief',{studentId:studentId,attitude:false}).then((res)=>{
                if(res.status){
                  this.$message({
                    message: res.note,
                    type: 'success'
                  });
                  this.tableDataForApply.splice(index,1);
                }else{
                  this.$message({
                    message: res.note,
                    type: 'warning'
                  });
                }
              })
            }
          },
          handleButton(val){
            let build=val.scope.row.build;
            let bedRoomId=val.scope.row.bedRoomId;
            this.getbedroomdetail(build,bedRoomId);
          },
          handleCurrentChange(val){
            this.getbuildlist(val,this.pageInfo.pageSize);
          },
          handlePrevClick(val){
            this.getbuildlist(val,this.pageInfo.pageSize);
          },
          handleNextClick(val){
            this.getbuildlist(val,this.pageInfo.pageSize);
          },
          getbuildlist(currentPage,pageSize){
            this.$store.dispatch('GetBuildInfo',{currentPage,pageSize}).then((res)=>{
              this.tableData=res.content.data;
              this.pageInfo.total=res.content.total;
            })
          },
          getbedroomdetail(buildId,bedRoomId){
            console.log(buildId,bedRoomId);
            this.$store.dispatch('GetBedRoomInfo',{buildId:buildId,bedRoomId:bedRoomId}).then(res=>{
              if(res.content!==null){
                this.show=true;
                this.bedRoomDetail=res.content;
              }else{
                this.$message({
                  message: '该寝室暂时还没有详细信息或者'+res.note,
                  type: 'warning'
                });
              }
            })
          },
          getbedroomchiefList(){
            this.$store.dispatch('GetBedRoomChiefList').then(res=>{
              this.tableDataForApply=res.content;
            })
          }
      },
    }
</script>

<style scoped>

</style>
