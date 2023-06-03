const router = require('express').Router()
const authRoute = require('./auth')
const userRoute = require('./user')

router.use('/auth', authRoute)
router.use('/users', userRoute)

module.exports = router
