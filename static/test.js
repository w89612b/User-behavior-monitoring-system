var listccc = [
  {
    'id': 1,
    'name': 'zheng-gateway-server',
    'icon': 'zmdi zmdi-shield-security',
    'title': '权限管理系统',
    'moduleList': [
      {
        'id': 1,
        'name': '系统组织管理',
        'icon': 'zmdi zmdi-accounts-list',
        'menuList': [
          {
            'name': '系统管理',
            'icon': '',
            'uri': '/manage/system/index'
          },
          {
            'name': '组织管理',
            'icon': '',
            'uri': '/manage/organization/index'
          }
        ],
        'systemId': 1
      },
      {
        'id': 4,
        'name': '角色用户管理',
        'icon': 'zmdi zmdi-accounts',
        'menuList': [
          {
            'name': '用户管理',
            'icon': '',
            'uri': '/manage/user/index'
          },
          {
            'name': '角色管理',
            'icon': '',
            'uri': '/manage/role/index'
          }
        ],
        'systemId': 1
      },
      {
        'id': 7,
        'name': '权限资源管理',
        'icon': 'zmdi zmdi-lock-outline',
        'menuList': [
          {
            'name': '权限管理',
            'icon': null,
            'uri': '/manage/permission/index'
          }
        ],
        'systemId': 1
      },
      {
        'id': 12,
        'name': '其他数据管理',
        'icon': 'zmdi zmdi-more',
        'menuList': [
          {
            'name': '会话管理',
            'icon': '',
            'uri': '/manage/session/index'
          },
          {
            'name': '日志记录',
            'icon': '',
            'uri': '/manage/log/index'
          }
        ],
        'systemId': 1
      }
    ]
  },
  {
    'id': 2,
    'name': 'zheng-cms-admin',
    'icon': 'zmdi zmdi-wikipedia',
    'title': '内容管理系统',
    'moduleList': [
      {
        'id': 17,
        'name': '标签类目管理',
        'icon': 'zmdi zmdi-menu',
        'menuList': [
          {
            'name': '标签管理',
            'icon': null,
            'uri': '/manage/tag/index'
          },
          {
            'name': '类目管理',
            'icon': null,
            'uri': '/manage/category/index'
          }
        ],
        'systemId': 2
      },
      {
        'id': 20,
        'name': '文章评论管理',
        'icon': 'zmdi zmdi-collection-text',
        'menuList': [
          {
            'name': '文章管理',
            'icon': null,
            'uri': '/manage/article/index'
          },
          {
            'name': '评论管理',
            'icon': '',
            'uri': '/manage/comment/index'
          }
        ],
        'systemId': 2
      },
      {
        'id': 79,
        'name': '单页专题管理',
        'icon': 'zmdi zmdi-view-web',
        'menuList': [
          {
            'name': '单页管理',
            'icon': '',
            'uri': '/manage/page/index'
          },
          {
            'name': '专题管理',
            'icon': 'zmdi zmdi-widgets',
            'uri': '/manage/topic/index'
          }
        ],
        'systemId': 2
      },
      {
        'id': 61,
        'name': '其他数据管理',
        'icon': 'zmdi zmdi-more',
        'menuList': [
          {
            'name': '菜单管理',
            'icon': 'zmdi zmdi-widgets',
            'uri': '/manage/menu/index'
          },
          {
            'name': '系统设置',
            'icon': 'zmdi zmdi-widgets',
            'uri': '/manage/setting/index'
          }
        ],
        'systemId': 2
      }
    ]
  }
]

function deepClone (obj) {
  var result
  var oClass = isClass(obj)
  if (oClass === 'Object') {
    result = {}
  } else if (oClass === 'Array') {
    result = []
  } else {
    return obj
  }
  for (var key in obj) {
    var copy = obj[key]
    if (isClass(copy) === 'Object') {
      result[key] = deepClone(copy) // 递归调用
    } else if (isClass(copy) === 'Array') {
      result[key] = deepClone(copy)
    } else {
      if (key === 'uri') {
        result[key] = '/' + obj[key].split('/')[1] + '/' + obj[key].split('/')[2]
      } else {
        result[key] = obj[key]
      }
    }
  }
  return result
}

// 判断对象的数据类型
function isClass (o) {
  if (o === null) return 'Null'
  if (o === undefined) return 'Undefined'
  return Object.prototype.toString.call(o).slice(8, -1)
}

var list = deepClone(listccc)
console.dir(list)
