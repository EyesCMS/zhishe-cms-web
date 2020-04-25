import Mock from 'mockjs'
const invitationsList = []
for (let i = 0; i < 100; i++) {
  invitationsList.push(Mock.mock({
    title: '@string',
    content: '@string',
    club_name: 'XX社',
    create_at: '2018-04-19 18:14:12',
    img_url: '131231241241.jpg',
    avator_url: 'e312312312312.jpg'
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
  }
]
