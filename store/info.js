export const state = () => ({
  data: [],
  detailData: {},
  loading: false,
  perPage: 0,
  total: 0
})

export const mutations = {
  SET_LOADING (state, data) {
    state.loading = data
  },
  SET_DATA (state, data) {
    state.data = data
  },
  SET_DETAIL_DATA (state, data) {
    state.detailData = data
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
  async getData ({ commit, dispatch }, params = null) {
    dispatch('setLoading', true)
    await this.$api.get('/api/info', {
      version: 'draft',
      sort_by: 'first_published_at:desc',
      ...params
    })
      .then((res) => {
        const { data, meta } = res.data
        if (data) {
          commit('SET_DATA', data.stories)
          commit('SET_META', { perPage: meta.perPage || 0, total: meta.total || 0 })
        } else {
          dispatch('reset')
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  },
  async getDetailData ({ commit, dispatch }, params = {}) {
    const { slug } = params
    dispatch('setLoading', true)
    await this.$api.get(`/api/info/${slug || ''}`, {
      params: {
        version: 'draft'
      }
    })
      .then((res) => {
        const { data } = res.data
        commit('SET_DETAIL_DATA', data.story)
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
