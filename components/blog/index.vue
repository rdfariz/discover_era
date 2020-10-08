<template>
  <v-card :flat="flat" :outlined="outlined && !flat">
    <v-sheet v-if="isLoaded && isImageVisible" :height="isMobile ? '175' : '200'" :color="isDarkMode ? 'grey darken-3' : 'grey lighten-2'">
      <v-img v-if="thumbnail" :lazy-src="thumbnail" :src="thumbnail" :max-height="isMobile ? '175' : '200'" :alt="title || ''">
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
      <v-layout
        v-else
        row
        wrap
        justify-center
        align-center
        fill-height
      >
        <v-icon large>
          mdi-image-off
        </v-icon>
      </v-layout>
    </v-sheet>
    <v-card-title primary-title :class="small ? 'pb-1' : 'pb-md-3'">
      <v-skeleton-loader
        v-if="!isLoaded"
        type="card-heading"
        width="100%"
      />
      <template v-else class="max-w-full">
        <nuxt-link :to="`/${fullslug}`" :class="isDarkMode ? 'text--lighten-2' : ''">
          <Truncate>
            <template v-if="small">
              <p v-if="title" class="ma-0">
                {{ title }}
              </p>
              <p v-else class="ma-0">
                -
              </p>
            </template>
            <template v-else>
              <h6 v-if="title">
                {{ title }}
              </h6>
              <h6 v-else>
                -
              </h6>
            </template>
          </Truncate>
        </nuxt-link>
      </template>
    </v-card-title>
    <v-card-text>
      <v-skeleton-loader
        v-if="!isLoaded"
        type="list-item-two-line"
      />
      <template v-else>
        <span v-if="small" class="ma-0">
          <Truncate>
            <template v-if="intro">
              {{ intro }}
            </template>
            <template v-else>
              -
            </template>
          </Truncate>
        </span>
        <p v-else class="ma-0">
          <Truncate>
            <template v-if="intro">
              {{ intro }}
            </template>
            <template v-else>
              -
            </template>
          </Truncate>
        </p>
      </template>
    </v-card-text>
    <template v-if="detailData">
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
                <nuxt-link v-for="(tag, index) in tagList" :key="index" :to="`/tag/${tag}`" class="text-capitalize">
                  <span>
                    <template v-if="index > 0">
                      ,
                    </template>
                    {{ tag }}
                  </span>
                </nuxt-link>
              </template>
              <span v-else class="text--disabled">Tidak ada tag</span>
            </v-layout>
            <v-layout class="mt-1" align-center row wrap>
              <span>
                {{ publishedAt ? toDate(publishedAt) : '-' }}
              </span>
              <v-spacer />
              <v-btn tabindex="-1" text icon :to="`/${fullslug}`">
                <Icon icon="arrow-right" />
              </v-btn>
            </v-layout>
          </template>
        </v-container>
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import utils from '@/mixins/utils'

import Truncate from '@/components/text/truncate'
import Icon from '@/components/icon'

export default {
  components: {
    Truncate,
    Icon
  },
  mixins: [global, loading, utils],
  props: {
    small: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: true
    },
    detailData: {
      type: Boolean,
      default: true
    },
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
