<template>
  <div id="main">
    <template v-if="story">
      <vue-read-progress color="#2ed573" opacity="0.7" height="5px" :shadow="false" />
      <Read id="main" :story="story" />
    </template>
    <template v-else>
      <Container>
        <NotFound />
        <BlogList />
      </Container>
    </template>
  </div>
</template>

<script>
import global from '@/mixins/global'
import blogDetail from '@/mixins/blogDetail'

import BlogList from '@/components/blog/list'
import Read from '@/components/blog/read'
import Container from '@/components/container'
import NotFound from '@/components/notfound'

export default {
  scrollToTop: true,
  components: {
    Container,
    Read,
    BlogList,
    NotFound
  },
  mixins: [global, blogDetail],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('blog/getDetailData', { slug: params.slug || '' })
  }
}
</script>
