const UserServices = require('../services/user')
const bcrypt = require('bcrypt')

const getAll = async (req, res) => {
  /*
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to get a list of users.'
  */
  try {
    const { _page = 0, _size = 10 } = req.query
    const page = Number(_page)
    const size = Number(_size)
    if (isNaN(page) || isNaN(size)) {
      res.status(400).json({ message: 'page and size must be a number' }).end()
    } else {
      const users = await UserServices.getAll({ page, size })
      users ? res.status(200).json(users).end() : res.status(404).end()
    }
  } catch ({ message }) {
    res.status(500).json(message).end()
  }
}

const getById = async (req, res) => {
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to get an user.'
    #swagger.parameters['id'] = { 
      in: 'path',
      description: 'ID of user to get.',
      required: true
    }
  */
  const { id } = req.params
  try {
    if (isNaN(Number(id))) {
      res.status(400).json({ message: 'id must be a number' }).end()
    } else {
      const user = await UserServices.getById(id)
      user ? res.status(200).json(user).end() : res.status(404).end()
    }
  } catch ({ message }) {
    res.status(500).json(message).end()
  }
}

const create = async (req, res) => {
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to add a new user.'
    #swagger.parameters['authorization'] = {
      in: 'header',
      description: 'Bearer token that obtain when login. Example: Bearer mytoken123',
      required: true,
      schema: { $ref: "#/definitions/Token" }
    }
    #swagger.parameters['newUser'] = {
      in: 'body',
      description: 'New User information to be create.',
      required: true,
      schema: { $ref: "#/definitions/AddUser" }
    }
  */
  const { name, email, password } = req.body
  const pass = await bcrypt.hash(password, 2)
  try {
    const user = await UserServices.create({ name, email, password: pass })
    res.status(201).json(user).end()
  } catch ({ message }) {
    res.status(500).json(message).end()
  }
}

const update = async (req, res) => {
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to update an user.'
    #swagger.parameters['authorization'] = {
      in: 'header',
      description: 'Bearer token that obtain when login. Example: Bearer mytoken123',
      required: true,
      schema: { $ref: "#/definitions/Token" }
    }
    #swagger.parameters['id'] = { 
      in: 'path',
      description: 'ID of user to be updated.',
      required: true,
      schema: { $ref: "#/definitions/UpdateId" }
    }
    #swagger.parameters['newUser'] = {
      in: 'body',
      description: 'New User information to be update.',
      required: true,
      schema: { $ref: "#/definitions/UpdateUser" }
    }
  */
  const { id } = req.params
  if (!id) res.status(400).json({ message: 'id is required' }).end()
  try {
    const user = await UserServices.getById(id)
    if (user) {
      await UserServices.update(id, req.body)
      res.status(204).end()
    } else {
      res.status(404).json({ mensage: 'Resourse not found' }).end()
    }
  } catch ({ message }) {
    res.status(500).json(message).end()
  }
}

const remove = async (req, res) => {
  /* 
    #swagger.tags = ['User']
    #swagger.description = 'Endpoint to delete an user.'
    #swagger.parameters['authorization'] = {
      in: 'header',
      description: 'Bearer token that obtain when login. Example: Bearer mytoken123',
      required: true,
      schema: { $ref: "#/definitions/Token" }
    }
    #swagger.parameters['id'] = { 
      in: 'path',
      description: 'ID of user to be deleted.',
      required: true,
    }
  */
  const { id } = req.params
  try {
    const user = await UserServices.getById(id)
    if (user) {
      await UserServices.remove(id)
      res.status(204).end()
    } else {
      res.status(404).json({ mensage: 'Resourse not found' }).end()
    }
  } catch ({ message }) {
    res.status(500).json(message).end()
  }
}

module.exports = { getAll, getById, create, update, remove }
