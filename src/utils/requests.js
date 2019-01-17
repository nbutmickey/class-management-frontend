import axios from 'axios';
import store from '../store';
import {getToken} from "./auth";
//封装一个axios

//创建一个axios实例
const service=axios.create({
  baseURL:'http://127.0.0.1:3000',
  timeout:5000
})

//请求拦截器
service.interceptors.request.use(
  config=>{
  //如果store中存在Token，那么每次请求都必须携带token，以便后端对身份进行验证
  if(store.getters.token){
    config.headers['x-token']=getToken();
  }
  //否则返回我们的配置
    return config;
  },
  error=>{
    //console.log(error);
    //如果出现错误，那么直接返回一个Promise，状态为reject
   return  Promise.reject(error);
  })

//响应拦截器
service.interceptors.response.use(
  //针对返回的数据进行相关提示
  response=>{
    return response.data
  },
  //错误处理
  error=>{
    console.log(error);
    return Promise.reject(error);
  }
)


export default service;
