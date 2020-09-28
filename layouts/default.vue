<template>
  <v-app dark :class="isDarkMode ? 'dark--mode' : 'light--mode'">
    <v-app-bar
      app
      :fixed="content.appbar_position === 'fixed'"
      :absolute="content.appbar_position === 'absolute'"
      :dense="content.appbar_type === 'dense'"
      :src="content.appbar_background || ''"
      height="75"
      :color="content.appbar_color.color ? content.appbar_color.color : (isDarkMode ? 'black' : 'white')"
      :value="$vuetify.breakpoint.mobile"
    >
      <Container>
        <v-layout align-center row wrap>
          <v-btn icon @click="drawer = !drawer">
            <v-icon>{{ 'mdi-menu' }}</v-icon>
          </v-btn>

          <!-- <v-toolbar-title class="font-weight-bold">
            <nuxt-link to="/">
              fullmoon
            </nuxt-link>
          </v-toolbar-title> -->

          <v-spacer />
          <!-- <v-btn class="text-capitalize mx-1" text depressed to="/info">
            Info
            <v-icon right>
              mdi-chevron-down
            </v-icon>
          </v-btn>
          <v-btn class="text-capitalize mx-1" text depressed to="/about">
            About
            <v-icon right>
              mdi-chevron-down
            </v-icon>
          </v-btn>
          <v-btn
            class="text-capitalize mx-1"
            text
            depressed
            to="/blog"
          >
            Blog
            <v-icon right>
              mdi-chevron-down
            </v-icon>
          </v-btn> -->
          <v-menu
            rounded
            offset-y
            :nudge-bottom="10"
          >
            <template v-slot:activator="{ attrs, on }">
              <v-btn class="mx-1" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-cog</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="isDarkMode"
                    color="purple"
                  />
                </v-list-item-action>
                <v-list-item-title>Dark Mode</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-action>
                  <v-switch
                    v-model="isRtl"
                    color="purple"
                  />
                </v-list-item-action>
                <v-list-item-title>RTL</v-list-item-title>
              </v-list-item>
              <!-- <v-btn icon @click="toggleDarkMode">
                <v-icon>mdi-brightness-6</v-icon>
              </v-btn> -->
              <!-- <v-btn icon @click="toggleRtl">
                <v-icon>mdi-align-horizontal-right</v-icon>
              </v-btn> -->
            </v-list>
          </v-menu>
          <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
        </v-layout>
      </Container>
      <template v-if="detailMenu" #extension>
        <Container fluid>
          <v-layout row wrap>
            <v-flex xs12>
              <v-tabs align-with-title>
                <v-tab>Tab 1</v-tab>
                <v-tab>Tab 2</v-tab>
                <v-tab>Tab 3</v-tab>
              </v-tabs>
            </v-flex>
          </v-layout>
        </Container>
      </template>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      :mini-variant="false"
      mini-variant-width="85"
      width="300"
      app
      :right="isRtl"
      :class="isReadPage ? 'read--mode' : ''"
    >
      <template v-slot:prepend>
        <v-flex xs12 class="my-6">
          <v-sheet v-if="drawerLogo" :height="drawerLogoHeight" color="transparent">
            <v-img :contain="drawerLogoContain" height="100%" :src="drawerLogo" />
          </v-sheet>
        </v-flex>
        <v-divider />
      </template>
      <template>
        <v-layout row wrap align-center fill-height>
          <v-container grid-list-xs>
            <v-layout row wrap align-center justify-center fill-height>
              <v-flex xs10 class="my-6">
                <v-list rounded>
                  <v-list-item
                    v-for="item in menu"
                    :key="item.title"
                    link
                    :to="item.link"
                    color="primary"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="font-weight-bold">
                        {{ item.title }}
                      </v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                      <v-icon small>
                        {{ item.icon }}
                      </v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-flex>
            </v-layout>
          </v-container>
        </v-layout>
      </template>
      <template v-slot:append>
        <v-divider />
        <v-flex xs12 class="my-6 text-center">
          <!-- <v-sheet v-if="drawerLogo" class="my-2" :height="drawerLogoHeight" color="transparent">
            <v-img :contain="drawerLogoContain" height="100%" :src="drawerLogo" />
          </v-sheet> -->
          <span>© fullmoon studio 2020.</span><br>
          <span>All Rights Reserved.</span>
        </v-flex>
      </template>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import global from '@/mixins/global'
import Container from '@/components/container/'
// import logo from '@/static/logo.svg'

export default {
  components: {
    Container
  },
  mixins: [global],
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
      return this.content.menu.map((el) => {
        return { icon: el.icon.icon, link: el.link, title: el.title }
      })
    },
    drawerLogo () {
      return this.content.drawer_logo || ''
      // return logo
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
  },
  methods: {
    toggleDrawer () {
      this.drawer = !this.drawer
    },
    initDrawer () {
      if (this.$vuetify.breakpoint.mobile) {
        this.drawer = false
        // this.drawerMini = false
      } else {
        this.drawerMini = this.content.drawer_mini
        this.drawer = true
      }
    }
  }
}
</script>
