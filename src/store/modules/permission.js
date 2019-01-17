import {asyncRouteMap,constantRouteMap} from "../../router/index";

//通过meta.role判断是否与当前用户权限匹配
function hasPermisson(roles,route) {
  if(route.meta&&route.meta.role){
    return roles.some(role=>route.meta.role.includes(role))
  }
  else{
    return true;
  }
}

//递归过滤异步路由表，返回符合用户角色权限的路由表。
function filterAsyncRouter(routes,roles) {
  const res=[];
  routes.forEach(route=>{
    const tmp={...route};
    if(hasPermisson(roles,tmp)){
      if(tmp.children){
        tmp.children=filterAsyncRouter(tmp.children,roles);
      }
      res.push(tmp);
    }
  })
  return res;
}

const permission = {
  state:{
    routers:constantRouteMap,
    addRouters:[]
  },
  mutations:{
    SET_ROUTERS:(state,routers)=>{
      //将路由存储至addRouters中
      state.addRouters=routers;
      //将静态路由和异步路由连接起来
      state.routers=constantRouteMap.concat(routers);
    }
  },
  actions:{
    GenerateRoutes({commit},data){
      return new Promise(resolve=>{
        const {roles}=data;
        let accessRouters=filterAsyncRouter(asyncRouteMap,roles);
        commit('SET_ROUTERS',accessRouters);
        resolve();
      })
    }
  }
}

export default permission;

