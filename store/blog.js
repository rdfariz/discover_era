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
    await this.$storyapi.get('cdn/stories', {
      version: 'draft',
      starts_with: 'blog/',
      sort_by: 'first_published_at:desc',
      'filter_query[component][not_in]': 'blog-overview',
      ...params
    })
      .then((res) => {
        const { data, perPage, total } = res
        if (data) {
          commit('SET_DATA', data.stories)
          commit('SET_META', { perPage, total })
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
    await this.$storyapi.get(`cdn/stories/blog/${slug || ''}`, {
      version: 'draft',
      starts_with: 'blog/'
    })
      .then((res) => {
        const { data } = res
        commit('SET_DETAIL_DATA', data.story)
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
