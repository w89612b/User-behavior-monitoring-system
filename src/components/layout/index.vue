<template>
  <div class="AppMain">
    <header-bar></header-bar>
    <template v-if="getSidebar"><side-bar></side-bar></template>
    <sections-bar></sections-bar>
    <footer-bar></footer-bar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HeaderBar from './HeaderBar'
import SideBar from './SideBar'
import SectionsBar from './SectionsBar'
import FooterBar from './FooterBar'
export default {
  name: 'AppMain',
  components: {
    HeaderBar,
    SideBar,
    SectionsBar,
    FooterBar
  },
  computed: mapGetters({
    getSidebar: 'framework/getSidebar'
  })
}
</script>
