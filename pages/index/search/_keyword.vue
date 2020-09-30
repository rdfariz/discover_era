<template>
  <Container spacing-top>
    <v-layout
      v-for="(parent, index) in headers"
      :key="index"
      wrap
    >
      <v-flex xs12>
        <h4 class="text-capitalize text-center text-md-left">
          {{ parent }}
        </h4>
      </v-flex>
      <v-flex
        v-for="(item, i) in data[parent]"
        :key="i"
        xs12
        md6
        lg4
        class="pa-2"
      >
        <blog-card :story="item" />
      </v-flex>
    </v-layout>
    {{ perPage }} | {{ total }}
  </Container>
</template>
<script>
import global from '@/mixins/global'

import blogCard from '@/components/blog'
import Container from '@/components/container'

export default {
  components: {
    blogCard,
    Container
  },
  mixins: [global],
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('search/getData', {
      sort_by: 'first_published_at:desc',
      keyword: `*${params.keyword}*`
    })
  },
  computed: {
    headers () {
      return Object.keys(this.data) || []
    },
    data () {
      return this.$store.getters.search.data
    },
    loading () {
      return this.$store.getters.search.loading
    },
    perPage () {
      return this.$store.getters.search.perPage
    },
    total () {
      return this.$store.getters.search.total
    }
  }
}
</script>
