<template>
  <Container>
    <!-- <template v-for="(blog, index) in data">
      <v-layout v-if="blog.content.component === 'blog-overview'" :key="index" row wrap>
        <v-flex xs12 class="my-6 pa-2 text-center">
          <h1 class="text-center">
            {{ blog.content.title || '' }}
          </h1>
          <p>{{ blog.content.subtitle || '' }}</p>
        </v-flex>
        <v-flex xs12 class="category-blog pa-2">
          <v-tabs>
            <v-tab v-for="(category, categoryKey) in blog.content.categoryList" :key="categoryKey" :to="category.slug ? `/blog/category/${category.slug}` : '/blog'">
              {{ category.title }}
            </v-tab>
          </v-tabs>
        </v-flex>
      </v-layout>
      <v-layout v-else-if="blog.content.component === 'blog'" :key="index" row wrap>
        <v-flex xs12 md6 lg4 class="pa-2">
          <blog-card :data="blog" />
        </v-flex>
      </v-layout>
    </template> -->
    <v-layout row wrap>
      <v-flex
        v-for="(blog, index) in story"
        :key="index"
        xs12
        md6
        lg4
        class="pa-2"
      >
        <blog-card :story="blog" />
      </v-flex>
    </v-layout>
  </Container>
</template>

<script>
import global from '@/mixins/global'
import blog from '@/mixins/blog'

import blogCard from '@/components/blog/'
import Container from '@/components/container/'

export default {
  components: {
    Container,
    blogCard
  },
  mixins: [global, blog],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('blog/getData')
  }
}
</script>
