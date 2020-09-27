<template>
  <Container>
    <v-layout row wrap>
      <v-flex
        v-for="(blog, index) in story"
        :key="index"
        xs12
        md6
        lg4
        class="pa-2"
      >
        <blog-card :story="blog" />
      </v-flex>
    </v-layout>
  </Container>
</template>

<script>
import global from '@/mixins/global'
import info from '@/mixins/info'

import blogCard from '@/components/blog/'
import Container from '@/components/container/'

export default {
  components: {
    Container,
    blogCard
  },
  mixins: [global, info],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('info/getData')
  }
}
</script>
