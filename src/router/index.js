import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'
import index from '../views/priceManage/index'
Vue.use(Router)

export const constantRouterMap = [{
  path: '/login',
  component: () =>
			import('@/views/login/index'),
  hidden: true
},
{
  path: '/register',
  component: () =>
			import('@/views/register/index'),
  hidden: true
},
{
  path: '/404',
  component: () =>
			import('@/views/404'),
  hidden: true
},
{
  path: '*',
  redirect: '/404',
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  name: 'dashboard',
  hidden: true,
  meta: {
    title: '陕西省粮食企业管理平台',
    icon: 'example'
  },
  children: [{
    path: 'dashboard',
    component: () =>
				import('@/views/dashboard/index'),
    meta: {
      title: '陕西省粮食企业管理平台',
      icon: 'example'
    }
  }]
},
// 企业信息审核开始
{
  path: '/qyxxsh',
  component: Layout,
  meta: {
    title: '企业信息审核',
    icon: 'example'
  },
  children: [{
    path: 'index',
    name: '企业信息审核',
    component: () =>
					import('@/views/qyxxsh/xinxishenh/index'),
    meta: {
      title: '企业信息审核',
      icon: 'form'
    }
  },
  {
    path: 'xinxishenh-sh',
    name: '企业信息审核查看',
    hidden: true,
    meta: {
      title: '企业信息审核查看',
      icon: 'form'
    },
    component: () =>
					import('@/views/qyxxsh/xinxishenh/sh')
  },
  {
    path: 'xinxishenh-biangeng',
    name: '信息变更审核',
    meta: {
      title: '信息变更审核',
      icon: 'form'
    },
    component: () =>
					import('@/views/qyxxsh/xinxishenh/biangeng')
  },
  {
    path: 'xinxishenh-biangengsh',
    name: '变更',
    hidden: true,
    meta: {
      title: '变更',
      icon: 'form'
    },
    component: () =>
					import('@/views/qyxxsh/xinxishenh/biangengsh')
  },
  {
    path: 'xinxishenh-lishijl',
    name: '历史',
    hidden: true,
    meta: {
      title: '历史',
      icon: 'form'
    },
    component: () =>
					import('@/views/qyxxsh/xinxishenh/lishijl')
  },
  {
    path: 'xinxishenh-historical',
    name: '历史',
    hidden: true,
    meta: {
      title: '历史',
      icon: 'form'
    },
    component: () =>
					import('@/views/qyxxsh/xinxishenh/historical')
  }

  ]
},
  // 价格监测列表
{
  path: '/priceManage',
  component: Layout,
  name: '价格监测点管理',
  meta: {
    title: '价格监测点管理',
    icon: 'example'
  },
  children: [{
    path: '/monitor',
    name: '监测点管理',
    component: index,
    meta: {
      title: '监测点管理',
      icon: 'form'
    },
    children: [{
      path: 'pointMaintain',
      name: '监测点维护',
      component: () =>
					import('@/views/priceManage/monitoring/pointMaintain'),
      meta: {
        title: '监测点维护',
        icon: 'table'
      }
    }, {
      path: 'typeMaintain',
      name: '监测类型维护',
      component: () =>
					import('@/views/priceManage/monitoring/typeMaintain'),
      meta: {
        title: '监测类型维护',
        icon: 'table'
      }
    }, {
      path: 'userMaintain',
      name: '监测人员维护',
      component: () =>
					import('@/views/priceManage/monitoring/userMaintain'),
      meta: {
        title: '监测人员维护',
        icon: 'table'
      }
    }]
  }, {
    path: '/statistics',
    name: '价格统计',
    component: () =>
				import('@/views/priceManage'),
    meta: {
      title: '价格统计',
      icon: 'form'
    },
    children: [{
      path: 'information',
      name: '信息统计',
      component: () =>
					import('@/views/priceManage/priceStatistics/informationStatistics'),
      meta: {
        title: '信息统计',
        icon: 'table'
      }
    }, {
      path: 'monitoring',
      name: '各监测点统计',
      component: () =>
					import('@/views/priceManage/priceStatistics/monitoringStatistics'),
      meta: {
        title: '各监测点统计',
        icon: 'table'
      }
    }, {
      path: 'validQuote',
      name: '有效报价统计',
      component: () =>
					import('@/views/priceManage/priceStatistics/validQuote'),
      meta: {
        title: '有效报价统计',
        icon: 'table'
      }
    }, {
      path: 'priceList',
      name: '监测点价格明细',
      component: () =>
					import('@/views/priceManage/priceStatistics/priceList'),
      meta: {
        title: '监测点价格明细',
        icon: 'table'
      }
    }]
  }, {
    path: '/weekly',
    name: '价格周评',
    component: () =>
				import('@/views/priceManage'),
    meta: {
      title: '价格周评',
      icon: 'form'
    },
    children: [{
      path: 'weeklyAudit',
      name: '价格周评审核',
      component: () =>
					import('@/views/priceManage/priceweekly/weeklyAudit'),
      meta: {
        title: '价格周评审核',
        icon: 'table'
      }
    }]
  }]
},
  /* 公告内容  */
{
  path: '/management',
  component: Layout,
  meta: {
    title: '公告管理',
    icon: 'example'
  },
  children: [{
    path: 'application',
    name: '公告管理',
    component: () =>
				import('@/views/management/application'),
    meta: {
      title: '公告管理',
      icon: 'form'
    }
  }]
},
  // 资格申报
{
  path: '/qualDec',
  component: Layout,
  meta: {
    title: '资格申报',
    icon: 'example'
  },
  children: [
    // 新办审批模块路由
    {
      path: '/newApproval',
      component: index,
      meta: {
        title: '新办审批',
        icon: 'example'
      },
      children: [{
        path: 'newApplication',
        name: '新申请信息',
        component: () =>
							import('@/views/qualDec/newApproval/newApplication'),
        meta: {
          title: '新申请信息',
          icon: 'form'
        }
      },
      {
        path: 'accepted',
        name: '已受理信息',
        component: () =>
							import('@/views/qualDec/newApproval/accepted'),
        meta: {
          title: '已受理信息',
          icon: 'form'
        }
      },
      {
        path: 'passed',
        name: '已通过信息',
        component: () =>
							import('@/views/qualDec/newApproval/passed'),
        meta: {
          title: '已通过信息',
          icon: 'form'
        }
      },
      {
        path: 'noPassed',
        name: '未通过信息',
        component: () =>
							import('@/views/qualDec/newApproval/noPassed'),
        meta: {
          title: '未通过信息',
          icon: 'form'
        }
      },
      {
        path: 'revoked',
        name: '已吊销信息',
        component: () =>
							import('@/views/qualDec/newApproval/revoked'),
        meta: {
          title: '已吊销信息',
          icon: 'form'
        }
      },
      {
        path: 'reportForm',
        name: '申报详情',
        hidden: true,
        component: () =>
							import('@/views/qualDec/newApproval/reportForm'),
        meta: {
          title: '申报详情',
          icon: 'form'
        }
      }
      ]
    },

    // 变更审批模块路由
    {
      path: '/changeApproval',
      component: index,
      meta: {
        title: '变更审批',
        icon: 'example'
      },
      children: [{
        path: 'changeRequest',
        name: '变更申请信息',
        component: () =>
							import('@/views/qualDec/changeApproval/changeRequest'),
        meta: {
          title: '变更申请信息',
          icon: 'form'
        }
      },
      {
        path: 'dismissed',
        name: '已驳回信息',
        component: () =>
							import('@/views/qualDec/changeApproval/dismissed'),
        meta: {
          title: '已驳回信息',
          icon: 'form'
        }
      },
      {
        path: 'changed',
        name: '已变更信息',
        component: () =>
							import('@/views/qualDec/changeApproval/changed'),
        meta: {
          title: '已变更信息',
          icon: 'form'
        }
      },
      {
        path: 'reportForm',
        name: '变更详情',
        hidden: true,
        component: () =>
							import('@/views/qualDec/changeApproval/reportForm'),
        meta: {
          title: '变更详情',
          icon: 'form'
        }
      }
      ]
    },

    // 许可信息模块路由
    {
      path: '/license',
      component: index,
      meta: {
        title: '许可证信息',
        icon: 'example'
      },
      children: [
        // {
        //   path: 'information',
        //   name: '许可证信息',
        //   component: () =>
        //     import('@/views/license/information'),
        //   meta: {
        //     title: '许可证信息',
        //     icon: 'form'
        //   }
        // },
        {
          path: 'maintain',
          name: '许可证信息',
          component: () =>
							import('@/views/qualDec/license/maintain'),
          meta: {
            title: '许可证信息',
            icon: 'form'
          }
        }
      ]
    }
  ]
},

  // 任务填报审批
{
  path: '/task',
  component: Layout,
  name: 'task',
  meta: {
    title: '任务管理',
    icon: 'example'
  },
  children: [{
    path: 'reportForm1',
    name: '代签收任务',
    component: () =>
			import('@/views/taskReport/reportForm1'),
    meta: {
      title: '代签收任务',
      icon: 'wangshangshenbao'
    },
    children: []
  }, {
    path: 'reportForm2',
    name: '待办任务',
    component: () =>
			import('@/views/taskReport/reportForm2'),
    meta: {
      title: '待办任务',
      icon: 'wangshangshenbao'
    },
    children: []
  }, {
    path: 'reportForm3',
    hidden: true,
    name: '已办任务',
    component: () =>
			import('@/views/taskReport/reportForm3'),
    meta: {
      title: '已办任务',
      icon: 'wangshangshenbao'
    }
  }, {
    path: 'reportForm4',
    name: '参与的任务',
    component: () =>
			import('@/views/taskReport/reportForm4'),
    meta: {
      title: '参与的任务',
      icon: 'wangshangshenbao'
    }
  }, {
    path: 'reportForm5',
    name: '发起流程',
    component: () =>
			import('@/views/taskReport/reportForm5'),
    meta: {
      title: '发起流程',
      icon: 'wangshangshenbao'
    }
  }]
}

]

let a = []
a = a.concat(constantRouterMap)
// a = a.concat(constantRouterMap1)
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: a
})
