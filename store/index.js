export const state = () => ({
  loading: false,
  layout: {},
  drawer: null,
  appBar: false
})

export const getters = {
  drawer: (state) => {
    return state.drawer
  },
  appBar: (state) => {
    return state.appBar
  },
  layout: (state) => {
    return state.layout
  },
  home: (state) => {
    return { ...state.home }
  },
  about: (state) => {
    return { ...state.about }
  },
  search: (state) => {
    return { ...state.search }
  },
  pages: (state) => {
    return { ...state.pages }
  },
  blog: (state) => {
    return { ...state.blog }
  },
  tag: (state) => {
    return { ...state.tag }
  },
  contact: (state) => {
    return { ...state.contact }
  },
  loading: (state) => {
    return state.loading
  }
}

export const mutations = {
  SET_DRAWER (state, data) {
    state.drawer = data
  },
  SET_APPBAR (state, data) {
    state.appBar = data
  },
  SET_LAYOUT (state, data) {
    state.layout = data
  },
  SET_LOADING (state, data) {
    state.loading = data
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { params, route }) {
    await this.$storyapi.get('cdn/stories/layout', {
      is_startpage: 1,
      cv: Math.floor(Date.now() / 1e3)
    })
      .then((res) => {
        const story = res.data.story
        commit('SET_LAYOUT', story)
      })
      .catch(() => {
      })

    await dispatch('home/getData')
    await dispatch('blog/getData')
    await dispatch('about/getData')
    await dispatch('contact/getData')
    await dispatch('tag/getData')

    if (route.name === 'index-search-keyword') {
      await dispatch('search/setKeyword', params.keyword || '')
    }
  },
  setDrawer ({ commit }, payload) {
    commit('SET_DRAWER', payload)
  },
  setAppBar ({ commit }, payload) {
    commit('SET_APPBAR', payload)
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  }
}
