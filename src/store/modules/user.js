import { login, getuserInfoApi, getuserDetail } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {},
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setuserInfo(state, payload) {
      state.userInfo = payload
    },
  },
  actions: {
    // 获取token
    async getToken(context, payload) {
      // console.log(payload)
      const res = await login(payload)
      console.log(res)
      context.commit('setToken', res)
    },
    // 获取用户信息
    async getuserInfo(context) {
      const userBaseInfo = await getuserInfoApi()
      console.log(userBaseInfo)
      const userInfo = await getuserDetail(userBaseInfo.userId)

      context.commit('setuserInfo', { ...userBaseInfo, ...userInfo })
      // const res = { name: 'zs' }
      // context.commit('setuserInfo', res)
    },
  },
}
