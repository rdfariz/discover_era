<template>
  <v-btn
    class="py-6 text-capitalize"
    width="100%"
    tile
    link
    :to="to"
    :href="href"
    :color="color"
    :target="target"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'secondary'
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
  }
}
</script>
