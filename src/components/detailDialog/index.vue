<template>
  <div>
  <el-dialog
    title="寝室详细信息"
    :visible.sync="visible"
    width="50%"
    :show="show"
    @close="closeDialog"
    >
    <div>
      <div style="margin: 5px 0"><span style="color:#303133">校区：</span>{{bedRoomDetail.buildAddr}}</div>
      <div style="margin: 5px 0"><span style="color:#303133">楼号：</span>{{bedRoomDetail.buildId}}</div>
      <div style="margin: 5px 0"><span style="color:#303133">寝室号：</span>{{bedRoomDetail.bedRoomId}}</div>
      <div style="margin: 5px 0"><span style="color:#303133">寝室人数：</span>{{bedRoomDetail.memberNumber}}</div>
      <div style="margin: 5px 0"><span style="color:#303133">寝室长：</span>{{bedRoomDetail.bedRoomChief}}</div>
      <div style="margin: 5px 0"><span style="color:#303133">寝室成员</span>：
        <el-table
          :data="bedRoomDetail.content"
          style="width: 100%">
          <el-table-column v-for="(item,index) in tableLabel"
            :prop="item.param"
            :key="index"
            :label="item.label"
            >
          </el-table-column>
          <el-table-column :fixed="tableOption.fixed"
                           :label="tableOption.label">
            <template slot-scope="scope">
              <el-button v-for="(item,index) in tableOption.options"
                         :key="index"
                         :type="item.type"
                         :icon="item.icon"
                         size="mini"
                         @click="handleChangeButton(item.methods,scope)">
                {{item.label}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="showChangePage" style="padding-top: 20px;color: red">
        <div style="font-size: 18px">异动信息</div>
        <div style="margin: 10px"><span style="margin-right: 50px">学号：{{changeStudent.studentId}}</span><span>姓名：{{changeStudent.name}}</span></div>
        <el-input size="medium" placeholder="请输入楼号" v-model="changeStudent.buildId" style="margin: 10px">
          <template slot="prepend">楼号</template>
        </el-input>
        <el-input size="medium" placeholder="请输入寝室号" v-model="changeStudent.bedRoomId" style="margin: 10px">
          <template slot="prepend">寝室号</template>
        </el-input>
        <el-button type="warning" @click="changeBedRoom" style="width: 100%;margin-left: 10px">确定异动</el-button>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
  </span>
  </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "index",
        data(){
        return {
          visible:this.show,
          showChangePage:false,
          changeStudent:{
            studentId:'',
            name:'',
            buildId:'',
            bedRoomId:'',
            index:''
          }
          }
        },
        props:{
          show: {
            type: Boolean,
            default: false
          },
          tableOption:{
            type:Object
          },
          tableLabel:{
            type:Array,
            default:()=>[]
          },
          bedRoomDetail:{
            type:Object,
            default:()=>({})
          }
        },
      methods:{
        closeDialog:function(){
          this.$emit('update:show',false);
          this.showChangePage=false;
        },
        changeBedRoom:function(){
            let index=this.changeStudent.index
            this.$store.dispatch('ChangeBedRoom',{studentId:this.changeStudent.studentId,buildId:this.changeStudent.buildId,bedRoomId:this.changeStudent.bedRoomId}).then(res=>{
              if(res.status){
                this.$notify({
                  title: '成功',
                  message: res.note,
                  type: 'success'
                });
                this.changeStudent.buildId='';
                this.changeStudent.bedRoomId='';
                this.showChangePage=false;
                this.bedRoomDetail.content.splice(index,1);
              }else{
                this.$notify({
                  title: '失败',
                  message: res.note,
                  type: 'danger'
                });
              }
            })
        },
        handleChangeButton:function (methods,scope) {
          this.showChangePage=true;
          this.changeStudent.index=scope.$index;
          this.changeStudent.studentId=scope.row.studentId;
          this.changeStudent.name=scope.row.name;
          this.$emit('handleChangeButton',{'methods':methods,'scope':scope});
        }
      },
      watch: {
        show () {
              this.visible=this.show;
            }
        },
    }
</script>

<style scoped>

</style>
