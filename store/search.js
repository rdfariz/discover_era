export const state = () => ({
  data: [],
  rawData: [],
  loading: false,
  perPage: 0,
  total: 0
})

export const mutations = {
  SET_LOADING (state, data) {
    state.loading = data
  },
  SET_RAW_DATA (state, data) {
    state.rawData = data
  },
  SET_DATA (state, data) {
    state.data = data
  },
  SET_META (state, { perPage, total }) {
    state.perPage = perPage
    state.total = total
  }
}

export const actions = {
  reset ({ commit }) {
    commit('SET_DATA', [])
    commit('SET_META', { perPage: 0, total: 0 })
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  async getData ({ commit, dispatch }, params = {}) {
    dispatch('setLoading', true)
    await this.$storyapi.get('cdn/stories/', {
      ...params
    })
      .then((res) => {
        const { data, perPage, total } = res
        if (data) {
          const final = {}
          const stories = res.data.stories
          stories.map((el) => {
            if (final[el.content.component] && final[el.content.component].length > 0) {
              final[el.content.component].push({ ...el })
            } else {
              final[el.content.component] = [{ ...el }]
            }
          })
          commit('SET_RAW_DATA', stories)
          commit('SET_DATA', final)
          commit('SET_META', { perPage, total })
        } else {
          dispatch('reset')
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
