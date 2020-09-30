<template>
  <v-app dark :class="isDarkMode ? 'dark--mode' : 'light--mode'">
    <VueSkipTo to="#main" label="Skip to main content" />
    <v-app-bar
      app
      :fixed="content.appbar_position === 'fixed'"
      :absolute="content.appbar_position === 'absolute'"
      :dense="content.appbar_type === 'dense'"
      :src="content.appbar_background || ''"
      :height="content.appbar_height || ''"
      :color="content.appbar_color && content.appbar_color.color ? content.appbar_color.color : ''"
      :value="$vuetify.breakpoint.mobile"
    >
      <Container>
        <v-layout align-center row wrap>
          <v-btn icon @click="drawer = !drawer">
            <v-icon>{{ 'mdi-menu' }}</v-icon>
          </v-btn>
          <v-toolbar-title class="font-weight-bold mt-1 ml-3">
            <nuxt-link to="/">
              Fullmoon
            </nuxt-link>
          </v-toolbar-title>
          <v-spacer />
        </v-layout>
      </Container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      :mini-variant="false"
      mini-variant-width="85"
      width="300"
      height="100%"
      app
      :right="isRtl"
      :class="isReadPage ? 'read--mode' : ''"
    >
      <template v-slot:prepend>
        <v-flex xs12 class="my-6">
          <v-sheet v-if="drawerLogo" :height="drawerLogoHeight" color="transparent">
            <v-img :contain="drawerLogoContain" height="100%" :src="isDarkMode ? drawerLogoDark : drawerLogo" />
          </v-sheet>
        </v-flex>
        <v-divider />
        <v-slide-y-transition>
          <div v-show="isShowSearchDrawer">
            <v-list-item>
              <v-list-item-content>
                <v-text-field
                  v-model="search"
                  label="Cari sesuatu.."
                  single-line
                  outlined
                  dense
                  :disabled="isSearchLoading"
                  clearable
                  color="primary"
                  :loading="isSearchLoading"
                  append-icon="mdi-magnify"
                  class="hide-detail mt-1"
                  @click:append="onSubmitSearch"
                  @keydown.enter="onSubmitSearch"
                />
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </div>
        </v-slide-y-transition>
      </template>
      <template>
        <perfect-scrollbar>
          <v-layout row wrap align-center fill-height class="ma-0 pa-0">
            <v-container grid-list-xs>
              <v-layout
                row
                wrap
                align-center
                justify-center
                fill-height
              >
                <v-flex xs12 class="my-4">
                  <ListMenu :menu="menu" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-layout>
        </perfect-scrollbar>
      </template>
      <template v-slot:append>
        <v-divider />
        <v-flex xs12 class="my-1 text-center">
          <v-layout row wrap justify-center>
            <v-flex xs10>
              <ButtonSettings />
            </v-flex>
          </v-layout>
        </v-flex>
        <v-divider />
        <v-flex xs12 class="my-6 text-center">
          <v-layout row wrap justify-center>
            <v-flex xs10>
              <v-btn class="mx-1" icon>
                <v-icon>mdi-facebook</v-icon>
              </v-btn>
              <v-btn class="mx-1" icon>
                <v-icon>mdi-twitter</v-icon>
              </v-btn>
              <v-btn class="mx-1" icon>
                <v-icon>mdi-whatsapp</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </template>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
      <v-overlay :value="!isLoaded" color="primary" opacity="1">
        <v-progress-circular
          indeterminate
          size="64"
        />
      </v-overlay>
    </v-main>
  </v-app>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import search from '@/mixins/search'

import Container from '@/components/container'
import ListMenu from '@/components/list_menu'
import ButtonSettings from '@/components/button_settings'

export default {
  components: {
    Container,
    ListMenu,
    ButtonSettings
  },
  mixins: [global, loading, search],
  data: () => ({
    appBar: true,
    drawer: true,
    drawerMini: true,
    detailMenu: false
  }),
  computed: {
    story () {
      return this.$store.getters.layout || {}
    },
    content () {
      return this.story.content || {}
    },
    menu () {
      if (this.content.menu) {
        return this.content.menu.map((el) => {
          if (el.component && el.component === 'menu-item-nested') {
            const items = el.items.map((item) => {
              return {
                title: item.title || '',
                icon: (item.icon && item.icon.icon) ? item.icon.icon : '',
                link: item.link || '',
                link_external: item.link_external || false,
                disabled: item.disabled || false
              }
            })
            return {
              title: el.title || '',
              disabled: el.disabled || false,
              items: items || []
            }
          } else {
            return {
              title: el.title || '',
              icon: (el.icon && el.icon.icon) ? el.icon.icon : '',
              link: el.link || '',
              link_external: el.link_external || false,
              disabled: el.disabled || false
            }
          }
        })
      } else {
        return []
      }
    },
    drawerLogoDark () {
      return this.content.drawer_logo_dark || this.drawerLogo
    },
    drawerLogo () {
      return this.content.drawer_logo || ''
    },
    drawerLogoHeight () {
      return this.content.drawer_logo_height || ''
    },
    drawerLogoContain () {
      return this.content.drawer_logo_contain || false
    }
  },
  created () {
    this.initDrawer()
    this.setColorPallete()
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    initDrawer () {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false
      } else {
        this.drawerMini = this.content.drawer_mini
        this.drawer = true
      }
    }
  }
}
</script>
