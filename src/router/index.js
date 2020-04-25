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
        component: () => import('@/views/club-detail/index.vue'),
        meta: { title: '社团详情', noCache: true },
        hidden: true
      },
      {
        path: '/createClub',
        name: 'CreateClub',
        component: () => import('@/views/club-create/index.vue'),
        meta: { title: '创建社团', noCache: true },
        hidden: true
      },
      {
        path: '/joinClub',
        name: 'JoinClub',
        component: () => import('@/views/club-join/index.vue'),
        meta: { title: '申请加入社团', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/forum',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Forum',
        component: () => import('@/views/forum/index.vue'),
        meta: { title: '活动论坛', icon: 'message' }
      },
      {
        path: 'invitationdetail',
        name: 'InvitationDetail',
        component: () => import('@/views/forum/detail.vue'),
        meta: { title: '帖子详情', noCache: true },
        hidden: true
      }
    ]
  },

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        // path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },

  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },
  {
    path: '/forget',
    component: () => import('@/views/login/forget'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  {
    path: '/form',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  {
    path: 'external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
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
  // 社团成员
  // {
  //   path: '/clubmember',
  //   component: Layout,
  //   redirect: 'noRedirect',
  //   name: 'ClubMember',
  //   meta:
  //   {
  //     title: '社团成员',
  //     icon: 'peoples',
  //     roles: ['admin']
  //   },
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'index',
  //       component: () => import('@/views/club-member/index.vue'),
  //       meta: { title: '社团成员', noCache: true }
  //     }
  //   ]
  // }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
