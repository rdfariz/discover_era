<template>
  <Background color="primary" min-height="100vh" height="100%">
    <Container>
      <v-layout row wrap>
        <v-flex xs12 md6 lg7 class="pa-1">
          <v-card dark color="transparent" flat>
            <form @submit="submitMessage">
              <v-card-title primary-title class="relative">
                <v-layout column wrap>
                  <p class="mb-0">
                    {{ preIntro }}
                  </p>
                  <h1 class="lg">
                    {{ title }}
                  </h1>
                  <p>
                    {{ intro }}
                  </p>
                </v-layout>
              </v-card-title>
              <v-card-text v-if="contactForm">
                <v-text-field
                  v-model="name"
                  label="Nama"
                  color="white"
                  placeholder="Masukkan nama kamu"
                  outlined
                  autofocus
                />
                <v-textarea
                  v-model="message"
                  label="Pesan"
                  placeholder="Masukkan pesan kamu"
                  value=""
                  color="white"
                  outlined
                  no-resize
                  rows="6"
                />
                <v-btn
                  class="mr-4 text-capitalize"
                  depressed
                  outlined
                  :loading="loadingSubmit"
                  :disabled="loadingSubmit || name === '' || message === ''"
                  @click="submitMessage"
                >
                  Kirim Pesan
                </v-btn>
              </v-card-text>
            </form>
          </v-card>
        </v-flex>
        <v-flex xs12 md6 lg5 class="pa-1">
          <v-list
            subheader
            two-line
            color="transparent"
            dark
            rounded
          >
            <v-list-item
              v-for="(item, index) in social"
              :key="index"
              :to="!item.link_external ? item.link : ''"
              :href="item.link_external ? item.link : ''"
              :target="item.link_external ? '_blank' : ''"
              :disabled="item.disabled"
              link
            >
              <v-list-item-avatar>
                <v-icon
                  class="primary lighten-1"
                  dark
                >
                  {{ item.icon || item.icon_code || '' }}
                </v-icon>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="font-weight-medium">
                  {{ item.title }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="maps" class="mt-4">
              <v-card width="100%" height="300" color="transparent" flat>
                <iframe
                  width="100%"
                  height="300"
                  frameborder="0"
                  style="border:0"
                  :src="content.maps || ''"
                  allowfullscreen
                />
              </v-card>
            </v-list-item>
          </v-list>
        </v-flex>
      </v-layout>
    </Container>
    <v-dialog
      v-model="dialog"
      width="300"
    >
      <v-card class="text-center">
        <Lottie height="200px" :options="lottieOptions" />
        <v-card-title class="font-weight-bold">
          <v-layout row wrap justify-center align-center>
            Pesan berhasil terkirim
          </v-layout>
        </v-card-title>

        <v-card-text>
          <p>Terima kasih sudah menggunakan layanan kami.</p>
          <v-btn
            text
            @click="dialog = false"
          >
            Tutup
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </Background>
</template>

<script>
import global from '@/mixins/global'

import Container from '@/components/container'
import Lottie from '@/components/lottie'

import thankyouLottie from '@/static/lottie/9879-smiley-emoji.json'

export default {
  components: {
    Container,
    Lottie
  },
  mixins: [global],
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('contact/getData')
    return { lottieOptions: { animationData: thankyouLottie } }
  },
  data: () => ({
    loadingSubmit: false,
    dialog: false,
    name: '',
    message: ''
  }),
  computed: {
    story () {
      return this.$store.getters.contact.data || {}
    },
    content () {
      return this.story.content || {}
    },
    contactForm () {
      return this.content.contactForm || true
    },
    preIntro () {
      return this.content.preIntro || ''
    },
    title () {
      return this.content.title || ''
    },
    intro () {
      return this.content.intro || ''
    },
    social () {
      if (this.content.social) {
        return this.content.social.map((el) => {
          return {
            title: el.title || '',
            subtitle: el.subtitle || '',
            icon: (el.icon && el.icon.icon) ? el.icon.icon : '',
            icon_code: el.icon_code || '',
            link: el.link || '',
            link_external: el.link_external || false,
            disabled: el.disabled || false
          }
        })
      } else {
        return []
      }
    },
    maps () {
      return this.content.maps || ''
    }
  },
  methods: {
    submitMessage (e) {
      if (e && e.preventDefault()) {
        e.preventDefault()
      }
      if (this.name && this.message) {
        this.loadingSubmit = true
        setTimeout(() => {
          this.dialog = true
          this.loadingSubmit = false
        }, 500)
      }
    }
  },
  head () {
    return {
      title: `Contact - ${this._brand.name}`
    }
  }
}
</script>
