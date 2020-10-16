export const state = () => ({
  data: [],
  detailData: [],
  loading: false,
  page: 1,
  perPage: 9,
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
    await this.$storyapi.get('cdn/tags/', {
      is_startpage: 0,
      sort_by: 'first_published_at:desc',
      page: params.page || 1,
      per_page: state.perPage,
      cv: Math.floor(Date.now() / 1e3),
      ...params
    })
      .then((res) => {
        const { data } = res
        if (data) {
          commit('SET_DATA', data.tags)
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  },
  async getDetailData ({ state, commit, dispatch }, params = {}) {
    dispatch('setLoading', true)
    await this.$storyapi.get('cdn/stories/', {
      with_tag: params.id,
      is_startpage: 0,
      sort_by: 'first_published_at:desc',
      'filter_query[component][not_in]': 'home,layout',
      page: params.page || 1,
      per_page: state.perPage,
      cv: Math.floor(Date.now() / 1e3),
      ...params
    })
      .then((res) => {
        const { data, total } = res
        if (data) {
          const stories = res.data.stories
          commit('SET_DETAIL_DATA', stories)
          commit('SET_TOTAL', total)
          commit('SET_PAGE', params.page || 1)
        }
      }).catch(() => {
        commit('SET_DETAIL_DATA', [])
      })
    dispatch('setLoading', false)
  }
}
