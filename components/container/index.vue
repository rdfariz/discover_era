<template>
  <v-container :class="[fluid ? '' : 'px-sm-6 px-md-12 px-lg-14', spacingTop ? 'mt-md-6' : '']" :fluid="fluid">
    <slot />
  </v-container>
</template>
<script>
export default {
  props: {
    spacingTop: {
      default: false,
      type: Boolean
    },
    fluid: {
      default: false,
      type: Boolean
    }
  }
}
</script>
