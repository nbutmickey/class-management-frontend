import Layout from '@/pages/Layout'
const classteacherRouter = {
  path:'/',
  component:Layout,
  redirect:'/workplanSet',
  alwaysShow:true,
  meta:{
    title:'我的主页',
    role:['classteacher']
  },
  children:[
    {
      path: 'workplanSet',
      component: () => import('@/pages/classteacher/WorkPlanSet'),
      name:'workplanSet',
      meta:{
        title:'工作计划',
        icon:'fa fa-paper-plane fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'committeeSet',
      component: () => import('@/pages/classteacher/CommitteeSet'),
      name:'committeeSet',
      meta:{
        title:'班委设置',
        icon:'fa fa-cog fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'checkPoorStudent',
      component: () => import('@/pages/classteacher/CheckPoorStudent'),
      name:'checkPoorStudent',
      meta:{
        title:'审批贫困生',
        icon:'fa fa-cog fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'classmeetingRecord',
      component: () => import('@/pages/classteacher/ClassMeetingRecord'),
      name:'classmeetingRecord',
      meta:{
        title:'班会记录',
        icon:'fa fa-pencil-square fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'checkdormitoryRecord',
      component: () => import('@/pages/classteacher/CheckDormitoryRecord'),
      name:'checkdormitoryRecord',
      meta:{
        title:'查寝室记录',
        icon:'fa fa-pencil-square fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'stutalkRecord',
      component: () => import('@/pages/classteacher/StuTalkRecord'),
      name:'stutalkRecord',
      meta:{
        title:'学生谈话记录',
        icon:'fa fa-pencil-square fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'emergencyRecord',
      component: () => import('@/pages/classteacher/EmergencyRecord'),
      name:'emergencyRecord',
      meta:{
        title:'突发事件记录',
        icon:'fa fa-pencil-square fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'violationRecord',
      component: () => import('@/pages/classteacher/ViolationRecord'),
      name:'violationRecord',
      meta:{
        title:'学生违纪记录',
        icon:'fa fa-pencil-square fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'studentInfo',
      component: () => import('@/pages/classteacher/studentInfo'),
      name:'studentInfo',
      meta:{
        title:'学生基本信息',
        icon:'fa fa-inbox fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'poorStudentInfo',
      component: () => import('@/pages/classteacher/PoorStudentInfo'),
      name:'poorStudentInfo',
      meta:{
        title:'经济困难学生信息',
        icon:'fa fa-inbox fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'accommodationInfo',
      component: () => import('@/pages/classteacher/AccommodationInfo'),
      name:'accommodationInfo',
      meta:{
        title:'学生住宿情况',
        icon:'fa fa-inbox fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'awardInfo',
      component: () => import('@/pages/classteacher/AwardInfo'),
      name:'awardInfo',
      meta:{
        title:'学生获奖情况',
        icon:'fa fa-inbox fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'bedroomHygieneRecord',
      component: () => import('@/pages/classteacher/bedroomHygieneRecord'),
      name:'bedroomHygieneRecord',
      meta:{
        title:'寝室卫生情况',
        icon:'fa fa-inbox fa-fw',
        role:['classteacher']
      }
    },
    {
      path: 'handBook',
      component: () => import('@/pages/classteacher/HandBook'),
      name:'handBook',
      meta:{
        title:'班主任工作手册',
        icon:'fa fa-address-book-o fa-w',
        role:['classteacher']
      }
    }
  ]
}
export default classteacherRouter;
