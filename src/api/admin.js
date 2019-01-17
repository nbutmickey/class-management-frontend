import request from '../utils/requests'

export function getCollegeInfo() {
  return request({
    url:'/getAllCollege',
    method:'GET',
  })
}

export function getClassInfo(collegeId) {
  return request({
    url:'/getAllClass',
    method:'GET',
    params:{collegeId}
  })
}

export function checkRepeat(studentId) {
  return request({
    url:'/checkStudentRepeat',
    method:'GET',
    params:{studentId}
  })
}

export function submitExcelInfo(stuInfo) {
  return request({
    url:'/uploadStudentInfo',
    method:'POST',
    data:{
      multipleStuInfo:stuInfo
    }
  })
}

export function submitStuInfo(stuInfo) {
  return request({
    url:'/inputStudentInfo',
    method:'POST',
    data:{
      studentInfo:stuInfo
    }
  })
}
