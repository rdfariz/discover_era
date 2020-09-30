const base = 'https://api.storyblok.com/v1/cdn/stories'
const token = 'zdU9mrZK3l2eKGVuMfDGWgtt'

const services = {
  base,
  layout: `${base}/layout`,
  blog: `${base}/blog`,
  info: `${base}/info`
}

module.exports = {
  token,
  services
}
