export const state = () => ({
  keyword: '',
  listKeyword: [],
  data: [],
  rawData: [],
  loading: false,
  page: 1,
  perPage: 6,
  total: 0
})

export const mutations = {
  SET_KEYWORD (state, data) {
    state.keyword = data
  },
  SET_LISTKEYWORD (state, data) {
    state.listKeyword = data
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
  setKeyword ({ commit }, payload = '') {
    commit('SET_KEYWORD', payload)
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  },
  async getListKeyword ({ commit, dispatch }, params = {}) {
    dispatch('setLoading', true)
    await this.$storyapi.get('cdn/stories/', {
      ...params
    })
      .then((res) => {
        const { data } = res
        const stories = data.stories
        commit('SET_LISTKEYWORD', stories)
      }).catch(() => {
        commit('SET_LISTKEYWORD', [])
      })
    dispatch('setLoading', false)
  },
  async getData ({ state, commit, dispatch }, params = {}) {
    dispatch('setLoading', true)
    await this.$storyapi.get('cdn/stories/', {
      sort_by: 'first_published_at:desc',
      'filter_query[component][in]': 'blog,page',
      page: params.page || 1,
      per_page: state.perPage,
      ...params
    })
      .then((res) => {
        const { data, total } = res
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
          commit('SET_TOTAL', total)
          commit('SET_PAGE', params.page || 1)
        } else {
          dispatch('reset')
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
