import Layout from '@/pages/Layout'
const counselorRouter = {
  path:'/',
  component:Layout,
  redirect:'/classCommitteeInfo',
  alwaysShow:true,
  meta:{
    title:'我的主页',
    role:['counselor']
  },
  children:[
    // {
    //   path: 'index',
    //   component: () => import('@/pages/counselor/index'),
    //   name:'index',
    //   meta:{
    //     title:'个人主页',
    //     icon:'personal',
    //     role:['counselor']
    //   }
    // },
    {
      path: 'classCommitteeInfo',
      component: () => import('@/pages/counselor/ClassCommitteeInfo'),
      name:'classCommitteeInfo',
      meta:{
        title:'班级班委信息',
        icon:'class-committee',
        role:['counselor']
      }
    },
    {
      path: 'checkPoorStu',
      component: () => import('@/pages/counselor/CheckPoorStu'),
      name:'checkPoorStu',
      meta:{
        title:'审批贫困生申请',
        icon:'check-poor',
        role:['counselor']
      }
    },
    {
      path: 'poorStudentInfo',
      component: () => import('@/pages/counselor/PoorStudentInfo'),
      name:'poorStudentInfo',
      meta:{
        title:'贫困生信息',
        icon:'poor-info',
        role:['counselor']
      }
    },
    {
      path: 'studentInfo',
      component: () => import('@/pages/counselor/StudentInfo'),
      name:'studentInfo',
      meta:{
        title:'学生信息',
        icon:'studentInfo',
        role:['counselor']
      }
    },
    {
      path: 'awardInfo',
      component: () => import('@/pages/counselor/AwardInfo'),
      name:'awardInfo',
      meta:{
        title:'获奖信息',
        icon:'awardInfo',
        role:['counselor']
      }
    },
    {
      path: 'violationInfo',
      component: () => import('@/pages/counselor/ViolationInfo'),
      name:'violationInfo',
      meta:{
        title:'违纪信息',
        icon:'violationInfo',
        role:['counselor']
      }
    }
    ]
}
export default counselorRouter;
