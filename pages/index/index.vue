<template>
  <Background color="primary" :min-height="isSearchPage ? '100%' : '100vh'" height="100%">
    <v-layout fill-height row wrap align-center class="w-full ma-auto">
      <Container>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12 md10>
            <Fragment dark background="transparent" height="100%">
              <template #leftContent>
                <Container>
                  <v-flex xs12 class="text-center">
                    <h1>Coming Soon</h1>
                  </v-flex>
                </Container>
              </template>
            </Fragment>
          </v-flex>
        </v-layout>
      </Container>
    </v-layout>
  </Background>
</template>

<script>
import global from '@/mixins/global'
import search from '@/mixins/search'
import loading from '@/mixins/loading'

import Container from '@/components/container'
import Fragment from '@/components/fragment'

export default {
  components: {
    Container,
    Fragment
  },
  mixins: [global, search, loading],
  asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    store.dispatch('search/setKeyword', '')
  }
}
</script>
