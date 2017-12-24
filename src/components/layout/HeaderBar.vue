<template>
  <header class="header-bar">
    <img class="logo" src="/static/logo.png"> 
    <el-menu :default-active="getDefaulateUrl" class="head-el-menu" mode="horizontal" @select="onSelect">
      <el-menu-item index="/main">系统主页</el-menu-item>
      <el-menu-item v-for="(item, index) in menuitems" :key="index" :index="item.uri">{{item.name}}</el-menu-item>
    </el-menu>
    <div class="headInfo"><span class="head"><img :src="getHead"></span> {{ getName }}  <span class="logout" @click="signout">安全退出</span></div>
  </header>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'HeaderBar',
  methods: {
    signout () {
      this.$http.get(this.getAPI['signout']).then((response) => {
        if (response.data.code === 1) {
          this.$router.push({ name: 'login' })
          this.addMenu([])
        }
      }, (response) => {
        console.log(response)
      })
    },
    onSelect (key, keyPath) {
      this.$router.push({ path: key })
    },
    ...mapActions('purview', [
      'addMenu'
    ])
  },
  computed: {
    getName: () => {
      return JSON.parse(window.sessionStorage.getItem('user')).userName
    },
    getHead: () => {
      return JSON.parse(window.sessionStorage.getItem('user')).img
    },
    getDefaulateUrl () {
      return this.$router.currentRoute.path
    },
    ...mapGetters({
      menuitems: 'purview/menuitems',
      getAPI: 'api/getAPI'
    })
  }
}
</script>
