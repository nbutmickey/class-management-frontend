import Layout from '@/pages/Layout'

const adminRouter= {
  path:'/',
  component:Layout,
  redirect:'/classTeacherInfoInput',
  meta:{
    title:'我的主页',
    role:['admin']
  },
  children:[
    {
      path: 'classTeacherInfoInput',
      component: () => import('@/pages/admin/ClassTeacherInfoInput'),
      name:'classTeacherInfoInput',
      meta:{
        title:'班主任信息管理',
        icon:'manage-classteacher',
        role:['admin']
      }
    },
    {
      path: 'counselorInfoInput',
      component: () => import('@/pages/admin/CounselorInfoInput'),
      name:'counselorInfoInput',
      meta:{
        title:'辅导员信息管理',
        icon:'manage',
        role:['admin']
      }
    },
    {
      path: 'studentInfoInput',
      component: () => import('@/pages/admin/StuInfoInput'),
      name:'studentInfoInput',
      meta:{
        title:'学生信息管理',
        icon:'manage-student',
        role:['admin']
      }
    },
    {
      path: 'dormitoryManage',
      component: () => import('@/pages/admin/DormitoryManage'),
      name:'dormitoryManage',
      meta:{
        title:'宿舍管理',
        icon:'manage-dormitory',
        role:['admin']
      }
    }
  ]
}

export default adminRouter;
