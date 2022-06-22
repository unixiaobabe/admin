import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: "/sys/role",
    params
  })
}

export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method:'delete'
  })
}

export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method:'put',
    data
  })
}

export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

export function addRole(data) {
  return request({
    url: `/sys/role`,
    method:'post',
    data
  })
}

export function assignPerm(data) {
  return request({
    url: `/sys/role/assignPrem`,
    method:'put',
    data
  })
}