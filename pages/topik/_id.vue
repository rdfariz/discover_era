<template>
  <div id="main">
    <Background
      color="primary"
      min-height="100%"
      height="100%"
    >
      <v-layout fill-height row wrap align-center class="w-full ma-auto py-6 py-sm-12 py-md-16">
        <Container>
          <v-layout row wrap align-center justify-center>
            <v-flex xs12>
              <Fragment dark background="transparent" height="100%">
                <v-flex xs12>
                  <div tabindex="0">
                    <p class="mb-0">
                      Topik
                    </p>
                    <h1 class="my-1 overview--title">
                      {{ $route.params.id }}
                    </h1>
                    <p class="mb-0">
                      {{ total }} Artikel
                    </p>
                    <br>
                  </div>
                </v-flex>
              </Fragment>
            </v-flex>
          </v-layout>
        </Container>
      </v-layout>
    </Background>
    <Container>
      <template v-if="data && data.length > 0">
        <v-layout row wrap>
          <v-flex
            v-for="(item, i) in data"
            :key="i"
            xs12
            sm6
            md6
            lg4
            class="pa-2 pa-sm-1 pa-md-3 pa-lg-4 ma-auto ma-sm-0"
          >
            <blog-card is-image-visible :story="item" />
          </v-flex>
          <v-flex xs12>
            <v-pagination
              v-if="pageLength > 1"
              :value="page"
              class="my-4"
              :length="pageLength"
              @input="changePage"
            />
          </v-flex>
        </v-layout>
      </template>
      <template v-else>
        <NotFound :text="`Tidak ada data yang relevan dengan topik ${params.id || ''}`" />
      </template>
    </Container>
  </div>
</template>
<script>
import global from '@/mixins/global'

import blogCard from '@/components/blog'
import Container from '@/components/container'
import NotFound from '@/components/notfound'

export default {
  scrollToTop: true,
  components: {
    blogCard,
    Container,
    NotFound
  },
  mixins: [global],
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('topics/getDetailData', {
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
      return this.$store.getters.topics.detailData
    },
    rawData () {
      return this.$store.getters.topics.rawData
    },
    loading () {
      return this.$store.getters.topics.loading
    },
    page () {
      return this.$store.getters.topics.page
    },
    perPage () {
      return this.$store.getters.topics.perPage
    },
    total () {
      return this.$store.getters.topics.total
    },
    pageLength () {
      return Math.ceil(this.total / this.perPage) || 1
    }
  },
  methods: {
    changePage (page) {
      this.$store.dispatch('topics/getDetailData', { id: this.params.id, page })
    }
  },
  head () {
    return {
      title: `${this.params.id} - ${this._brand.name}`
    }
  }
}
</script>
