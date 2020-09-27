export const state = () => ({
  loading: false,
  layout: {}
})

export const getters = {
  layout: (state) => {
    return state.layout
  },
  search: (state) => {
    return { ...state.search }
  },
  blog: (state) => {
    return { ...state.blog }
  },
  info: (state) => {
    return { ...state.info }
  },
  loading: (state) => {
    return state.loading
  }
}

export const mutations = {
  SET_LOADING (state, data) {
    state.loading = data
  },
  SET_LAYOUT (state, data) {
    state.layout = data
  }
}

export const actions = {
  async nuxtServerInit ({ commit }) {
    await this.$storyapi.get('cdn/stories/layout')
      .then((res) => {
        const story = res.data.story
        commit('SET_LAYOUT', story)
      }).catch(() => {
      })
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  }
}
