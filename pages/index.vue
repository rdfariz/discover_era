<template>
  <Container spacing-top>
    <v-layout class="mb-10" row wrap justify-center align-center>
      <v-flex xs12>
        <Fragment>
          <template #leftContent>
            <v-flex xs12 :md6="!isSearchPage" class="pa-2 pa-md-4">
              <h1>Via Explore</h1>
              <p class="text--secondary">
                Find all about your question
              </p>
              <v-layout row wrap>
                <v-text-field
                  v-model="search"
                  label="Ex: lomba olivia"
                  single-line
                  outlined
                  :disabled="isSearchLoading"
                  class="mr-2"
                  color="secondary"
                  clearable
                  @keydown.enter="handleSearch"
                />
                <v-btn
                  :loading="isSearchLoading"
                  depressed
                  color="blue"
                  class="white--text"
                  height="55"
                  @click="handleSearch"
                >
                  Search
                </v-btn>
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
                    <v-card flat class="pa-1 mr-1">
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
          </template>

          <template v-if="!isSearchPage" #rightContent>
            <v-flex xs12 md6>
              <v-sheet :color="isDarkMode ? '' : 'grey lighten-4'" height="100%">
                <v-img contain width="100%" height="100%" class="ma-auto" :src="illustration[1]" />
              </v-sheet>
            </v-flex>
          </template>

          <template #append>
            <NuxtChild />
          </template>
        </Fragment>
      </v-flex>
    </v-layout>
  </Container>
</template>

<script>
import global from '@/mixins/global'

import illustration1 from '@/static/images/background/1.jpg'
import illustration2 from '@/static/images/illustration/19.svg'
import illustration3 from '@/static/images/illustration/stubborn/17.svg'

import Truncate from '@/components/text/truncate'
import Container from '@/components/container/'
import Fragment from '@/components/fragment/'

export default {
  components: {
    Container,
    Truncate,
    Fragment
  },
  mixins: [global],
  asyncData ({ app, isDev, route, store, env, params, query, req, res, redirect, error }) {
    const search = params.keyword || ''
    return { search }
  },
  data: () => ({
    illustration: [illustration1, illustration2, illustration3],
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
          slidesPerView: 2.5
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
