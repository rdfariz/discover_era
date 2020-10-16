export const state = () => ({
  overviewContent: [],
  loading: false
})

export const mutations = {
  SET_LOADING (state, data) {
    state.loading = data
  },
  SET_OVERVIEW_CONTENT (state, data = []) {
    state.overviewContent = data
  }
}

export const actions = {
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  async getData ({ commit, dispatch }, params = null) {
    dispatch('setLoading', true)
    await this.$storyapi.get('cdn/stories/about', {
      is_startpage: 1,
      cv: Math.floor(Date.now() / 1e3),
      ...params
    })
      .then((res) => {
        const data = res.data.story.content
        if (data) {
          commit('SET_OVERVIEW_CONTENT', data.overviewContent)
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
