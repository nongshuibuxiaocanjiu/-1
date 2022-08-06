import request from '@/utils/request'
// /sys/user/simple

export function getEmployeesApi() {
  return request({
    url: '/sys/user/simple',
  })
}

// /company/department
export function addDeptApi(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data,
  })
}

/**
 * 获取部门
 * @param {*} id
 * @returns
 */
export function getDeptApi(id) {
  return request({
    url: '/company/department/' + id,
  })
}

export function editDeptApi(data) {
  return request({
    url: '/company/department/' + data.id,
    method: 'PUT',
    data,
  })
}
