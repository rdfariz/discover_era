<template>
  <Container>
    <vue-read-progress color="#2ed573" opacity="0.7" height="5px" :shadow="false" />
    <v-layout>
      <v-flex xs12>
        <Read :story="story" />
      </v-flex>
    </v-layout>
  </Container>
</template>

<script>
import global from '@/mixins/global'
import blogDetail from '@/mixins/blogDetail'
import Container from '@/components/container/'
import Read from '@/components/blog/read'

export default {
  components: {
    Container,
    Read
  },
  mixins: [global, blogDetail],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('blog/getDetailData', { slug: params.slug || '' })
  }
}
</script>
