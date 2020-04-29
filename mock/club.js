import Mock from 'mockjs'
const membersList = []
for (let i = 0; i < 100; i++) {
  membersList.push(
    Mock.mock({
      'userid|+1': 0,
      username: '@string',
      nickname: '@cname',
      'honor|1': ['龙王', '潜水'],
      'role|1': ['社长', '副社长', '游客', '管理员'],
      'credit|1-100': 1,
      avatar_url: '@string'
    })
  )
}
const bulletinsList = []
for (let i = 0; i < 100; i++) {
  bulletinsList.push(
    Mock.mock({
      'id|+1': 0,
      title: '@string',
      content: '@string',
      create_at: Mock.Random.date(),
      update_at: Mock.Random.date()
    })
  )
}
const clubsList = []
for (let i = 0; i < 100; i++) {
  clubsList.push(
    Mock.mock({
      cid: '@string',
      avatar_url: '@string',
      name: '@string',
      chief_name: '@cname'
    })
  )
}
const JoinclubsList = []
for (let i = 0; i < 100; i++) {
  JoinclubsList.push(
    Mock.mock({
      'cid|+1': 0,
      avatar_url: '@string',
      name: '@string',
      chief_name: '@cname'
    })
  )
}
const ManageclubsList = []
for (let i = 0; i < 100; i++) {
  ManageclubsList.push(
    Mock.mock({
      'cid|+1': 0,
      avatar_url: '@string',
      name: '@string',
      chief_name: '@cname'
    })
  )
}
const JoinApplicationsList = []
for (let i = 0; i < 100; i++) {
  JoinApplicationsList.push(
    Mock.mock({
      'cid|+1': 0,
      club_id: '@id',
      reason: '@string',
      'state|1': ['待审核', '已通过', '未通过']
    })
  )
}
const getCreateApplicationsList = []
for (let i = 0; i < 100; i++) {
  getCreateApplicationsList.push(
    Mock.mock({
      'cid|+1': 0,
      club_name: '@string',
      'club_type|1': ['文艺', '休闲', '运动', '其他'],
      reason: '@string',
      'state|1': ['待审核', '已通过', '未通过']
    })
  )
}
// 创建社团申请
const createApplyList = []
for (let i = 0; i < 100; i++) {
  createApplyList.push(
    Mock.mock({
      id: '@id',
      clubName: '@string',
      createAt: '@datetime',
      applicant: '@cname',
      reason: '@string',
      state: 0,
      accessoryUrl: '@string'
    })
  )
}
// 解散社团申请
const dismissApplyList = []
for (let i = 0; i < 100; i++) {
  dismissApplyList.push(
    Mock.mock({
      id: '@id',
      clubName: '@string',
      createAt: '@datetime',
      applicant: '@cname',
      reason: '@string',
      state: 0
    })
  )
}
// 社长换届申请
const changeApplyList = []
for (let i = 0; i < 100; i++) {
  changeApplyList.push(
    Mock.mock({
      id: '@id',
      clubName: '@string',
      oldChiefName: '@cname',
      newChiefName: '@cname',
      createAt: '@datetime',
      state: 0
    })
  )
}
// 社团认证申请
const identifyApplyList = []
for (let i = 0; i < 100; i++) {
  identifyApplyList.push(
    Mock.mock({
      id: '@id',
      clubName: '@string',
      accessoryUrl: '@string',
      createAt: '@datetime',
      reason: '@string',
      state: 0
    })
  )
}
// 社团活动申请
const activityApplyList = []
for (let i = 0; i < 100; i++) {
  activityApplyList.push(
    Mock.mock({
      id: '@id',
      clubName: '@string',
      name: '@string',
      title: '@string',
      content: '@string',
      startDate: '@datetime',
      endDate: '@datetime',
      location: '@string',
      accessoryUrl: '@string',
      state: 0
    })
  )
}
// 退社通知
const quitList = []
for (let i = 0; i < 50; i++) {
  quitList.push(
    Mock.mock({
      applicant: '@cname',
      reason: '@string',
      createAt: '@datetime'
    })
  )
}
// 申请加入列表
const addList = []
for (let i = 0; i < 50; i++) {
  addList.push(
    Mock.mock({
      'id|+1': 1,
      applicant: '@cname',
      reason: '@string',
      create_at: '@datetime',
      'state|1': [0, 1, 2]
    })
  )
}
// 活动申请列表
const activitiesList = []
for (let i = 0; i < 50; i++) {
  activitiesList.push(
    Mock.mock({
      'id|+1': 1,
      name: '@string',
      location: '@string',
      content: '@string',
      member_count: 255,
      start_date: '@datetime',
      end_date: '@datetime',
      'state|1': [0, 1, 2, 3, 4]
    })
  )
}
//
export default [
  {
    url: '/clubs/[0-9]/activities',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(page)
      console.log(limit)
      const pageList = activitiesList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        total_count: activitiesList.length,
        items: pageList
      }
    }
  },
  {
    url: '/clubs/[0-9]/bulletins',
    type: 'post',
    response: config => {
      return {
        Status: 201
      }
    }
  },
  // PUT /clubs/:club/bulletins/:bulletin_id
  {
    url: '/clubs/[0-9]/bulletins/[0-9]',
    type: 'put',
    response: () => {
      return {
        Status: 204
      }
    }
  },
  // DELETE /clubs/bulletins/:bulletin_id
  {
    url: '/clubs/bulletins/[0-9]',
    type: 'delete',
    response: () => {
      return {
        Status: 204
      }
    }
  },
  // POST /clubs/activities
  {
    url: '/clubs/activities',
    type: 'post',
    response: config => {
      return {}
    }
  },
  // PUT /clubs/activities/state
  {
    url: '/clubs/activities/state',
    type: 'put',
    response: config => {
      return {}
    }
  },
  // DELETE /clubs/activities/:id
  {
    url: '/clubs/activities/[0-9]',
    type: 'delete',
    response: config => {
      return {}
    }
  },
  // GET /clubs/recommended
  {
    url: '/clubs/recommended',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(page)
      console.log(limit)
      const pageList = clubsList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        Status: 200,
        pageList
      }
    }
  },
  // POST /clubs/dissolution
  {
    url: '/clubs/dissolution',
    type: 'post',
    response: () => {
      return {
        Status: 201
      }
    }
  },
  // POST /clubs/leader/change
  {
    url: '/clubs/leader/change',
    type: 'post',
    response: () => {
      return {
        Status: 201
      }
    }
  },
  // 查看退社通知列表
  {
    url: '/clubs/[0-9]/quit',
    type: 'get',
    response: config => {
      console.log(config.query.page)
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = quitList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        items: pageList,
        total_count: quitList.length
      }
    }
  },
  {
    url: '/clubs/[0-9]/joins',
    type: 'get',
    response: config => {
      console.log(456)
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = addList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        items: pageList,
        total_count: addList.length
      }
    }
  },
  {
    url: '/clubs/joins/audit',
    type: 'put',
    response: config => {
      const { id, state } = config.query
      for (let i = 0; i < addList.length; ++i) {
        if (addList[i].id === id) {
          addList[i].state = state
        }
      }
    }
  },
  // 查看加入社团申请列表
  {
    url: '/clubs/join/[0-9]',
    type: 'get',
    response: config => {
      console.log(config.query.page)
      const { page, limit } = config.query
      return {
        status: 200,
        data: JoinApplicationsList.filter(
          (item, index) => index < limit * page && index >= limit * (page - 1)
        ),
        total: JoinApplicationsList.length
      }
    }
  },
  // 查看创建社团申请列表
  {
    url: '/clubs/creations/[0-9]',
    type: 'get',
    response: config => {
      console.log(config.query.page)
      const { page, limit } = config.query
      return {
        status: 200,
        data: getCreateApplicationsList.filter(
          (item, index) => index < limit * page && index >= limit * (page - 1)
        ),
        total: getCreateApplicationsList.length
      }
    }
  },
  // get member detail
  {
    url: '/clubs/[0-9]/members/[0-9]',
    type: 'get',
    response: _ => {
      return {
        items: {
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
  // get member
  {
    url: '/clubs/[0-9]/members',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)

      const pageList = membersList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        items: pageList,
        // pageList,
        total_count: membersList.length
      }
    }
  },
  // get bulletin detail
  {
    url: '/clubs/[0-9]/bulletins/[0-9]',
    type: 'get',
    response: _ => {
      return {
        items: {
          title: '关于第六届社团纳新活动的说明',
          content:
            '我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团我们是一个很优秀的社团',
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
        items: bulletinsList.filter(
          (item, index) => index < limit * page && index >= limit * (page - 1)
        ),
        total_count: bulletinsList.length
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
      const pageList = createApplyList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        items: pageList,
        total_count: createApplyList.length
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
      const pageList = dismissApplyList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        items: pageList,
        total_count: dismissApplyList.length
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
      const pageList = changeApplyList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        items: pageList,
        total_count: changeApplyList.length
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
      const pageList = identifyApplyList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        items: pageList,
        total_count: identifyApplyList.length
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
      const pageList = activityApplyList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        items: pageList,
        total_count: activityApplyList.length
      }
    }
  },
  // 获取学生已加入社团列表
  {
    url: '/clubs/users/[0-9]',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = JoinclubsList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        data: pageList,
        total: JoinclubsList.length
      }
    }
  },
  // 获取学生管理社团列表
  {
    url: '/clubs/manager/[0-9]',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = ManageclubsList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        data: pageList,
        total: ManageclubsList.length
      }
    }
  },
  // get club detail
  {
    url: '/clubs/[0-9]',
    type: 'get',
    response: _ => {
      return {
        items: {
          cid: 2,
          name: '篮球社',
          chief_id: 2,
          chief_name: '微微笑',
          avatar_url: 'http://xx/xxxx.png',
          slogan:
            'XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团XX社是一个非常非常厉害的社团',
          member_count: 500,
          qq_group: '312512512'
        }
      }
    }
  },

  {
    url: '/clubs/quit',
    type: 'post',
    response: data => {
      console.log(data)
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
  // identify club
  {
    url: '/clubs/certifications',
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

      const pageList = clubsList.filter(
        (item, index) => index < limit * page && index >= limit * (page - 1)
      )
      return {
        status: 200,
        data: pageList,
        total: clubsList.length
      }
    }
  }
]
