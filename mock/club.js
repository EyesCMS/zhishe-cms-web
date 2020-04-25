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
const bulletinsList = []
for (let i = 0; i < 100; i++) {
  bulletinsList.push(Mock.mock({
    'id|+1': 0,
    title: '@string',
    content: '@string',
    create_at: Mock.Random.date(),
    update_at: Mock.Random.date()
  }))
}
const clubsList = []
for (let i = 0; i < 100; i++) {
  clubsList.push(Mock.mock({
    'cid|+1': 0,
    avatar_url: '@string',
    name: '@string',
    chief_name: '@string'
  }))
}
// 创建社团申请
const createApplyList = []
for (let i = 0; i < 100; i++) {
  createApplyList.push(Mock.mock({
    'id': '@id',
    club_name: '@string',
    create_at: '@datetime',
    applicant: '@cname',
    reason: '@string',
    state: 0,
    accessory_url: '@string'
  }))
}
// 解散社团申请
const dismissApplyList = []
for (let i = 0; i < 100; i++) {
  dismissApplyList.push(Mock.mock({
    id: '@id',
    club_name: '@string',
    create_at: '@datetime',
    applicant: '@cname',
    reason: '@string',
    state: 0
  }))
}
// 社长换届申请
const changeApplyList = []
for (let i = 0; i < 100; i++) {
  changeApplyList.push(Mock.mock({
    id: '@id',
    club_name: '@string',
    old_chief_name: '@cname',
    new_chief_name: '@cname',
    create_at: '@datetime',
    state: 0
  }))
}
// 社团认证申请
const identifyApplyList = []
for (let i = 0; i < 100; i++) {
  identifyApplyList.push(Mock.mock({
    id: '@id',
    club_name: '@string',
    applicant: '@cname',
    accessory_url: '@string',
    create_at: '@datetime',
    state: 0
  }))
}
// 社团活动申请
const activityApplyList = []
for (let i = 0; i < 100; i++) {
  activityApplyList.push(Mock.mock({
    id: '@id',
    club_name: '@string',
    name: '@string',
    title: '@string',
    content: '@string',
    start_date: '@datetime',
    end_date: '@datetime',
    location: '@string',
    accessory_url: '@string',
    state: 0
  }))
}
//
export default [
  // get member
  {
    url: '/clubs/[0-9]/members',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)

      const pageList = membersList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: membersList.length
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
      console.log(config.query.page)
      const { page, limit } = config.query
      return {
        status: 200,
        data: bulletinsList.filter((item, index) => index < limit * page && index >= limit * (page - 1)),
        total: bulletinsList.length
      }
    }
  },
  
  // 社团创建申请
  {
    url: '/clubs/creations/audit',
    type: 'put',
    response: data => {
      const { id, state } = data
      console.log(data)
      for (let j = 0; j < createApplyList.length; j++) {
        if (changeApplyList[j].id === id) {
          createApplyList[j].state = state
        }
      }
      return {
        status: 204
      }
    }
  },
  {
    url: '/clubs/creations',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = createApplyList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: createApplyList.length
      }
    }
  },

  // 社团解散申请
  {
    url: '/clubs/dissolution/audit',
    type: 'put',
    response: data => {
      const { id, state } = data
      // console.log(data)
      for (let j = 0; j < dismissApplyList.length; j++) {
        if (changeApplyList[j].id === id) {
          dismissApplyList[j].state = state
        }
      }
      return {
        status: 204
      }
    }
  },
  {
    url: '/clubs/dissolutions',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = dismissApplyList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: dismissApplyList.length
      }
    }
  },

  // 社长换届申请
  {
    url: '/clubs/leader/changes',
    type: 'put',
    response: data => {
      const { id, state } = data
      // console.log(data)
      for (let j = 0; j < changeApplyList.length; j++) {
        if (changeApplyList[j].id === id) {
          changeApplyList[j].state = state
        }
      }
      return {
        status: 204
      }
    }
  },
  {
    url: '/clubs/leader/changes',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = changeApplyList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: changeApplyList.length
      }
    }
  },

  // 社团认证申请
  {
    url: '/clubs/certifications',
    type: 'put',
    response: data => {
      const { id, state } = data
      // console.log(data)
      for (let j = 0; j < identifyApplyList.length; j++) {
        if (changeApplyList[j].id === id) {
          identifyApplyList[j].state = state
        }
      }
      return {
        status: 204
      }
    }
  },
  {
    url: '/clubs/certifications',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = identifyApplyList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: identifyApplyList.length
      }
    }
  },

  // 社团活动申请
  {
    url: '/clubs/activities/audit',
    type: 'put',
    response: data => {
      const { id, state } = data
      for (let j = 0; j < activityApplyList.length; j++) {
        if (activityApplyList[j].id === id) {
          activityApplyList[j].state = state
        }
      }
      return {
        status: 204
      }
    }
  },
  {
    url: '/clubs/activities',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = activityApplyList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: activityApplyList.length
      }
    }
  },
  //

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
  },

  {
    url: '/clubs/quit',
    type: 'post',
    response: config => {
      return {
        status: 201
      }
    }
  },
  // create club
  {
    url: '/clubs/creations',
    type: 'post',
    response: config => {
      return {
        status: 201
      }
    }
  },
  // join club
  {
    url: '/clubs/join',
    type: 'post',
    response: config => {
      return {
        status: 201
      }
    }
  },
  // get clubs
  {
    url: '/clubs',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)

      const pageList = clubsList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: clubsList.length
      }
    }
  }

]
