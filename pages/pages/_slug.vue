<template>
  <div id="main" class="bg-page-container">
    <template v-if="story">
      <vue-read-progress color="#2ed573" opacity="0.7" height="5px" :shadow="false" />
      <Read id="main" :story="story" :is-pages="true" />
    </template>
    <template v-else>
      <Container>
        <v-layout row wrap justify-center align-center>
          <v-flex xs12 class="text-center pa-2">
            <v-alert type="error" class="mt-4" :icon="false">
              <p class="ma-0">
                Sorry the article you were looking for was not found
              </p>
            </v-alert>
          </v-flex>
        </v-layout>
        <BlogList />
      </Container>
    </template>
  </div>
</template>

<script>
import global from '@/mixins/global'
import pagesDetail from '@/mixins/pagesDetail'

import BlogList from '@/components/blog/list'
import Read from '@/components/blog/read'

export default {
  scrollToTop: true,
  components: {
    BlogList,
    Read
  },
  mixins: [global, pagesDetail],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('pages/getDetailData', { slug: params.slug || '' })
  }
}
</script>
