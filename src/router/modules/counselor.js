import Layout from '@/pages/Layout'
const counselorRouter = {
  path:'/',
  component:Layout,
  redirect:'/checkPoorStu',
  alwaysShow:true,
  meta:{
    title:'我的主页',
    role:['counselor']
  },
  children:[
    {
      path: 'checkPoorStu',
      component: () => import('@/pages/counselor/CheckPoorStu'),
      name:'checkPoorStu',
      meta:{
        title:'审批贫困生申请',
        icon:'fa fa-cog fa-fw',
        role:['counselor']
      }
    },
    {
      path: 'classCommitteeInfo',
      component: () => import('@/pages/counselor/ClassCommitteeInfo'),
      name:'classCommitteeInfo',
      meta:{
        title:'班级班委信息',
        icon:'fa fa-inbox fa-fw',
        role:['counselor']
      }
    },
    {
      path: 'poorStudentInfo',
      component: () => import('@/pages/counselor/PoorStudentInfo'),
      name:'poorStudentInfo',
      meta:{
        title:'贫困生信息',
        icon:'fa fa-inbox fa-fw',
        role:['counselor']
      }
    },
    {
      path: 'studentInfo',
      component: () => import('@/pages/counselor/StudentInfo'),
      name:'studentInfo',
      meta:{
        title:'学生信息',
        icon:'fa fa-inbox fa-fw',
        role:['counselor']
      }
    },
    {
      path: 'awardInfo',
      component: () => import('@/pages/counselor/AwardInfo'),
      name:'awardInfo',
      meta:{
        title:'获奖信息',
        icon:'fa fa-inbox fa-fw',
        role:['counselor']
      }
    },
    {
      path: 'violationInfo',
      component: () => import('@/pages/counselor/ViolationInfo'),
      name:'violationInfo',
      meta:{
        title:'违纪信息',
        icon:'fa fa-inbox fa-fw',
        role:['counselor']
      }
    }
    ]
}
export default counselorRouter;
