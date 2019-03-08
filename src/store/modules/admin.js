import {getClassInfo,
        getCollegeInfo,
        submitInfo,
        submitExcelInfo,
        checkRepeat,
        getBuildInfo,
        getBedRoomChiefList,
        getBedRoomInfo,
        checkBedRoomChief,
        changeBedRoom
    } from "../../api/admin";
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
        },(error)=>{
          reject(error);
        })
      })
    },
    GetBuildInfo({commit},{currentPage,pageSize}){
      return new Promise((resolve,reject)=>{
          getBuildInfo(currentPage,pageSize).then((res)=>{
            resolve(res);
          })
      })
    },
    GetBedRoomInfo({commit},{buildId,bedRoomId}){
      return new Promise((resolve,reject)=>{
          getBedRoomInfo(buildId,bedRoomId).then((res)=>{
            resolve(res);
          })
      })
    },
    CheckBedRoomChief({commit},{studentId,attitude}){
      return new Promise((resolve,reject)=>{
        checkBedRoomChief(studentId,attitude).then(res=>{
          resolve(res);
        })
      })
    },
    ChangeBedRoom({coomit},{studentId,buildId,bedRoomId}){
      return new Promise((resolve,reject)=>{
        changeBedRoom(studentId,buildId,bedRoomId).then(res=>{
          resolve(res);
        })
      })
    },
    GetBedRoomChiefList({commit}){
      return new Promise((resolve,reject)=>{
          getBedRoomChiefList().then(res=>{
            resolve(res);
          })
      })
    },
    CheckRepeat({commit},info){
      return new Promise((resolve,reject)=>{
        checkRepeat(info.value,info.type).then((res)=>{
          resolve(res);
        })
      })
    },
    SubmitInfo({commit},allInfo){
      return new Promise((resolve,reject)=>{
        submitInfo(allInfo.info,allInfo.type).then((res)=>{
          resolve(res);
        })
      });
    },
    SubmitExcelInfo({commit},allInfo){
      return new Promise((resolve,reject)=>{
        submitExcelInfo(allInfo.info,allInfo.type).then((res)=>{
          resolve(res);
        })
      })
    }
  }
}

export default admin;
