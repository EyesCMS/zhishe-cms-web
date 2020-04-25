import request from '@/utils/request'

export function getMemberList(clubid, query) {
  return request({
    url: `/clubs/${clubid}/members`,
    method: 'get',
    params: query
  })
}

export function getMemberDetail(clubid, userid) {
  return request({
    url: `/clubs/${clubid}/members/${userid}`,
    method: 'get',
    params: { clubid, userid }
  })
}

export function getBulletinList(clubid, queryInfo) {
  return request({
    url: `/clubs/${clubid}/bulletins`,
    method: 'get',
    params: queryInfo
  })
}

export function getBulletinDetail(clubid, bulletinid) {
  return request({
    url: `/clubs/${clubid}/bulletins/${bulletinid}`,
    method: 'get',
    params: { clubid, bulletinid }
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
export function getCreateApplyList(clubid, query) {
  return request({
    url: `/clubs/creations`,
    method: 'get',
    params: query
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
export function getDismissApplyList(query) {
  return request({
    url: '/clubs/dissolutions',
    method: 'get',
    params: query
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
export function getChangeApplyList(clubid, query) {
  return request({
    url: `/clubs/leader/changes`,
    method: 'get',
    params: query
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
export function getIdentifyApplyList(clubid, query) {
  return request({
    url: `/clubs/certifications`,
    method: 'get',
    params: query
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
export function getActivityApplyList(clubid, query) {
  return request({
    url: `/clubs/activities`,
    method: 'get',
    params: query
  })
}
//

export function getClubDetail(clubid) {
  return request({
    url: `/clubs/${clubid}`,
    method: 'get',
    params: { clubid }
  })
}

export function quitClub(param) {
  return request({
    url: '/clubs/quit',
    method: 'post',
    params: param
  })
}
export function getClubsList(query) {
  return request({
    url: `/clubs`,
    method: 'get',
    params: query
  })
}

