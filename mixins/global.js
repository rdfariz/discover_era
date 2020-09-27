import moment from 'moment'

export default {
  computed: {
    isDarkMode () {
      return this.$vuetify.theme.dark
    },
    isRtl () {
      return this.$vuetify.rtl
    },
    isLoading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    _onUpdated () {
    },
    toggleDarkMode () {
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('_olivia_darkmode', !this.$vuetify.theme.dark)
      }
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      this._onUpdated()
    },
    toggleRtl () {
      if (typeof Storage !== 'undefined') {
        localStorage.setItem('_olivia_rtl', !this.$vuetify.rtl)
      }
      this.$vuetify.rtl = !this.$vuetify.rtl
      this._onUpdated()
    },
    richtext (content) {
      return this.$storyapi.richTextResolver.render(content)
    },
    toDate (date = '', format = 'D MMMM YYYY, h:mm a') {
      return moment(date).format(format)
    }
  }
}
