import dotenv from 'dotenv'
import pckg from './package.json'
import { theme } from './config/vuetify.options'

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
      { hid: 'description', name: 'description', content: pckg.description || '' },
      // PWA primary color
      { name: 'theme-color', content: theme.primary }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: theme.primary,
    height: '5px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/transition.scss',
    '~/assets/vuetify-overide.scss',
    '@fortawesome/fontawesome-free/css/all.css'
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
    { src: '~/plugins/vue-read-progress.js', ssr: false },
    { src: '~/plugins/vue-skip-to.js', ssr: false }
  ],
  /*
  ** Render configuration
  */
  render: {
    bundleRenderer: {
      directives: {
        shouldPreload: (file, type) => {
          return ['script', 'style', 'font'].includes(type)
        }
      }
    }
  },
  // PWA Configuration
  pwa: {
    manifest: {
      name: 'Fullmoon',
      lang: 'id',
      display: 'fullscreen',
      title: pckg.title || 'Fullmoon',
      description: pckg.description || 'Fullmoon - Creating Innovation and Competence in the new normal era',
      theme_color: theme.primary,
      background_color: theme.primary,
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
    ['@nuxtjs/html-minifier', { log: 'once', logHtml: true }],
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV === 'production'
          ? 'UxTOoeRsp6D0HYFmcqkdZAtt'
          : 'zdU9mrZK3l2eKGVuMfDGWgtt',
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
