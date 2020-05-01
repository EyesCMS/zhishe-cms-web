import request from '@/utils/request'
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
  console.log(data)
  return request({
    url: '/clubs/creations/audit',
    method: 'put',
    data
  })
}
export function getCreateApplyList(params) {
  console.log(params)
  return request({
    url: `/clubs/creations`,
    method: 'get',
    params: params
  })
}
// 社团解散申请
export function pushToDismissApply(data) {
  console.log(data)
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
  console.log(data)
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
export function pushToIdentifyApply(data) {
  console.log(data)
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
  console.log(data)
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

export function getJoinApplicationsList(userid, query) {
  return request({
    url: `/users/${userid}/clubs/joins`,
    method: 'get',
    params: query
  })
}

export function getCreateApplicationsList(userid, query) {
  return request({
    url: `/clubs/creations/${userid}`,
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
  console.log(data)
  return request({
    url: `/clubs/certifications`,
    method: 'post',
    data
  })
}

// 获取退社通知
export function getQuitList(clubid, query) {
  console.log(clubid)
  return request({
    url: `/clubs/${clubid}/quit`,
    method: 'get',
    params: query
  })
}

export function getClubsList(params) {
  console.log(params)
  return request({
    url: `/clubs`,
    method: 'get',
    params: params
  })
}
// 获取申请加入列表
export function getAddList(clubid, query) {
  console.log(1234)
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
    url: `/users/${userid}/clubs?statue=member`,
    method: 'get',
    params: query
  })
}

// 获取学生作为社长管理的社团列表
export function getManageclubsList(userid, query) {
  return request({
    url: `/users/${userid}/clubs?statue=chief`,
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
    url: `/activities/apply/${id}`,
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
