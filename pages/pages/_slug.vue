<template>
  <div class="bg-page-container">
    <v-sheet class="bg-page--absolute" :color="background_color" width="100%" :height="background_height">
      <v-img v-if="background" :src="background" :contain="background_contain" height="100%" />
    </v-sheet>
    <Read id="main" :story="story" />
  </div>
</template>

<script>
import global from '@/mixins/global'
import pagesDetail from '@/mixins/pagesDetail'
import Read from '@/components/blog/read'

export default {
  components: {
    Read
  },
  mixins: [global, pagesDetail],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('pages/getDetailData', { slug: params.slug || '' })
  },
  mounted () {
    this.$store.dispatch('setDrawer', false)
    this.$store.dispatch('setAppBar', true)
  }
}
</script>
