import { defaultColors } from '@/config/vuetify.options'

export const state = () => ({
  loading: false,
  layout: {},
  pallete: {},
  drawer: null,
  appBar: false
})

export const getters = {
  drawer: (state) => {
    return state.drawer
  },
  appBar: (state) => {
    return state.appBar
  },
  layout: (state) => {
    return state.layout
  },
  pallete: (state) => {
    return state.pallete
  },
  home: (state) => {
    return { ...state.home }
  },
  search: (state) => {
    return { ...state.search }
  },
  pages: (state) => {
    return { ...state.pages }
  },
  blog: (state) => {
    return { ...state.blog }
  },
  tag: (state) => {
    return { ...state.tag }
  },
  contact: (state) => {
    return { ...state.contact }
  },
  loading: (state) => {
    return state.loading
  }
}

export const mutations = {
  SET_DRAWER (state, data) {
    state.drawer = data
  },
  SET_APPBAR (state, data) {
    state.appBar = data
  },
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
  async nuxtServerInit ({ commit, dispatch }, { params, route }) {
    await this.$storyapi.get('cdn/stories/layout', {
      is_startpage: 1
    })
      .then((res) => {
        const story = res.data.story
        commit('SET_LAYOUT', story)
        // const content = story.content || {}
        // dispatch('setPallete', content)
      })
      .catch(() => {
      })

    await dispatch('home/getData')
    await dispatch('blog/getData')

    if (route.name === 'index-search-keyword') {
      await dispatch('search/setKeyword', params.keyword || '')
    }
  },
  setDrawer ({ commit }, payload) {
    commit('SET_DRAWER', payload)
  },
  setAppBar ({ commit }, payload) {
    commit('SET_APPBAR', payload)
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
