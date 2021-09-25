import request from 'utils/request'

export default {
  getData(query) {
    return request({
      url: '/api/admin/coreAccount/getAccountLockList',
      method: 'get',
      params: query
    })
  }
}
