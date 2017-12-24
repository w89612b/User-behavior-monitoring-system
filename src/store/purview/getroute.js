export default (menu = []) => {
  let addRoute = []
  let i = menu.length
  addRoute.push({
    path: '/main',
    component: (resolve) => require(['@/components/main'], resolve),
    name: 'main',
    meta: { doctitle: '用户行为监测后台系统' }
  })
  while (i > 0) {
    ((item) => {
      addRoute.push({
        path: item.uri,
        component: (resolve) => require(['@/components' + item.uri + 'index.vue'], resolve),
        name: item.uri.split('/')[2],
        meta: { doctitle: item.name }
      })
    })(menu[--i])
  }

  return [{
    path: '/',
    name: 'home',
    redirect: { name: 'main' },
    component: (resolve) => require(['@/components/layout'], resolve),
    children: addRoute
  }]
}
