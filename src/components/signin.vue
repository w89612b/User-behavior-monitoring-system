<template>
  <div class="login">
    <el-card class="box-card card" body-style="padding: 25px;">
      <div slot="header" class="clearfix">
        <h1 class="logo">{{system}}</h1>
      </div>
      <el-form :model="signinForm" :rules="rules" ref="signinForm"  class="login-ruleForm">
        <el-form-item prop="userName">
          <el-input type="text" placeholder="请输入账户名" prefix-icon="icon-login icon-user-md" v-model="signinForm.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入密码" prefix-icon="icon-login icon-lock" @keyup.native.enter="submitForm('signinForm')" v-model="signinForm.userPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width:100%" @click="submitForm('signinForm')" :loading="logining">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="bottom clearfix" style="margin-top:10px;color:#FFF">
          技术支持： 吴波
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'signin',
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
      signinForm: {
        userName: '',
        userPwd: ''
      },
      rules: {
        userName: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
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
          this.$http.post(this.getAPI['signin'], this.$data.signinForm).then((response) => {
            if (response.data.code) {
              this.$message.success(response.data.msg)
              var Baseinfo = this.$store.getters['framework/getBaseinfo']
              Baseinfo.anchorId = 1
              Baseinfo.user = this.$data.signinForm.userName
              this.$http.post(this.getAPI['backstage'].baseinfo.add, Baseinfo)
              this.$router.push({ name: 'login' })
            } else {
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
    }
  },
  computed: mapGetters({
    getAPI: 'api/getAPI'
  })
}
</script>
