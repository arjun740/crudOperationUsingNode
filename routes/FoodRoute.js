const express = require('express');
const foodController = require('./../controller/FoodController');
const router = express.Router();

router.route('/')
    .get(foodController.getAllFood)
    .post(foodController.createNewfood);


router.route('/:id')
    .put(foodController.updateFood)
    .get(foodController.getFood)
    .delete(foodController.deleteFood);

module.exports = router;