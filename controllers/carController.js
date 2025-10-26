const carModel = require('../models/carSchema');
const userModel = require('../models/userSchema');

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

module.exports.createCarWithOwner = async (req, res) => {
  try {
    const { brand, model, year, price , owner_Id} = req.body;
    const newCar = new carModel({
      brand,
      model,
      year,
      price,
      owner : owner_Id
    });
    
    const addedCar = await newCar.save();
    
    await userModel.findByIdAndUpdate(owner_Id, { $push: { cars: addedCar._id } });
    res.status(201).json({ newCar, message: 'Car created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  } 
};

module.exports.SellCar = async (req, res) => {
  try {
    const { car_id, owner_Id} = req.body;

    await carModel.findByIdAndUpdate(car_id, { owner : owner_Id });
    
    await userModel.findByIdAndUpdate(owner_Id, { $push: { cars: car_id } });
    res.status(201).json({ newCar, message: 'Car created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  } 
};

module.exports.SellCar2 = async (req, res) => {
  try {
    const { old_Onwer_Id,car_id, New_Owner_Id} = req.body;

    await userModel.findByIdAndUpdate(old_Onwer_Id, { $pull: { cars: car_id } });

    await carModel.findByIdAndUpdate(car_id, { owner : New_Owner_Id });
    
    await userModel.findByIdAndUpdate(New_Owner_Id, { $push: { cars: car_id } });
    
    res.status(201).json({ newCar, message: 'Car created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  } 
};



module.exports.createManyCar = async (req, res) => {
try {
    const carsData = req.body; // Expecting an array of car objects

    if (!Array.isArray(carsData) || carsData.length === 0) {
        return res.status(400).json({ message: 'Invalid data format. Expected an array of car objects.' });
    }

    const newCars = await carModel.insertMany(carsData);

    res.status(201).json({ newCars, message: 'Cars created successfully' });
} catch (error) {
    res.status(500).json({ message: 'Server error', error });
}
}

module.exports.updateCarByID = async (req, res) => {
  try {
    const carId = req.params.id;
   // const {id} = req.params;
    const updatedData = req.body;

    const car = await carModel.findById(carId)
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
        const car = await carModel.findById(carId).populate('owner');;
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


module.exports.searchCarByModel = async (req, res) => {
    try {
        const { brand } = req.body;
        const cars = await carModel.find({ brand: { $regex: brand, $options: "i" } });
        if (!cars) {
            return res.status(404).json({ message: "No cars found for this model" });
        }
        res.json(cars);
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
};

module.exports.getMostRecentAndCheapestCarByBrand = async (req, res) => {
  try {
    const { brand } = req.body;

    // Récupère toutes les voitures de la marque
    const cars = await carModel.find({ brand });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: `No cars found for brand: ${brand}` });
    }

    // On trouve la voiture la plus récente
    const mostRecentYear = Math.max(...cars.map(car => car.year));

    // Parmi les voitures les plus récentes, on prend la moins chère
    const candidates = cars.filter(car => car.year === mostRecentYear);
    const bestCar = candidates.reduce((prev, curr) => prev.price < curr.price ? prev : curr);

    res.status(200).json({
      brand,
      bestCar
    });

  } catch (error) {
    console.error("Error fetching brand data:", error);
    res.status(500).json({
      message: "Server error while fetching cars by brand",
      error: error.message
    });
  }
};


module.exports.deleteCarById = async (req, res) => {
  try {
    const { id } = req.params;
    const car = await carModel.findByIdAndDelete(id);

    await userModel.updateMany({ cars: id }, { $pull: { cars: id } }); //user : [cars] many
    
    await userModel.updateMany({ cars: id }, { $set: { car: null } }); //user car 1 one

    res.status(200).json({ message: "Car deleted successfully", car });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}; 