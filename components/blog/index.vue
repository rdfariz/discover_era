<template>
  <v-card outlined class="pa-2 pa-md-4">
    <v-card-title primary-title>
      <v-skeleton-loader
        v-if="!isLoaded"
        type="card-heading"
        width="100%"
      />
      <h3 v-else>
        <nuxt-link :to="`/${fullslug}`">
          {{ title }}
        </nuxt-link>
      </h3>
    </v-card-title>
    <v-sheet v-if="thumbnail" color="grey lighten-4">
      <v-img :src="thumbnail" max-height="250" />
    </v-sheet>
    <v-card-text>
      <v-skeleton-loader
        v-if="!isLoaded"
        type="list-item-three-line"
      />
      <p v-else>
        {{ intro }}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-container grid-list-xs>
        <v-skeleton-loader
          v-if="!isLoaded"
          type="list-item-two-line"
          width="50%"
        />
        <template v-else>
          <v-layout v-if="tagList && tagList.length > 0" align-center row wrap>
            <v-icon x-small class="mr-2">
              fa-tag
            </v-icon>
            <span v-for="(tag, index) in tagList" :key="index" class="text-capitalize">
              <template v-if="index > 0">,</template>
              {{ tag }}
            </span>
          </v-layout>
          <v-layout align-center row wrap>
            <p class="ma-0">
              {{ toDate(publishedAt) || '-' }}
            </p>
            <v-spacer />
            <v-btn tabindex="-1" color="blue" text icon :to="`/blog/${slug}`">
              <v-icon small>
                fa-long-arrow-alt-right
              </v-icon>
            </v-btn>
          </v-layout>
        </template>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'

export default {
  mixins: [global, loading],
  props: {
    story: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    content () {
      return this.story.content || {}
    },
    component () {
      return this.content.component || ''
    },
    title () {
      return this.content.title || ''
    },
    intro () {
      return this.content.intro || ''
    },
    thumbnail () {
      return this.content.thumbnail || ''
    },
    createdAt () {
      return this.story.created_at || ''
    },
    publishedAt () {
      return this.story.published_at || ''
    },
    slug () {
      return this.story.slug || ''
    },
    fullslug () {
      return this.story.full_slug || ''
    },
    tagList () {
      return this.story.tag_list || []
    }
  }
}
</script>
