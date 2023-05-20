const {Router} = require('express')
const foodHandler = require('../controller/foodCountroller')
const router = Router()

router.route('/')
    .get(foodHandler.GET)
    .post(foodHandler.POST)
    
router.put('/:id',foodHandler.PUT)
router.delete( '/:id',foodHandler.DELETE)
    module.exports = router