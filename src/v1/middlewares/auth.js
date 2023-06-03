const jwt = require('jsonwebtoken')
const config = require('../../config')
const UserServices = require('../services/user')

const isAuthenticated = async (req, res, next) => {
  const bearerToken = req.headers.authorization
  if (bearerToken) {
    try {
      const { id } = jwt.verify(bearerToken.split(' ')[1], config?.secretKey)
      const user = await UserServices.getById(id)
      if (!user) res.status(403).end()
      next()
    } catch ({ message }) {
      res.status(498).json(message).end()
    }
  } else {
    res.status(403).end()
  }
}

module.exports = { isAuthenticated }
