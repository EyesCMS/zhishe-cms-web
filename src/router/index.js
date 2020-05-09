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
    path: '',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/base/home/index'),
        meta: { title: '首页', icon: 'home' }
      }
    ]
  },
  // 个人中心
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/base/profile/index'),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', noCache: true }
      }
    ]
  },
  // register
  {
    path: '/register',
    component: () => import('@/views/base/register/index'),
    hidden: true
  },
  // forget
  {
    path: '/forget',
    component: () => import('@/views/base/login/forget'),
    hidden: true
  },
  // login
  {
    path: '/login',
    component: () => import('@/views/base/login/index'),
    hidden: true
  },
  // 404
  {
    path: '/404',
    component: () => import('@/views/base/error-page/404'),
    hidden: true
  },
  // 401
  {
    path: '/401',
    component: () => import('@/views/base/error-page/401'),
    hidden: true
  }
  // /
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/home',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       component: () => import('@/views/home/index'),
  //       meta: { title: 'Dashboard', icon: 'home', affix: true }
  //     }
  //   ]
  // }
]
/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // clbus
  {
    path: '/student',
    component: Layout,
    redirect: '/student/index',
    name: 'AllClub',
    meta: { title: '所有社团', icon: 'search', roles: ['student'] },
    children: [
      {
        path: 'index',
        name: 'Clubs',
        component: () => import('@/views/student/clubs/index'),
        meta: { title: '搜索社团', noCache: true, roles: ['student'] }
      },
      {
        path: '/clubDetail',
        name: 'ClubDetail',
        component: () => import('@/views/student/club-detail/index'),
        meta: { title: '社团详情', noCache: true, roles: ['student'] },
        hidden: true
      },
      {
        path: '/createClub',
        name: 'CreateClub',
        component: () => import('@/views/student/club-create/index'),
        meta: { title: '创建社团', noCache: true, roles: ['student'] }
      },
      {
        path: '/joinClub',
        name: 'joinClub',
        component: () => import('@/views/student/club-join/index'),
        meta: { title: '加入社团申请', noCache: true, roles: ['student'] },
        hidden: true
      }
    ]
  },
  // 我的社团
  {
    path: '/myclub',
    component: Layout,
    redirect: '/myclub/joinclub',
    name: 'MyClub',
    meta: { title: '我的社团', icon: 'peoples', roles: ['student'] },
    children: [
      {
        path: 'joinclub',
        name: 'JoinClub',
        component: () => import('@/views/student/myclub/joinclub'),
        meta: { title: '我加入的社团', noCache: true, roles: ['student'] }
      },
      {
        path: 'manageclub',
        name: 'ManageClub',
        component: () => import('@/views/student/myclub/manageclub'),
        meta: { title: '我管理的社团', noCache: true, roles: ['student'] }
      }
    ]
  },
  // 申请中心
  {
    path: '/applications',
    component: Layout,
    redirect: '/applications/creation',
    name: 'Applications',
    meta: { title: '申请结果', icon: 'email', roles: ['student'] },
    children: [
      {
        path: 'creation',
        name: 'Creation',
        component: () => import('@/views/student/applications/creation'),
        meta: { title: '创建社团', noCache: true, roles: ['student'] }
      },
      {
        path: 'join',
        name: 'Join',
        component: () => import('@/views/student/applications/join'),
        meta: { title: '加入社团', noCache: true, roles: ['student'] }
      }
    ]
  },
  // 活动论坛（学生页面）
  {
    path: '/forum',
    component: Layout,
    redirect: '/forum/activity',
    name: 'forum',
    meta: { title: '活动论坛', icon: 'message', roles: ['student'] },
    children: [
      {
        path: 'activity',
        name: 'activity',
        component: () => import('@/views/student/forum/index'),
        meta: { title: '活动帖', icon: 'message' }
      },
      {
        path: 'activityDetail',
        name: 'activityDetail',
        component: () => import('@/views/student/forum/detail'),
        meta: { title: '活动帖详情', noCache: true },
        hidden: true
      },
      {
        path: 'personalPost',
        name: 'personalPost',
        component: () => import('@/views/chief/forum-manage/index'),
        meta: { title: '个人帖', icon: 'people', roles: ['chief', 'student'] }
      },
      {
        path: 'postManage',
        name: 'postManage',
        hidden: true,
        component: () => import('@/views/chief/forum-manage/manage'),
        meta: { title: '我的帖子', roles: ['chief', 'student'] }
      }
    ]
  },
  // 社团风采
  {
    path: '/clubstyle',
    component: Layout,
    redirect: 'noRedirect',
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('@/views/member/club-style/index.vue'),
        meta: {
          title: '社团风采',
          noCache: true,
          icon: 'fengcai',
          roles: ['member', 'chief']
        }
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
        component: () => import('@/views/member/club-member/index.vue'),
        meta: { title: '社团成员', icon: 'peoples', roles: ['member'] }
      },
      {
        path: 'detail',
        name: 'MemberDetail',
        component: () => import('@/views/member/member-detail/index.vue'),
        meta: { title: '成员详情', roles: ['member'] },
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
        component: () => import('@/views/member/activity-forum/index.vue'),
        meta: { title: '活动论坛', icon: 'message', roles: ['member', 'chief'] }
      },
      {
        path: 'detail',
        name: 'ActivityDetail',
        component: () => import('@/views/member/activity-forum/detail.vue'),
        meta: { title: '帖子详情', roles: ['member', 'chief'] },
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
        name: 'announcement',
        component: () => import('@/views/member/club-announcement/index'),
        meta: { title: '社团公告', icon: 'message', roles: ['member'] }
      }
    ]
  },
  // 社团成员管理
  {
    path: '/membermanage',
    redirect: 'list',
    component: Layout,
    name: 'MemberManage',
    meta: { title: '社团成员', icon: 'membermanage', roles: ['chief'] },
    children: [
      {
        path: 'list',
        name: 'MemberList',
        component: () => import('@/views/member/club-member/index.vue'),
        meta: { title: '查看所有成员', icon: 'people', roles: ['chief'] }
      },
      {
        path: 'detail',
        name: 'MemberDetail',
        component: () => import('@/views/member/member-detail/index.vue'),
        meta: { title: '成员详情', roles: ['chief'] },
        hidden: true
      },
      {
        path: 'add',
        name: 'MemberAdd',
        component: () => import('@/views/chief/member-add/index.vue'),
        meta: { title: '审核加入申请', icon: 'applyadd', roles: ['chief'] }
      },
      {
        path: 'quit',
        name: 'MemberQuit',
        component: () => import('@/views/chief/member-quit/index.vue'),
        meta: { title: '成员退出通知', icon: 'memberquit', roles: ['chief'] }
      }
    ]
  },

  // 社团活动管理
  {
    path: '/activitymanage',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'activityList',
        component: () => import('@/views/chief/activity-manage/index.vue'),
        meta: { title: '社团活动管理', icon: 'people', roles: ['chief'] }
      }
    ]
  },
  // // 社团论坛管理
  // {
  //   path: '/forumManage',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'forum',
  //       name: 'forum',
  //       component: () => import('@/views/chief/forum-manage/index'),
  //       meta: { title: '我的论坛', icon: 'people', roles: ['chief', 'student'] }
  //     },
  //     {
  //       path: 'manage',
  //       name: 'manage',
  //       hidden: true,
  //       component: () => import('@/views/chief/forum-manage/manage'),
  //       meta: { title: '论坛管理', roles: ['chief', 'student'] }
  //     }
  //   ]
  // },
  // 社团简介管理
  {
    path: '/Detailmanage',
    component: Layout,
    children: [
      {
        path: 'Detail',
        name: 'Detailmanage',
        component: () => import('@/views/chief/club-detail/index'),
        meta: { title: '社团信息', icon: 'message', roles: ['chief'] }
      }
    ]
  },
  // 社团公告管理
  {
    path: '/Announcement',
    component: Layout,
    name: 'Announcement',
    redirect: '/Announcement/index',
    meta: { title: '社团公告', icon: 'message', roles: ['chief'] },
    children: [
      {
        path: 'index',
        name: 'announcement',
        component: () => import('@/views/member/club-announcement/index'),
        meta: { title: '社团公告', roles: ['chief'] }
      },
      {
        path: 'Announce',
        name: 'announce',
        component: () => import('@/views/chief/announcement-mamage/index'),
        meta: { title: '公告管理', roles: ['chief'] }
      }
    ]
  },
  // 社团解散管理
  {
    path: '/dissolution',
    component: Layout,
    children: [
      {
        path: 'dissolution',
        name: 'dissolution',
        component: () => import('@/views/chief/club-dissolution/index'),
        meta: { title: '解散社团', icon: 'message', roles: ['chief'] }
      }
    ]
  },
  // 社团换届管理
  {
    path: '/chiefChange',
    component: Layout,
    children: [
      {
        path: 'Change',
        name: 'chiefchange',
        component: () => import('@/views/chief/chief-change/index'),
        meta: { title: '换届管理', icon: 'message', roles: ['chief'] }
      }
    ]
  },
  // 社团申请管理
  {
    path: '/chief',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'IdentifyApply',
        component: () => import('@/views/chief/club-identify/index'),
        meta: { title: '社团认证申请', icon: 'form', roles: ['chief'] }
      }
    ]
  },
  // 管理员菜单
  {
    path: '/administrator/check',
    component: Layout,
    redirect: '/administrator/check/createApply',
    alwaysShow: true, // will always show the root menu
    name: 'check',
    meta: {
      title: '审核申请',
      icon: 'form',
      roles: ['admin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'createApply',
        component: () => import('@/views/administrator/check/createApply'),
        name: 'createApply',
        meta: {
          title: '社团创建申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'dismissApply',
        component: () => import('@/views/administrator/check/dismissApply'),
        name: 'dismissApply',
        meta: {
          title: '社团解散申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'activityApply',
        component: () => import('@/views/administrator/check/activityApply'),
        name: 'activityApply',
        meta: {
          title: '社团活动申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'changeApply',
        component: () => import('@/views/administrator/check/changeApply'),
        name: 'changeApply',
        meta: {
          title: '社长换届申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'identifyApply',
        component: () => import('@/views/administrator/check/identifyApply'),
        name: 'identifyApply',
        meta: {
          title: '社团认证申请',
          roles: ['admin'] // or you can only set roles in sub nav
        }
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
    hidden: true,
    meta: {
      title: 'Permission',
      icon: 'lock'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission'
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
          title: 'Role Permission'
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
    hidden: true,
    meta: { title: 'Error Pages', icon: '404' },
    children: [
      {
        path: '401',
        name: 'Page401',
        component: () => import('@/views/base/error-page/401'),
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/base/error-page/404'),
        meta: { title: '404', noCache: true }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    // routes: ROUTER
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
