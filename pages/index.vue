<template>
  <div>
    <Background color="primary" :height="isSearchPage ? '100%' : '100vh'">
      <v-layout fill-height row wrap align-center class="w-full ma-auto">
        <Container fluid>
          <v-layout row wrap align-center>
            <v-flex xs12>
              <Fragment dark background="transparent" height="100%">
                <template #leftContent>
                  <Container>
                    <v-flex xs12 class="text-center text-md-left">
                      <p class="mb-0">
                        Hai, aku
                      </p>
                      <h1 class="lg">
                        fullmoon
                      </h1>
                      <p>
                        Hadir sebagai solusi masa depan bersama
                      </p>
                      <v-layout row wrap>
                        <v-text-field
                          v-model="search"
                          label="Cari sesuatu.."
                          single-line
                          outlined
                          :disabled="isSearchLoading"
                          class="mr-2"
                          clearable
                          color="white"
                          :loading="isSearchLoading"
                          append-icon="mdi-magnify"
                          @click:append="handleSearch"
                          @keydown.enter="handleSearch"
                        />
                      </v-layout>
                      <template v-if="!isSearchPage">
                        <h3>For you</h3>
                        <swiper
                          ref="mySwiper"
                          class="mt-2"
                          :options="swiperOptions"
                          :delete-instance-on-destroy="true"
                          :cleanup-styles-on-destroy="false"
                        >
                          <swiper-slide v-for="(item, index) in lomba" :key="index">
                            <v-card color="transparent" flat class="pa-1 mr-1 mr-md-3">
                              <v-sheet :color="isDarkMode ? '' : 'grey lighten-4'">
                                <v-img height="200" :src="item.src" />
                              </v-sheet>
                              <v-card-title>
                                <Truncate>Top western road trips</Truncate>
                              </v-card-title>

                              <v-card-subtitle>
                                <Truncate>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus excepturi, iste dignissimos quas tempore dolore. Voluptatum eveniet quis placeat debitis nihil officia corrupti in nam delectus, quisquam vel laborum nobis.</Truncate>
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

import illustration1 from '@/static/images/background/1.jpg'
import illustration2 from '@/static/images/background/2.jpg'
// import illustration2 from '@/static/images/illustration/19.svg'
import illustration3 from '@/static/images/illustration/stubborn/17.svg'

// import Truncate from '@/components/text/truncate'
import Container from '@/components/container/'
import Fragment from '@/components/fragment/'
import Background from '@/components/background/'

export default {
  components: {
    Container,
    // Truncate,
    Fragment,
    Background
  },
  mixins: [global],
  asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    const search = params.keyword || ''
    return { search }
  },
  data: () => ({
    illustration: [illustration1, 'https://superscene.pro/img/header/person.png', illustration2, illustration3],
    lomba: [
      {
        title: 'Web design',
        src: illustration1
      },
      {
        title: 'Music cover',
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
      },
      {
        title: 'Video animasi',
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
      },
      {
        title: 'Game produksi',
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
      }
    ],
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
          slidesPerView: 3.5
        }
      }
    }
  }),
  computed: {
    isSearchPage () {
      const route = this.$route.name
      if (route === 'index-search-keyword' || route === 'index-search') {
        return true
      }
      return false
    },
    isSearchLoading () {
      return this.$store.getters.search.loading
    },
    swiper () {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted () {
    this.reInitSwiper()
  },
  updated () {
    this.search = this.$route.params.keyword
  },
  methods: {
    reInitSwiper () {
      const swiper = this.$refs.mySwiper
      if (swiper) {
        swiper.initSwiper()
      }
    },
    handleSearch () {
      if (this.search !== '' && this.search !== null) {
        this.$router.push(`/search/${this.search}`)
      } else {
        this.$router.push('/')
      }
    }
  }
}
</script>
