<template>
  <div class="side-bar-close" :class="{ sideBarclose:getSidebar }">
    <span class="side-bar-close-btn" :class="{ sideBarclose:getSidebar }" @click="changeSidebar"></span>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  methods: mapActions('framework', [
    'changeSidebar'
  ]),
  computed: mapGetters({
    getSidebar: 'framework/getSidebar'
  })
}
</script>
