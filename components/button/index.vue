<template>
  <v-btn
    class="py-6 text-capitalize"
    tile
    link
    :class="dark ? 'white--text' : 'black--text'"
    :dark="dark"
    :width="width"
    :to="to"
    :href="href"
    :color="color"
    :target="target"
    :disabled="disabled"
    :loading="loading"
    :depressed="depressed"
    @click="onClick"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    dark: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    depressed: {
      type: Boolean,
      default: true
    },
    to: {
      type: String,
      default: ''
    },
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick () {
      this.$emit('click')
    }
  }
}
</script>
