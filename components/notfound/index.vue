<template>
  <v-layout row wrap justify-center align-center>
    <v-flex xs12 class="text-center pa-2">
      <v-alert type="error" class="mt-4" :icon="false">
        <p class="ma-0">
          {{ text }}
        </p>
      </v-alert>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Maaf, artikel yang anda cari tidak ditemukan'
    }
  }
}
</script>
