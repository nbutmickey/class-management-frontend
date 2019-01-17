import {getClassInfo,getCollegeInfo,submitStuInfo,submitExcelInfo,checkRepeat} from "../../api/admin";
const admin={
  actions:{
    GetClassInfo({commit},collegeId){
      return new Promise((resolve,reject)=>{
        getClassInfo(collegeId).then((res)=>{
            resolve(res);
          }
        )
      })
    },
    GetCollegeInfo({commit}){
      return new Promise((resolve,reject)=>{
        getCollegeInfo().then((res)=>{
          resolve(res);
        })
      })
    },
    CheckRepeatStudent({commit},studentId){
      return new Promise((resolve,reject)=>{
        checkRepeat(studentId).then((res)=>{
          resolve(res);
        })
      })
    },
    SubmitStuInfo({commit},stuInfo){
      return new Promise((resolve,reject)=>{
        submitStuInfo(stuInfo).then((res)=>{
          resolve(res);
        })
      })
    },
    SubmitExcelStuInfo({commit},stuInfo){
      return new Promise((resolve,reject)=>{
        submitExcelInfo(stuInfo).then((res)=>{
          resolve(res);
        })
      })
    }
  }
}

export default admin;
