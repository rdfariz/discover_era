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
    perPage () {
      return this.$store.getters.pages.perPage
    },
    total () {
      return this.$store.getters.pages.total
    }
  }
}
