import VUE from 'vue'
import ROUTER from 'vue-router'
import Login from '@/components/Login'

VUE.use(ROUTER)

export default new ROUTER({
  mode: 'history', // 路由显示模式
  linkActiveClass: 'is-active', // 全局配置 <router-link> 的默认『激活 class 类名』
  scrollBehavior: (to, from, savedPosition) => { // 滚动条的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [{
    path: '/login',
    name: 'login',
    component: Login,
    meta: { doctitle: '系统登录' }
  }, {
    path: '/signin',
    name: 'signin',
    component: (resolve) => require(['@/components/signin'], resolve),
    meta: { doctitle: '用户注册' }
  }, {
    path: '/nofound',
    component: (resolve) => require(['@/components/nofound'], resolve),
    name: 'NOFOUND',
    meta: { doctitle: '404' }
  }
  ]
})
