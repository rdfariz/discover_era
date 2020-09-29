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
    routeName () {
      return this.$route.name
    },
    routeParams () {
      return this.$route.params
    },
    isShowSearchDrawer () {
      if (this.routeName !== 'index' && this.routeName !== 'index-search' && this.routeName !== 'index-search-keyword') {
        return true
      }
      return false
    },
    isSearchPage () {
      if (this.routeName === 'index-search-keyword' || this.routeName === 'index-search') {
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
        this.$router.push(`/search/${this.search}`)
      } else {
        this.$router.push('/')
      }
    }
  }
}
