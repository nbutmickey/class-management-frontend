import Layout from '@/pages/Layout'
const studentRouter = {
  path:'/',
  component:Layout,
  redirect:'/personalInfo',
  alwaysShow:true,
  meta:{
    title:'我的主页',
    role:['student']
  },
  children:[
    {
      path: 'personalInfo',
      component: () => import('@/pages/student/personalInfo'),
      name:'personalInfo',
      meta:{
        title:'个人信息管理',
        icon:'student-personal',
        role:['student']
      }
    },
    {
      path: 'activityInfoManage',
      component: () => import('@/pages/student/ActivityInfoManage'),
      name:'activityInfoManage',
      meta:{
        title:'党团活动管理',
        icon:'student-activity',
        role:['student']
      }
    },
    {
      path: 'awardInfoManage',
      component: () => import('@/pages/student/AwardInfoManage'),
      name:'AwardInfoManage',
      meta:{
        title:'获奖信息管理',
        icon:'student-award',
        role:['student']
      }
    },
    {
      path: 'applyBedRoomChief',
      component: () => import('@/pages/student/ApplyBedRoomChief'),
      name:'applyBedRoomChief',
      meta:{
        title:'寝室长申请',
        icon:'student-applyBedChief',
        role:['student']
      }
    },
    {
      path: 'applyPoor',
      component: () => import('@/pages/student/ApplyPoor'),
      name:'ApplyPoor',
      meta:{
        title:'贫困生申请',
        icon:'student-applyPoor',
        role:['student']
      }
    }
  ]
}
export default studentRouter;
