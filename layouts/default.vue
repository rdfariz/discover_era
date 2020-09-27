<template>
  <v-app dark :class="isDarkMode ? 'dark--mode' : 'light--mode'">
    <v-app-bar
      app
      :fixed="content.appbar_position === 'fixed'"
      :absolute="content.appbar_position === 'absolute'"
      :dense="content.appbar_type === 'dense'"
      :hide-on-scroll="content.appbar_type === 'hide-on-scroll'"
      :height="content.appbar_height"
      :src="content.appbar_background || ''"
      :color="content.appbar_color.color && content.appbar_color.color"
      :value="appBar"
    >
      <Container fluid>
        <v-layout align-center row wrap>
          <v-btn icon @click="drawer = !drawer">
            <v-icon>{{ 'mdi-menu' }}</v-icon>
          </v-btn>

          <!-- <v-toolbar-title>
            <h3 class="ma-0">
              <nuxt-link to="/">
                Olivia
              </nuxt-link>
            </h3>
          </v-toolbar-title> -->

          <v-spacer />
          <v-btn icon @click="toggleDarkMode">
            <v-icon>mdi-brightness-6</v-icon>
          </v-btn>
          <v-btn icon @click="toggleRtl">
            <v-icon>mdi-align-horizontal-right</v-icon>
          </v-btn>
          <!-- <v-btn color="secondary" text depressed to="/about">
            About
          </v-btn>
          <v-btn color="secondary" text depressed to="/blog">
            Blog
          </v-btn> -->
          <!-- <v-app-bar-nav-icon @click="drawer = !drawer" /> -->
        </v-layout>
      </Container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      :mini-variant="drawerMini"
      mini-variant-width="85"
      width="200"
      app
      :right="isRtl"
    >
      <template v-slot:prepend>
        <v-sheet v-if="drawerLogo" :height="drawerLogoHeight">
          <v-img :contain="drawerLogoContain" height="100%" :src="drawerLogo" />
        </v-sheet>
      </template>
      <v-list dense>
        <v-list-item
          v-for="item in menu"
          :key="item.title"
          link
          :to="item.link"
          color="primary"
        >
          <v-tooltip right :disabled="!drawerMini">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon small>
                  {{ item.icon }}
                </v-icon>
              </v-list-item-icon>
            </template>
            <span>{{ item.title }}</span>
          </v-tooltip>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import global from '@/mixins/global'
import Container from '@/components/container/'

export default {
  components: {
    Container
  },
  mixins: [global],
  data: () => ({
    appBar: true,
    drawer: true,
    drawerMini: true
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
        console.log(this.content.drawer_mini)
        this.drawerMini = this.content.drawer_mini
        this.drawer = true
      }
    }
  }
}
</script>
