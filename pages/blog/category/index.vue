<template>
  <div>
    <v-container class="my-12">
      <v-layout row wrap>
        <v-flex xs12 class="my-6 pa-2">
          <h1 class="text-center">{{ category }}</h1>
        </v-flex>
        <v-flex xs12 class="category-blog pa-2">
          <v-tabs>
            <v-tab to="/blog">All</v-tab>
            <v-tab to="/blog/fptvi-2020">FPTVI 2020</v-tab>
            <v-tab to="/blog/kongres-vokasi">Kongres Vokasi</v-tab>
            <v-tab to="/blog/olivia-2020">Olivia 2020</v-tab>
          </v-tabs>
        </v-flex>
        <v-flex
          v-for="(blog, index) in blogs"
          :key="index"
          xs12
          sm6
          class="pa-2"
        >
          <blog-card :data="blog" />
          <!-- <v-card outlined class="pa-2 text-center">
            <h2>{{ blog.content.title }}</h2>
            <h2>{{ blog.content.image }}</h2>
            <p>{{ blog.published_at || '-' }}</p>
            <div class="rich-text" v-html="richtext(blog.content.content)" />
            <v-btn :to="`/blog/${blog.slug}`">
              Baca Selengkapnya
            </v-btn>
          </v-card> -->
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import blogCard from '@/components/blog/'
export default {
  components: {
    blogCard
  },
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('getBlogs')
    const blogs = store.getters.blogs
    return { blogs }
  },
  data: () => ({
  }),
  computed: {
  },
  mounted () {
  },
  methods: {
    richtext (content) {
      return this.$storyapi.richTextResolver.render(content)
    }
  }
}
</script>
