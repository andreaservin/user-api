const jwt = require('jsonwebtoken')
const config = require('../../config')
const UserService = require('../services/user')

const login = async (req, res) => {
  /* 
    #swagger.tags = ['Auth']
    #swagger.description = 'Endpoint to login an user.'
    #swagger.parameters['credentials'] = {
      in: 'body',
      description: 'User information to be login.',
      required: true,
      schema: { $ref: "#/definitions/UserLogin" }
    }
  */
  const { email, password } = req.body

  try {
    const user = await UserService.authenticate(email, password)
    if (user) {
      const token = jwt.sign({ id: user.id }, config.secretKey, {
        expiresIn: '7d',
      })
      res.status(200).json({ ...user.dataValues, token }).end()
    } else {
      res.status(401).json({ error: 'Wrong email or password' }).end()
    }
  } catch (error) {
    res.status(500).json(error?.message).end()
  }
}

module.exports = { login }
