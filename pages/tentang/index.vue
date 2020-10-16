<template>
  <div id="main">
    <template v-if="overviewContent && overviewContent.length > 0">
      <Overview v-for="(item, index) in overviewContent" :key="index" :item="item" />
    </template>
    <template v-else>
      <Container>
        <NotFound />
      </Container>
    </template>
  </div>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'

import Overview from '@/components/overview'
import NotFound from '@/components/notfound'

export default {
  scrollToTop: true,
  components: {
    Overview,
    NotFound
  },
  mixins: [global, loading],
  computed: {
    overviewContent () {
      return this.$store.getters.about.overviewContent || []
    }
  },
  head () {
    return {
      title: `Tentang - ${this._brand.name || ''}`
    }
  }
}
</script>
