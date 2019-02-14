import {
  applyBedRoomChief,
  checkBedRoomChief,
  bedRoomApplyChiefStepById,
  poorApplyStepById,
  completeStudentInfo,
  applyPoor,
  singleStuAwardInfo,
  insertActivityInfo,
  insertAwarInfo,
  singleStuActivityInfo,
  getPersonalInfo
  } from '../../api/student'
const student={
  actions:{
    ApplyBedRoomChief({commit},applyInfo){
      return new Promise((resolve,reject)=>{
        applyBedRoomChief(applyInfo).then(res=>{
          resolve(res);
        })
      })
    },
    // CheckBedRoomChief({commit},bedRoomId){
    //   return new Promise((resolve,reject)=>{
    //     checkBedRoomChief(bedRoomId).then(res=>{
    //       resolve(res);
    //     })
    //   })
    // },
    PoorApplyStepById({commit},studentId){
      return new Promise((resolve,reject)=>{
        poorApplyStepById(studentId).then(res=>{
          resolve(res);
        })
      })
    },
    BedRoomApplyChiefStepById({commit},studentId){
      return new Promise((resolve,reject)=>{
        bedRoomApplyChiefStepById(studentId).then(res=>{
          resolve(res);
        })
      })
    },
    GetPersonalInfo({commit},studentId){
      return new Promise((resolve,reject)=>{
        getPersonalInfo(studentId).then((res)=>{
          resolve(res);
        })
      })
    },
    CompleteStudentInfo({commit},stuInfo){
      return new Promise((resolve,reject)=>{
        completeStudentInfo(stuInfo).then(res=>{
          resolve(res);
        })
      })
    },
    ApplyPoor({commit},applyInfo){
      return new Promise((resolve,reject)=>{
        applyPoor(applyInfo).then(res=>{
          resolve(res);
        })
      })
    },
    SingleStuAwardInfo({commit},studentId){
      return new Promise((resolve,reject)=>{
        singleStuAwardInfo(studentId).then(res=>{
          resolve(res);
        })
      })
    },
    InsertAwarInfo({commit},awardInfo){
      return new Promise((resolve,reject)=>{
        insertAwarInfo(awardInfo).then(res=>{
          resolve(res);
        })
      })
    },
    InsertActivityInfo({commit},activeInfo){
      return new Promise((resolve,reject)=>{
        insertActivityInfo(activeInfo).then(res=>{
          resolve(res);
        })
      })
    },
    singleStuActivityInfo({commit},studentId){
      return new Promise((resolve,reject)=>{
        singleStuActivityInfo(studentId).then(res=>{
          resolve(res);
        })
      })
    }
  }
}
export default student;
