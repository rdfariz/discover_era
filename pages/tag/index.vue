<template>
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
