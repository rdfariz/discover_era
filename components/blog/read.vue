<template>
  <v-card v-editable="content" flat class="pa-2 pa-md-4">
    <v-toolbar color="transparent" flat class="mb-2">
      <v-toolbar-title>
        <v-skeleton-loader
          v-if="!isLoaded"
          type="list-item"
          width="100"
        />
        <v-breadcrumbs v-else class="pa-0" large :items="breadcrumbs" />
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon>
        <v-icon>mdi-fullscreen</v-icon>
      </v-btn>
      <v-btn v-print="printObj" icon>
        <v-icon>mdi-printer</v-icon>
      </v-btn>
    </v-toolbar>
    <!-- <v-divider class="my-2" /> -->
    <div id="contentPrint">
      <v-card-title primary-title>
        <v-skeleton-loader
          v-if="!isLoaded"
          type="card-heading"
          width="100%"
        />
        <h2 v-else>
          {{ title }}
        </h2>
      </v-card-title>
      <v-card-text>
        <v-skeleton-loader v-if="!isLoaded" type="list-item-three-line" />
        <p v-else v-html="body" />
      </v-card-text>
      <v-divider class="my-4" />
      <v-card-actions>
        <v-container grid-list-xs fluid>
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
                {{ toDate(publishedAt) }}
              </p>
              <v-spacer />
            </v-layout>
            <v-layout align-center row wrap>
              <span>Share on: </span>
              <ShareNetwork
                v-for="(network, index) in socialShare"
                :key="index"
                :network="network"
                :url="fullUrl"
                :title="title"
                :description="richText"
                :quote="intro"
                :hashtags="tagListText"
              >
                <span class="ma-1 text-capitalize">
                  {{ network }}
                </span>
              </ShareNetwork>
            </v-layout>
          </template>
        </v-container>
      </v-card-actions>
    </div>
  </v-card>
</template>

<style lang="scss">
@import './index';
</style>

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
  data: () => ({
  }),
  computed: {
    content () {
      return this.story.content || {}
    },
    breadcrumbs () {
      return [
        {
          text: 'Blog',
          exact: true,
          disabled: false,
          to: '/blog'
        },
        {
          text: this.title,
          disabled: true,
          to: this.slug
        }
      ]
    },
    fullUrl () {
      const origin = window.location.origin
      const path = this.$route.fullPath
      return origin + path || ''
    },
    title () {
      return this.content.title || ''
    },
    intro () {
      return this.content.intro || ''
    },
    image () {
      return ''
    },
    body () {
      return this.richtext(this.content.body || '')
    },
    createdAt () {
      return this.story.created_at || ''
    },
    publishedAt () {
      return this.story.published_at || ''
    },
    slug () {
      return this.story.full_slug || ''
    },
    tagList () {
      return this.story.tag_list || []
    },
    tagListText () {
      let text = ''
      this.tagList.forEach((el, index) => {
        const separator = index > 0 ? ',' : ''
        text += separator + el
      })
      return text
    },
    socialShare () {
      return this.content.social_share || []
    },
    printObj () {
      return {
        id: 'contentPrint',
        popTitle: this.title || '',
        extraCss: '',
        extraHead: ''
      }
    }
  },
  head () {
    const title = this.title
    const text = this.body
    return {
      title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: text
        }
      ]
    }
  }
}
</script>
