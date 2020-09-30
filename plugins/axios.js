export default function ({ $axios, redirect }, inject) {
  const api = $axios.create()
  api.setBaseURL(process.env.PUBLIC_URL || 'http://localhost:3000')

  // Every request to server
  api.onRequest((config) => {
  })

  // When error response
  api.onError(() => {
    // const code = parseInt(error.response && error.response.status)
    // redirect(`/${code}`)
  })

  // Inject to $api, call this.$api to running your inject
  inject('api', api)
}
