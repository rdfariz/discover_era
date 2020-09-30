<template>
  <v-text-field
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
