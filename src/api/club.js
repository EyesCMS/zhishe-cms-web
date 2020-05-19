import request from '@/utils/request'
// GET /clubs/:clubId/dissolution
export function getDissolutionApply(clubId) {
  return request({
    url: `/clubs/${clubId}/dissolution`,
    method: 'get'
  })
}
// GET /clubs/:clubId/leaderChange
export function getLeaderChangeApply(clubId) {
  return request({
    url: `/clubs/${clubId}/leaderChange`,
    method: 'get'
  })
}
export function dissolution(data) {
  return request({
    url: `/clubs/dissolution`,
    method: 'post',
    data
  })
}
export function leaderchange(data) {
  return request({
    url: `/clubs/leader/change`,
    method: 'post',
    data
  })
}
// PUT /clubs/:clubId/pic
export function submitPic(clubId, data) {
  return request({
    url: `/clubs/${clubId}/pic`,
    method: 'put',
    data
  })
}
// POST /clubs/:clubId/alter/info

export function changeClubInfo(clubId, data) {
  return request({
    url: `/clubs/${clubId}/info`,
    method: 'put',
    data
  })
}
export function getMemberList(clubid, query) {
  return request({
    url: `/clubs/${clubid}/members`,
    method: 'get',
    params: query
  })
}
export function recommended(query) {
  return request({
    url: `/clubs/recommended`,
    method: 'get',
    params: query
  })
}
export function getMemberDetail(clubid, userid) {
  return request({
    url: `/clubs/${clubid}/members/${userid}`,
    method: 'get'
  })
}

export function listBulletins(clubid, query) {
  return request({
    url: `/clubs/${clubid}/bulletins`,
    method: 'get',
    params: query
  })
}

export function getBulletinDetail(clubId, id) {
  return request({
    url: `/clubs/${clubId}/bulletins/${id}`,
    method: 'get'
  })
}
// 发布公告
export function publishBulletin(cid, data) {
  return request({
    url: `/clubs/${cid}/bulletins`,
    method: 'post',
    data
  })
}
// 删除公告
export function deleteBulletin(id) {
  return request({
    url: `/clubs/bulletins/${id}`,
    method: 'delete'
  })
}
// 修改公告
export function changeBulletinDetail(cid, id, data) {
  return request({
    url: `/clubs/${cid}/bulletins/${id}`,
    method: 'put',
    data
  })
}
// 创建社团申请
export function pushToCreateApply(data) {
  return request({
    url: '/clubs/creations/audit',
    method: 'put',
    data
  })
}
export function getCreateApplyList(params) {
  return request({
    url: `/clubs/creations`,
    method: 'get',
    params: params
  })
}
// 社团解散申请
export function pushToDismissApply(data) {
  return request({
    url: '/clubs/dissolution/audit',
    method: 'put',
    data
  })
}
export function getDismissApplyList(params) {
  return request({
    url: '/clubs/dissolution',
    method: 'get',
    params: params
  })
}
// 社长换届申请
export function pushToChangeApply(data) {
  return request({
    url: '/clubs/leader/changes',
    method: 'put',
    data
  })
}
export function getChangeApplyList(params) {
  return request({
    url: `/clubs/leader/changes`,
    method: 'get',
    params: params
  })
}
// 社团认证申请
export function getMyIdentifyApplyList(clubid, query) {
  return request({
    url: `/clubs/${clubid}/certifications`,
    method: 'get',
    params: query
  })
}
export function pushToIdentifyApply(data) {
  return request({
    url: '/clubs/certifications',
    method: 'put',
    data
  })
}
export function getIdentifyApplyList(params) {
  return request({
    url: `/clubs/certifications`,
    method: 'get',
    params: params
  })
}
// 社团活动申请
export function pushToActivityApply(data) {
  return request({
    url: '/clubs/activities/audit',
    method: 'put',
    data
  })
}
export function getActivityApplyList(params) {
  return request({
    url: `/clubs/activities`,
    method: 'get',
    params: params
  })
}

export function ApplyToJoin(data) {
  return request({
    url: '/clubs/join',
    method: 'post',
    data
  })
}

export function getClubDetail(clubid) {
  return request({
    url: `/clubs/${clubid}`,
    method: 'get'
  })
}

export function quitClub(data) {
  return request({
    url: '/clubs/quit',
    method: 'post',
    data
  })
}

export function getJoinApplicationsList(query) {
  return request({
    url: `/clubs/users/joins`,
    method: 'get',
    params: query
  })
}

export function getCreateApplicationsList(query) {
  return request({
    url: `/clubs/users/creations`,
    method: 'get',
    params: query
  })
}

export function postSubmit(data) {
  return request({
    url: `/clubs/creations`,
    method: 'post',
    data
  })
}

export function postIdentifyApply(data) {
  return request({
    url: `/clubs/certifications`,
    method: 'post',
    data
  })
}

// 获取退社通知
export function getQuitList(clubid, query) {
  return request({
    url: `/clubs/${clubid}/quit`,
    method: 'get',
    params: query
  })
}

export function getClubsList(params) {
  return request({
    url: `/clubs`,
    method: 'get',
    params: params
  })
}
// 获取申请加入列表
export function getAddList(clubid, query) {
  // clubid = '10016'
  return request({
    url: `/clubs/${clubid}/joins`,
    method: 'get',
    params: query
  })
}

// 审核入社申请
export function joinAudit(data) {
  return request({
    url: '/clubs/joins/audit',
    method: 'put',
    data
  })
}
// 获取学生加入的社团列表
export function getJoinclubsList(userid, query) {
  return request({
    url: `/clubs/users/${userid}/clubs?status=member`,
    method: 'get',
    params: query
  })
}

// 获取学生作为社长管理的社团列表
export function getManageclubsList(userid, query) {
  return request({
    url: `/clubs/users/${userid}/clubs?status=chief`,
    method: 'get',
    params: query
  })
}

export function getActivitiesList(clubid, query) {
  return request({
    url: `/clubs/${clubid}/activities/apply`,
    method: 'get',
    params: query
  })
}

export function reviseActivityState(data) {
  return request({
    url: '/clubs/activities/state',
    method: 'put',
    data
  })
}

export function deleteActivity(id) {
  return request({
    url: `/clubs/activities/${id}`,
    method: 'delete'
  })
}

export function publishApply(data) {
  return request({
    url: '/clubs/activities',
    method: 'post',
    data
  })
}

export function getActivityApplyDetail(id) {
  return request({
    url: `/clubs/activities/apply/${id}`,
    method: 'get'
  })
}

export function switchRole(data) {
  return request({
    url: '/roles/swtich',
    method: 'post',
    data
  })
}

export function uploadLocalAvatar(clubId, data) {
  return request({
    url: `/clubs/${clubId}/info/avatar`,
    method: 'post',
    data
  })
}

// GET /clubs/:clubId/pictures
export function listClubImgs(clubId) {
  return request({
    url: `/clubs/${clubId}/pictures`,
    method: 'get'
  })
}

// 签到获取积分
export function signIn(clubId) {
  return request({
    url: `/credit/${clubId}/checkin`,
    method: 'post'
  })
}
