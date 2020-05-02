import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    username: '',
    nickname: '',
    userid: '',
    phone: '',
    major: '',
    slogan: '',
    email: '',
    avatar: '',
    roles: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: state => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PHONE: (state, phone) => {
    state.phone = phone
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_SLOGAN: (state, slogan) => {
    state.slogan = slogan
  },
  SET_MAJOR: (state, major) => {
    state.major = major
  }
}

const actions = {
  // user login
  // 调用login api设置store的token并且将token存到session中
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password })
        .then(response => {
          console.log('@login response: ')
          console.log(response)
          const { token, tokenHead } = response.data
          const tokenStr = tokenHead + token
          commit('SET_TOKEN', tokenStr)
          setToken(tokenStr)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // get user info
  // 调用getInfo api 初始化user的各个属性
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token)
        .then(response => {
          console.log('@getInfo response: ')
          console.log(response)
          var data = response.data
          if (!data) {
            reject('Verification failed, please Login again.')
          }
          commit('SET_ROLES', data.roles)
          commit('SET_USERNAME', data.username)
          commit('SET_NICKNAME', data.nickname)
          commit('SET_PHONE', data.phone)
          commit('SET_EMAIL', data.email)
          commit('SET_SLOGAN', data.slogan)
          commit('SET_MAJOR', data.major)
          commit('SET_USERID', data.userid)
          commit('SET_AVATAR', data.avatar)
          resolve(data)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(response => {
          console.log('@store user logout:')
          console.log(response)
          removeToken() // must remove  token  first
          window.sessionStorage.removeItem('roles')
          resetRouter()

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          // dispatch('tagsView/delAllViews', null, { root: true })

          commit('RESET_STATE')
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      // const token = role + '-token'

      // commit('SET_TOKEN', token)
      // setToken(token)

      // TODO: update this
      // const { roles } = await dispatch('getInfo')
      const roles = [role]
      window.sessionStorage.setItem('roles', roles)
      resetRouter()

      commit('SET_ROLES', roles)
      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {
        root: true
      })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      // dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
