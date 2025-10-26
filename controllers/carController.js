const carModel = require('../models/carSchema');

// Create a new car
module.exports.createCar = async (req, res) => {
  try {
    const { brand, model, year, price } = req.body;
    const newCar = new carModel({
      brand,
      model,
      year,
      price,
    });
    await newCar.save();
    res.status(201).json({ newCar, message: 'Car created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  } 
};

module.exports.updateCarByID = async (req, res) => {
  try {
    const carId = req.params.id;
   // const {id} = req.params;
    const updatedData = req.body;

    const car = await carModel.findById(carId);
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const updatedCar = await carModel.findByIdAndUpdate(carId, updatedData, { new: true });
    res.status(200).json({ updatedCar, message: 'Car updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports.getCarById = async (req, res) => {
    try {
        const carId = req.params.id;
        const car = await carModel.findById(carId).sort({ year: -1 }).limited(1);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

module.exports.getAllCar = async (req, res) => {
    try {
        const car = await carModel.find();
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


