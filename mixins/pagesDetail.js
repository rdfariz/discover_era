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
      return this.$store.getters.pages.detailData
    },
    content () {
      return this.story && this.story.content ? this.story.content : {}
    },
    overviewContent () {
      return this.content.overviewContent || []
    },
    seo () {
      return this.content.seo || {}
    },
    keyword () {
      return this.content.keyword || ''
    },
    creator () {
      return this.content.creator || 'Anonymous'
    },
    title () {
      return this.content.title || ''
    },
    intro () {
      return this.content.intro || ''
    },
    createdAt () {
      return this.story.created_at || ''
    },
    publishedAt () {
      return this.story.published_at || ''
    },
    slug () {
      return this.story.full_slug || ''
    },
    tagList () {
      return this.story.tag_list || []
    },
    tagListText () {
      let text = ''
      this.tagList.forEach((el, index) => {
        const separator = index > 0 ? ',' : ''
        text += separator + el
      })
      return text
    }
  }
}
