import Mock from 'mockjs'
export default [
  // get invitation list
  {
    url: '/forum/[0-9]/posts',
    type: 'get',
    response: _ => {
      return {
        status: 200,
        'data|10': [{
          'id|+1': 0,
          title: '@string',
          content: '@string',
          create_at: Mock.Random.date()
        }]
      }
    }
  }
]
