const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.username,
  nickname: state => state.user.nickname,
  userid: state => state.user.userid,
  email: state => state.user.email,
  major: state => state.user.major,
  slogan: state => state.user.slogan,
  phone: state => state.user.phone,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
}
export default getters
