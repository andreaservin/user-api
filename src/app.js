const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('../swagger-output.json')
const cors = require('cors')
const v1Routes = require('./v1/routes')

const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// routes
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use('/api/v1', v1Routes)

module.exports = app
