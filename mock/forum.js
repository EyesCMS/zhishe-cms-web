import Mock from 'mockjs'
const invitationsList = []
for (let i = 0; i < 100; i++) {
  invitationsList.push(Mock.mock({
    'id|+1': 1,
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
    create_at: '2018-04-19 18:14:12',
    avator_url: '@string'
  }))
}
export default [
  // get invitation list
  {
    url: '/forum/[0-9]/posts',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      console.log(config.query)
      const pageList = invitationsList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
      return {
        status: 200,
        data: pageList,
        total: invitationsList.length
      }
    }
  },

  // get invitation detail
  {
    url: '/forum/posts/[0-9]',
    type: 'get',
    response: config => {
      const { page, limit } = config.query
      return {
        status: 200,
        data: {
          title: '@string',
          content: '@string',
          club_name: 'XX社',
          create_at: '2018-04-19 18:14:12',
          img_url: '131231241241.jpg',
          avator_url: 'e312312312312.jpg',
          remarks: remarksList.filter((item, index) => index < limit * page && index >= limit * (page - 1))
        }
      }
    }
  }
]
