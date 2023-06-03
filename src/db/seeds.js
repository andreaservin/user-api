const bcrypt = require('bcrypt')
const User = require('../v1/models/user')

const seedUser = async () => {
  const { count, rows } = await User.findAndCountAll()
  if (!count) {
    const pass = await bcrypt.hash('andrea', 2)
    User.create({
      name: 'Andrea Servin',
      email: 'andrea@email.com',
      password: pass,
    }).then(() => console.log('Default user have been saved'))
  }
}

module.exports = { seedUser }
