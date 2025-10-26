var express = require('express');
var router = express.Router();
const carController = require('../controllers/carController');
/* GET home page. */
router.get('/getAllCar',carController.getAllCar);

module.exports = router;