<template>
  <div>
    <Background :color="color" :background="background" :min-height="height" height="100%">
      <v-layout fill-height row wrap align-center class="w-full ma-auto">
        <Container>
          <v-flex xs12 class="text-center text-md-left">
            <v-card dark color="transparent" flat>
              <p class="mb-0">
                {{ preIntro }}
              </p>
              <h1 class="my-1">
                {{ title }}
              </h1>
              <p class="mb-0">
                {{ intro }}
              </p>
            </v-card>
          </v-flex>
        </Container>
      </v-layout>
    </Background>
    <Container>
      <v-layout v-if="story.length > 0" id="main" row wrap>
        <v-flex
          v-for="(blog, index) in story"
          :key="index"
          xs12
          sm6
          md4
          class="pa-2 pa-md-3 pa-lg-4"
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
    </Container>
  </div>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import blog from '@/mixins/blog'

import blogCard from '@/components/blog/'
import Container from '@/components/container/'

export default {
  components: {
    Container,
    blogCard
  },
  mixins: [global, blog, loading],
  async asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('blog/getData')
  },
  computed: {
    layout () {
      return this.$store.getters.layout.content || {}
    },
    height () {
      return this.layout.blog_height || '225'
    },
    preIntro () {
      return this.layout.blog_preIntro || ''
    },
    title () {
      return this.layout.blog_title || ''
    },
    intro () {
      return this.layout.blog_intro || ''
    },
    background () {
      return this.layout.blog_background || ''
    },
    color () {
      const data = this.layout.blog_color
      return data && data.color ? data.color : ''
    }
  },
  methods: {
    changePage (page) {
      this.$store.dispatch('blog/getData', { page })
    }
  },
  head () {
    return {
      title: `Blog - ${this._brand.name}`
    }
  }
}
</script>
