<template>
  <div>
  <!--表格组件  -->
  <el-table :data="tableData"
              empty-text="暂无数据呢"
              highlight-current-row >
           <el-table-column v-for="(item,index) in tableLabel"
                            :key="index"
                            :label="item.label"
                            :prop="item.param"
                            :fixed="item.fixed"
                            :min-width="item.width">

           </el-table-column>
           <el-table-column :fixed="tableOption.fixed"
                            :label="tableOption.label">
             <template slot-scope="scope">
               <el-button v-for="(item,index) in tableOption.options"
                          :key="index"
                          :type="item.type"
                          :icon="item.icon"
                          size="mini"
                          :width="item.width"
                          @click="handleButton(item.methods,scope)">
                    {{item.label}}
               </el-button>
             </template>
           </el-table-column>
    </el-table>
    <!--分页组件-->
  <el-pagination v-if="pageInfo.total > 0 && showPage"
                background
                @current-change="handleCurrentChange"
                @prev-click="handlePrevClick"
                @next-click="handleNextClick"
                layout="total, prev, pager, next, jumper"
                :page-size.sync="pageInfo.pageSize"
                :current-page="pageInfo.currentPage"
                :total="pageInfo.total"
    ></el-pagination>
  </div>
</template>

<script>
    export default {
        name: "index",
        props:{
          showPage:{
            type:Boolean,
            defalut:()=>{}
          },
          pageInfo:{
            type:Object,
            default:()=>(
              {
                currentPage:1,
                pageSize:10,
                total:0
              }
          )
          },
          tableData:{
            type:Array,
            default:()=>{}
          },
          tableLabel:{
            type:Array,
            default:()=>{}
          },
          tableOption:{
            type:Object,
            default:()=>{}
          }
        },
        methods:{
          handleButton(methods,scope){
            this.$emit('handleButton',{'methods':methods,'scope':scope});
          },
          handleCurrentChange(currentPage){
            this.$emit('handleCurrentChange',currentPage);
          },
          handlePrevClick(prevPage){
            this.$emit('handlePrevClick',prevPage);
          },
          handleNextClick(nextPage){
            this.$emit('handleNextClick',nextPage);
          },

        }
    }
</script>

<style scoped>
.el-pagination {
  text-align: center !important;
  margin-top: 20px;
}
</style>
