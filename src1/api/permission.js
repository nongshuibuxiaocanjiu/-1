import request from '@/utils/request'

// 获取权限
export function getPermissionList(params) {
  return request({
    url: '/sys/permission',
    params,
  })
}

/**
 * 获取权限列表
 * @returns Pormise
 */
export function getPermission() {
  return request({
    url: '/sys/permission',
  })
}

/**
 * 添加权限
 * @param {*} data 
 * @returns Pormise
 */
export function addPermission(data) {
  return request({
    url: '/sys/permission',
    method: 'post',
    data
  })
}
