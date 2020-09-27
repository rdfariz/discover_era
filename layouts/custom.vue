<template>
  <v-app dark :class="isDarkMode ? 'dark--mode' : 'light--mode'">
    <nuxt />
  </v-app>
</template>

<script>
import global from '@/mixins/global'

export default {
  mixins: [global],
  data: () => ({
    appBar: true,
    drawer: true,
    drawerMini: true,
    menu: [
      { icon: 'mdi-home-outline', title: 'Home', to: '/' },
      { icon: 'mdi-text-box-multiple-outline', title: 'Blog', to: '/blog' }
    ]
  }),
  created () {
    this.reInitDrawer()
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    reInitDrawer () {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false
      } else {
        this.drawer = true
      }
    }
  }
}
</script>
