import moment from 'moment'

export default {
  computed: {
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
    isLoading () {
      return this.$store.getters.loading
    },
    isReadPage () {
      const route = this.$route.name
      if (route === 'blog-slug' || route === 'info-slug-index') {
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
    },
    toDate (date = '', format = 'D MMMM YYYY, h:mm a') {
      return moment(date).format(format)
    }
  }
}
