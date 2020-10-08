export const state = () => ({
  logo: '',
  preIntro: '',
  title: '',
  intro: '',
  background: '',
  recommendVisible: false,
  recommendTitle: '',
  recommendContent: [],
  overviewContent: [],
  loading: false
})

export const mutations = {
  SET_LOADING (state, data) {
    state.loading = data
  },
  SET_LOGO (state, data = '') {
    state.logo = data
  },
  SET_TITLE (state, data = '') {
    state.title = data
  },
  SET_PREINTRO (state, data = '') {
    state.preIntro = data
  },
  SET_INTRO (state, data = '') {
    state.intro = data
  },
  SET_BACKGROUND (state, data = '') {
    state.background = data
  },
  SET_RECOMMEND_VISIBLE (state, data = false) {
    state.recommendVisible = data
  },
  SET_RECOMMEND_TITLE (state, data = '') {
    state.recommendTitle = data
  },
  SET_RECOMMEND_CONTENT (state, data = []) {
    state.recommendContent = data
  },
  SET_OVERVIEW_CONTENT (state, data = []) {
    state.overviewContent = data
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
    await this.$storyapi.get('cdn/stories/home', {
      is_startpage: 1,
      ...params
    })
      .then((res) => {
        const data = res.data.story.content
        if (data) {
          commit('SET_LOGO', data.logo)
          commit('SET_TITLE', data.title)
          commit('SET_PREINTRO', data.preIntro)
          commit('SET_INTRO', data.intro)
          commit('SET_BACKGROUND', data.background)
          commit('SET_RECOMMEND_VISIBLE', data.recommendVisible)
          commit('SET_RECOMMEND_TITLE', data.recommendTitle)
          commit('SET_RECOMMEND_CONTENT', data.recommendContent)
          commit('SET_OVERVIEW_CONTENT', data.overviewContent)
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
