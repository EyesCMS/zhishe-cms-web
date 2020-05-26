import request from '@/utils/request'

export function getAllInvitationListData(query) {
  return request({
    url: `/forum/posts`,
    method: 'get',
    params: query
  })
}

export function getInvitationListData(clubid, query, originState) {
  return request({
    url: `/forum/${clubid}/posts`,
    method: 'get',
    params: query
  })
}
export function getMyForums(clubid, query, originState) {
  return request({
    url: `/forum/posts/mine`,
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
export function getForumList(data) {
  return request({
    url: `/forum/posts`,
    method: 'get',
    params: data
  })
}
export function deleteForum(id) {
  return request({
    url: `forum/posts/${id}`,
    method: 'delete'
  })
}
export function like(data) {
  return request({
    url: `/users/like`,
    method: 'post',
    params: data
  })
}
export function unlike(data) {
  return request({
    url: `/users/unlike`,
    method: 'post',
    params: data
  })
}
export function getUserLike(data) {
  return request({
    url: `/users/like`,
    method: 'get',
    params: data
  })
}
