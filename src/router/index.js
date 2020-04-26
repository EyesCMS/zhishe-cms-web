import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  // homepage
  {
    path: '/home-page',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'HomePage',
        component: () => import('@/views/home-page/index'),
        meta: { title: '首页', icon: 'component' }
      }
    ]
  },
  // register
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  // forget
  {
    path: '/forget',
    component: () => import('@/views/login/forget'),
    hidden: true
  },
  // login
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  // 401
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  // /
  {
    path: '/',
    component: Layout,
    redirect: '/home-page',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  }
]

/**
 * studentRoutes
 * 普通学生界面的组件
 */
export const studentRoutes = [
  // clbus
  {
    path: '/clubs',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Clubs',
        component: () => import('@/views/clubs/index'),
        meta: { title: '所有社团', icon: 'search' }
      },
      {
        path: '/clubDetail',
        name: 'ClubDetail',
        component: () => import('@/views/club-detail/index'),
        meta: { title: '社团详情', noCache: true },
        hidden: true
      },
      {
        path: '/createClub',
        name: 'CreateClub',
        component: () => import('@/views/club-create/index'),
        meta: { title: '创建社团', noCache: true },
        hidden: true
      },
      {
        path: '/joinClub',
        name: 'JoinClub',
        component: () => import('@/views/club-join/index'),
        meta: { title: '加入社团申请', noCache: true },
        hidden: true
      }
    ]
  },
  // 活动论坛（学生页面）
  {
    path: '/forum',
    component: Layout,
    children: [
      {
        path: 'forum',
        name: 'Forum',
        component: () => import('@/views/forum/index'),
        meta: { title: '活动论坛', icon: 'message' }
      },
      {
        path: 'studentforum',
        name: 'StudentForm',
        component: () => import('@/views/forum/detail'),
        meta: { title: '帖子详情', noCache: true },
        hidden: true
      }
    ]
  },
  // 我的社团
  {
    path: '/myclub',
    component: Layout,
    redirect: 'noRedirect',
    name: 'MyClub',
    meta: { title: '我的社团', icon: 'peoples' },
    children: [
      {
        path: 'joinclub',
        name: 'JoinClub',
        component: () => import('@/views/myclub/joinclub'),
        meta: { title: '我加入的社团', noCache: true }
      },
      {
        path: 'manageclub',
        name: 'ManageClub',
        component: () => import('@/views/myclub/manageclub'),
        meta: { title: '我管理的社团', noCache: true }
      }
    ]
  },
  // 申请中心
  {
    path: '/applications',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Applications',
    meta: { title: '申请结果', icon: 'email' },
    children: [
      {
        path: 'creation',
        name: 'Creation',
        component: () => import('@/views/applications/creation'),
        meta: { title: '创建社团', noCache: true }
      },
      {
        path: 'join',
        name: 'Join',
        component: () => import('@/views/applications/join'),
        meta: { title: '加入社团', noCache: true }
      }
    ]
  }
]

/**
 * clubMenberRouter
 * 社员界面的组件
 */
export const clubMenberRouter = [
  // 社团风采
  {
    path: '/clubstyle',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ClubStyle',
    meta: {
      title: '社团风采',
      icon: 'fengcai',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/club-style/index.vue'),
        meta: { title: '社团风采', noCache: true }
      }
    ]
  },
  // 社团成员
  {
    path: '/clubmember',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ClubMember',
        component: () => import('@/views/club-member/index.vue'),
        meta: { title: '社团成员', icon: 'peoples', roles: ['admin'] }
      },
      {
        path: 'detail',
        name: 'MemberDetail',
        component: () => import('@/views/member-detail/index.vue'),
        hidden: true
      }
    ]
  },
  // 活动论坛（社员界面）
  {
    path: '/activityforum',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ActivityForum',
        component: () => import('@/views/activity-forum/index.vue'),
        meta: { title: '活动论坛', icon: 'message', roles: ['admin'] }
      },
      {
        path: 'detail',
        name: 'ActivityDetail',
        component: () => import('@/views/activity-forum/detail.vue'),
        hidden: true
      }
    ]
  },
  // 社团公告（社员界面）
  {
    path: '/announcement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Announcement',
        component: () => import('@/views/club-announcement/index.vue'),
        meta: { title: '社团公告', icon: 'message', roles: ['admin'] }
      }
    ]
  }
]

/**
 * clubChiefRouter
 * 社长界面的组件
 */
export const clubChiefRouter = [
  // 社团风采
  {
    path: '/clubstyle',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ClubStyle',
    meta: {
      title: '社团风采',
      icon: 'fengcai',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/club-style/index.vue'),
        meta: { title: '社团风采', noCache: true }
      }
    ]
  },
  // 社团成员
  // {
  //   path: '/clubmember',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'ClubMember',
  //       component: () => import('@/views/club-member/index.vue'),
  //       meta: { title: '社团成员', icon: 'peoples', roles: ['admin'] }
  //     },
  //     {
  //       path: 'detail',
  //       name: 'MemberDetail',
  //       component: () => import('@/views/member-detail/index.vue'),
  //       hidden: true
  //     }
  //   ]
  // },
  // 社团成员管理
  {
    path: '/membermanage',
    component: Layout,
    name: 'MemberManage',
    meta: { title: '社团成员管理', icon: 'membermanage', roles: ['amdin'] },
    children: [
      {
        path: 'list',
        name: 'MemberList',
        component: () => import('@/views/club-member/index.vue'),
        meta: { title: '查看所有成员', icon: 'people', roles: ['admin'] }
      },
      {
        path: 'add',
        name: 'MemberAdd',
        component: () => import('@/views/member-add/index.vue'),
        meta: { title: '审核加入申请', icon: 'applyadd', roles: ['admin'] }
      },
      {
        path: 'quit',
        name: 'MemberQuit',
        component: () => import('@/views/member-quit/index.vue'),
        meta: { title: '成员退出通知', icon: 'memberquit', roles: ['admin'] }
      }
    ]
  },

  // 社团活动管理
  {
    path: '/activitymanage',
    component: Layout,
    name: 'ActivityManage',
    children: [
      {
        path: 'list',
        name: 'ActivityList',
        component: () => import('@/views/club-member/index.vue'),
        meta: { title: '社团活动管理', icon: 'people', roles: ['admin'] }
      }
    ]
  }
]

/**
 * adminRouter
 * 管理员界面的组件
 */
export const adminRouter = [
  // 管理员菜单
  {
    path: '/admin/check',
    component: Layout,
    redirect: '/admin/check/createApply',
    alwaysShow: true, // will always show the root menu
    name: 'check',
    meta: {
      title: '审核申请',
      icon: 'form',
      roles: ['admin', 'normal'] // you can set roles in root nav
    },
    children: [
      {
        path: 'createApply',
        component: () => import('@/views/admin/check/createApply'),
        name: 'createApply',
        meta: {
          title: '社团创建申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'dismissApply',
        component: () => import('@/views/admin/check/dismissApply'),
        name: 'dismissApply',
        meta: {
          title: '社团解散申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'activityApply',
        component: () => import('@/views/admin/check/activityApply'),
        name: 'activityApply',
        meta: {
          title: '社团活动申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'changeApply',
        component: () => import('@/views/admin/check/changeApply'),
        name: 'changeApply',
        meta: {
          title: '社长换届申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'identifyApply',
        component: () => import('@/views/admin/check/identifyApply'),
        name: 'identifyApply',
        meta: {
          title: '社团认证申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 我的社团
  {
    path: '/myclub',
    component: Layout,
    redirect: 'noRedirect',
    name: 'MyClub',
    meta: { title: '我的社团', icon: 'peoples' },
    children: [
      {
        path: 'joinclub',
        name: 'JoinClub',
        component: () => import('@/views/myclub/joinclub'),
        meta: { title: '我加入的社团', noCache: true }
      },
      {
        path: 'manageclub',
        name: 'ManageClub',
        component: () => import('@/views/myclub/manageclub'),
        meta: { title: '我管理的社团', noCache: true }
      }
    ]
  },
  // 申请结果
  {
    path: '/applications',
    component: Layout,
    redirect: 'noRedirect',
    name: 'Applications',
    meta: { title: '申请结果', icon: 'email' },
    children: [
      {
        path: 'creation',
        name: 'Creation',
        component: () => import('@/views/applications/creation'),
        meta: { title: '加入社团', noCache: true }
      },
      {
        path: 'join',
        name: 'Join',
        component: () => import('@/views/applications/join'),
        meta: { title: '创建社团', noCache: true }
      }
    ]
  },
  // permission
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'normal'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  // 结束
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: { title: 'Error Pages', icon: '404' },
    children: [
      {
        path: '401',
        name: 'Page401',
        component: () => import('@/views/error-page/401'),
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/error-page/404'),
        meta: { title: '404', noCache: true }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },

  // 社员侧边栏路由

  // 社团风采
  {
    path: '/clubstyle',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ClubStyle',
    meta: {
      title: '社团风采',
      icon: 'fengcai',
      roles: ['admin']
    },
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/club-style/index.vue'),
        meta: { title: '社团风采', noCache: true }
      }
    ]
  },
  // 社团成员
  {
    path: '/clubmember',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ClubMember',
        component: () => import('@/views/club-member/index.vue'),
        meta: { title: '社团成员', icon: 'peoples', roles: ['admin'] }
      },
      {
        path: 'detail',
        name: 'MemberDetail',
        component: () => import('@/views/member-detail/index.vue'),
        hidden: true
      }
    ]
  },

  // 活动论坛（社员界面）
  {
    path: '/activityforum',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ActivityForum',
        component: () => import('@/views/activity-forum/index.vue'),
        meta: { title: '活动论坛', icon: 'message', roles: ['admin'] }
      },
      {
        path: 'detail',
        name: 'ActivityDetail',
        component: () => import('@/views/activity-forum/detail.vue'),
        meta: { title: '帖子详情', icon: 'message', roles: ['admin'] },
        hidden: true
      }
    ]
  },

  // 社团公告（社员界面）
  {
    path: '/announcement',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Announcement',
        component: () => import('@/views/club-announcement/index.vue'),
        meta: { title: '社团公告', icon: 'message', roles: ['admin'] }
      }
    ]
  }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes.concat(studentRoutes, clubChiefRouter)
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
