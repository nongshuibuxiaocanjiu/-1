import request from '@/utils/request'

/**
 *
 * @returns Pormise
 */
export function getDesptsApi() {
  return request({
    url: '/company/department',
  })
}

export function DelDesptsApi(id) {
  return request({
    url: '/company/department/' + id,
    method: 'DELETE',
  })
}
