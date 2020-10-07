<template>
  <div class="bg-page-container">
    <vue-read-progress color="#2ed573" opacity="0.7" height="5px" :shadow="false" />
    <v-sheet class="bg-page--absolute" :color="background_color" width="100%" :height="background_height">
      <v-img v-if="background" :src="background" :contain="background_contain" height="100%" />
    </v-sheet>
    <Read id="main" :story="story" />
  </div>
</template>

<script>
import global from '@/mixins/global'
import blogDetail from '@/mixins/blogDetail'
import Read from '@/components/blog/read'

export default {
  components: {
    Read
  },
  mixins: [global, blogDetail],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('blog/getDetailData', { slug: params.slug || '' })
  }
}
</script>
