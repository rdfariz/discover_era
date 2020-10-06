<template>
  <div>
    <Background color="primary" min-height="200" height="100%">
      <v-layout fill-height row wrap align-center class="w-full ma-auto">
        <Container>
          <v-flex xs12 class="text-center text-md-left">
            <v-card dark color="transparent" flat>
              <p class="mb-0" />
              <h1 class="lg">
                Tag
              </h1>
              <p class="mb-0" />
            </v-card>
          </v-flex>
        </Container>
      </v-layout>
    </Background>
    <Container>
      <v-layout row wrap>
        <v-flex
          v-for="(tag, index) in story"
          :key="index"
          xs12
          sm6
          md4
          lg3
          class="pa-2"
        >
          <card-tag :data="tag" />
        </v-flex>
      </v-layout>
    </Container>
  </div>
</template>
<script>
import Container from '@/components/container/'
import cardTag from '@/components/tag/'
export default {
  components: {
    Container,
    cardTag
  },
  async asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error }) {
    await store.dispatch('tag/getData')
  },
  computed: {
    story () {
      return this.$store.getters.tag.data
    }
  }
}
</script>
