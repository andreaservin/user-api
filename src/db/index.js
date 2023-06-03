const { Sequelize, DataTypes } = require('sequelize')
const sqlite3 = require('sqlite3')

const ORM = new Sequelize({
  dialect: 'sqlite',
  dialectModule: sqlite3,
  storage: ':memory:',
})

module.exports = { ORM, DataTypes }
