import router, { asyncRouter, constantRoutes } from '@/router'
export default {
  namespaced: true,
  state: {
    routes: [], //我们自己维护的路由规则,所有路由规则(静态路由+筛选后的动态路由)
    points: [], //
  },
  mutations: {
    setRoutes(state, routes) {
      state.routes = [...constantRoutes, ...routes]
    },
    setPoints(state, payload) {
      state.points = payload
    },
  },
  actions: {
    filterRoutes(context, roles) {
      const routes = asyncRouter.filter((item) => {
        console.log(item.meta.id)
        //如果权限标识在roles.menus,有这个权限 返回true
        return roles.menus.includes(item.meta.id)
      })
      context.commit('setRoutes', routes)
      //   console.log(routes)
      router.addRoutes([
        //动态添加路由规则
        ...routes,
        { path: '*', redirect: '/404', hidden: true },
      ])
    },
    setPointsAction(context, points) {
      context.commit('setPoints', points)
    }
  },
}
