<template>
  <Container spacing-top>
    <template v-if="rawData.length === 0">
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 class="text-center pa-2">
          <v-alert type="error" class="mt-4" :icon="false">
            <p class="ma-0">
              Tidak ada data yang relevan dengan kata <span class="font-weight-medium">{{ params.keyword || '' }}</span>
            </p>
          </v-alert>
        </v-flex>
      </v-layout>
    </template>
    <template v-else>
      <v-layout row wrap class="mb-4 mb-md-6 mt-4">
        <v-flex
          v-for="(item, index) in rawData"
          :key="index"
          xs12
          sm6
          md6
          lg4
          class="pa-2 pa-sm-1 pa-md-3 pa-lg-4 ma-auto ma-sm-0"
        >
          <blog-card flat is-image-visible :story="item" />
        </v-flex>
      </v-layout>
      <v-pagination
        v-if="pageLength > 1"
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

export default {
  scrollToTop: true,
  components: {
    blogCard,
    Container
  },
  mixins: [global],
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.dispatch('search/setKeyword', params.keyword)
    await store.dispatch('search/getData', { keyword: params.keyword })
  },
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
      this.$store.dispatch('search/getData', { keyword: this.params.keyword, page })
    }
  },
  head () {
    return {
      title: `${this.params.keyword || ''} - ${this._brand.name || ''}`
    }
  }
}
</script>
