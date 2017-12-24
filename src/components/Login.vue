<template>
  <div class="login">
    <el-card class="box-card card" body-style="padding: 25px;">
      <div slot="header" class="clearfix">
        <h1 class="logo">{{system}}</h1>
      </div>
      <el-form :model="loginForm" :rules="rules" ref="loginForm"  class="login-ruleForm">
        <el-form-item prop="userName">
          <el-input type="text" placeholder="请输入登录账户" prefix-icon="icon-login icon-user-md" v-model="loginForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入登录密码" prefix-icon="icon-login icon-lock" @keyup.native.enter="submitForm('loginForm')" v-model="loginForm.userPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item style="text-align: left;">
          <el-checkbox label="记住密码" v-model="loginForm.rememberMe" auto-complete="off" style="color: #FFF"></el-checkbox>
          <router-link to="/signin" style="color: #fff;float: right;">用户注册</router-link>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm('loginForm')" :loading="logining">登陆</el-button>
        </el-form-item>
      </el-form>
      <div class="bottom clearfix" style="margin-top:10px;color:#FFF">
          技术支持： 吴波  测试账号密码：admin
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'login',
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码!'))
      } else {
        callback()
      }
    }
    return {
      logining: false,
      system: '户帮户管理系统',
      loginForm: {
        userName: '',
        userPwd: '',
        rememberMe: ''
      },
      rules: {
        userName: [
          { validator: validateName, trigger: 'blur' }
        ],
        userPwd: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$data.logining = true
          this.$http.post(this.getAPI['signup'], this.$data.loginForm).then((response) => {
            if (response.data.code) {
              this.$message.success('登录成功')
              // 处理本地session存储
              window.sessionStorage.setItem('user', JSON.stringify(response.data.data))
              var Baseinfo = this.$store.getters['framework/getBaseinfo']
              Baseinfo.anchorId = 6
              this.$http.post(this.getAPI['backstage'].baseinfo.add, Baseinfo).then((response) => {})
              // 获取用户权限\菜单
              this.$http.get(this.getAPI['authority']).then((response) => {
                if (response.data.code) {
                  // 菜单
                  window.sessionStorage.setItem('menuList', JSON.stringify(response.data.list))
                  this.addMenu(response.data.list)
                  // 菜单加入路由
                  if (!this.isLoadRoutes) {
                    this.$router.addRoutes(this.getRoute)
                    this.loadRoutes()
                  }
                  this.$router.push({ name: 'main' })
                } else {
                  this.$data.logining = false
                }
              }, (response) => {
                this.$data.logining = false
              })
            } else {
              this.$message.error(response.data.msg)
              this.$data.logining = false
            }
          }, (response) => {
            this.$data.logining = false
          })
        } else {
          this.$message.error('请填写相应信息！')
          return false
        }
      })
    },
    ...mapActions('purview', [
      'addMenu',
      'loadRoutes',
      'addPermission'
    ])
  },
  computed: mapGetters({
    getAPI: 'api/getAPI',
    menuitems: 'purview/menuitems',
    getRoute: 'purview/getRoute',
    isLoadRoutes: 'purview/isLoadRoutes'
  })
}
</script>
