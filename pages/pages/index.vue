<template>
  <Container>
    <v-layout row wrap>
      <Stack
        ref="stack"
        :monitor-images-loaded="true"
        :column-min-width="320"
        :gutter-width="5"
        :gutter-height="5"
      >
        <StackItem v-for="(page, index) in story" :key="index" :class="$vuetify.breakpoint.mobile ? '' : 'stack-item'">
          <v-flex xs12 class="pa-2">
            <blog-card :story="page" />
          </v-flex>
        </StackItem>
      </Stack>
    </v-layout>
  </Container>
</template>

<script>
import global from '@/mixins/global'
import pages from '@/mixins/pages'

import blogCard from '@/components/blog/'
import Container from '@/components/container/'

export default {
  components: {
    Container,
    blogCard
  },
  mixins: [global, pages],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('pages/getData')
  },
  head () {
    return {
      title: 'Pages - Fullmoon'
    }
  }
}
</script>
