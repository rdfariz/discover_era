<template>
  <div id="main">
    <Overview v-for="(item, index) in overviewContent" :key="index" :item="item" />
  </div>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'

import Overview from '@/components/overview'

export default {
  scrollToTop: true,
  components: {
    Overview
  },
  mixins: [global, loading],
  computed: {
    overviewContent () {
      return this.$store.getters.about.overviewContent || []
    }
  },
  head () {
    return {
      title: `About - ${this._brand.name || ''}`
    }
  }
}
</script>
