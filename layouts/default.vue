<template>
  <v-app dark :class="isDarkMode ? 'dark--mode' : 'light--mode'">
    <VueSkipTo to="#main" label="Skip to main content" />
    <v-app-bar
      v-model="appBar"
      app
      dark
      :fixed="content.appbar_position === 'fixed'"
      :absolute="content.appbar_position === 'absolute'"
      :dense="content.appbar_type === 'dense'"
      :src="content.appbar_background || ''"
      :height="isReadPage || isMobile ? '' : '100%'"
      :color="isHomePage ? 'primary' : 'primary'"
      class="noprint"
    >
      <Container fluid>
        <v-layout align-center row wrap>
          <Container>
            <v-layout row wrap align-center>
              <v-btn icon @click="drawer = !drawer">
                <v-icon color="white">
                  mdi-menu
                </v-icon>
              </v-btn>
              <!-- <v-toolbar-title class="font-weight-bold mt-1 ml-3">
                <nuxt-link to="/">
                  <h6>{{ _brand.name || '' }}</h6>
                </nuxt-link>
              </v-toolbar-title> -->
            </v-layout>
          </Container>
          <v-spacer />
        </v-layout>
      </Container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      width="275"
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
        <v-flex v-if="drawerLogo" xs12 class="my-4 my-md-6">
          <v-layout row wrap justify-center align-center>
            <v-flex xs8>
              <v-sheet :height="drawerLogoHeight" width="100%" color="transparent">
                <v-img :contain="drawerLogoContain" height="100%" :src="isDarkMode ? drawerLogoDark : drawerLogo" />
              </v-sheet>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-divider />
        <v-slide-y-transition>
          <v-layout v-show="isShowSearchDrawer" row wrap justify-center align-center>
            <v-flex xs10>
              <v-list-item>
                <v-list-item-content>
                  <v-text-field
                    v-model="search"
                    placeholder="Find People"
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
            </v-flex>
          </v-layout>
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
      <!-- <template v-slot:append>
        <v-divider />
        <v-flex xs12 class="my-3 my-md-6 text-center">
          <v-layout row wrap justify-center>
            <v-flex xs10>
              <ButtonSettings />
            </v-flex>
          </v-layout>
        </v-flex>
      </template> -->
    </v-navigation-drawer>
    <v-main>
      <v-overlay :value="!isLoaded" color="white" opacity="1">
        <v-progress-circular
          indeterminate
          size="64"
          color="primary"
        />
      </v-overlay>
      <div class="main-page">
        <nuxt />
      </div>
      <Footer :item="footerData" :menu="footerMenu" />
    </v-main>
  </v-app>
</template>

<script>
import global from '@/mixins/global'
import loading from '@/mixins/loading'
import search from '@/mixins/search'
import layout from '@/mixins/layout'

import Container from '@/components/container'
import ListMenu from '@/components/list_menu'
import Footer from '@/components/footer'
// import ButtonSettings from '@/components/button_settings'

export default {
  components: {
    Container,
    ListMenu,
    Footer
    // ButtonSettings
  },
  mixins: [global, layout, loading, search],
  data: () => ({
    denseAppBar: false
  }),
  watch: {
    isHomePage () {
      if (this.isHomePage === true) {
        this.denseAppBar = false
      } else {
        setTimeout(() => {
          this.denseAppBar = true
        }, 1000)
      }
    },
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
        this.appBar = true
        this.drawer = false
      }
    }
  }
}
</script>
