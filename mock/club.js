import Mock from 'mockjs'
const membersList = []
for (let i = 0; i < 100; i++) {
  membersList.push(Mock.mock({
    'userid|+1': 0,
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
    url: '/club/[0-9]/members',
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
    url: '/clubs/[0-9]/members/[0-9]',
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
  },
  // get bulletin detail
  {
    url: '/clubs/[0-9]/bulletins/[0-9]',
    type: 'get',
    response: config => {
      return {
        status: 200,
        data: {
          title: '关于第六届社团纳新活动的说明',
          content: '我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团',
          create_at: '2018-04-19 18:14:12',
          update_at: '2018-04-19 19:14:12'
        }
      }
    }
  },

  // get bulletin list
  {
    url: '/clubs/[0-9]/bulletins',
    type: 'get',
    response: config => {
      return {
        status: 200,
        'data|10': [{
          'id|+1': 0,
          title: '@string',
          content: '@string',
          create_at: Mock.Random.date(),
          update_at: Mock.Random.date()
        }]
      }
    }
  },

  // get club detail
  {
    url: '/clubs/[0-9]',
    type: 'get',
    response: config => {
      return {
        status: 200,
        data: {
          cid: 2,
          name: '篮球社',
          chief_id: 2,
          chief_name: '微微笑',
          avatar_url: 'http://xx/xxxx.png',
          slogan: 'XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团',
          member_count: 500,
          qq_group: '312512512'
        }
      }
    }
  }

]
