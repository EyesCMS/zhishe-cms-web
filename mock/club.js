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
export default [
  // get member
  {
    url: '/club/:club/members',
    type: 'get',
    response: config => {
      const {
        importance,
        type,
        title,
        pagenum = 1,
        pagesize = 5,
        sort
      } = config.query
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
  },

  // get member detail
  {
    url: '/clubs/:club/members/:userid',
    type: 'get',
    response: config => {
      return {
        status: 200,
        data: {
          nickname: '@cname',
          slogan: '我只是一个测试的',
          position: '社员',
          major: '数计学院软件工程',
          phone: '1231254125',
          email: '1195669260@qq.com',
          address: '@string',
          credit: 100,
          honor: '龙王'
        }
      }
    }
  }
]
