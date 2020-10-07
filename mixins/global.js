import brand from '@/static/brand'

export default {
  computed: {
    _brand () {
      return brand
    },
    appBar: {
      get () {
        return this.$store.getters.appBar
      },
      set (val) {
        return this.$store.dispatch('setAppBar', val)
      }
    },
    drawer: {
      get () {
        return this.$store.getters.drawer
      },
      set (val) {
        return this.$store.dispatch('setDrawer', val)
      }
    },
    pallete () {
      return this.$store.getters.pallete || {}
    },
    isDarkMode: {
      get () {
        return this.$vuetify.theme.dark
      },
      set () {
        this.toggleDarkMode()
      }
    },
    isRtl: {
      get () {
        return this.$vuetify.rtl
      },
      set () {
        this.toggleRtl()
      }
    },
    isMobile () {
      return this.$vuetify.breakpoint.mobile
    },
    isLoading () {
      return this.$store.getters.loading
    },
    isReadPage () {
      const route = this.$route.name
      if (route === 'blog-slug' || route === 'info-slug-index' || route === 'pages-slug') {
        return true
      }
      return false
    },
    classContainer () {
      return 'pa-2 pa-md-4 px-lg-16 py-lg-6'
    }
  },
  methods: {
    toggleDarkMode () {
      if (typeof Storage !== 'undefined' && process.browser) {
        localStorage.setItem('_fullmoon_darkmode', !this.$vuetify.theme.dark)
      }
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    toggleRtl () {
      if (typeof Storage !== 'undefined' && process.browser) {
        localStorage.setItem('_fullmoon_rtl', !this.$vuetify.rtl)
      }
      this.$vuetify.rtl = !this.$vuetify.rtl
    },
    setColorPallete () {
      if (typeof Storage !== 'undefined' && process.browser) {
        localStorage.setItem('_fullmoon_pallete', JSON.stringify(this.pallete || {}))
        // window.location.reload()
      }
    },
    richtext (content) {
      return this.$storyapi.richTextResolver.render(content)
    }
  }
}
