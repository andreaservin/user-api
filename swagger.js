const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    version: '1.0.0',
    title: 'UserAPI',
    description: 'Documentation to describe the API functionality.',
  },
  host: 'localhost:4000',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'Endpoint',
    },
    {
      name: 'Auth',
      description: 'Endpoint',
    },
  ],
  definitions: {
    Token: 'Bearer ',
    UserLogin: {
      email: 'andrea@email.com',
      password: 'andrea',
    },
    AddUser: {
      name: 'Jonh Doe',
      email: 'jhon@email.com',
      password: 'mypass',
    },
    UpdateUser: {
      name: 'Andrea Mendoza',
    },
    UpdateId: 1,
  },
}

const outputFile = './swagger-output.json'
const endpointsFiles = ['./src/app.js']

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./index')
})
