<template>
  <v-card flat :dark="dark" :height="height" :color="background" class="pa-1">
    <v-container grid-list-xs fluid>
      <v-layout row wrap :align-center="alignCenter" :justify-center="justifyCenter">
        <slot />
        <slot name="leftContent" />
        <slot name="rightContent" />
      </v-layout>
      <slot name="append" />
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    alignCenter: {
      type: Boolean,
      default: false
    },
    justifyCenter: {
      type: Boolean,
      default: false
    },
    height: {
      type: [String, Number],
      default: ''
    },
    background: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: false
    }
  }
}
</script>
