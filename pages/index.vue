<template>
  <div id="main">
    <Background color="primary" :min-height="isSearchPage ? '100%' : '100vh'" height="100%">
      <v-layout fill-height row wrap align-center class="w-full ma-auto">
        <Container fluid>
          <v-layout row wrap align-center>
            <v-flex xs12>
              <Fragment dark background="transparent" height="100%">
                <template #leftContent>
                  <Container>
                    <v-flex xs12 class="text-center text-md-left">
                      <p class="mb-0">
                        {{ preIntro || '' }}
                      </p>
                      <h1 class="lg">
                        {{ title || '' }}
                      </h1>
                      <p>
                        {{ intro || '' }}
                      </p>
                      <v-layout row wrap>
                        <v-text-field
                          v-model="search"
                          label="Cari sesuatu.."
                          outlined
                          :disabled="isSearchLoading"
                          class="mr-2"
                          clearable
                          color="white"
                          :loading="isSearchLoading"
                          append-icon="mdi-magnify"
                          @click:append="onSubmitSearch"
                          @keydown.enter="onSubmitSearch"
                        />
                      </v-layout>
                      <template v-if="!isSearchPage && recommendVisible">
                        <h4 class="mt-2">
                          {{ recommendTitle || '' }}
                        </h4>
                        <swiper
                          ref="mySwiper"
                          class="mt-3"
                          :options="swiperOptions"
                          :delete-instance-on-destroy="true"
                          :cleanup-styles-on-destroy="false"
                        >
                          <swiper-slide v-for="(item, index) in recommendContent" :key="index">
                            <v-card color="transparent" flat class="text-left pa-1 mr-1 mr-md-3 box-sizing--border">
                              <v-sheet :height="isMobile ? '165' : '175'" :color="isDarkMode ? 'grey darken-3' : 'grey lighten-2'">
                                <v-img v-if="item.thumbnail" :lazy-src="item.thumbnail" :src="item.thumbnail" :max-height="isMobile ? '165' : '175'" :alt="item.title || ''">
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
                              <v-card-title>
                                <Truncate>{{ item.title || '' }}</Truncate>
                              </v-card-title>

                              <v-card-subtitle>
                                <Truncate>{{ item.intro || '' }}</Truncate>
                              </v-card-subtitle>
                              <v-card-text>
                                <v-btn small depressed outlined :to="item.link.cached_url || ''">
                                  Baca Selengkapnya
                                </v-btn>
                              </v-card-text>
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
      slidesPerView: 1.06,
      loop: false,
      pagination: {
        el: '.swiper-pagination'
      },
      breakpoints: {
        480: {
          slidesPerView: 1.06
        },
        640: {
          slidesPerView: 2
        },
        1200: {
          slidesPerView: 3.5
        }
      }
    }
  }),
  computed: {
    title () {
      return this.$store.getters.home.title || ''
    },
    preIntro () {
      return this.$store.getters.home.preIntro || ''
    },
    intro () {
      return this.$store.getters.home.intro || ''
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
      title: 'Home - Fullmoon'
    }
  }
}
</script>
