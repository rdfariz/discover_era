<template>
  <v-card outlined>
    <v-sheet v-if="thumbnail && isLoaded && isImageVisible" :height="isMobile ? '165' : '200'" :color="isDarkMode ? '' : 'grey lighten-4'">
      <v-img :lazy-src="thumbnail" :src="thumbnail" :max-height="isMobile ? '165' : '200'">
        <template v-slot:placeholder>
          <v-row
            class="fill-height ma-0"
            align="center"
            justify="center"
          >
            <v-progress-circular
              indeterminate
              color="primary"
            />
          </v-row>
        </template>
      </v-img>
    </v-sheet>
    <v-card-title primary-title>
      <v-skeleton-loader
        v-if="!isLoaded"
        type="card-heading"
        width="100%"
      />
      <h4 v-else class="max-w-full">
        <nuxt-link :to="`/${fullslug}`" class="font-weight-medium primary--text" :class="isDarkMode ? 'text--lighten-2' : ''">
          <Truncate>
            <span v-if="title">{{ title }}</span>
            <span v-else>-</span>
          </Truncate>
        </nuxt-link>
      </h4>
    </v-card-title>
    <v-card-text>
      <v-skeleton-loader
        v-if="!isLoaded"
        type="list-item-two-line"
      />
      <p v-else class="ma-0">
        <Truncate>
          <span v-if="intro">{{ intro }}</span>
          <span v-else>-</span>
        </Truncate>
      </p>
    </v-card-text>
    <v-divider />
    <v-card-actions>
      <v-container grid-list-xs>
        <v-skeleton-loader
          v-if="!isLoaded"
          type="list-item-two-line"
          width="50%"
        />
        <template v-else>
          <v-layout align-center row wrap>
            <template v-if="tagList && tagList.length > 0">
              <v-icon x-small class="mr-2">
                fa-tag
              </v-icon>
              <span v-for="(tag, index) in tagList" :key="index" class="text-capitalize">
                <template v-if="index > 0">,</template>
                {{ tag }}
              </span>
            </template>
            <span v-else class="text--disabled">Tidak ada tag</span>
          </v-layout>
          <v-layout align-center row wrap>
            <span>
              {{ publishedAt ? toDate(publishedAt) : '-' }}
            </span>
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
import Truncate from '@/components/text/truncate'

export default {
  components: {
    Truncate
  },
  mixins: [global, loading],
  props: {
    isImageVisible: {
      type: Boolean,
      default: true
    },
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
