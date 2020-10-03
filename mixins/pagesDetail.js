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
      return this.$store.getters.pages.detailData || {}
    },
    content () {
      return this.story.content || {}
    },
    background_color () {
      return this.content.background_color && this.content.background_color.color ? this.content.background_color.color : 'transparent'
    },
    background_height () {
      return this.content.background_height || 'auto'
    },
    background () {
      return this.content.background || ''
    },
    background_contain () {
      return this.content.background_contain || false
    }
  }
}
