import Cookies from 'js-cookie'
import {getToken,setToken,removeToken} from "../../utils/auth";
import {getUserInfo, loginByRole,logout} from "../../api/login";
import store from "../index";

const app = {
  state:{
    sidebar:{
      //从cookie中获取sidebarStatus的状态，0为关闭，1为开启_
      opened:!+Cookies.get('sidebarStatus'),
      withoutAnimation:false
    },
    token:getToken(),
    roles:[],
    username:'',
    account:''
  },
  mutations:{
    SET_TOKEN:(state,token)=>{
      state.token=token;
    },
    SET_ROLE:(state,roles)=>{
      state.roles=roles;
    },
    SET_USERNAME:(state,username)=>{
      state.username=username;
    },
    SET_ACCOUNT:(state,account)=>{
      state.account=account;
    },
    TOGGLE_SIDEBAR:state => {
      if(state.sidebar.opened){
        Cookies.set('sidebarStatus',1);
      }else{
        Cookies.set('sidebarStatus',0);
      }
      state.sidebar.opened=!state.sidebar.opened;
      state.sidebar.withoutAnimation=false;
    },
    CLOSE_SIDEBAR:(state,withoutAnimation)=>{
      // 1代表关闭侧边栏
      Cookies.set('sidebarStatus',1);
      state.sidebar.opened=false;
      state.sidebar.withoutAnimation=withoutAnimation;
    },
  },
  actions:{
    //切换sidebar
    ToggleSidebar({commit}){
      commit('TOGGLE_SIDEBAR');
    },
    //关闭sidebar
    CloseSidebar({commit},{withoutAnimation}){
      commit('CLOSE_SIDEBAR',withoutAnimation)
    },
    //通过role进行登录
    LoginByRole({commit},userInfo){
      return new Promise((resolve,reject) =>{
        loginByRole(userInfo.username,userInfo.password,userInfo.role).then(res=>{
          if(res.success){
            commit('SET_TOKEN',res.AccessToken);
            setToken(res.AccessToken);
            resolve(res.message);
          }else{
            reject(res.message);
          }
        })
      })
    },
    //获取用户角色信息
    GetUserInfo({commit,state}){
      return new Promise((resolve,reject)=>{
        getUserInfo(state.token).then((res)=>{
          if(res.roles&&res.roles.length>0){
            commit('SET_ROLE',res.roles);
            commit('SET_USERNAME',res.username);
            commit('SET_ACCOUNT',res.account);
          }else{
            reject('getInfo: roles must be a non-null array !');
          }
          resolve(res);
        }).catch(err=>{
          reject(err);
        })
      })}
    ,

    //前端登出
    FedLogOut({commit}){
      return new Promise((resolve)=>{
        commit('SET_TOKEN','');
        commit('SET_ROLE',[]);
        removeToken();
        resolve();
      })
    },
  }
}
export default app;
