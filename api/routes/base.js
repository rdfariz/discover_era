const { Router } = require('express')
const axios = require('axios')
const { success } = require('../model/response')
const { token, services } = require('../services')

const router = Router()

router.use('/base', async (req, res) => {
  try {
    const response = await axios.get(services.base,
      {
        params: {
          token,
          ...req.query
        }
      }
    )
    res.json(
      success(
        response,
        response.data,
        response.statusText,
        {
          perPage: response.headers['per-page'],
          total: response.headers.total
        }
      )
    )
  } catch (err) {
    res.json(err)
  }
})

module.exports = router
