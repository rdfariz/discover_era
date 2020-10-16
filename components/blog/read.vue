<template>
  <Container>
    <v-layout justify-center row wrap>
      <v-flex xs12 md9 class="pa-md-1">
        <v-card flat class="pa-2 pa-md-4">
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
            <v-btn v-if="body" v-print="printObj" icon class="noprint">
              <Icon icon="printer" size="1.5x" />
            </v-btn>
            <v-menu
              v-if="isLoaded && socialShare && socialShare.length > 0"
              bottom
              left
              origin="center center"
              offset-y
              nudge-bottom="10"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn v-if="body" icon class="noprint ml-2" v-bind="attrs" v-on="on">
                  <Icon icon="share-2" size="1.5x" />
                </v-btn>
              </template>

              <v-list>
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
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon>
                        mdi-{{ network }}
                      </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title class="text-capitalize">
                        <p class="sm mb-0">
                          {{ network }}
                        </p>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </ShareNetwork>
              </v-list>
            </v-menu>
          </v-toolbar>
          <v-divider class="my-2" />
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
            <v-card-text class="mt-4">
              <v-skeleton-loader v-if="!isLoaded" type="list-item-three-line" />
              <template v-else>
                <p v-if="body" class="rich-text" v-html="body" />
                <div v-if="markdown" v-html="$md.render(markdown)" />
              </template>
            </v-card-text>
          </div>
        </v-card>
      </v-flex>
      <v-flex xs12 md3 class="pa-md-1">
        <v-layout wrap justify-center>
          <v-flex xs12 class="pb-4 px-1">
            <v-card flat class="pa-2">
              <v-container grid-list-xs fluid>
                <v-skeleton-loader
                  v-if="!isLoaded"
                  type="list-item-two-line"
                  width="50%"
                />
                <template v-else>
                  <v-layout align-center row wrap>
                    <v-icon small class="mr-2">
                      mdi-account
                    </v-icon>
                    <p class="sm ma-0 text-capitalize">
                      {{ creator }}
                    </p>
                  </v-layout>
                  <v-divider class="my-4" />
                  <v-layout v-if="tagList && tagList.length > 0" align-center row wrap class="mb-5">
                    <v-icon small class="mr-2">
                      mdi-tag
                    </v-icon>
                    <nuxt-link v-for="(tag, index) in tagList" :key="index" :to="`/topik/${tag}`" class="text-capitalize">
                      <p class="sm ma-0">
                        <template v-if="index > 0">
                          ,
                        </template>
                        {{ tag }}
                      </p>
                    </nuxt-link>
                  </v-layout>
                  <v-layout v-if="publishedAt" align-center row wrap>
                    <p class="sm ma-0">
                      Terakhir diperbarui<br><span class="font-weight-medium">{{ toDate(publishedAt) }}</span>
                    </p>
                    <v-spacer />
                  </v-layout>
                </template>
              </v-container>
            </v-card>
          </v-flex>
          <template v-if="!isPages && relatedData.length > 0">
            <v-flex xs12 class="pb-2 px-1 mt-4">
              <p class="sm ma-0">
                Artikel Lainnya
              </p>
            </v-flex>
            <template v-for="(item, index) in relatedData">
              <v-flex
                v-if="item.content.title !== title && index <= 5"
                :key="index"
                xs12
                class="pb-2 px-1"
              >
                <blog-card small flat :detail-data="false" :is-image-visible="false" :story="item" />
              </v-flex>
            </template>
          </template>
        </v-layout>
      </v-flex>
    </v-layout>
  </Container>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import utils from '@/mixins/utils'

import Container from '@/components/container/'
import Icon from '@/components/icon'
import BlogCard from '@/components/blog/'

export default {
  components: {
    Container,
    Icon,
    BlogCard
  },
  mixins: [global, loading, utils],
  props: {
    story: {
      type: Object,
      default: () => ({})
    },
    isPages: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
  }),
  computed: {
    relatedData () {
      return this.$store.getters.blog.data || []
    },
    breadcrumbs () {
      return [
        {
          text: this.$route.name === 'blog-slug' ? 'Blog' : 'Home',
          exact: true,
          disabled: false,
          to: `/${this.$route.name === 'blog-slug' ? 'blog' : ''}`
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
    creator () {
      return this.content.creator || 'Anonymous'
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
    markdown () {
      return this.content.markdown || ''
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
      title: title + ' - ' + this._brand.name,
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
