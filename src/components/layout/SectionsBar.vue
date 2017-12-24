<template>
  <section class="sections-bar" :class="{ sideBarClose: !getSidebar }">
    <router-view></router-view>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'SectionsBar',
  computed: mapGetters({
    getSidebar: 'framework/getSidebar'
  })
}
</script>
