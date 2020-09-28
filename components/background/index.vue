<template>
  <div class="bg-page-container">
    <v-sheet class="bg-page" :height="height" :color="color">
      <v-fade-transition>
        <v-img
          v-if="backgroundShow && background"
          :src="background"
          width="100%"
          :height="height"
          gradient="to top right, rgba(100,115,201,.5), rgba(25,32,72,.7)"
        />
      </v-fade-transition>
    </v-sheet>
    <v-sheet :height="height">
      <slot />
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: {
    backgroundShow: {
      type: Boolean,
      default: true
    },
    background: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    },
    height: {
      type: [String, Number],
      default: '100vh'
    }
  }
}
</script>
