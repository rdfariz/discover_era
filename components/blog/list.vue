<template>
  <v-layout v-if="story && story.length > 0" row wrap>
    <v-flex
      v-for="(blog, index) in story"
      :key="index"
      xs12
      sm6
      md6
      lg4
      class="pa-2 pa-sm-1 pa-md-3 pa-lg-4 ma-auto ma-sm-0"
    >
      <blog-card flat is-image-visible :story="blog" />
    </v-flex>
    <v-flex xs12>
      <v-pagination
        v-if="pageLength > 1"
        :value="page"
        class="my-4"
        :length="pageLength"
        @input="changePage"
      />
    </v-flex>
  </v-layout>
  <NotFound v-else />
</template>
<script>
import blog from '@/mixins/blog'

import blogCard from '@/components/blog/'
import NotFound from '@/components/notfound'

export default {
  components: {
    blogCard,
    NotFound
  },
  mixins: [blog],
  methods: {
    changePage (page) {
      this.$store.dispatch('blog/getData', { page })
    }
  }
}
</script>
