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
      return this.$store.getters.info.data
    },
    loading () {
      return this.$store.getters.info.loading
    },
    perPage () {
      return this.$store.getters.info.perPage
    },
    total () {
      return this.$store.getters.info.total
    }
  }
}
