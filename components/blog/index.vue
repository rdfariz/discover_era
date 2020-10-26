<template>
  <v-card :flat="flat" :outlined="outlined && !flat">
    <v-sheet v-if="isLoaded && isImageVisible" :height="isMobile ? '275' : '300'" :color="isDarkMode ? 'grey darken-3' : 'grey lighten-2'">
      <v-img
        v-if="thumbnail"
        aspect-ratio="1"
        :lazy-src="thumbnail"
        :src="thumbnail"
        :max-height="isMobile ? '100%' : '300'"
        :alt="title || ''"
      >
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
    <v-card tile flat :to="`/${fullslug}`">
      <v-tooltip v-if="!isMobile && !small" top>
        <template v-slot:activator="{ on, attrs }">
          <v-card-title primary-title :class="small ? 'pb-0' : 'pb-0'" v-bind="attrs" v-on="on">
            <v-skeleton-loader
              v-if="!isLoaded"
              type="card-heading"
              width="100%"
            />
            <template v-else>
              <p v-if="small" class="ma-0 max-w-full">
                <Truncate>
                  {{ title || '-' }}
                </Truncate>
              </p>
              <h6 v-else class="ma-0 max-w-full">
                <Truncate>
                  {{ title || '-' }}
                </Truncate>
              </h6>
            </template>
          </v-card-title>
        </template>
        <span>{{ title || '-' }}</span>
      </v-tooltip>
      <v-card-title v-else primary-title :class="small ? 'pb-0' : 'pb-0'">
        <v-skeleton-loader
          v-if="!isLoaded"
          type="card-heading"
          width="100%"
        />
        <template v-else>
          <p v-if="small" class="ma-0 max-w-full">
            <Truncate>
              {{ title || '-' }}
            </Truncate>
          </p>
          <h6 v-else class="ma-0 max-w-full">
            <Truncate>
              {{ title || '-' }}
            </Truncate>
          </h6>
        </template>
      </v-card-title>
      <v-card-text :class="small ? 'pt-1' : 'pt-1'">
        <v-skeleton-loader
          v-if="!isLoaded"
          type="list-item-two-line"
        />
        <template v-else>
          <p v-if="small" class="sm ma-0">
            <Truncate>
              <template v-if="intro">
                {{ intro }}
              </template>
              <template v-else>
                -
              </template>
            </Truncate>
          </p>
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
    </v-card>
    <template v-if="detailData">
      <v-divider />
      <v-card-actions tabindex="0">
        <v-container grid-list-xs>
          <v-skeleton-loader
            v-if="!isLoaded"
            type="list-item-two-line"
            width="50%"
          />
          <template v-else>
            <v-layout align-center row wrap>
              <template>
                <v-flex xs12>
                  <v-layout row wrap align-center>
                    <v-avatar
                      size="25"
                      class="mr-2"
                    >
                      <v-icon small color="primary">
                        mdi-account
                      </v-icon>
                    </v-avatar>
                    <p class="sm ma-0 text-capitalize">
                      {{ creator }}
                    </p>
                  </v-layout>
                  <v-layout row wrap align-center>
                    <v-avatar
                      size="25"
                      class="mr-2"
                    >
                      <v-icon small color="primary">
                        mdi-tag
                      </v-icon>
                    </v-avatar>
                    <template v-if="tagList && tagList.length > 0">
                      <nuxt-link v-for="(tag, index) in tagList" :key="index" :to="`/topik/${tag}`" class="text-capitalize">
                        <p class="sm ma-0">
                          <template v-if="index > 0">
                            ,
                          </template>
                          {{ tag }}
                        </p>
                      </nuxt-link>
                    </template>
                    <p v-else class="sm ma-0 text--disabled">
                      Tidak ada topik
                    </p>
                  </v-layout>
                </v-flex>
              </template>
            </v-layout>
            <v-layout class="mt-1" align-center row wrap>
              <v-avatar
                size="25"
                class="mr-2"
              >
                <v-icon small color="primary">
                  mdi-calendar-clock
                </v-icon>
              </v-avatar>
              <p class="sm ma-0">
                {{ publishedAt ? toDate(publishedAt) : '-' }}
              </p>
              <v-spacer />
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

export default {
  components: {
    Truncate
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
      default: () => ({})
    }
  },
  computed: {
    content () {
      return this.story.content || {}
    },
    component () {
      return this.content.component || ''
    },
    creator () {
      return this.content.creator || 'Anonymous'
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
