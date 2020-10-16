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
                      CATEGORY
                    </p>
                    <h1 class="my-1 overview--title">
                      {{ $route.params.id }}
                    </h1>
                    <p class="mb-0">
                      Find inspiration according to your interests
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
      <template v-if="data.length === 0">
        <v-layout row wrap justify-center align-center>
          <v-flex xs12 class="text-center">
            <p class="mt-4">
              Tidak ada data yang relevan dengan tag <span class="font-weight-medium">{{ params.id || '' }}</span>
            </p>
          </v-flex>
        </v-layout>
      </template>
      <template v-else>
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
    </Container>
  </div>
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
      this.$store.dispatch('tag/getDetailData', { id: this.params.id, page })
    }
  },
  head () {
    return {
      title: `${this.params.id} - ${this._brand.name}`
    }
  }
}
</script>
