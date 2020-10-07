<template>
  <div />
</template>
<script>
import global from '@/mixins/global'
export default {
  mixins: [global],
  head () {
    return {
      title: `Search - ${this._brand.name || ''}`
    }
  }
}
</script>
