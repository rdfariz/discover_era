<template>
  <div />
</template>

<script>
import global from '@/mixins/global'

export default {
  scrollToTop: true,
  mixins: [global],
  head () {
    return {
      title: `Cari - ${this._brand.name || ''}`
    }
  }
}
</script>
