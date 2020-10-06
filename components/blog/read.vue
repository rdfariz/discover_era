<template>
  <v-card flat class="pa-2 pa-md-4">
    <v-toolbar color="transparent" flat class="mb-2">
      <v-toolbar-title>
        <v-skeleton-loader
          v-if="!isLoaded"
          type="list-item"
          width="100"
        />
        <v-breadcrumbs v-else class="pa-0 font-weight-medium" large :items="breadcrumbs" />
      </v-toolbar-title>
      <v-spacer />
      <v-btn v-if="body" v-print="printObj" icon class="noprint">
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
        <h2 v-else class="font-weight-medium">
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
            <v-layout v-if="tagList && tagList.length > 0" align-center row wrap class="mb-6">
              <v-icon x-small class="mr-2">
                fa-tag
              </v-icon>
              <nuxt-link v-for="(tag, index) in tagList" :key="index" :to="`/tag/${tag}`" class="text-capitalize">
                <template v-if="index > 0">
                  ,
                </template>
                {{ tag }}
              </nuxt-link>
            </v-layout>
            <v-layout v-if="publishedAt" align-center row wrap>
              <span class="ma-0">
                Terakhir diupdate:<br><span class="font-weight-medium">{{ toDate(publishedAt) }}</span>
              </span>
              <v-spacer />
            </v-layout>
            <v-layout v-if="socialShare && socialShare.length > 0" column wrap class="mt-6 noprint">
              <v-flex xs12>
                <span>Bagikan artikel, melalui</span>
              </v-flex>
              <v-flex xs12 class="mt-1">
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
                  <v-btn small depressed class="mr-2 mb-2 text-capitalize">
                    <v-icon small>
                      mdi-{{ network }}
                    </v-icon>
                    <span class="ml-2">
                      {{ network }}
                    </span>
                  </v-btn>
                </ShareNetwork>
              </v-flex>
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
    breadcrumbs () {
      return [
        {
          text: this.$route.name === 'blog-slug' ? 'Blog' : 'Pages',
          exact: true,
          disabled: false,
          to: `/${this.$route.name === 'blog-slug' ? 'blog' : 'pages'}`
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
    content () {
      return this.story.content || {}
    },
    seo () {
      return this.content.seo || {}
    },
    keyword () {
      return this.content.keyword || ''
    },
    title () {
      return this.content.title || ''
    },
    intro () {
      return this.content.intro || ''
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
    const title = this.seo.title || this.title
    const text = this.seo.description || this.intro
    const keyword = this.keyword
    return {
      title: title + ' - Fullmoon',
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
