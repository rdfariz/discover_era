export default {
  data: () => ({
    isLoaded: false
  }),
  mounted () {
    this.$nextTick(() => {
      this.isLoaded = true
    })
  }
}
