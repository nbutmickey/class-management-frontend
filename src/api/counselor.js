import request from '../utils/requests'

export function allStudentList(jobId,pageSize,currentPage) {
  return request({
    url:`/allStudentList/${jobId}`,
    method:'GET',
    headers:{
        pageSize:pageSize,
        currentPage:currentPage
      }
  })
}
export function approvedPoor(poorAttitude) {
  return request({
    url:'/approvedPoor',
    method:'POST',
    data:{
      poorAttitude:poorAttitude
    }
  })
}

export function allPoorList(jobId) {
  return request({
    url:`/allPoorList/${jobId}`,
    method:'GET'
  })
}
export function allPoorApply(jobId) {
  return request({
    url:`/allApplyPoorList/${jobId}`,
    method:'GET'
  })
}

export function classCommitList(jobId) {
  return request({
    url:`/classCommitList/${jobId}`,
    method:'GET'
  })
}
export function allStuVioList(jobId) {
  return request({
    url:`/allStuVioList/${jobId}`,
    mrthod:'GET'
  })
}

export function allStuAwardList(jobId) {
  return request({
    url:`/allStuAwardList/${jobId}`,
    mrthod:'GET'
  })
}
