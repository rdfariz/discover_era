<template>
  <Background
    :color="item.background"
    :min-height="item.height || '100%'"
    height="100%"
    :background="item.backgroundImage"
  >
    <v-layout fill-height row wrap align-center class="w-full ma-auto py-6 py-sm-12 py-md-16">
      <Container>
        <v-layout row wrap align-center justify-center>
          <v-flex xs12>
            <Fragment :dark="item.dark" background="transparent" height="100%">
              <v-flex xs10 md3 class="mb-14">
                <v-img :contain="item.logoContain" width="200" :height="item.logoHeight" :src="isDarkMode || item.dark ? item.logoDark : item.logo" />
                <p class="sm my-2">
                  {{ item.intro }}
                </p>
              </v-flex>
              <v-flex xs12 md9 class="pl-md-3 pl-lg-4">
                <v-layout row wrap>
                  <v-flex
                    v-for="(m, i) in menu"
                    :key="i"
                    xs12
                    md6
                    lg4
                    class="pa-2"
                  >
                    <p tabindex="0" class="ma-0 font-weight-medium">
                      {{ m.title }}
                    </p>
                    <v-divider class="my-3" />
                    <v-list :dense="isMobile" color="transparent">
                      <v-list-item
                        v-for="(child, index_child) in m.items"
                        :key="index_child"
                        :to="!child.link_external ? child.link : ''"
                        :href="child.link_external ? child.link : ''"
                        :target="child.link_external ? '_blank' : ''"
                        :disabled="child.disabled"
                        exact
                        link
                        :color="child.disabled ? '' : 'lighten-1'"
                      >
                        <v-list-item-content>
                          <v-list-item-title class="font-weight-medium">
                            <p class="sm ma-0">
                              {{ child.title }}
                            </p>
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-icon>
                          <Icon small :icon="child.icon_code || child.icon || ''" :variant="child.variant || 'mdi'" />
                        </v-list-item-icon>
                      </v-list-item>
                    </v-list>
                  </v-flex>
                </v-layout>
              </v-flex>
            </Fragment>
          </v-flex>
        </v-layout>
      </Container>
    </v-layout>
  </Background>
</template>

<script>
import global from '@/mixins/global'

import Container from '@/components/container'
import Fragment from '@/components/fragment'

export default {
  components: {
    Container,
    Fragment
  },
  mixins: [global],
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    menu: {
      type: Array,
      default: () => []
    }
  }
}
</script>
