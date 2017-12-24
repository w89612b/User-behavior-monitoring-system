// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import VUE from 'vue'
import ELEMENT from 'element-ui'
import RESOURCE from 'vue-resource'
import App from './App'
import NProgress from 'nprogress'
import './assets/main.less'
import 'nprogress/nprogress.css'
import router from './router'
import store from './store/'

VUE.config.productionTip = false
VUE.use(ELEMENT)
VUE.use(RESOURCE)

// 进度条配置
NProgress.configure({
  showSpinner: false
})

// VUEResource全局设置
// VUE.http.options.emulateHTTP = true
// VUE.http.options.emulateJSON = true
VUE.http.interceptors.push((request, next) => {
  next((response) => {
    // 状态码非200 处理
    if (response.status !== 200) {
      ELEMENT.Message.error(response.status + ':' + response.statusText + ' url:' + response.url)
    }
    // 状态码200且服务码非1 处理
    if (response.status === 200 && !response.data.code) {
      ELEMENT.Message.error(response.data.msg)
      if (response.data.data.code === 700) {
        let setTime = setTimeout(() => {
          router.push({
            name: 'login'
          })
          clearTimeout(setTime)
        }, 2000)
      }
    }
    return response
  })
})

// 动态异步加载路由实现 此功能需要vue-router2.2.0级以上
let menuList = JSON.parse(window.sessionStorage.getItem('menuList'))
if (menuList) {
  store.commit('purview/addMenu', menuList)
  router.addRoutes(store.getters['purview/getRoute'])
}

// 全局的导航拦截控制器
router.beforeEach((to, from, next) => {
  // 跳转动画开始
  NProgress.start()

  // 设置标题
  document.title = to.meta.doctitle

  // next()
  if (to.name === 'login') { // 如果进入登录页面清空sessionStorage的存值user和permission\menuList，并且清空菜单的缓存值
    // console.log('登录页面清空所有配置值')
    window.sessionStorage.removeItem('user')
    window.sessionStorage.removeItem('menuList')
    store.commit('purview/addMenu', [])
    store.commit('purview/addPermission', [])
  }
  let user = JSON.parse(window.sessionStorage.getItem('user'))
  if (to.name === 'signin') {
    next()
  } else if (!user && to.name !== 'login') { // 如果用户没有登录且跳转路径不是登录页面，路由跳转到登录
    // console.log('户没有登录且跳转路径不是登录页面,跳转到登录页面')
    next({
      path: '/login'
    })
  } else {
    if (to.name) { // route且KEY有效, 正常跳转
      // console.log('正常跳转了')
      next()
    } else {
      // console.log('页面错了')
      next({
        path: '/nofound'
      })
    }
  }
})

router.afterEach(transition => {
  // 跳转动画结束
  NProgress.done()
})

/* eslint-disable no-new */
new VUE({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: {
    App
  }
})
