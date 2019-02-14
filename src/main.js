// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { getToken } from './utils/auth'
import {Message} from 'element-ui'
// import 'normalize.css/normalize.css' // A modern alternative to CSS resets

//引入element-ui
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

import '@/icons' // icon

/* eslint-disable no-new */
const whiteList = ['/login'] // 不重定向白名单
router.beforeEach((to,from,next)=>{
  if(getToken()){
    //如果有token
    if(to.path==='/login'){
      next({path:'/'})
    }
    else{
        if(store.getters.role.length===0){
            store.dispatch('GetUserInfo').then((res)=>{
              const roles=res.roles;
              //根据角色动态生成路由表
              store.dispatch('GenerateRoutes',{roles}).then(()=>{
                //动态添加可访问路由表
                router.addRoutes(store.getters.addRouters);
                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({...to,replace:true});
              })
            })
        }else{
          next();
        }

    }
  }else{
    //否则全部重定向到登录页
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
