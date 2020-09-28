import dotenv from 'dotenv'
import pckg from './package.json'
dotenv.config()

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: pckg.title || 'Fullmoon',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pckg.description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#3742fa',
    height: '5px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/transition.scss',
    '~/assets/vuetify-overide.scss'
  ],
  /*
  ** Custom Layout Transition
  */
  layoutTransition: {
    name: 'layout',
    mode: 'out-in'
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/stack-grid.js', ssr: false },
    { src: '~/plugins/particles.js', ssr: false },
    { src: '~/plugins/typed.js', ssr: false },
    { src: '~/plugins/kinesis.js', ssr: false },
    { src: '~/plugins/infinite-loading.js', ssr: false },
    { src: '~/plugins/vue-swiper.js', ssr: false },
    { src: '~/plugins/feather-icon.js', ssr: false },
    { src: '~/plugins/vue-social-sharing.js', ssr: false },
    { src: '~/plugins/vue-read-progress.js', ssr: false }
  ],
  // manifest: {
  //   name: 'Fullmoon',
  //   lang: 'id',
  //   display: 'fullscreen',
  //   title: 'Fullmoon',
  //   description: 'Fullmoon Website - Olivia 2020',
  //   theme_color: '#5352ed',
  //   background_color: '#5352ed',
  //   start_url: '/',
  //   short_name: 'Fullmoon',
  //   icons: [
  //     {
  //       src: '/icon.png',
  //       size: '144x144',
  //       type: 'image/png'
  //     }
  //   ]
  // },
  pwa: {
    // icon: false,
    manifest: {
      name: 'Fullmoon',
      lang: 'id',
      display: 'fullscreen',
      title: 'Fullmoon',
      description: 'Fullmoon Website - Olivia 2020',
      theme_color: '#5352ed',
      background_color: '#5352ed',
      start_url: '/',
      short_name: 'Fullmoon',
      useWebmanifestExtension: false
    }
  },
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      'storyblok-nuxt',
      {
        accessToken: 'zdU9mrZK3l2eKGVuMfDGWgtt',
        cacheProvider: 'memory'
      }
    ]
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  /*
  ** Content module configuration
  ** See https://content.nuxtjs.org/configuration
  */
  content: {},
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/styles.scss'],
    optionsPath: './config/vuetify.options.js'
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  server: {
    port: 3000
  }
}
