import moment from 'moment'

export default {
  computed: {
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
    }
  },
  methods: {
    toggleDarkMode () {
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('_olivia_darkmode', !this.$vuetify.theme.dark)
      }
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
    },
    toggleRtl () {
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('_olivia_rtl', !this.$vuetify.rtl)
      }
      this.$vuetify.rtl = !this.$vuetify.rtl
    },
    richtext (content) {
      return this.$storyapi.richTextResolver.render(content)
    },
    toDate (date = '', format = 'D MMMM YYYY, h:mm a') {
      return moment(date).format(format)
    }
  }
}
