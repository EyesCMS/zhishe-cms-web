// import mock from 'mock'
import Mock from 'mockjs'
const membersList = []
for (let i = 0; i < 100; i++) {
  membersList.push(Mock.mock({
    userid: '@string',
    username: '@string',
    nickname: '@cname',
    'honor|1': ['龙王', '潜水'],
    'role|1': ['社长', '副社长', '游客', '管理员'],
    'credit|1-100': 1,
    avatar_url: '@string'
  }))
}
const tokens = {
  admin: {
    token: 'admin-token'
  },
  test: {
    token: 'test-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'test-token': {
    roles: ['normal'],
    introduction: 'I am an tester',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Tester'
  }
}

export default [
  // user login
  {
    url: '/auth/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 401,
          message: 'Account and password are incorrect.'
        }
      }
      const result = {
        'token': token.token,
        'tokenHead': 'Bearer'
      }

      return result
    }
  },

  // get user info
  {
    url: '/auth/info\.*',
    type: 'get',
    response: config => {
      var { token } = config.query
      token = token.substr(6)
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 401,
          message: 'Login failed, unable to get user details.'
        }
      }

      return info
    }
  },

  // user logout
  {
    url: '/auth/logout',
    type: 'post',
    response: _ => {
      return {
        code: 200
      }
    }
  },

  // get member
  {
    url: '/auth/members',
    type: 'get',
    response: config => {
      const { importance, type, title, pagenum = 1, pagesize = 5, sort } = config.query
      console.log(config.query)
      let mockList = membersList.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      if (sort === '-id') {
        mockList = mockList.reverse()
      }
      const pageList = mockList.filter((item, index) => index < pagesize * pagenum && index >= pagesize * (pagenum - 1))
      return {
        status: 200,
        data: pageList
      }
    }
  }
]
