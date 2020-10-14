<template>
  <Container>
    <template v-if="headers.length === 0 && rawData.length === 0">
      <v-layout row wrap justify-center align-center>
        <v-flex xs12 class="text-center">
          <p class="mt-4">
            Tidak ada data yang relevan dengan tag <span class="font-weight-medium">{{ params.id || '' }}</span>
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
          <blog-card is-image-visible :story="item" />
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

export default {
  scrollToTop: true,
  components: {
    blogCard,
    Container
  },
  mixins: [global],
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('tag/getDetailData', {
      id: params.id
    })
  },
  computed: {
    params () {
      return this.$route.params || {}
    },
    headers () {
      return Object.keys(this.data) || []
    },
    data () {
      return this.$store.getters.tag.detailData
    },
    rawData () {
      return this.$store.getters.tag.rawData
    },
    loading () {
      return this.$store.getters.tag.loading
    },
    page () {
      return this.$store.getters.tag.page
    },
    perPage () {
      return this.$store.getters.tag.perPage
    },
    total () {
      return this.$store.getters.tag.total
    },
    pageLength () {
      return Math.ceil(this.total / this.perPage) || 1
    }
  },
  methods: {
    changePage (page) {
      this.$store.dispatch('tag/getData', { id: this.params.id, page })
    }
  }
}
</script>
