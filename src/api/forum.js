import request from '@/utils/request'

export function getAllInvitationList(query) {
  return request({
    url: `/forum/posts`,
    method: 'get',
    params: query
  })
}

export function getInvitationList(clubid, query, originState) {
  return request({
    url: `/forum/${clubid}/posts`,
    method: 'get',
    params: query
  })
}

export function getInvitationDetail(id, query) {
  return request({
    url: `/forum/posts/${id}`,
    method: 'get',
    params: query
  })
}

export function getRemarksList(id, query) {
  return request({
    url: `/forum/posts/${id}/remarks`,
    method: 'get',
    params: query
  })
}

export function postComment(data) {
  return request({
    url: `/forum/posts/remarks`,
    method: 'post',
    data
  })
}

export function changeForum(id, data) {
  return request({
    url: `/forum/posts/${id}`,
    method: 'put',
    data
  })
}
export function publishForum(data) {
  return request({
    url: `/forum/posts`,
    method: 'post',
    data
  })
}
export function deletForum(id) {
  return request({
    url: `forum/posts/${id}`,
    method: 'delet'
  })
}
