<template>
  <Container>
    <vue-read-progress color="#32AAEA" opacity="0.5" height="5px" :shadow="false" />
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
