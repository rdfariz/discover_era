<template>
  <div id="main">
    <Overview v-for="(item, index) in overview" :key="index" :item="item" />
    <Container>
      <BlogList v-if="story && story.length > 0" />
      <NotFound v-else />
    </Container>
  </div>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import blog from '@/mixins/blog'

import BlogList from '@/components/blog/list'
import Container from '@/components/container/'
import Overview from '@/components/overview'
import NotFound from '@/components/notfound'

export default {
  scrollToTop: true,
  components: {
    Container,
    BlogList,
    Overview,
    NotFound
  },
  mixins: [global, blog, loading],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('blog/getData')
  },
  computed: {
    layout () {
      return this.$store.getters.layout.content || {}
    },
    overview () {
      return this.layout.blog_overview || []
    }
  },
  head () {
    return {
      title: `Artikel - ${this._brand.name}`
    }
  }
}
</script>
