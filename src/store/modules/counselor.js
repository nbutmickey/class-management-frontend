import {
  allStudentList,
  approvedPoor,
  allPoorList,
  classCommitList,
  allStuVioList,
  allStuAwardList,
  allPoorApply
}from '../../api/counselor'

const counselor={
  actions:{
    AllStudentList({commit},{jobId,pageSize,currentPage}){
      console.log(jobId,pageSize,currentPage);
      return new Promise((resolve,reject)=>{
        allStudentList(jobId,pageSize,currentPage).then(res=>{
          resolve(res);
        })
      })
    },
    ApprovedPoor({commit},poorAttitude){
      return new Promise((resolve,reject)=>{
        approvedPoor(poorAttitude).then(res=>{
          resolve(res);
        })
      })
    },
    AllPoorApply({commit},jobId){
      return new Promise((resolve,reject)=>{
        allPoorApply(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    AllPoorList({commit},jobId){
      return new Promise((resolve,reject)=>{
        allPoorList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    ClassCommitList({commit},jobId){
      return new Promise((resolve,reject)=>{
        classCommitList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    AllStuVioList({commit},jobId){
      return new Promise((resolve,reject)=>{
        allStuVioList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    AllStuAwardList({commit},jobId){
      return new Promise((resolve,reject)=>{
        allStuAwardList(jobId).then(res=>{
          resolve(res);
        })
      })
    }
  }
}
export default counselor;
