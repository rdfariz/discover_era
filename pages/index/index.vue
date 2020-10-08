<template>
  <div>
    <Background
      v-for="(item, index) in overviewContent"
      :key="index"
      :color="item.background && item.background.color ? item.background.color : ''"
      min-height="100%"
      height="100%"
    >
      <v-layout fill-height row wrap align-center class="w-full ma-auto py-12 py-md-16">
        <Container fluid>
          <v-layout row wrap align-center justify-center>
            <v-flex xs12>
              <Fragment :dark="item.dark" background="transparent" height="100%">
                <v-flex xs12 md3>
                  <Container>
                    <v-layout row wrap>
                      <v-flex xs12>
                        <h6>{{ item.category || '' }}</h6>
                        <v-divider class="my-4" />
                      </v-flex>
                    </v-layout>
                  </Container>
                </v-flex>
                <v-flex xs12 md6>
                  <h1>{{ item.title || '' }}</h1>
                  <br>
                  <p v-html="richtext(item.body || '')" />
                  <v-btn v-if="item.link" outlined tile :to="item.link || ''">
                    {{ item.link_text || '' }}
                  </v-btn>
                </v-flex>
              </Fragment>
            </v-flex>
          </v-layout>
        </Container>
      </v-layout>
    </Background>
  </div>
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
  },
  computed: {
    overviewContent () {
      return this.$store.getters.home.overviewContent || []
    }
  }
}
</script>
