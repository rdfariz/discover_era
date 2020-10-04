<template>
  <v-app dark :class="isDarkMode ? 'dark--mode' : 'light--mode'">
    <nuxt />
  </v-app>
</template>

<script>
import global from '@/mixins/global'

export default {
  mixins: [global]
}
</script>
