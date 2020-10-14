<template>
  <div id="main">
    <Overview v-for="(item, index) in overviewContent" :key="index" :item="item" />
  </div>
</template>

<script>
import global from '@/mixins/global'
import search from '@/mixins/search'
import loading from '@/mixins/loading'

import Overview from '@/components/overview'

export default {
  scrollToTop: true,
  components: {
    Overview
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
