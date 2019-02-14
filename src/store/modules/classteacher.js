import {checkRepeat,
        submitExcelInfo,
        submitClassTInfo,
        classDormitoryInfo,
        classMeetingRecord,
        allStuInfoByClass,
        setClassPosition,
        poorInfoByClass,
        classTeacherScheme,
        classDormitoryRecord,
        bedRoomHygiene,
        studentTalkRecord,
        emergencyInfo,
        awardList,
        classViolationList,
        classActivity,
        problemTypeList
} from "../../api/classteacher";

const classteacher={
  actions:{
    ProblemTypeList(){
      return new Promise((resolve,reject)=>{
        problemTypeList().then(res=>{
          resolve(res);
        })
      })
    },
    ClassActivity(activity){
      return new Promise((resolve,reject)=>{
        classActivity(activity).then(res=>{
          resolve(res);
        })
      })
    },
    ClassViolationList(jobId){
      return new Promise((resolve,reject)=>{
        classViolationList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    AwardList(jobId){
      return new Promise((resolve,reject)=>{
        awardList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    EmergencyInfo(info){
      return new Promise((resolve,reject)=>{
        emergencyInfo(info).then(res=>{
          resolve(res);
        })
      })
    },
    StudentTalkRecord(talkRecord){
      return new Promise((resolve,reject)=>{
        studentTalkRecord(talkRecord).then(res=>{
          resolve(res);
        })
      })
    },
    BedRoomHygiene(hygiene){
      return new Promise((resolve,reject)=>{
        bedRoomHygiene(hygiene).then(res=>{
          resolve(res);
        })
      })
    },
    ClassDormitoryRecord(dormitoryRecord){
      return new Promise((resolve,reject)=>{
        classDormitoryRecord(dormitoryRecord).then(res=>{
          resolve(res);
        })
      })
    },
    AllStuInfoByClass({commit},jobId){
      return new Promise((resolve,reject)=>{
        allStuInfoByClass(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    SetClassPosition({commit,positionInfo}){
      return new Promise((resolve,reject)=>{
        setClassPosition(positionInfo).then(res=>{
          resolve(res);
        })
      })
    },
    PoorInfoByClass({commit},jobId){
      return new Promise((resolve,reject)=>{
        poorInfoByClass(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    ClassTeacherSchema({commit},schema){
      return new Promise((resolve,reject)=>{
        classTeacherScheme(schema).then(res=>{
          resolve(res);
        })
      })
    },
    ClassDormitoryInfo({commit},jobId){
      return new Promise((resolve,reject)=>{
        classDormitoryInfo(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    Classmeetingnfo({commit},meetingInfo){
      return new Promise((resolve,reject)=>{
        classMeetingRecord(meetingInfo).then(res=>{
          resolve(res);
        })
      })
    },
    CheckRepeatClassT({commit},jobId){
      return new Promise((resolve,reject)=>{
        checkRepeat(jobId).then((res)=>{
          resolve(res);
        })
      })
    },
    SubmitClassTInfo({commit},classTInfo){
      return new Promise((resolve,reject)=>{
        submitClassTInfo(classTInfo).then((res)=>{
          resolve(res);
        })
      })
    },
    SubmitExcelClassTInfo({commit},classTInfo){
      return new Promise((resolve,reject)=>{
        submitExcelInfo(classTInfo).then((res)=>{
          resolve(res);
        })
      })
    }
  }
}

export default classteacher;
