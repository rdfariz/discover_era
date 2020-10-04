export default {
  mounted () {
    this.$storybridge.on(['input', 'published', 'change'], (event) => {
      if (event.action === 'input') {
        if (event.story.id === this.story.id) {
          this.story.content = event.story.content
        }
      } else if (!event.slugChanged) {
        window.location.reload()
      }
    })
  },
  computed: {
    story () {
      return this.$store.getters.pages.data
    },
    loading () {
      return this.$store.getters.pages.loading
    },
    page () {
      return this.$store.getters.pages.page || 1
    },
    perPage () {
      return this.$store.getters.pages.perPage || 25
    },
    total () {
      return this.$store.getters.pages.total || 0
    },
    pageLength () {
      return Math.ceil(this.total / this.perPage) || 1
    }
  }
}
