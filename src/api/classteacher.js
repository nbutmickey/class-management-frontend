import request from '@/utils/requests'
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

export function submitClassTInfo(classTInfo) {
  return request({
    url:'/inputClassTInfo',
    method:'POST',
    data:{
      classTInfo:classTInfo
    }
  })
}
