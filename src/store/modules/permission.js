/* eslint-disable prefer-const */
import {
  asyncRoutes,
  constantRoutes
  // clubMenberRouter,
  // studentRoutes,
  // clubChiefRouter,
  // adminRouter
} from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * 在router/index.js文件的挂在的路由的meta有roles的属性该属性用来判断那个角色才有的这个属性
 * 如果meta.roles没有这个属性的话说明这个路由没有限制都能访问到
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * 将某个角色有的权限路由都填写到res中返回，若有子节点则遍历子节点
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
