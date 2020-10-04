<template>
  <Container spacing-top>
    <template v-if="headers.length === 0 && rawData.length === 0">
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 class="text-center">
          <p class="mt-4">
            Tidak ada data yang relevan dengan kata <span class="font-weight-medium">{{ params.keyword || '' }}</span>
          </p>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout
        v-for="(parent, index) in headers"
        :key="index"
        wrap
        class="mb-4 mb-md-6 mt-4 mt-md-2"
      >
        <v-flex xs12 class="mb-2">
          <h6 class="text--secondary text-capitalize text-center text-md-left">
            {{ parent }}
          </h6>
        </v-flex>
        <v-flex
          v-for="(item, i) in data[parent]"
          :key="i"
          xs12
          md6
          lg4
          class="pa-2"
        >
          <blog-card :is-image-visible="false" :story="item" />
        </v-flex>
      </v-layout>
      <v-pagination
        :value="page"
        class="my-4"
        :length="pageLength"
        @input="changePage"
      />
    </template>
  </Container>
</template>
<script>
import global from '@/mixins/global'

import blogCard from '@/components/blog'
import Container from '@/components/container'

import noData from '@/static/images/undraw/no_data.svg'
export default {
  components: {
    blogCard,
    Container
  },
  mixins: [global],
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('search/getData', {
      'filter_query[body][like]': `*${params.keyword}*`
    })
  },
  data: () => ({
    noData
  }),
  computed: {
    params () {
      return this.$route.params || {}
    },
    headers () {
      return Object.keys(this.data) || []
    },
    data () {
      return this.$store.getters.search.data
    },
    rawData () {
      return this.$store.getters.search.rawData
    },
    loading () {
      return this.$store.getters.search.loading
    },
    page () {
      return this.$store.getters.search.page
    },
    perPage () {
      return this.$store.getters.search.perPage
    },
    total () {
      return this.$store.getters.search.total
    },
    pageLength () {
      return Math.ceil(this.total / this.perPage) || 1
    }
  },
  methods: {
    changePage (page) {
      this.$store.dispatch('search/getData', { page })
    }
  },
  head () {
    return {
      title: `${this.params.keyword || ''} - Fullmoon`
    }
  }
}
</script>
