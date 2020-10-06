export const state = () => ({
  data: {},
  loading: false
})

export const mutations = {
  SET_LOADING (state, data) {
    state.loading = data
  },
  SET_DATA (state, data) {
    state.data = data
  }
}

export const actions = {
  reset ({ commit }) {
    commit('SET_DATA', {})
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  async getData ({ state, commit, dispatch }, params = {}) {
    dispatch('setLoading', true)
    await this.$storyapi.get('cdn/stories/contact', {
      is_startpage: 1,
      ...params
    })
      .then((res) => {
        const { data } = res
        if (data) {
          commit('SET_DATA', data.story)
        } else {
          dispatch('reset')
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
