import request from '../utils/requests'

export function getCollegeInfo() {
  return request({
    url:'/allCollegeList',
    method:'GET',
  })
}

export function getClassInfo(collegeId) {
  return request({
    url:`/allClassList/${collegeId}`,
    method:'GET'
  })
}

export function getBuildInfo(currentPage,pageSize) {
  return request({
    url:'/allBedroomList',
    method:'GET',
    headers:{
      pageSize:pageSize,
      currentPage:currentPage
    }
  })
}

export function getBedRoomChiefList() {
  return request({
    url:'/allApplyChiefList',
    method:'GET',
  })
}

export function getBedRoomInfo(buildId,bedroomId) {
  return request({
    url:'/bedroomInfoById',
    method:'GET',
    params:{
      buildId:buildId,
      bedroomId:bedroomId
    }
  })
}

export function checkBedRoomChief(studentId,attitude) {
  return request({
    url:'/checkBedRoomChief',
    method:'POST',
    data:{
      adminAttitude:{
        studentId:studentId,
        attitude:attitude
      }
    }
  })
}

export function changeBedRoom(studentId,buildId,bedRoomId) {
  return request({
    url:'/changeBedroom',
    method:'POST',
    data:{
      changebedroomInfo:{
        studentId:studentId,
        buildId:buildId,
        bedRoomId:bedRoomId
      }
    }
  })
}
export function checkRepeat(id,type) {
  return request({
    url:'/checkIdRepeat',
    method:'GET',
    params:{
      id:id,
      type:type
    }
  })
}

export function submitExcelInfo(Info,type) {
  return request({
    url:'/mutileInfoUpload',
    method:'POST',
    data:{
      multipleInfo:Info,
      type:type
    }
  })
}

export function submitInfo(Info,type) {
  return request({
    url:'/inputInfo',
    method:'POST',
    data:{
      Info:Info,
      type:type
    }
  })
}
