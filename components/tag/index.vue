<template>
  <v-card :to="`/tag/${name}`">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          #{{ name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ taggings_count }} artikel</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    name () {
      return this.data.name || ''
    },
    taggings_count () {
      return this.data.taggings_count || ''
    }
  }
}
</script>
