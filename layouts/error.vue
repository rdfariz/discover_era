<template>
  <div class="full-height d-flex justify-center align-center flex-wrap">
    <v-container>
      <v-layout justify-center align-center row wrap>
        <v-card color="transparent" outlined class="card-transparent pa-4">
          <v-layout justify-center align-center column wrap>
            <v-alert class="mz-container--shaped" type="error">
              <template v-if="error.statusCode === 404">
                {{ pageNotFound }}
              </template>
              <template v-else>
                {{ otherError }}
              </template>
            </v-alert>
            <nuxt-link to="/">
              Kembali
            </nuxt-link>
          </v-layout>
        </v-card>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    pageNotFound: 'Maaf, halaman yang anda cari tidak ditemukan',
    otherError: 'Hmm.. sepertinya ada error yang terjadi, refresh & cobalagi ya..'
  }),
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
