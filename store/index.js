import { defaultColors } from '@/config/vuetify.options'

export const state = () => ({
  loading: false,
  layout: {},
  pallete: {}
})

export const getters = {
  layout: (state) => {
    return state.layout
  },
  pallete: (state) => {
    return state.pallete
  },
  search: (state) => {
    return { ...state.search }
  },
  blog: (state) => {
    return { ...state.blog }
  },
  info: (state) => {
    return { ...state.info }
  },
  loading: (state) => {
    return state.loading
  }
}

export const mutations = {
  SET_PALLETE (state, data) {
    state.pallete = data
  },
  SET_LAYOUT (state, data) {
    state.layout = data
  },
  SET_LOADING (state, data) {
    state.loading = data
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch }, { $axios, params, route }) {
    await $axios.get('/api/layout')
      .then((res) => {
        const story = res.data.story
        commit('SET_LAYOUT', story)
        const content = story.content || {}
        dispatch('setPallete', content)
      })
      .catch(() => {
      })

    if (route.name === 'index-search-keyword') {
      dispatch('search/setKeyword', params.keyword || '')
    }
  },
  setPallete ({ commit }, payload) {
    const pallete = {
      primary: payload.primary.color || defaultColors.primary,
      primarylight: payload.primarylight.color || defaultColors.primarylight,
      primarydark: payload.primarydark.color || defaultColors.primary,
      secondary: payload.secondary.color || defaultColors.secondary,
      secondarylight: payload.secondarylight.color || defaultColors.secondarylight,
      secondarydark: payload.secondarydark.color || defaultColors.secondarydark,
      anchor: payload.anchor.color || defaultColors.anchor
    }
    commit('SET_PALLETE', pallete)
  },
  setLoading ({ commit }, payload) {
    commit('SET_LOADING', payload)
  }
}
