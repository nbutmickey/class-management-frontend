<template>
  <div>
    <el-table
    :data="stuInfoList"
    v-loading="loading"
    align="center"
    >
      <el-table-column
        prop="studentId"
        label="学号"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
      ></el-table-column>
      <el-table-column
        prop="sex"
        label="性别"
      ></el-table-column>
      <el-table-column
        prop="collegeName"
        label="学院"
      ></el-table-column>
      <el-table-column
        prop="className"
        label="班级"
      ></el-table-column>
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="dialogVisible = true">修改</el-button>
          <el-button type="danger" size="mini" @click="delete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block" style="text-align: center;">
      <el-pagination
      :current-page="1"
      :page-size="20"
      layout="total,prev,pager,next,jumper"
      :total="total"
      ></el-pagination>
    </div>

    <el-dialog
      title="修改学生信息"
      :visible.sync="dialogVisible"
       width="50%"
      :before-close="handleClose">
      <div class="edit-student-form">
        <el-form ref="editForm" :model="editInfo" label-width="80px" size="mini">
          <el-form-item label="学号">
            <el-input
              v-model="editInfo.studentId"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input
              v-model="editInfo.name"
              :disabled="true">
            </el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="sex">
            <el-radio-group v-model="editInfo.sex" size="medium">
              <el-radio  label="男"></el-radio>
              <el-radio  label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="学院:" prop="collegeId">
            <el-select v-model="editInfo.collegeId" placeholder="请选择学院" @change="">
              <el-option
                v-for="item in collegeOptions"
                :key="item.collegeId"
                :label="item.collegeName"
                :value="item.collegeId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级:" prop="classId">
            <el-select v-model="editInfo.classId" placeholder="请选择班级">
              <el-option
                v-for="item in classOptions"
                :key="item.classId"
                :label="item.className"
                :value="item.classId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="籍贯:" prop="birthplace">
            <el-cascader
              placeholder="请选择籍贯"
              v-model="birthplace"
              :options="cityOptions"
              :props="props"
              change-on-select
            ></el-cascader>
          </el-form-item>
          <el-form-item label="出生日期:" prop="birthday">
            <el-date-picker
              v-model="editInfo.birthday"
              value-format="yyyy-MM-dd"
              type="date"
              placeholder="请选择出生日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="政治面貌:" prop="partySituation">
            <el-select v-model="editInfo.partySituation" placeholder="请选择政治面貌">
              <el-option
                v-for="item in partySituationOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="班级职务:" prop="position">
            <el-select v-model="editInfo.position" placeholder="请选择班级职务">
              <el-option
                v-for="item in classPositionOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系方式:" prop="contact">
            <el-input v-model="editInfo.contact" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="其他补充:" prop="other">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="editInfo.other">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import partySituationOptions from '../../utils/partySituationOptions'
  import cityOptions from '../../utils/cityOptions'
  import classPositionOptions from '../../utils/classPositionOptions'
    export default {
        name: "index",
        mounted(){
        this.cityOptions=cityOptions;
        this.classPositionOptions=classPositionOptions;
        this.partySituationOptions=partySituationOptions;
        },
        data(){
          return {
            dialogVisible:false,
            //班级职务
            classPositionOptions:[],
            //政治面貌
            partySituationOptions:[],
            //城市选择器级联选项
            props:{
              value: 'name',
              label:'name',
              children: 'cities'
            },
            //城市选择器
            cityOptions:[],
            //班级选择器
            classOptions:[],
            //学院选择器
            collegeOptions:[],
            editInfo:{
              studentId:'16401190228',
              name:'史仲炜',
              sex:'男',
              collegeId:'电子与信息工程学院',
              classId:'网络162',
              birthplace:'',
              birthday:'1997-03-02',
              partySituation:'共青团员',
              contact:'15257843726',
              position:'班长',
              other:'',
            },
            birthplace:["浙江省","宁波市"],
            stuInfoList:[
              {
                studentId:'16401190228',
                name:'史仲炜',
                sex:'男',
                collegeName:'电子与信息工程学院',
                className:'网络162',
                partySituation:'共青团员'
              },
              {
                studentId:'16401190228',
                name:'史仲炜',
                sex:'男',
                collegeName:'电子与信息工程学院',
                className:'网络162',
                partySituation:'共青团员'
              },
              {
                studentId:'16401190228',
                name:'史仲炜',
                sex:'男',
                collegeName:'电子与信息工程学院',
                className:'网络162',
                partySituation:'共青团员'
              },
            ],
            loading:false,
            total:0
          }
        }
    }
</script>

<style scoped lang="less">

</style>
