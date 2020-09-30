/* eslint-disable no-console */
const express = require('express')
const bodyParser = require('body-parser')

// Create express instance
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Require API routes
const base = require('./routes/base')
const search = require('./routes/search')
const layout = require('./routes/layout')
const blog = require('./routes/blog')
const info = require('./routes/info')

// Import API Routes
app.use(base)
app.use(search)
app.use(layout)
app.use('/blog', blog)
app.use('/info', info)

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}
