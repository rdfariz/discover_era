<template>
  <div id="main">
    <Overview v-for="(item, index) in overview" :key="index" :item="item" />
    <Container>
      <CategoryList />
    </Container>
  </div>
</template>
<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import category from '@/mixins/category'

import Container from '@/components/container/'
import CategoryList from '@/components/tag/list_tag'

export default {
  scrollToTop: true,
  components: {
    Container,
    CategoryList
  },
  mixins: [global, loading, category],
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('tag/getData')
  },
  computed: {
    layout () {
      return this.$store.getters.layout.content || {}
    },
    overview () {
      return this.layout.category_overview || []
    }
  },
  head () {
    return {
      title: `Category - ${this._brand.name}`
    }
  }
}
</script>
