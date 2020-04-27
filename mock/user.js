// import mock from 'mock'
// import Mock from 'mockjs'

const tokens = {
  admin: {
    token: 'admin-token'
  },
  test: {
    token: 'test-token'
  },
  chief: {
    token: 'chief-token'
  },
  student: {
    token: 'student-token'
  },
  menber: {
    token: 'menber-token'
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
    username: 'Super Admin',
    email: '这是一个邮箱',
    phone: '12345678910',
    slogan: '这是一条个性签名',
    major: '大数据'
  },
  'test-token': {
    roles: ['normal'],
    introduction: 'I am an tester',
    nickname: 'nickname',
    userid: 'userid',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Normal Tester',
    email: '这是一个邮箱',
    phone: '12345678910',
    slogan: '这是一条个性签名',
    major: '大数据'
  },
  'chief-token': {
    roles: ['chief'],
    introduction: 'I am an chief',
    nickname: 'nickname',
    userid: 'userid',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'Chief',
    email: '这是一个邮箱',
    phone: '12345678910',
    slogan: '这是一条个性签名',
    major: '大数据'
  },
  'student-token': {
    roles: ['student'],
    introduction: 'I am an chief',
    nickname: 'nickname',
    userid: 'userid',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'student',
    email: '这是一个邮箱',
    phone: '12345678910',
    slogan: '这是一条个性签名',
    major: '大数据'
  },
  'menber-token': {
    roles: ['menber'],
    introduction: 'I am an chief',
    nickname: 'nickname',
    userid: 'userid',
    avatar:
      'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    username: 'member',
    email: '这是一个邮箱',
    phone: '12345678910',
    slogan: '这是一条个性签名',
    major: '大数据'
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
  },
  {
    url: '/user/info',
    type: 'put',
    response: config => {
      const { nickname, major, email, slogan, phone } = config.query
      users.nickname = nickname
      users.major = major
      users.email = email
      users.slogan = slogan
      users.phone = phone
      return {
        status: 204
      }
    }
  }
]
