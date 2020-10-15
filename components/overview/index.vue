<template>
  <Background
    :color="item.background && item.background.color ? item.background.color : ''"
    :min-height="!isMobile && item.height ? item.height : '100%'"
    height="100%"
    :background="item.background_image"
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
                      md6
                      lg4
                      class="pa-2 pa-md-4"
                    >
                      <v-card flat color="transparent">
                        <v-card-title class="pa-0">
                          <Truncate>
                            {{ item_child.title || '' }}
                          </Truncate>
                        </v-card-title>

                        <v-card-subtitle class="pa-0 pt-3">
                          <p class="sm font-weight-bold">{{ item_child.intro || '' }}</p>
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
                          <Button
                            v-if="item_child.link"
                            :to="!item_child.link_external ? item_child.link : ''"
                            :href="item_child.link_external ? item_child.link : ''"
                            :target="item_child.link_external ? '_blank' : ''"
                            class="mt-2"
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
                >
                  <span class="black--text">
                    {{ item.link_text || '' }}
                  </span>
                  <v-spacer />
                  <Icon class="black--text" icon="arrow-right" />
                </Button>
              </v-flex>
            </Fragment>
          </v-flex>
        </v-layout>
      </Container>
    </v-layout>
  </Background>
</template>

<style lang="scss">
.overview--text {
  h5 {
    font-size: 14px;
    line-height: 20px;
  }
  h6 {
    font-size: 13px;
    line-height: 20px;
  }
}
.overview--category {
  font-weight: 700;
}

@media screen and (min-width: 960px) {
  .overview--title {
    font-weight: 700;
    font-size: 80px;
    line-height: 96.82px;
  }
  .overview--category {
    font-weight: 700;
    font-size: 18px;
    line-height: 25.2px;
  }
  .overview--text {
    h5 {
      font-weight: 400;
      font-size: 36px;
      line-height: 50.4px;
    }
    h6 {
      font-weight: 400;
      font-size: 24px;
      line-height: 33.6px;
    }
  }
}
</style>

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
