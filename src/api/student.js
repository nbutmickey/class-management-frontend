import request from '../utils/requests'

export function applyBedRoomChief(applyInfo) {
  return request({
    url:'/applyBedRoomChief',
    method:'POST',
    data:{
      apply:applyInfo
    }
  })
}

export function checkBedRoomChief(bedRoomId) {
  return request({
    url:`/checkBedRoomChief/${bedRoomId}`,
    method:'GET'
  })
}

export function poorApplyStepById(studentId) {
  return request({
    url:`/poorApplyStepById/${studentId}`,
    method:'GET'
  })
}
export function bedRoomApplyChiefStepById(studentId) {
  return request({
    url:`/bedRoomApplyChiefStepById/${studentId}`,
    method:'GET'
  })
}

export function getPersonalInfo(studentId) {
  return request({
    url:`/getPersonalInfo/${studentId}`,
    method:'GET'
  })
}

export function completeStudentInfo(stuInfo) {
  console.log(stuInfo);
  return request({
    url:'/completeStudentInfo',
    method:'POST',
    data:{
      stuInfo:stuInfo
    }
  })
}

export function applyPoor(applyInfo) {
  return request({
    url:'/applyPoor',
    method:'POST',
    data:{
      applyInfo:applyInfo
    }
  })
}

export function singleStuAwardInfo(studentId) {
  return request({
    url: `/singleStuAwardInfo/${studentId}`,
    method:'GET'
  })
}

export function insertActivityInfo(activeInfo) {
  return request({
    url:'/insertActivityInfo',
    method:'POST',
    data:{
      activeInfo:activeInfo
    }
  })
}
export function insertAwarInfo(awardInfo) {
  return request({
    url:'/insertAwardInfo',
    method:'POST',
    data:{
      awardInfo:awardInfo
    }
  })
}
export function singleStuActivityInfo(studentId) {
  return request({
    url:`/singleStuActivityInfo/${studentId}`,
    method:'GET'
  })
}

