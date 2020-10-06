export const state = () => ({
  data: [],
  detailData: {},
  loading: false,
  page: 1,
  perPage: 6,
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
  SET_PAGE (state, data) {
    state.page = data
  },
  SET_PERPAGE (state, data) {
    state.perPage = data
  },
  SET_TOTAL (state, data) {
    state.total = data
  }
}

export const actions = {
  reset ({ commit }) {
    commit('SET_DATA', [])
    commit('SET_PAGE', 1)
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  async getData ({ state, commit, dispatch }, params = {}) {
    dispatch('setLoading', true)
    await this.$storyapi.get('cdn/stories', {
      starts_with: 'blog/',
      sort_by: 'first_published_at:desc',
      'filter_query[component][not_in]': 'blog-overview',
      page: params.page || 1,
      per_page: state.perPage,
      ...params
    })
      .then((res) => {
        const { data, total } = res
        if (data) {
          commit('SET_DATA', data.stories)
          commit('SET_TOTAL', total)
          commit('SET_PAGE', params.page || 1)
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
      starts_with: 'blog/',
      is_startpage: 0
    })
      .then((res) => {
        const { data } = res
        commit('SET_DETAIL_DATA', data.story)
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
