var express = require('express');
var router = express.Router();
const carController = require('../controllers/carController');
/* GET home page. */
router.get('/getAllCar',carController.getAllCar);
router.post('/createCar',carController.createCar);
router.post('/createManyCar',carController.createManyCar);
router.put('/updateCarByID/:id',carController.updateCarByID);
router.get('/getCarById/:id',carController.getCarById);
router.get('/searchCarByModel',carController.searchCarByModel);
router.get('/getMostRecentAndCheapestCarByBrand',carController.getMostRecentAndCheapestCarByBrand);
router.delete('/deleteCarById/:id',carController.deleteCarById);
router.post('/createCarWithOwner',carController.createCarWithOwner);
router.post('/SellCar',carController.SellCar);
router.post('/SellCar2',carController.SellCar2);


module.exports = router;