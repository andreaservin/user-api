const bcrypt = require('bcrypt')
const User = require('../models/user')

const attributes = ['id', 'name', 'email']

const getAll = async (queries) => {
  const { page, size } = queries
  const data = await User.findAndCountAll({
    limit: size,
    offset: page * size,
    attributes: attributes
  })

  const pages = Math.ceil(data.count / size)

  const result = {
    previousPage: page ? page - 1 : null,
    actualPage: page,
    nextPage: page + 1 < pages ? page + 1 : null,
    totalPages: pages,
    total: data.count,
    data: data.rows,
  }
  return result
}

const getById = async (id) => {
  const user = await User.findByPk(id, { attributes: attributes })
  return user
}

const getByEmail = async (email) => {
  const user = await User.findOne({ where: { email } })
  return user
}

const create = async (user) => {
  const newUser = await User.create(user)
  return newUser
}

const update = async (id, values) => {
  const result = await User.update({ ...values }, { where: { id } })
  return result
}

const remove = async (id) => {
  const user = await User.destroy({ where: { id } })
  return user
}

const authenticate = async (email, password) => {
  const user = await User.findOne({ where: { email: email } })
  if (user) {
    return await bcrypt
      .compare(password, user.password)
      .then((res) => {
        return user
      })
      .catch((error) => {
        return null
      })
  }
}

module.exports = { getAll, getById, getByEmail, create, update, remove, authenticate }
