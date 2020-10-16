export default {
  computed: {
    search: {
      get () {
        return this.$store.getters.search.keyword
      },
      set (payload) {
        return this.$store.dispatch('search/setKeyword', payload || '')
      }
    },
    listKeyword () {
      return this.$store.getters.search.listKeyword || []
    },
    routeName () {
      return this.$route.name
    },
    routeParams () {
      return this.$route.params
    },
    isShowSearchDrawer () {
      if (this.routeName !== 'index' && this.routeName !== 'index-cari' && this.routeName !== 'index-cari-keyword') {
        return true
      }
      return false
    },
    isSearchPage () {
      if (this.routeName === 'index-cari-keyword' || this.routeName === 'index-cari') {
        return true
      }
      return false
    },
    isSearchLoading () {
      return this.$store.getters.search.loading
    }
  },
  methods: {
    onSubmitSearch () {
      if (this.search !== '' && this.search !== null) {
        this.$router.push(`/cari/${this.search}`)
      } else {
        this.$router.push('/')
      }
    }
  }
}
