<template>
  <Background
    :color="item.background && item.background.color ? item.background.color : ''"
    :min-height="item.height || '100%'"
    height="100%"
    :background="item.background_image"
  >
    <v-layout fill-height row wrap align-center class="w-full ma-auto py-6 py-sm-12 py-md-16">
      <Container>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12>
            <Fragment :dark="item.dark" background="transparent" height="100%">
              <v-flex v-if="item.category" xs12 :md3="!item.fullpage" :md12="item.fullpage">
                <h6 v-html="item.category || ''" />
                <br>
              </v-flex>
              <v-flex xs12 :md9="!item.fullpage" :md12="item.fullpage" :class="item.fullpage ? '' : 'pl-md-3 pl-lg-4'">
                <template v-if="item.title">
                  <p class="mb-0" v-html="item.preIntro || ''" />
                  <h1 class="my-1" v-html="item.title || ''" />
                  <p class="mb-0" v-html="item.intro || ''" />
                  <br>
                </template>
                <p v-if="item.body" class="rich-text overview" v-html="richtext(item.body || '')" />
                <template v-if="item.items">
                  <v-layout row wrap>
                    <v-flex
                      v-for="(item_child, index_child) in item.items"
                      :key="index_child"
                      xs12
                      md6
                      lg4
                      class="pa-2"
                    >
                      <v-card flat color="transparent">
                        <v-card-title class="pa-0">
                          <p class="mb-0 font-weight-medium">
                            {{ item_child.title || '' }}
                          </p>
                        </v-card-title>

                        <v-card-subtitle class="pa-0 pt-2">
                          <p class="sm">{{ item_child.intro || '' }}</p>
                        </v-card-subtitle>

                        <v-card-text class="pa-0">
                          <v-img
                            v-if="item_child.thumbnail"
                            :lazy-src="item_child.thumbnail"
                            :src="item_child.thumbnail"
                            :alt="item_child.title + item_child.intro"
                            :contain="isMobile"
                            :height="item_child.thumbnail_height || 300"
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
                          <v-btn
                            v-if="item_child.link"
                            :to="!item_child.link_external ? item_child.link : ''"
                            :href="item_child.link_external ? item_child.link : ''"
                            :target="item_child.link_external ? '_blank' : ''"
                            width="100%"
                            tile
                            link
                            class="mt-4 mb-8 text-capitalize black--text"
                            color="secondary"
                          >
                            {{ item_child.link_text || '' }}
                          </v-btn>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </template>
                <v-btn
                  v-if="item.link"
                  :to="!item.link_external ? item.link : ''"
                  :href="item.link_external ? item.link : ''"
                  :target="item.link_external ? '_blank' : ''"
                  outlined
                  tile
                  link
                >
                  {{ item.link_text || '' }}
                </v-btn>
              </v-flex>
            </Fragment>
          </v-flex>
        </v-layout>
      </Container>
    </v-layout>
  </Background>
</template>

<script>
import global from '@/mixins/global'

import Container from '@/components/container'
import Fragment from '@/components/fragment'

export default {
  components: {
    Container,
    Fragment
  },
  mixins: [global],
  props: {
    item: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
