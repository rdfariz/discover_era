<template>
  <div id="main">
    <Background
      color="primary"
      :min-height="isSearchPage ? '100%' : '90vh'"
      height="100%"
      :background="background"
      :gradient="background_gradient"
    >
      <v-layout fill-height row wrap align-center class="w-full ma-auto">
        <Container>
          <v-layout row wrap align-center justify-center>
            <v-flex xs12 md12>
              <Fragment dark background="transparent" height="100%">
                <v-flex xs12 sm10 md8 class="ma-auto text-center">
                  <div tabindex="0">
                    <p v-if="preIntro" class="mb-0">
                      {{ preIntro || '' }}
                    </p>
                    <v-img
                      v-if="logo"
                      :lazy-src="logo"
                      :src="logo"
                      :width="isMobile ? '400' : '600'"
                      class="mx-auto my-6"
                      contain
                      :alt="'logo '+ _brand.name + '.'"
                      :aria-label="'logo '+ _brand.name + '.'"
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
                    <h1 v-if="title" class="font-weight-bold">
                      {{ title || '' }}
                    </h1>
                    <p v-if="intro" :class="isMobile ? 'lg' : 'xl'">
                      {{ intro || '' }}
                    </p>
                  </div>
                </v-flex>
                <v-flex xs12 sm10 md8 class="ma-auto">
                  <v-text-field
                    v-model="search"
                    class="my-8"
                    :placeholder="search_placeholder"
                    outlined
                    :disabled="isSearchLoading"
                    clearable
                    color="white"
                    :loading="isSearchLoading"
                    append-icon="mdi-magnify"
                    @click:append="onSubmitSearch"
                    @keydown.enter="onSubmitSearch"
                  />
                </v-flex>
              </Fragment>
            </v-flex>
          </v-layout>
        </Container>
      </v-layout>
    </Background>
    <NuxtChild />
  </div>
</template>

<script>
import global from '@/mixins/global'
import search from '@/mixins/search'

import Container from '@/components/container/'
import Fragment from '@/components/fragment/'
import Background from '@/components/background/'

export default {
  scrollToTop: true,
  components: {
    Container,
    Fragment,
    Background
  },
  mixins: [global, search],
  computed: {
    logo () {
      return this.$store.getters.home.logo || ''
    },
    title () {
      return this.$store.getters.home.title || ''
    },
    preIntro () {
      return this.$store.getters.home.preIntro || ''
    },
    intro () {
      return this.$store.getters.home.intro || ''
    },
    search_placeholder () {
      return this.$store.getters.home.search_placeholder || ''
    },
    background () {
      return this.$store.getters.home.background || ''
    },
    background_gradient () {
      return this.$store.getters.home.background_gradient
    }
  },
  head () {
    return {
      title: `Home - ${this._brand.name || ''}`
    }
  }
}
</script>
