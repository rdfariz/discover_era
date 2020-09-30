<template>
  <!-- <v-autocomplete
    :loading="isLoading"
    color="white"
    hide-no-data
    hide-selected
    item-text="Description"
    item-value="title"
    label="Public APIs"
    placeholder="Start typing to Search"
    prepend-icon="mdi-database-search"
    return-object
  /> -->
  <v-autocomplete
    :items="listKeyword"
    label="Cari sesuatu.."
    single-line
    outlined
    :disabled="loading"
    class="mr-2"
    clearable
    color="white"
    :loading="loading"
    append-icon="mdi-magnify"
    @change="onChange"
    @click:append="onSubmit"
    @keydown.enter="onSubmit"
  />
</template>
<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    listKeyword () {
      return this.$store.getters.search.listKeyword
    }
  },
  created () {
    this.onInit()
  },
  methods: {
    onChange () {
      return this.$emit('onChange')
    },
    onInit () {
      return this.$emit('onInit')
    },
    onSubmit () {
      return this.$emit('onSubmit')
    }
  }
}
</script>
