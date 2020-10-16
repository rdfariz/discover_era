<template>
  <div id="main">
    <Background color="primary" min-height="100vh" height="100%">
      <Container spacing-top>
        <v-layout row wrap>
          <v-flex xs12 md6 lg7 class="pa-1">
            <v-card dark color="transparent" flat>
              <form @submit="submitMessage">
                <v-card-title primary-title class="relative">
                  <v-layout column wrap>
                    <div tabindex="0">
                      <p class="mb-0">
                        {{ preIntro }}
                      </p>
                      <h1 class="lg">
                        {{ title }}
                      </h1>
                      <p>
                        {{ intro }}
                      </p>
                    </div>
                  </v-layout>
                </v-card-title>
                <v-card-text v-if="contactForm">
                  <v-text-field
                    v-model="name"
                    label="Nama"
                    color="white"
                    placeholder="Masukkan nama kamu"
                    outlined
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
                  <Button
                    color="secondary"
                    depressed
                    :loading="loadingSubmit"
                    :disabled="loadingSubmit"
                    @click="submitMessage"
                  >
                    Kirim
                  </Button>
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
                  <v-list-item-title class="font-weight-medium" v-html="item.title" />
                  <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <v-list-item v-if="markdown" class="mt-4">
                <v-card width="100%" color="transparent" flat>
                  <div v-html="$md.render(markdown || '')" />
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
              <v-flex xs12>
                Pesan berhasil terkirim
              </v-flex>
            </v-layout>
          </v-card-title>

          <v-card-text>
            <p>Terima kasih telah menggunakan layanan kami.</p>
            <v-btn
              text
              tile
              @click="dialog = false"
            >
              Tutup
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </Background>
    <Overview v-for="(item, index) in overviewContent" :key="index" :item="item" />
  </div>
</template>

<script>
import global from '@/mixins/global'

import Container from '@/components/container'
import Lottie from '@/components/lottie'
import Button from '@/components/button'
import Overview from '@/components/overview'

import thankyouLottie from '@/static/lottie/9879-smiley-emoji.json'

export default {
  scrollToTop: true,
  components: {
    Container,
    Lottie,
    Button,
    Overview
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
    overviewContent () {
      return this.content.overviewContent || []
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
    markdown () {
      return this.content.markdown || ''
    }
  },
  methods: {
    submitMessage (e) {
      if (e && e.preventDefault()) {
        e.preventDefault()
      }
      this.loadingSubmit = true
      setTimeout(() => {
        this.dialog = true
        this.loadingSubmit = false
      }, 500)
    }
  },
  head () {
    return {
      title: `Kontak - ${this._brand.name}`
    }
  }
}
</script>
