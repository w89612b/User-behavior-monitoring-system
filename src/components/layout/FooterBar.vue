<template>
  <footer class="footer-bar"><p class="p">Copyright © 2017-{{getYear}}, WUBO, All Rights Reserved</p></footer>
</template>

<script>
export default {
  name: 'FooterBar',
  computed: {
    getYear () {
      return new Date().getFullYear()
    }
  }
}
</script>
