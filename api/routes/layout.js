const { Router } = require('express')
const axios = require('axios')
const { token, services } = require('../services')

const router = Router()

router.use('/layout', async (req, res) => {
  try {
    const response = await axios.get(services.layout,
      {
        params: {
          token
        }
      }
    )
    res.json(response.data)
  } catch (err) {
    res.json(err)
  }
})

module.exports = router
