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
        problemTypeList,
        emergencyInfoList,
        stuTalkInfoList,
        classMeetingInfoList,
        dormitoryInfoList,
        getClassPoorCheck,
    approvedPoorByClassTeacher,
  getViolationRecordList,
  fillViolationRecord
} from "../../api/classteacher";

const classteacher={
  state:{
    schemeInfo:{
      jobId:'',
      semester:'',
      content:'',
      update:false
    }
  },
  mutations:{
    SET_SCHEME:(state,schemeInfo)=>{
      state.schemeInfo.jobId=schemeInfo.jobId;
      state.schemeInfo.semester=schemeInfo.semester;
      state.schemeInfo.content=schemeInfo.content;
    }
  },
  actions:{
    GetViolationRecordList({commit},jobId){
      return new Promise((resolve,reject)=>{
        getViolationRecordList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    FillViolationRecord({commit},vioInfo){
      return new Promise((resolve,reject)=>{
        fillViolationRecord(vioInfo).then(res=>{
          resolve(res);
        })
      })
    },
    GetClassPoorCheck({commit},jobId){
      return new Promise((resolve,reject)=>{
        getClassPoorCheck(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    ApprovedPoorByClassTeacher({commit},poorAttitude){
      return new Promise((resolve,reject)=>{
        approvedPoorByClassTeacher(poorAttitude).then(res=>{
          resolve(res);
        })
      })
    },
    EmergencyInfoList({commit},jobId){
      return new Promise((resolve,reject)=>{
        emergencyInfoList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    StuTalkInfoList({commit},jobId){
      return new Promise((resolve,reject)=>{
        stuTalkInfoList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    ClassMeetingInfoList({commit},jobId){
      return new Promise((resolve,reject)=>{
        classMeetingInfoList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    DormitoryInfoList({commit},jobId){
      return new Promise((resolve,reject)=>{
        dormitoryInfoList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    ProblemTypeList({commit}){
      return new Promise((resolve,reject)=>{
        problemTypeList().then(res=>{
          resolve(res);
        })
      })
    },
    ClassActivity({commit},activity){
      return new Promise((resolve,reject)=>{
        classActivity(activity).then(res=>{
          resolve(res);
        })
      })
    },
    ClassViolationList({commit},jobId){
      return new Promise((resolve,reject)=>{
        classViolationList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    AwardList({commit},jobId){
      return new Promise((resolve,reject)=>{
        awardList(jobId).then(res=>{
          resolve(res);
        })
      })
    },
    EmergencyInfo({commit},info){
      return new Promise((resolve,reject)=>{
        emergencyInfo(info).then(res=>{
          resolve(res);
        })
      })
    },
    StudentTalkRecord({commit},talkRecord){
      return new Promise((resolve,reject)=>{
        studentTalkRecord(talkRecord).then(res=>{
          resolve(res);
        })
      })
    },
    BedRoomHygiene({commit},hygiene){
      return new Promise((resolve,reject)=>{
        bedRoomHygiene(hygiene).then(res=>{
          resolve(res);
        })
      })
    },
    ClassDormitoryRecord({commmit},dormitoryRecord){
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
    SetClassPosition({commit},positionInfo){
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
    ClassTeacherScheme({commit},scheme){
      return new Promise((resolve,reject)=>{
        classTeacherScheme(scheme).then(res=>{
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
    ClassmeetingInfo({commit},meetingInfo){
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
