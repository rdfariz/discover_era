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
      return this.$store.getters.tag.data
    },
    loading () {
      return this.$store.getters.tag.loading
    },
    page () {
      return this.$store.getters.tag.page || 1
    },
    perPage () {
      return this.$store.getters.tag.perPage || 25
    },
    total () {
      return this.$store.getters.tag.total || 0
    },
    pageLength () {
      return Math.ceil(this.total / this.perPage) || 1
    }
  }
}
