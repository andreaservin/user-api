const app = require('./src/app')
const { port } = require('./src/config')
const { ORM } = require('./src/db')
const { seedUser } = require('./src/db/seeds')

async function main() {
  try {
    await ORM.sync()
    await seedUser()
    
    console.log('Database was connected successfully\n')
    app.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`)
    })
  } catch (error) {
    console.log('Unable to connetc to the database', error)
  }
}

main()
