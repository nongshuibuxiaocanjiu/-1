import router, { asyncRouter } from '@/router'
import store from './store'
// 路由(全局)前置守卫
// 路由(全局)后置守卫
// 路由独享守卫
// 组件内守卫
// to：去哪里的路由信息
// from：来自哪个路由信息
// next：是否进入

// 会在所有路由进入之前触发
const whiteList = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  if (token) {
    // 获取用户信息
    if (!store.state.user.userInfo.userId) {
      // 获取用户信息 store.dispatch的返回值是promise
      const { roles } = await store.dispatch('user/getuserInfo')
      console.log(roles.points)

      await store.dispatch('permission/filterRoutes', roles)
      await store.dispatch('permission/setPointsAction', roles.points)

      next(to.path)
    }
    // 登录
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    const isCludes = whiteList.includes(to.path)
    if (isCludes) {
      next()
    } else {
      next('/login')
    }
  }
})
