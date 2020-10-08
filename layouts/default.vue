<template>
  <v-app :class="isDarkMode ? 'dark--mode' : 'light--mode'">
    <VueSkipTo to="#main" label="Skip to main content" />
    <v-app-bar
      app
      :fixed="content.appbar_position === 'fixed'"
      :absolute="content.appbar_position === 'absolute'"
      :dense="content.appbar_type === 'dense'"
      :src="content.appbar_background || ''"
      :height="content.appbar_height || ''"
      :color="content.appbar_color && content.appbar_color.color ? content.appbar_color.color : ''"
      :value="appBar"
      class="noprint"
      :hide-on-scroll="isReadPage"
    >
      <Container>
        <v-layout align-center row wrap>
          <v-btn class="hidden-md-and-up" icon @click="drawer = !drawer">
            <v-icon>{{ 'mdi-menu' }}</v-icon>
          </v-btn>
          <v-toolbar-title class="font-weight-bold mt-1 ml-3">
            <nuxt-link to="/">
              <h6>{{ _brand.name || '' }}</h6>
            </nuxt-link>
          </v-toolbar-title>
          <v-spacer />
        </v-layout>
      </Container>
    </v-app-bar>
    <v-navigation-drawer
      :value="drawer"
      width="300"
      height="100%"
      :right="isRtl"
      app
      fixed
      class="noprint"
      :class="isReadPage ? 'read--mode' : ''"
      disable-resize-watcher
      disable-route-watcher
    >
      <template v-slot:prepend>
        <v-flex xs12 class="my-4 my-md-6">
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
                  outlined
                  dense
                  :disabled="isSearchLoading"
                  clearable
                  :color="isDarkMode ? 'white' : 'primary'"
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
        <v-layout row wrap fill-height class="ma-0 pa-0">
          <v-container grid-list-xs>
            <v-layout
              row
              wrap
              justify-center
              fill-height
            >
              <v-flex xs12 class="my-4">
                <ListMenu :menu="menu" />
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </template>
      <template v-slot:append>
        <v-divider />
        <v-flex xs12 class="my-3 my-md-6 text-center">
          <v-layout row wrap justify-center>
            <v-flex xs10>
              <ButtonSettings />
            </v-flex>
          </v-layout>
        </v-flex>
      </template>
    </v-navigation-drawer>
    <v-main>
      <v-overlay :value="!isLoaded" color="white" opacity="1">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
        />
      </v-overlay>
      <nuxt />
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
                icon_code: item.icon_code || '',
                link: item.link || '',
                link_external: item.link_external || false,
                disabled: item.disabled || false,
                variant: item.variant || ''
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
              icon_code: el.icon_code || '',
              link: el.link || '',
              link_external: el.link_external || false,
              disabled: el.disabled || false,
              variant: el.variant || ''
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
  watch: {
    $route () {
      this.initDrawer()
    },
    isMobile () {
      this.initDrawer()
    }
  },
  created () {
    this.initDrawer()
    // this.setColorPallete()
  },
  methods: {
    initDrawer () {
      if (this.isMobile && !this.isReadPage) {
        this.appBar = true
        this.drawer = false
      } else if (this.isReadPage) {
        this.appBar = true
        this.drawer = false
      } else {
        this.appBar = false
        this.drawer = true
      }
    }
  }
}
</script>
