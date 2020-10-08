<template>
  <div id="main">
    <Background color="primary" :min-height="isSearchPage ? '100%' : '100vh'" height="100%" :background="background">
      <v-layout fill-height row wrap align-center class="w-full">
        <Container spacing-top>
          <v-layout row wrap align-center justify-center>
            <v-flex xs12 md10>
              <Fragment dark background="transparent" height="100%">
                <template #leftContent>
                  <Container>
                    <v-flex xs12 class="text-center">
                      <p class="mb-0">
                        {{ preIntro || '' }}
                      </p>
                      <v-img
                        v-if="logo"
                        :lazy-src="logo"
                        :src="logo"
                        max-width="75%"
                        class="mx-auto my-6"
                        contain
                        :alt="'logo '+ title || _brand.name"
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
                      <h1 class="font-weight-bold">
                        {{ title || '' }}
                      </h1>
                      <p>
                        {{ intro || '' }}
                      </p>
                      <v-layout row wrap justify-center align-center class="my-10">
                        <v-flex xs11>
                          <v-text-field
                            v-model="search"
                            placeholder="Find amazing people based on your interests"
                            outlined
                            :disabled="isSearchLoading"
                            :dense="isMobile"
                            clearable
                            color="white"
                            :loading="isSearchLoading"
                            append-icon="mdi-magnify"
                            @click:append="onSubmitSearch"
                            @keydown.enter="onSubmitSearch"
                          />
                        </v-flex>
                      </v-layout>
                      <template v-if="!isSearchPage && recommendVisible">
                        <p v-if="recommendTitle" class="mt-2">
                          {{ recommendTitle || '' }}
                        </p>
                        <swiper
                          ref="mySwiper"
                          class="mt-4"
                          :options="swiperOptions"
                          :delete-instance-on-destroy="true"
                          :cleanup-styles-on-destroy="false"
                        >
                          <swiper-slide v-for="(item, index) in recommendContent" :key="index">
                            <v-card color="transparent" flat class="text-center pa-1 mr-1 mr-md-3 box-sizing--border">
                              <div>
                                <v-avatar
                                  v-if="item.thumbnail"
                                  color="primary"
                                  size="124"
                                >
                                  <v-img
                                    :lazy-src="item.thumbnail"
                                    :src="item.thumbnail"
                                    :alt="item.title || ''"
                                  >
                                    <template v-slot:placeholder>
                                      <v-row
                                        class="fill-height ma-0"
                                        align="center"
                                        justify="center"
                                      >
                                        <v-progress-circular
                                          indeterminate
                                          color="secondary"
                                        />
                                      </v-row>
                                    </template>
                                  </v-img>
                                </v-avatar>
                              </div>
                              <v-card-title>
                                <p class="ma-auto mb-0 font-weight-medium">
                                  {{ item.title || '' }}
                                </p>
                              </v-card-title>

                              <v-card-subtitle>
                                <span>{{ item.intro || '' }}</span>
                              </v-card-subtitle>
                            </v-card>
                          </swiper-slide>
                          <div slot="pagination" class="swiper-pagination" />
                        </swiper>
                      </template>
                    </v-flex>
                  </Container>
                </template>
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
  components: {
    Container,
    Fragment,
    Background
  },
  mixins: [global, search],
  data: () => ({
    swiperOptions: {
      speed: 1000,
      spaceBetween: 0,
      slidesPerView: 1,
      loop: false,
      pagination: {
        el: '.swiper-pagination'
      },
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        640: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 3
        }
      }
    }
  }),
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
    background () {
      return this.$store.getters.home.background || ''
    },
    recommendVisible () {
      return this.$store.getters.home.recommendVisible || false
    },
    recommendTitle () {
      return this.$store.getters.home.recommendTitle || ''
    },
    recommendContent () {
      return this.$store.getters.home.recommendContent || []
    },
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    this.reInitSwiper()
  },
  methods: {
    reInitSwiper () {
      const swiper = this.$refs.mySwiper
      if (swiper) {
        swiper.initSwiper()
      }
    }
  },
  head () {
    return {
      title: `Home - ${this._brand.name || ''}`
    }
  }
}
</script>
