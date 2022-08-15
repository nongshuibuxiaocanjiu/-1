import request from '@/utils/request'

/**
 *
 * @param {Object} data password mobile
 * @returns Pormise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data,
  })
}

/**
 * 获取用户信息
 * @returns Pormise
 */
export function getuserInfoApi() {
  return request({
    url: '/sys/profile',
    method: 'POST',
  })
}
/**
 * 获取员工详情
 * @param {*} id 
 * @returns 
 */
export function getuserDetail(id) {
  return request({
    url: '/sys/user/' + id,
  })
}

/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data,
  })
}
