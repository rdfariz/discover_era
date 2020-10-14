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
                <p class="rich-text overview" v-html="richtext(item.body || '')" />
                <v-btn v-if="item.link" outlined tile :to="item.link || ''">
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
