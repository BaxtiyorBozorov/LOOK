const {Router} = require('express')
const userController = require('../controller/userController')
const router = Router()

router.route('/')
    .get(userController.GET)
    .post(userController.POST)

router.route('/:id')
    .put(userController.PUT)
    .delete(userController.DELETE)

module.exports = router