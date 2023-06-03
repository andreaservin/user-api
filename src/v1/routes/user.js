const router = require('express').Router()
const { getAll, getById, create, update, remove } = require('../controllers/user')
const { isAuthenticated } = require('../middlewares/auth')


router.get('/', getAll)
router.get('/:id', getById)
router.post('/', [isAuthenticated], create)
router.put('/:id', [isAuthenticated], update)
router.delete('/:id', [isAuthenticated], remove)

module.exports = router
