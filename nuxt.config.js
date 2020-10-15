import dotenv from 'dotenv'
import pckg from './package.json'

dotenv.config()

export default {
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  // env Configuration
  env: {},
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s',
    title: 'Discover',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Discover - Creating Innovation and Competence in the new normal era' },
      { name: 'keywords', content: 'Discover, olivia, webdesign, Discover olivia, olivia 2020' },
      // PWA primary color
      { name: 'theme-color', content: '#5352ed' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#FCDE3E',
    height: '5px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/styles.scss',
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
    { src: '~/plugins/vue-social-sharing.js', ssr: false },
    { src: '~/plugins/vue-read-progress.js', ssr: false },
    { src: '~/plugins/vue-skip-to.js', ssr: false },
    { src: '~/plugins/vue-print-nb.js', ssr: false }
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
    workbox: {
      dev: false,
      offlineStrategy: 'StaleWhileRevalidate',
      runtimeCaching: [
        {
          urlPattern: 'https://api.storyblok.com/v1/cdn/stories/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'storyblok',
            cacheExpiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 10
            }
          }
        }
      ]
    },
    manifest: {
      name: 'Discover',
      lang: 'id',
      display: 'fullscreen',
      title: pckg.title || 'Discover',
      description: pckg.description || 'Discover - Creating Innovation and Competence in the new normal era',
      theme_color: '#FCDE3E',
      background_color: '#FCDE3E',
      start_url: '/',
      short_name: 'Discover',
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
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/markdownit',
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.NODE_ENV === 'production'
          ? 'UxTOoeRsp6D0HYFmcqkdZAtt'
          : 'zdU9mrZK3l2eKGVuMfDGWgtt'
      }
    ]
  ],
  markdownit: {
    preset: 'default',
    linkify: true,
    breaks: true,
    html: true,
    injected: true
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // baseURL: process.env.NODE_ENV === 'production' ? 'https://fullmoon.now.sh' : 'http://localhost:3000'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
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
