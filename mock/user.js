// import mock from 'mock'
// import Mock from 'mockjs'

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
    nickname: 'nickname',
    userid: 'userid',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Super Admin'
  },
  'test-token': {
    roles: ['normal'],
    introduction: 'I am an tester',
    nickname: 'nickname',
    userid: 'userid',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Normal Tester'
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
        token: token.token,
        tokenHead: 'Bearer'
      }
      return result
    }
  },

  // user register
  {
    url: '/auth/register',
    type: 'post',
    response: config => {
      if (!tokens[config.body.name]) {
        tokens[config.body.name] = { token: 'test-token' }
        console.log(tokens)
        return {
          status: 201
        }
      } else {
        return {
          status: 409
        }
      }
    }
  },
  // GET /users/:username/question
  {
    url: '/users/username/question',
    type: 'get',
    response: () => {
      return {
        Status: 200,
        login_problem: 'what is your name?'
      }
    }
  },

  // Get /users/newpassword
  {
    url: '/users/newpassword',
    type: 'post',
    response: data => {
      console.log(data)
      return {
        status: 200
      }
    }
  },
  // POST /users/:uid/anwser
  {
    url: '/users/answer',
    type: 'post',
    response: config => {
      console.log(config)
      if (config) {
        return {
          status: 204
        }
      } else {
        return {
          status: 403
        }
      }
    }
  },
  // get user info
  {
    url: '/auth/info.*',
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
  }
]
