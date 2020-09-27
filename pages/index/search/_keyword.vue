<template>
  <div>
    <v-layout
      v-for="(parent, index) in headers"
      :key="index"
      row
      wrap
      class="pa-2 pa-md-4"
    >
      <template>
        <v-flex xs12>
          <h4 class="text-capitalize">
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
      </template>
    </v-layout>
    {{ perPage }} | {{ total }}
  </div>
</template>
<script>
import blogCard from '@/components/blog'

export default {
  components: {
    blogCard
  },
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('search/getData', {
      sort_by: 'first_published_at:desc',
      'filter_query[body][like]': `*${params.keyword}*`
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
