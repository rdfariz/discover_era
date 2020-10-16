<template>
  <v-layout v-if="story.length > 0" row wrap>
    <!-- <v-flex xs12>
      <p class="mb-0 text--secondary text-capitalize text-center text-md-left">
        Category
      </p>
    </v-flex> -->
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
</template>
<script>
import category from '@/mixins/category'

import cardTag from '@/components/tag/'

export default {
  components: {
    cardTag
  },
  mixins: [category],
  methods: {
    changePage (page) {
      this.$store.dispatch('tag/getData', { page })
    }
  }
}
</script>
