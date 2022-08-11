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
