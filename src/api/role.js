import request from '@/utils/request'

/**
 * 获取角色列表
 * @returns Pormise
 */
export function getRolesApi(params) {
  return request({
    url: '/sys/role',
    params,
  })
}

export function addRolesApi(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data,
  })
}

/**
 * 根据id 获取角色详情
 * @param {*} id 角色id
 * @returns Pormise
 */
export function getRolesInfo(id) {
  return request({
    url: '/sys/role/' + id,
  })
}

// /sys/role/assignPrem

export function assignPrem(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'PUT',
    data,
  })
}
