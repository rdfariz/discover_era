<template>
  <div class="bg-page-container">
    <v-sheet class="bg-page--absolute" :height="height" :min-height="minHeight">
      <v-fade-transition>
        <v-img
          v-if="backgroundShow && background"
          :src="background"
          width="100%"
          :height="height"
          gradient="to top right, rgba(0,0,0,1), rgba(0,0,0,0.7)"
        />
      </v-fade-transition>
    </v-sheet>
    <v-sheet class="bg-page" :color="color" :height="height" :min-height="minHeight">
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
    },
    minHeight: {
      type: [String, Number],
      default: '100vh'
    }
  }
}
</script>
