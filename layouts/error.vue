<template>
  <Container>
    <NotFound :text="error.statusCode === 404 ? pageNotFound : otherError" />
    <v-layout row wrap justify-center align-center>
      <v-flex xs12 class="text-center pa-2">
        <p>
          Back to
          <nuxt-link to="/">
            <b>Home</b>
          </nuxt-link>
        </p>
      </v-flex>
    </v-layout>
  </Container>
</template>

<script>
import global from '@/mixins/global'

import Container from '@/components/container'
import NotFound from '@/components/notfound'

export default {
  components: {
    Container,
    NotFound
  },
  mixins: [global],
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    pageNotFound () { return 'Sorry, the page you tried cannot be found' },
    otherError () { return 'Something went wrong' }
  },
  head () {
    const title = this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title: title + ' - ' + this._brand.name
    }
  }
}
</script>
