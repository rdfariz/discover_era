export const state = () => ({
  logo: '',
  preIntro: '',
  title: '',
  intro: '',
  background: '',
  background_gradient: '',
  search_placeholder: '',
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
  SET_SEARCH_PLACEHOLDER (state, data = '') {
    state.search_placeholder = data
  },
  SET_BACKGROUND (state, data = '') {
    state.background = data
  },
  SET_BACKGROUND_GRADIENT (state, data = '') {
    state.background_gradient = data
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
    await this.$storyapi.get('cdn/stories/beranda', {
      is_startpage: 1,
      cv: Math.floor(Date.now() / 1e3),
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
          commit('SET_BACKGROUND_GRADIENT', data.background_gradient)
          commit('SET_SEARCH_PLACEHOLDER', data.search_placeholder)
          commit('SET_OVERVIEW_CONTENT', data.overviewContent)
        }
      }).catch(() => {
      })
    dispatch('setLoading', false)
  }
}
