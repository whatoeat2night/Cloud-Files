import router from '@/router/index'
import store from '@/store/index.js'

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  // 调用获取用户登录状态和信息的接口
  store.dispatch('getUserInfo').then(() => {
    if (to.matched.some((m) => m.meta.requireAuth)) {
      if (!store.getters.isLogin) {
        // 没有登录时，跳转到登录页面
        next({
          path: '/login',
          query: { redirect: to.fullPath },  //  将to参数中的url传递给login页面进行操作
        })
      } else {
        next() // 正常跳转
      }
    } else {
      next() // 正常跳转
    }
    // 路由发生变化修改页面title
    if (to.meta.title) {
      document.title = to.meta.title
    }
    // 路由发生变化修改页面meta
    if (to.meta.content) {
      const head = document.getElementsByTagName('head')
      const meta = document.createElement('meta')
      meta.content = to.meta.content
      head[0].appendChild(meta)
    }
  })
})
