<template>
  <div id="main">
    <template v-if="story">
      <Overview v-for="(item, index) in overviewContent" :key="index" :item="item" />
    </template>
    <template v-else>
      <Container>
        <NotFound />
        <BlogList />
      </Container>
    </template>
  </div>
</template>

<script>
import global from '@/mixins/global'
import pagesDetail from '@/mixins/pagesDetail'

import BlogList from '@/components/blog/list'
import NotFound from '@/components/notfound'

export default {
  scrollToTop: true,
  components: {
    BlogList,
    NotFound
  },
  mixins: [global, pagesDetail],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('pages/getDetailData', { slug: params.slug || '' })
  },
  head () {
    const title = this.seo.title || this.title
    const text = this.seo.description || this.intro
    const keyword = this.keyword
    return {
      title: title ? `${title} - ${this._brand.name}` : this._brand.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: text || ''
        },
        { name: 'keywords', content: keyword || '' }
      ]
    }
  }
}
</script>
