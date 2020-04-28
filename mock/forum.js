import Mock from 'mockjs'
const invitationsList = []
for (let i = 0; i < 100; i++) {
  invitationsList.push(Mock.mock({
    'id|+1': 1,
    title: '@string',
    content: '@string',
    clubName: 'XX社',
    createAt: '2018-04-19 18:14:12',
    imgUrl: '131231241241.jpg',
    avatarUrl: 'e312312312312.jpg'
  }))
}
const AllinvitationsList = []
for (let i = 0; i < 100; i++) {
  AllinvitationsList.push(Mock.mock({
    title: '@string',
    content: '@string',
    club_name: 'XX社',
    create_at: '2018-04-19 18:14:12',
    img_url: '131231241241.jpg',
    avator_url: 'e312312312312.jpg'
  }))
}
const remarksList = []
for (let i = 0; i < 20; i++) {
  remarksList.push(Mock.mock({
    'userid|+1': 1,
    nickname: '@cname',
    content: '@string',
    createAt: '2018-04-19 18:14:12',
    avatorUrl: '@string'
  }))
}
export default [
  // GET /activity/:actId/remarks
  {
    url: '/activity/[0-9]/remarks',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = remarksList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        items: pageList,
        total_count: remarksList.length
      }
    }
  },
  // POST /forum/posts/:id/remarks
  {
    url: '/forum/posts/[0-9]/remarks',
    type: 'post',
    response: data => {
      console.log(data)
    }
  },
  // get one club invitation list
  {
    url: '/forum/[0-9]/posts',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = invitationsList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        items: pageList,
        total_count: invitationsList.length
      }
    }
  },
  // get invitation detail
  {
    url: '/forum/posts/[0-9]',
    type: 'get',
    response: _ => {
      // const { page, limit } = config.query
      console.log('123')
      return {
        items: {
          'id|+1': 1,
          title: '@string',
          content: '@string',
          club_name: 'XX社',
          create_at: '2018-04-19 18:14:12',
          img_url: '131231241241.jpg',
          avator_url: 'e312312312312.jpg'
          // remarks: remarksList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        }
      }
    }
  },
  // get all invitation list
  {
    url: '/forum/posts',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = AllinvitationsList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: AllinvitationsList.length
      }
    }
  }
  // get all clubs invitation details
  // {
  //   url: '/forum/posts/[0-9]',
  //   type: 'get',
  //   response: config => {
  //     const { page, limit } = config.query
  //     return {
  //       status: 200,
  //       data: {
  //         title: '@string',
  //         content: '@string',
  //         club_name: 'XX社',
  //         create_at: '2018-04-19 18:14:12',
  //         img_url: '131231241241.jpg',
  //         avator_url: 'e312312312312.jpg',
  //         remarks: remarksList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
  //       }
  //     }
  //   }
  // }
]
