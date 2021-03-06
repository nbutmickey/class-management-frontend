const getters = {
  sidebar:state => state.app.sidebar,
  token:state => state.app.token,
  role:state => state.app.roles,
  addRouters:state => state.permission.addRouters,
  username:state=>state.app.username,
  account:state=>state.app.account,
  permission_routers: state => state.permission.routers,
  schemeInfo:state=>state.classteacher.schemeInfo,
  stuInfo:state=>state.student.stuInfo
}

export default getters;
