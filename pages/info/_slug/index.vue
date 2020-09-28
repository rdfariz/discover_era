<template>
  <div>
    <!-- <v-app-bar
      :fixed="content.appbar_position === 'fixed'"
      :absolute="content.appbar_position === 'absolute'"
      :dense="content.appbar_type === 'dense'"
      :hide-on-scroll="content.appbar_type === 'hide-on-scroll'"
      :height="content.appbar_height"
      :src="content.appbar_background || ''"
      :color="content.appbar_color.color || ''"
      app
    >
      <Container>
        <v-layout align-center row wrap>
          <v-toolbar-title>
            <h3 class="ma-0">
              <nuxt-link
                :class="`${content.appbar_link_color.color && content.appbar_link_color.color+'--text'}`"
                :to="content.appbar_title_link || '/'"
              >
                {{ content.appbar_title || '' }}
              </nuxt-link>
            </h3>
          </v-toolbar-title>

          <v-spacer />
        </v-layout>
      </Container>
    </v-app-bar> -->
    <NuxtChild />
  </div>
</template>

<script>
import global from '@/mixins/global'
import infoDetail from '@/mixins/infoDetail'
// import Container from '@/components/container/'

export default {
  components: {
    // Container
  },
  mixins: [global, infoDetail],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('info/getDetailData', { slug: params.slug || '' })
  }
}
</script>
