import request from '../utils/requests'

//根据选择的角色进行登录
export function loginByRole(username,password,role) {
  return request({
    url:'/login',
    method:'POST',
    data:{
      loginInfo:{
        username:username,
        password:password,
        role:role
      }
    }
  })
}


//登录之后获取用户信息，包含角色。
export function getUserInfo(token) {
  return request({
      url: '/getUserInfo',
      method: 'POST',
      data: {
        token:token
      }
    }
  )
}
