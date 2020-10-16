<template>
  <Background
    :color="item.background && item.background.color ? item.background.color : ''"
    :min-height="!isMobile && item.height ? item.height : '100%'"
    height="100%"
    :background="item.background_image"
    :gradient="item.background_gradient"
  >
    <v-layout fill-height row wrap align-center class="w-full ma-auto py-6 py-sm-12 py-md-16">
      <Container>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12>
            <Fragment :dark="item.dark" background="transparent" height="100%">
              <v-flex v-if="item.category" xs12 :md2="!item.fullpage" :md12="item.fullpage">
                <p class="overview--category mb-0" :aria-label="item.category || ''" tabindex="0" v-html="item.category || ''" />
                <br>
              </v-flex>
              <v-flex xs12 :md10="!item.fullpage" :md12="item.fullpage" :class="item.fullpage ? '' : 'pl-md-3 pl-lg-4'">
                <template v-if="item.title">
                  <div tabindex="0">
                    <p v-if="item.preIntro" class="mb-0" v-html="item.preIntro || ''" />
                    <h1 v-if="item.title" class="my-1 overview--title" v-html="item.title || ''" />
                    <p v-if="item.intro" class="mb-0" v-html="item.intro || ''" />
                    <br>
                  </div>
                </template>
                <p v-if="item.body" class="rich-text overview--text" tabindex="0" v-html="richtext(item.body || '')" />
                <div v-if="item.markdown" v-html="$md.render(item.markdown || '')" />
                <template v-if="item.items">
                  <v-layout row wrap class="mt-4">
                    <v-flex
                      v-for="(item_child, index_child) in item.items"
                      :key="index_child"
                      xs12
                      sm6
                      md6
                      lg4
                      class="pa-2 pa-md-4 mb-8 mb-md-0"
                    >
                      <v-card flat color="transparent">
                        <div tabindex="0">
                          <v-card-title class="pa-0 font-weight-bold">
                            <Truncate>
                              {{ item_child.title || '' }}
                            </Truncate>
                          </v-card-title>

                          <v-card-subtitle class="pa-0 pt-3">
                            <p class="sm">{{ item_child.intro || '' }}</p>
                          </v-card-subtitle>
                        </div>

                        <v-card-text class="pa-0">
                          <v-img
                            v-if="item_child.thumbnail"
                            :lazy-src="item_child.thumbnail"
                            :src="item_child.thumbnail"
                            :alt="item_child.title + item_child.intro"
                            :height="item_child.thumbnail_height || 300"
                            aspect-ratio="1"
                            class="mb-2"
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
                          <Button
                            v-if="item_child.link"
                            :to="!item_child.link_external ? item_child.link : ''"
                            :href="item_child.link_external ? item_child.link : ''"
                            :target="item_child.link_external ? '_blank' : ''"
                            color="secondary"
                            width="100%"
                          >
                            <span class="black--text">
                              {{ item_child.link_text || '' }}
                            </span>
                            <v-spacer />
                            <Icon class="black--text" icon="arrow-right" />
                          </Button>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
                </template>
                <Button
                  v-if="item.link"
                  :to="!item.link_external ? item.link : ''"
                  :href="item.link_external ? item.link : ''"
                  :target="item.link_external ? '_blank' : ''"
                  class="mt-2"
                  color="secondary"
                >
                  <span>
                    {{ item.link_text || '' }}
                  </span>
                </Button>
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
import Button from '@/components/button'
import Truncate from '@/components/text/truncate'
import Icon from '@/components/icon'

export default {
  components: {
    Container,
    Fragment,
    Button,
    Truncate,
    Icon
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
