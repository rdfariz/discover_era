<template>
  <div id="main">
    <Overview v-for="(item, index) in overview" :key="index" :item="item" />
    <Container>
      <CategoryList v-if="story && story.length > 0" />
      <NotFound v-else />
    </Container>
  </div>
</template>
<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import topics from '@/mixins/topics'

import Container from '@/components/container/'
import CategoryList from '@/components/topics/list_topics'
import NotFound from '@/components/notfound'

export default {
  scrollToTop: true,
  components: {
    Container,
    CategoryList,
    NotFound
  },
  mixins: [global, loading, topics],
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('topics/getData')
  },
  computed: {
    layout () {
      return this.$store.getters.layout.content || {}
    },
    overview () {
      return this.layout.topics_overview || []
    }
  },
  head () {
    return {
      title: `Topics - ${this._brand.name}`
    }
  }
}
</script>
