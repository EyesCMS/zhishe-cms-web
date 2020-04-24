import request from '@/utils/request'

export function getMemberList(clubid, query) {
  return request({
    url: `/club/${clubid}/members`,
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

export function getClubDetail(clubid) {
  return request({
    url: `/clubs/${clubid}`,
    method: 'get',
    params: { clubid }
  })
}

export function getClubsList(query) {
  return request({
    url: `/clubs`,
    method: 'get',
    params: query
  })
}
