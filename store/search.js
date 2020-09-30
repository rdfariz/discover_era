export const state = () => ({
  keyword: '',
  data: [],
  rawData: [],
  loading: false,
  perPage: 0,
  total: 0
})

export const mutations = {
  SET_KEYWORD (state, data) {
    state.keyword = data
  },
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
  setKeyword ({ commit }, payload = '') {
    commit('SET_KEYWORD', payload)
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  async getData ({ commit, dispatch }, params = {}) {
    dispatch('setLoading', true)
    await this.$axios.get('/api/search', {
      params: { ...params }
    })
      .then((res) => {
        const { data, meta } = res.data
        if (data) {
          const final = {}
          const stories = data.stories
          stories.map((el) => {
            if (final[el.content.component] && final[el.content.component].length > 0) {
              final[el.content.component].push({ ...el })
            } else {
              final[el.content.component] = [{ ...el }]
            }
          })
          commit('SET_RAW_DATA', stories)
          commit('SET_DATA', final)
          commit('SET_META', { perPage: meta.perPage || 0, total: meta.total || 0 })
        } else {
          dispatch('reset')
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
