<template>
  <v-menu
    rounded="lg"
    offset-y
    offset-x
    :nudge-bottom="isRtl ? '-10' : 10"
    :nudge-right="isRtl ? '-10' : 10"
    transition="slide-x-transition"
    :left="isRtl"
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
        <v-list-item-title>
          <span>Dark Mode</span>
        </v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-action>
          <v-switch
            v-model="isRtl"
            color="purple"
          />
        </v-list-item-action>
        <v-list-item-title>
          <span>RTL</span>
        </v-list-item-title>
      </v-list-item>
      <!-- <v-btn icon @click="toggleDarkMode">
        <v-icon>mdi-brightness-6</v-icon>
      </v-btn> -->
      <!-- <v-btn icon @click="toggleRtl">
        <v-icon>mdi-align-horizontal-right</v-icon>
      </v-btn> -->
    </v-list>
  </v-menu>
</template>

<script>
import global from '@/mixins/global'
export default {
  mixins: [global]
}
</script>
