<template>
  <aside class="side-bar scrollbar" :class="{ close: getSidebar   }">
    <el-menu :default-active="getDefaulateUrl" class="el-menu-vertical"  @select="onSelect">
      <el-menu-item index="/main"><i class="el-icon-menu"></i>系统主页</el-menu-item>
      <el-submenu v-for="oneitem in menuitems" :key="oneitem.id" :index="oneitem.menuUniqueId">
        <template slot="title"><i :class="oneitem.icon"></i>{{ oneitem.title }}</template>
        <el-submenu v-for="towitem in oneitem.moduleList" :key="towitem.id" :index="towitem.menuUniqueId">
          <template slot="title"><i :class="towitem.icon"></i>{{ towitem.name }}</template>
          <el-menu-item v-for="threeitem in towitem.menuList" :key="threeitem.id" :index="threeitem.uri"><i :class="threeitem.icon"></i>{{ threeitem.name }}</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </aside>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SiderBar',
  methods: {
    onSelect (key, keyPath) {
      console.log(key, keyPath)
      this.$router.push({ path: key })
    }
  },
  computed: {
    getDefaulateUrl () {
      return this.$router.currentRoute.path
    },
    ...mapGetters({
      menuitems: 'purview/menuitems',
      getSidebar: 'framework/getSidebar'
    })
  }
}
</script>
