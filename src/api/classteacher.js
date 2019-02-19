import request from '../utils/requests'
export function checkRepeat(jobId) {
  return request({
    url:'/checkClassTRepeat',
    method:'GET',
    params:{jobId}
  })
}

export function submitExcelInfo(classTInfo) {
  return request({
    url:'/uploadClassTInfo',
    method:'POST',
    data:{
      multipleClassTInfo:classTInfo
    }
  })
}

export function allStuInfoByClass(jobId) {
  return request({
    url:`/allBasicList/${jobId}`,
    method:'GET'
  })
}

export function setClassPosition(classPosition) {
  return request({
    url:`/setClassPosition`,
    method:'POST',
    data:{
      classPosition:{
        position:classPosition.position,
        studentId:classPosition.studentId
      }
    }
  })
}

export function getClassPoorCheck(jobId) {
  return request({
    url:`/getClassPoorCheck/${jobId}`,
    method:'GET'
  })
}

export function approvedPoorByClassTeacher(poorAttitude){
  return request({
    url:'/approvedPoorByClassTeacher',
    method:'POST',
    data:{
      poorAttitude:poorAttitude
    }
  })
}


export function poorInfoByClass(jobId) {
  return request({
    url:`/classPoorList/${jobId}`,
    method:'GET'
  })
}

export function classDormitoryInfo(jobId) {
  return request({
    url:`/classDormitoryList/${jobId}`,
    method:'GET'
  })
}
export function classTeacherScheme(schemeInfo) {
  return request({
    url:'/fillClassTeacherScheme',
    method:'POST',
    data:{
      schemeInfo:schemeInfo
    }
  })
}

export function classMeetingRecord(meetingInfo) {
 return request({
   url:'/fillClassMeetingRecord',
   method:'POST',
   data:{
     meetingInfo:meetingInfo
   }
 })
}
export function classDormitoryRecord(dormitoryRecord) {
  return request({
    url:'/fillClassDormitoryRecord',
    method:'POST',
    data:{
      dormitoryRecord:dormitoryRecord
    }
  })
}

export function bedRoomHygiene(bedRoomHygiene) {
  return request({
    url:'/fillBedroomHygiene',
    method:'POST',
    data:{
      bedRoomHygiene:bedRoomHygiene
    }
  })
}

export function studentTalkRecord(talkRecord) {
  return request({
    url:'/fillStudentTalkRecord',
    method:'POST',
    data:{
      talkRecord:talkRecord
    }
  })
}
export function emergencyInfo(emergencyInfo) {
  return request({
    url:'/fillEmergencyInfo',
    method:'POST',
    data:{
      emergencyInfo:emergencyInfo
    }
  })
}

export function awardList(jobId) {
  return request({
    url:`/classAwardList/${jobId}`,
    method:'GET'
  })
}

export function classViolationList(jobId) {
  return request({
    url:`/classViolationList/${jobId}`,
    method:'GET'
  })
}
export function classActivity(classActivity) {
  return request({
    url:'/fillClassActivity',
    method:'POST',
    data:{
      classActivity:classActivity
    }
  })
}

export function problemTypeList() {
  return request({
    url:'/problemTypeList',
    method:'GET'
  })
}
export function submitClassTInfo(classTInfo) {
  return request({
    url:'/inputClassTInfo',
    method:'POST',
    data:{
      classTInfo:classTInfo
    }
  })
}

export function emergencyInfoList(jobId) {
  return request({
    url:`/emergencyRecordList/${jobId}`,
    method:'GET'
  })
}
export function stuTalkInfoList(jobId) {
  return request({
    url:`/stuTalkRecordList/${jobId}`,
    method:'GET'
  })
}
export function classMeetingInfoList(jobId) {
  return request({
    url:`/classMeetingRecordList/${jobId}`,
    method:'GET'
  })
}
export function dormitoryInfoList(jobId) {
  return request({
    url:`/dormitoryRecordList/${jobId}`,
    method:'GET'
  })
}
