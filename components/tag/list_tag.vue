<template>
  <v-layout v-if="story.length > 0" row wrap>
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
    <v-flex xs12>
      <v-pagination
        v-if="pageLength > 1"
        :value="page"
        class="my-4"
        :length="pageLength"
        @input="changePage"
      />
    </v-flex>
  </v-layout>
  <NotFound v-else />
</template>
<script>
import category from '@/mixins/category'

import cardTag from '@/components/tag/'
import NotFound from '@/components/notfound'

export default {
  components: {
    cardTag,
    NotFound
  },
  mixins: [category],
  methods: {
    changePage (page) {
      this.$store.dispatch('tag/getData', { page })
    }
  }
}
</script>
