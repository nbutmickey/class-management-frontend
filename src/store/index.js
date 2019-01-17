import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import getters from './getters'
import admin from './modules/admin'
import student from './modules/student'
import counselor from './modules/counselor'
import classteacher from './modules/classteacher'
import permission from './modules/permission'

Vue.use(Vuex);

const store = new Vuex.Store({
  modules:{
    app,
    admin,
    student,
    counselor,
    classteacher,
    permission
  },
  getters
})

export default store;
