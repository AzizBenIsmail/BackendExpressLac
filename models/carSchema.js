const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    brand: { type: String, required: true },
    model: String,
    year:Number,
    price: Number,
});

const Car = mongoose.model('Car', carSchema);
module.exports = Car;