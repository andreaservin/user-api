const { config } = require('dotenv')

// allow to use .env file
config()

const port = process.env.PORT
const baseURL = process.env.BASE_URL
const secretKey = process.env.SECRET_KEY

module.exports = { port, baseURL, secretKey }
