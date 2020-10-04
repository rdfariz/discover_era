<template>
  <Container>
    <v-layout id="main" row wrap>
      <v-flex
        v-for="(blog, index) in story"
        :key="index"
        xs12
        sm6
        md4
        class="pa-2 pa-md-3"
      >
        <blog-card is-image-visible :story="blog" />
      </v-flex>
      <v-flex xs12>
        <v-pagination
          :value="page"
          class="my-4"
          :length="pageLength"
          @input="changePage"
        />
      </v-flex>
    </v-layout>
  </Container>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import pages from '@/mixins/pages'

import blogCard from '@/components/blog/'
import Container from '@/components/container/'

export default {
  components: {
    Container,
    blogCard
  },
  mixins: [global, pages, loading],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('pages/getData')
  },
  methods: {
    changePage (page) {
      this.$store.dispatch('pages/getData', { page })
    }
  },
  head () {
    return {
      title: 'Pages - Fullmoon'
    }
  }
}
</script>
