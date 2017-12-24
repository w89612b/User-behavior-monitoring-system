export default {
  signup: '/api/u/signup',
  authority: '/static/backstage.json',
  signin: '/api/u/signin',
  signout: '/api/u/signout',
  backstage: {
    app: {
      list: '/api/app/list',
      add: '/api/app/add',
      put: '/api/app/put/{id}',
      del: '/api/app/del/{id}',
      all: '/api/app/all'
    },
    uri: {
      list: '/api/uri/list',
      add: '/api/uri/add',
      put: '/api/uri/put/{id}',
      del: '/api/uri/del/{id}'
    },
    anchor: {
      list: '/api/anchor/list',
      add: '/api/anchor/add',
      put: '/api/anchor/put/{id}',
      del: '/api/anchor/del/{id}',
      all: '/api/anchor/all'
    },
    baseinfo: {
      list: '/api/baseinfo/list',
      add: '/api/baseinfo/add'
    }
  },
  Headend: {}
}
